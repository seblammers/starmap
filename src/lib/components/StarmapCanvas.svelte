<script>
  import { geoEquirectangular, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";
  import { Canvas } from "svelte-canvas";
  import { select } from "d3-selection";
  import { zoom } from "d3-zoom";
  import { resize } from "svelte-resize-observer-action";
  import Star from "./Star.svelte";
  import Tooltip from "./Tooltip.svelte";
  import VoronoiCanvas from "./VoronoiCanvas.svelte";

  // fetch star data
  export let data;

  let width = 1200;
  $: height = width / 2;

  // initial values, to be overwritten onMount
  let initial = {
    k: 180,
    x: 600,
    y: 300,
  };

  // keep track of positions (x,y,z) for panning and zooming
  let xPos = tweened(initial.x, {
    duration: 500,
    easing: linear,
  });
  let yPos = tweened(initial.y, {
    duration: 500,
    easing: linear,
  });

  let kPos = tweened(initial.k, {
    duration: 500,
    easing: linear,
  });

  // handle zooming & panning
  // set up separate variables to keep track of zooming
  let zoomX = writable(0);
  let zoomY = writable(0);
  let zoomK = writable(1);
  // initial values get overwritten in onMount
  let rootX = writable(initial.x);
  let rootY = writable(initial.y);
  let rootK = writable(initial.k);
  // handle zooming/panning

  // positions x,y,z are defined by the
  // - root values (depending on screen-width)
  // - zoom values (depending on user-zoom)
  //
  // this ensures that both types of events
  // (resizing or zooming) are handled separately
  // and persist throughout a user session.
  $: $xPos = $rootX + $zoomX;
  $: $yPos = $rootY + $zoomY;
  $: $kPos = $rootK * $zoomK;

  // handle resizing
  function onResize(entry) {
    const newWidth = entry.contentRect.width;

    // set new root values
    $rootX = newWidth / 2;
    $rootY = newWidth / 4;
    $rootK = newWidth / 6;
  }
  // handle zooming
  const zooming = (event) => {
    // flag dragging for pointer styles
    dragging = true;

    if (event.sourceEvent.constructor.name == "WheelEvent") {
      // only mess with k when zooming

      $zoomK = event.transform.k;
    } else {
      // set new values for panning-variables
      $zoomX = event.transform.x;
      $zoomY = event.transform.y;
    }
  };

  // helper to call zoom-method
  let starmap;
  // keep track of dragging (user "grabs" map)
  let dragging = false;

  // when the site starts up,
  // set variables to match width and start
  // listening for zoom-events
  onMount(() => {
    $rootX = width / 2;
    $rootY = width / 4;
    $rootK = width / 6;
    const element = select(starmap);
    element.call(
      zoom()
        .scaleExtent([0.8, 8.0])
        .translateExtent([
          [-(width / 2), -(height / 2)],
          [width, height],
        ])
      //.on("zoom", zooming)
      //.on("dblclick.zoom", null)
      //.scaleExtent([ 150, 1000 ])

      // .on("end", () => {
      //   dragging = false;
      // })
    );
  });

  // set projection and keep it updated
  // when one of the values change.
  $: projection = geoEquirectangular().translate([$xPos, $yPos]).scale([$kPos]);

  $: console.log({ $xPos, $yPos, $kPos });
  $: console.log({ $rootX, $rootY, $rootK });
  $: console.log({ $zoomX, $zoomY, $zoomK });

  // same for the path-generator.
  $: path = geoPath(projection);

  // helper to zoom out to initial positions
  let handleReset = () => {
    // get current k as zoom duration (more zoom, more time),
    // but set a max of 4 seconds, even if zoomed in very deep.
    const zoomDuration = Math.min($kPos, 4000);

    // if zoomed in more, take longer to zoom out
    kPos.set($rootK, { duration: zoomDuration });
    zoomK.set(1);
    xPos.set($rootX);
    yPos.set($rootY);
  };

  // to shuffle the order of random positions,
  // we use a Fisher–Yates shuffle
  // h/t Mike Bostock: https://bost.ocks.org/mike/shuffle/compare.html
  function shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  // some random positions
  let possibilities = [
    { x: 270, y: -168, k: 4.4 },
    { x: 182, y: -15, k: 8 },
    { x: 45, y: 289, k: 6 },
    { x: 99, y: -123, k: 6.4 },
    { x: -182, y: 33, k: 5.5 },
    { x: -222, y: 222, k: 5.2 },
    { x: 42, y: 23, k: 5 },
    { x: 150, y: 100, k: 7.8 },
    { x: -172, y: -231, k: 4.3 },
  ];

  // shuffled on page load
  possibilities = shuffle(possibilities);

  // keep track of current index
  let current = 0;

  // handle randomization:
  // - increment index until max, then
  //   reset to 0
  // - apply random positions
  let handleRandomize = () => {
    zoomX.set(possibilities[current].x);
    zoomY.set(possibilities[current].y);
    zoomK.set(possibilities[current].k);

    if (current < possibilities.length - 1) {
      // increment until last entry
      current += 1;
    } else {
      // then reset
      current = 0;
    }
  };

  function handleZoomOut() {
    // only zoom further out if subtracting 1
    // is at least 0.8
    if ($zoomK >= 1.8) {
      $zoomK -= 1;

      // if it would be less, set to 0.8
      // the min. value.
    } else {
      $zoomK = 0.8;
    }
  }

  function handleZoomIn() {
    // only zoom further out if subtracting 1
    // is at least 0.8
    if ($zoomK <= 7) {
      $zoomK += 1;

      // if it would be less, set to 0.8
      // the min. value.
    } else {
      $zoomK = 8;
    }
  }
  // helper to slightly scale stars on zoom
  $: magFactor = Math.sqrt($kPos / initial.k);

  let hoveredData;
  // handle voronoi-hover
  function sethoveredData(d) {
    hoveredData = data.features[d.detail];
  }

  // scale starsize according to magnitude
  function starSize(d) {
    // adapted from celestial-d3
    var mag = d.properties.mag;
    if (mag === null) return 0.1;
    var r = 3 * 1 * Math.exp(-0.28 * (mag + 2));
    return Math.max(r, 0.1);
  }
</script>

{#if width < 900}
  <aside class="warning">
    It seems you are viewing this on a relatively small screen. Feel free to
    explore with your current device, but please consider coming back on a big
    screen to get the most out of this experience.
  </aside>
{/if}

<div class="chart-container">
  <div
    id="map"
    bind:clientWidth={width}
    use:resize={onResize}
    bind:this={starmap}
    on:mouseleave={() => (hoveredData = undefined)}
  >
    <VoronoiCanvas
      {width}
      {height}
      {data}
      {path}
      on:voronoi-mouseover={sethoveredData}
    />
    <Canvas {width} {height} style="cursor: pointer">
      {#each data.features as s}
        {@const size = starSize(s) * magFactor}

        <Star
          x={projection(s.geometry.coordinates)[0]}
          y={projection(s.geometry.coordinates)[1]}
          fill="white"
          stroke="null"
          strokeWidth="0"
          r={hoveredData == s ? size * 2 : size}
        />
        {#if hoveredData == s}
          <Star
            x={projection(s.geometry.coordinates)[0]}
            y={projection(s.geometry.coordinates)[1]}
            glow="true"
            stroke="#6368ee"
            fill="rgba(0, 0, 0, 0)"
            r={size * 5}
          />
        {/if}
      {/each}
    </Canvas>
  </div>

  <div class="u-container">
    <div class="control-grid">
      <button
        title="Randomize zoom and position"
        id="randomize"
        on:click={handleRandomize}>[*]</button
      >
      <button
        disabled={$kPos == $rootK && $xPos == $rootX && $yPos == $rootY
          ? true
          : false}
        title={$kPos == $rootK && $xPos == $rootX && $yPos == $rootY
          ? "You're already in the Reset-Position"
          : "Reset zoom and position"}
        id="reset"
        on:click={handleReset}>&#x21ba;</button
      >
      <button
        disabled={$xPos < -($rootX * 10) ? true : false}
        title={$xPos < -($rootX * 10) ? "That's enough." : "Pan right"}
        id="pan-right"
        on:click={() => ($zoomX -= 150)}>&#x25B6;</button
      >

      <button
        disabled={$xPos > $rootX * 10 ? true : false}
        title={$xPos > $rootX * 10 ? "Nothing to see there." : "Pan left"}
        id="pan-left"
        on:click={() => ($zoomX += 150)}>&#x25C0;</button
      >

      <button
        disabled={$yPos > $rootY * 10 ? true : false}
        title={$yPos > $rootY * 10 ? "Ok, you've had enough." : "Pan up"}
        id="pan-up"
        on:click={() => ($zoomY += 150)}>&#x25B2;</button
      >
      <button
        disabled={$yPos < -($rootY * 10) ? true : false}
        title={$yPos < -($rootY * 10)
          ? "Stop it with this direction."
          : "Pan down"}
        id="pan-down"
        on:click={() => ($zoomY -= 150)}>&#x25BC;</button
      >
      <button
        disabled={$zoomK >= 8 ? true : false}
        title={$zoomK >= 8 ? "You're all zoomed in" : "Zoom in"}
        id="zoom-in"
        on:click={handleZoomIn}
      >
        &#43;
      </button>
      <button
        disabled={$zoomK <= 0.8 ? true : false}
        title={$zoomK <= 0.8 ? "You're all zoomed out" : "Zoom out"}
        id="zoom-out"
        on:click={handleZoomOut}
      >
        &#8722;
      </button>
    </div>
  </div>

  {#if hoveredData}
    <Tooltip data={hoveredData} {width} {projection} />
  {/if}
</div>
<div class="spacer" />

<style>
  .u-container {
    padding-inline: var(--grid-gutter);
    margin-inline: auto;
    margin-top: var(--space-s);
  }
  .control-grid {
    display: grid;
    grid-template-columns: repeat(7, var(--space-2xs));
    grid-template-rows: repeat(2, var(--space-l));
    grid-column-gap: var(--space-l);
    grid-row-gap: var(--space-2xs);
    grid-auto-flow: column;
    /* max-width: 80vw; */
    justify-content: end;
    /* align-items: center; */
    /* justify-items: center; */
  }

  #randomize {
    grid-area: 1 / 1 / 2 / 2;
    font-family: var(--accentFont);
  }
  #reset {
    grid-area: 2 / 1 / 3 / 2;
  }
  #pan-up {
    grid-area: 1 / 4 / 2 / 5;
  }
  #pan-left {
    grid-area: 2 / 3 / 3 / 4;
  }
  #pan-down {
    grid-area: 2 / 4 / 3 / 5;
  }
  #pan-right {
    grid-area: 2 / 5 / 3 / 6;
  }
  #zoom-in {
    grid-area: 1 / 7 / 2 / 8;
  }
  #zoom-out {
    grid-area: 2 / 7 / 3 / 8;
  }

  @media screen and (max-width: 30em) {
    .control-grid {
      justify-items: center;
      justify-content: center;
    }
    #randomize {
      grid-area: 1 / 2 / 2 / 3;
      font-family: var(--accentFont);
    }
    #reset {
      grid-area: 2 / 2 / 3 / 3;
    }
    #zoom-in {
      grid-area: 1 / 6 / 2 / 7;
    }
    #zoom-out {
      grid-area: 2 / 6 / 3 / 7;
    }
  }
  .controls {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  /* #zoom-reset {
    margin-right: var(--space-l);
  } */
  .zoom-control {
    display: flex;
    flex-direction: row;
    margin-top: var(--space-s);
  }
  svg {
    background-color: var(--dark);
    stroke: none;
    cursor: pointer;
  }

  .dragging {
    cursor: grabbing;
  }

  button {
    font-family: var(--primaryFont);
    font-size: var(--step-0);
  }

  button:disabled,
  button[disabled] {
    background-color: var(--grey);
  }

  .warning {
    font-style: italic;
  }
</style>

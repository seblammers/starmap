<script>
  import { geoEquirectangular, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { sine } from "svelte/easing";
  import { Canvas } from "svelte-canvas";
  import { select } from "d3-selection";
  import { zoom } from "d3-zoom";
  import { resize } from "svelte-resize-observer-action";
  import Star from "./Star.svelte";
  import { geoVoronoi } from "d3-geo-voronoi";
  import Tooltip from "./Tooltip.svelte";
  import VoronoiCanvas from "./VoronoiCanvas.svelte";
  import Glow from "./Glow.svelte";

  // new try for voronoi
  $: voronoi = geoVoronoi(
    data.features.map((d) => {
      return [d.geometry.coordinates[0][0], d.geometry.coordinates[1][0]];
    })
  );

  //   $: star_id = voronoi.find(
  //       cell.properties.site[0],
  //       cell.properties.site[1]
  //     );
  let star_id = "";
  let hoveredData;
  function handleMouseMove(event) {
    console.log(event);
    star_id = voronoi.find(1 - (event.clientX - 8), 1 - (event.clientY - 8));
    hoveredData = data.features[star_id];
  }
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
  let xPos = writable(initial.x);
  let yPos = writable(initial.y);

  let kPos = tweened(initial.k, {
    duration: 500,
    easing: sine,
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

      //console.log(event.sourceEvent);

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
        .on("zoom", zooming)
        //.scaleExtent([ 150, 1000 ])
        //.translateExtent([[ -1200, -700 ], [ 1200, 700 ]])
        .on("end", () => {
          dragging = false;
        })
    );
  });

  // set projection and keep it updated
  // when one of the values change.
  $: projection = geoEquirectangular()
    // .fitExtent(
    //   [
    //     [10, 10],
    //     [width - padding, height - padding],
    //   ],
    //   data
    // )
    .translate([$xPos, $yPos])
    .scale([$kPos]);

  $: console.log({ $rootK, $zoomK, $kPos });
  // same for the path-generator.
  $: path = geoPath(projection);

  // helper to zoom out to initial positions
  let handleReset = () => {
    // get current k as zoom duration (more zoom, more time),
    // but set a max of 4 seconds, even if zoomed in very deep.
    const zoomDuration = Math.min($kPos, 4000);

    // if zoomed in more, take longer to zoom out
    zoomK.set(1, { duration: zoomDuration });
    xPos.set($rootX);
    yPos.set($rootY);
  };

  // helper to slightly scale stars on zoom
  $: magFactor = Math.sqrt($kPos / initial.k);

  // keep track of hovered stars
  //$: hoveredData = data.features[star_id];

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
    I see you are viewing this on a relatively small screen. Feel free to
    explore with your current device, but please consider coming back on a big
    screen to get the most out of this experience.
  </aside>
{/if}
<h3>This is a different map. Better? {star_id}</h3>
<div class="chart-container" bind:clientWidth={width} use:resize={onResize}>
  <div
    class="map"
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
    <Canvas
      {width}
      {height}
      style={dragging ? "cursor: grabbing" : "cursor: pointer"}
    >
      {#each data.features as s}
        {@const size = starSize(s) * magFactor}

        <Star
          x={projection(s.geometry.coordinates)[0]}
          y={projection(s.geometry.coordinates)[1]}
          fill="white"
          stroke="null"
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
  <div class="controls">
    <button id="zoom-reset" on:click={handleReset}>Reset</button>

    <div class="zoom-control">
      <button id="zoom-in" on:click={() => ($zoomK += 0.5)}> &#43; </button>
      <button id="zoom-out" on:click={() => ($zoomK -= 0.5)}> &#8722; </button>
    </div>
  </div>

  {#if hoveredData}
    <Tooltip data={hoveredData} {width} {projection} />
  {/if}
</div>

<style>
  .controls {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  #zoom-reset {
    margin-right: var(--space-l);
  }
  .zoom-control {
    display: flex;
    flex-direction: row;
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

  .warning {
    font-style: italic;
  }
</style>

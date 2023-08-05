<script>
  import { geoEquirectangular, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { select } from "d3-selection";
  import { zoom } from "d3-zoom";
  import { resize } from "svelte-resize-observer-action";
  import Tooltip from "./Tooltip.svelte";
  import Voronoi from "./Voronoi.svelte";
  import Glow from "./Glow.svelte";

  // fetch star data
  export let data;

  // set default width (but adapt to screensize below)
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
    duration: 100,
    easing: cubicOut,
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

      console.log(event.sourceEvent);

      $zoomK = event.transform.k;
    } else {
      // set new values for zoom-variables
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
        .on("zoom", zooming)
        //.scaleExtent([ 150, 1000 ])
        //.translateExtent([[ -1200, -700 ], [ 1200, 700 ]])
        .on("end", (event) => {
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

  // same for the path-generator.
  $: path = geoPath(projection);

  // helper to zoom out to initial positions
  let handleReset = () => {
    // get current k as zoom duration (more zoom, more time),
    // but set a max of 4 seconds, even if zoomed in very deep.
    const zoomDuration = Math.min($kPos, 4000);

    // if zoomed in more, take longer to zoom out
    kPos.set($rootK, { duration: zoomDuration });
    xPos.set($rootX);
    yPos.set($rootY);
  };

  $: console.log("width is now", width);

  // helper to slightly scale stars on zoom
  $: magFactor = Math.sqrt($kPos / initial.k);

  // keep track of hovered stars
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

<div class="chart-container" bind:clientWidth={width} use:resize={onResize}>
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style:max-width="100%"
    style:height="auto"
    bind:this={starmap}
    on:mouseleave={() => (hoveredData = undefined)}
    class:dragging
  >
    <Glow />
    {#if data}
      <Voronoi {data} {path} on:voronoi-mouseover={sethoveredData} />
      <g id="stars">
        {#each data.features as s}
          {@const size = starSize(s) * magFactor}
          <circle
            cx={projection(s.geometry.coordinates)[0]}
            cy={projection(s.geometry.coordinates)[1]}
            r={hoveredData == s ? size * 2 : size}
            filter={hoveredData == s ? "url(#glow)" : ""}
            fill="white"
          />
        {/each}
      </g>
    {/if}
  </svg>

  <div class="controls">
    <button id="zoom-reset" on:click={handleReset}>Reset</button>

    <div class="zoom-control">
      <button id="zoom-in" on:click={() => ($kPos += 100)}> &#43; </button>
      <button id="zoom-out" on:click={() => ($kPos -= 100)}> &#8722; </button>
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
</style>

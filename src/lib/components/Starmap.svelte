<script>
  // h/t https://observablehq.com/@pcarleton/visualizing-the-night-sky-working-with-d3-celestial
  import { geoEquirectangular, geoPath } from "d3-geo";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { select } from "d3-selection";
  import { zoom } from "d3-zoom";
  import Tooltip from "./Tooltip.svelte";
  import Voronoi from "./Voronoi.svelte";
  import Glow from "./Glow.svelte";

  // fetch star data
  export let data;

  // set default width (but adapt to screensize)
  let width = 1200;
  $: height = width / 2;

  import { resize } from "svelte-resize-observer-action";
  function onResize(entry) {
    console.log("Look!", entry.contentRect.width);

    rootX = width / 2;
    rootY = width / 4;
    rootK = width / 6;

    console.log({ rootK, rootX, rootY });

    $xPos = rootX;
    $yPos = rootY;
    $kPos = rootK;
  }

  let initial = {
    k: 180,
    x: 600,
    y: 300,
  };

  // keep track of hovered stars
  let hoveredData;

  // handle voronoi-hover
  function sethoveredData(d) {
    hoveredData = data.features[d.detail];
  }

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // keep track of positions (x,y,z) for panning and zooming
  let xPos = writable(initial.x);
  let yPos = writable(initial.y);

  let kPos = tweened(initial.k, {
    duration: 300,
    easing: cubicOut,
  });

  // TODO: use a resize action to set initial values
  // see https://svelte.dev/repl/797cfeea31a74871a732e3aad2117b5f?version=4.1.1
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
  $: path = geoPath(projection);

  // scale starsize according to magnitude
  function starSize(d) {
    // adapted from celestial-d3
    var mag = d.properties.mag;
    if (mag === null) return 0.1;
    var r = 3 * 1 * Math.exp(-0.28 * (mag + 2));
    return Math.max(r, 0.1);
  }

  // handle zooming & panning
  const zooming = (event) => {
    dragging = true;

    $xPos = $xPos + event.transform.x;
    $yPos = $yPos + event.transform.y;
    $kPos = $kPos * event.transform.k;
  };

  // keep track of dragging (user "grabs" map)
  let dragging = false;

  let rootX = writable();
  let rootY = writable();
  let rootK = writable();
  // handle zooming/panning
  let starmap;
  onMount(() => {
    rootX = width / 2;
    rootY = width / 4;
    rootK = width / 6;
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

  // helper to zoom out to initial positions
  let handleReset = () => {
    // get current k as zoom duration (more zoom, more time),
    // but set a max of 4 seconds, even if zoomed in very deep.
    const zoomDuration = Math.min($kPos, 4000);

    // if zoomed in more, take longer to zoom out
    kPos.set(initial.k, { duration: zoomDuration });
    xPos.set(initial.x);
    yPos.set(initial.y);
  };

  $: console.log("width is now", width);

  // helper to slightly scale stars on zoom
  $: magFactor = Math.sqrt($kPos / initial.k);
</script>

<div class="chart-container" bind:clientWidth={width} use:resize={onResize}>
  <button on:click={handleReset}> Reset </button>

  <button on:click={() => ($kPos += 100)}> + </button>
  <button on:click={() => ($kPos -= 100)}> - </button>
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

  {#if hoveredData}
    <Tooltip data={hoveredData} {width} {projection} />
  {/if}
</div>

<style>
  svg {
    background-color: #03041b;
    stroke: none;
    cursor: pointer;
  }
  .chart-container {
    position: relative;
    max-width: 2400px;
    margin: 0 auto;
  }
  .dragging {
    cursor: grabbing;
  }
</style>

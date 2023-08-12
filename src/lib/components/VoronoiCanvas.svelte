<script>
  import { geoVoronoi } from "d3-geo-voronoi";
  import { createEventDispatcher } from "svelte";

  export let width;
  export let height;
  export let colour = "#03041b";
  export let data;
  export let path;

  let dispatcher = createEventDispatcher();

  function dispatch(cell) {
    //console.log("VORONOI CANVAS", cell.properties.site);
    let star_id = voronoi.find(
      cell.properties.site[0],
      cell.properties.site[1]
    );
    dispatcher("voronoi-mouseover", star_id);
  }

  // create voronoi based on star data
  $: voronoi = geoVoronoi(
    data.features.map((d) => {
      return [d.geometry.coordinates[0][0], d.geometry.coordinates[1][0]];
    })
  );

  // create polygons based on voronoi
  $: poly = voronoi.polygons();
</script>

<svg {width} {height}>
  <g class="voronoi">
    {#each poly.features as cell}
      <path
        d={path(cell.geometry)}
        opacity="0"
        fill={colour}
        stroke={colour}
        on:mouseover={() => {
          dispatch(cell);
        }}
        on:focus={() => {
          dispatch(cell);
        }}
      />
    {/each}
  </g>
</svg>

<style>
  svg {
    position: absolute;
    cursor: pointer;
  }
</style>

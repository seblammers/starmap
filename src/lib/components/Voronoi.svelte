<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { geoVoronoi } from "d3-geo-voronoi";

  export let colour = "#03041b";
  export let data;
  export let path;

  let dispatcher = createEventDispatcher();

  function log(cell) {
    let star_id = voronoi.find(
      cell.properties.site[0],
      cell.properties.site[1]
    );
    //console.log(data.features[star_id].id);
    dispatcher("voronoi-mouseover", star_id);
  }
  $: voronoi = geoVoronoi(
    data.features.map((d) => {
      return [d.geometry.coordinates[0][0], d.geometry.coordinates[1][0]];
    })
  );
  $: mesh = voronoi.cellMesh();

  $: poly = voronoi.polygons();
</script>

{#each poly.features as cell}
  <path
    d={path(cell.geometry)}
    opacity="0"
    fill={colour}
    stroke={colour}
    on:mouseover={() => {
      log(cell);
    }}
    on:focus={() => {
      log(cell);
    }}
  />
{/each}

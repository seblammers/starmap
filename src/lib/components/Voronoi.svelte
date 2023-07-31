<script>
  import { createEventDispatcher } from "svelte";
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

  $: poly = voronoi.polygons();

  let isHovered = false;
</script>

<g class="voronoi">
  {#each poly.features as cell}
    <path
      d={path(cell.geometry)}
      opacity="0.5"
      fill={colour}
      stroke={isHovered == cell ? "#ccc" : colour}
      on:mouseover={() => {
        log(cell);
        isHovered = cell;
      }}
      on:focus={() => {
        log(cell);
      }}
    />
  {/each}
</g>

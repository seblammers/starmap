<script>
  //https://observablehq.com/@d3/star-map
  import { geoStereographic } from "d3-geo";
  export let stars;

  const margin = {
    top: 100,
    right: 110,
    bottom: 200,
    left: 200,
  };

  let width;
  let height = 600;

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  let scale = (width - 120) * 0.5;

  $: console.log("hi", stars[0]);
  $: projection = geoStereographic()
    .reflectY(true)
    .scale(scale)
    .clipExtent([
      [0, 0],
      [width, height],
    ])
    .rotate([0, -90])
    .translate([width / 2, height / 2])
    .precision(0.1);
</script>

<h3>This is Mike's map</h3>

<div class="chart-wrapper" bind:clientWidth={width}>
  <svg class="chart" {width} {height} role="figure">
    {#each stars as star}
      <circle
        transform="translate({projection(star)})"
        fill="whitesmoke"
        stroke="black"
      />
      <text>{projection(star)}</text>
    {/each}
  </svg>
</div>

<script>
  // go here: https://observablehq.com/@pcarleton/visualizing-the-night-sky-working-with-d3-celestial
  import { scaleLinear, scaleSqrt } from "d3-scale";
  import { max } from "d3-array";
  import starData from "$lib/data/hygData.json";
  import cassiopeiaData from "$lib/data/cassiopeiaData.json";

  let stars = starData.map((row) => {
    return {
      id: +row.id,
      // convert to light years
      distance: Math.round(row.dist * 3.262 * 100) / 100,
      hd: row.hd,
      mag: +row.mag,
      x: +row.x,
      y: +row.y,
      z: +row.z,
      ci: +row.ci,
      name: row.proper,
    };
  });

  let cassiopeia = stars.filter(
    (row) =>
      row.hd === 3712 ||
      row.hd === 432 ||
      row.hd === 5394 ||
      row.hd === 8538 ||
      row.hd === 11415
  );
  let ursaMajor = stars.filter(
    (row) =>
      row.hd === 112185 ||
      row.hd === 95689 ||
      row.hd === 120315 ||
      row.hd === 116656 ||
      row.hd === 95418
  );
  $: console.log(ursaMajor);
  // $: stars
  //   .filter((row) => row.hd === "9553")
  //   .map((row, i) => console.log(i, row.y));

  const xAccessor = (d) => +d.x;
  const yAccessor = (d) => +d.y;

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

  $: xScale = scaleLinear()
    .domain([0, max(stars, xAccessor)])
    .range([0, innerWidth]);

  $: yScale = scaleLinear()
    .domain([0, max(stars, yAccessor)])
    .range([innerHeight, 20]);

  $: xAccessorScaled = (d) => xScale(xAccessor(d));
  $: yAccessorScaled = (d) => yScale(yAccessor(d));

  $: radiusScale = scaleSqrt()
    .domain([0, max(stars, (d) => d.mag)])
    .range(width < 560 ? [2, 4] : [3, 5]);
</script>

<h3>This is the map</h3>

<div class="chart-wrapper" bind:clientWidth={width}>
  <svg class="chart" {width} {height} role="figure">
    <g>
      {#each cassiopeia as star}
        <circle
          cx={xAccessorScaled(star)}
          cy={yAccessorScaled(star)}
          r={radiusScale(star.mag)}
          fill="whitesmoke"
          stroke="black"
        />

        <text
          text-anchor="middle"
          x={xAccessorScaled(star)}
          y={yAccessorScaled(star) + 20}
          dy=".32em"
          fill="white"
        >
          {star.name}
        </text>
      {/each}
    </g>

    <g>
      {#each ursaMajor as star}
        <circle
          cx={xAccessorScaled(star)}
          cy={yAccessorScaled(star)}
          r={radiusScale(star.mag)}
          fill="lightgrey"
          stroke="black"
        />

        <text
          text-anchor="middle"
          x={xAccessorScaled(star)}
          y={yAccessorScaled(star) + 20}
          dy=".32em"
          fill="white"
        >
          {star.name}
        </text>
      {/each}
    </g>
  </svg>
</div>

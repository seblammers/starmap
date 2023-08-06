<script>
  import * as d3 from "d3";
  import { draw } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import Toggle from "./Toggle.svelte";
  import Glow from "./Glow.svelte";

  // Receive plot data as prop.
  export let data;

  // Specify the chart’s dimensions.
  const width = 600;
  const height = width / 4;
  const nudge = 15;
  const margin = {
    top: 30,
    right: 40,
    bottom: 10,
    left: 30,
  };

  // Prepare the scales for positional and color encodings.
  const xScale = d3
    .scaleLinear()
    .domain([d3.max(data, (d) => d.distance), 0])
    .rangeRound([margin.left, width - margin.right]);

  const yScale = d3
    .scalePoint()
    .domain(data, (d) => d.body)
    .rangeRound([margin.top, height - margin.bottom])
    .padding(1);

  const radiusScale = d3
    .scaleSqrt()
    .domain([0, 1.711 * 695508])
    .range([2, 10]);

  // extract distance from data to pipe into tween-duration.
  let duration = d3.max(data, (d) => d.distance) * 1000;
  let tweenedNumber = tweened(0, {
    delay: 0,
    duration: duration,
    easing: linear,
  });
  // track toggle state
  let show;

  $: {
    if (show === "show") {
      tweenedNumber.set(duration);
    }
    if (show === "hide") {
      // make sure the reset is fast
      tweenedNumber.set(0, { duration: 0 });
    }
  }

  // make sure to show always one decimal for Sirius
  const s = d3.formatSpecifier("f");
  s.precision = d3.precisionFixed(0.1);
  const formatter = d3.format(s);

  // but display more for the Sun
  const formatterSun = d3.format(".2");

  let isSun = data.some((el) => el.name === "Sun");
</script>

<div class="container">
  <Toggle bind:value={show} />

  <div class="chart">
    <svg
      {width}
      {height}
      viewBox="0 0 {width} {height}"
      style:max-width="100%"
      style:height="auto"
      style:margin="auto"
      style:display="block"
    >
      <Glow />
      <g class="state" transform="translate(10, {yScale(data[0])})">
        {#each data as body}
          <!-- add circles and show glow effect for stars, when toggled  -->
          <circle
            cx={xScale(body.distance)}
            r={radiusScale(body.size)}
            fill="currentColor"
            filter={body.name != "Earth" && show == "show" ? "url(#glow)" : ""}
          />
          <text
            x={xScale(body.distance)}
            y={30}
            text-anchor="middle"
            dominant-baseline="middle"
            fill="currentColor"
          >
            {body.name}
          </text>
        {/each}

        {#if show == "show"}
          <line
            in:draw={{ duration: duration, easing: linear }}
            x1={xScale(d3.max(data, (d) => d.distance)) + nudge}
            x2={xScale(d3.min(data, (d) => d.distance)) - nudge}
            stroke="currentColor"
          />
          <text
            x={width / 2}
            y={-30}
            text-anchor="middle"
            dominant-baseline="middle"
            fill="currentColor"
          >
            <!-- Toggle formatter if Sun is present, so that the tiny 
                number for the sun is displayed, yet also handle the tweened number
                of Sirius gracefully with the respective formatting. -->
            {isSun
              ? formatterSun($tweenedNumber / 1000)
              : formatter($tweenedNumber / 1000)} light years
          </text>
        {/if}
      </g></svg
    >
  </div>
</div>

<style>
  .container {
    font-family: var(--primaryFont);
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

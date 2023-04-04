<script>
  //   import stars from "$lib/data/d3-celestial/stars.6.json";
  //   import starNames from "$lib/data/d3-celestial/starnames.json";
  import { geoEqualEarth, geoPath } from "d3-geo";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";

  let width;
  let height = 600;
  let padding = 10;

  // fitExtent centers the given GeoJSON object in the projection.  So [0, 0] in that object will
  // be at the center of the given rectangle.  Without this, I have to guess at what the scale is
  // going to be and adjust the size.  I'm not sure where it gets the center otherwise (maybe
  // from the context2d?
  //   $: projection = geoEqualEarth().fitExtent(
  //     [
  //       [10, 10],
  //       [width - padding, height - padding],
  //     ],
  //     stars
  //   );

  // Scale the radius of the stars
  //   $: magnitudeScale = scaleLinear()
  //     .domain(extent(stars.features, (d) => d.properties.mag))
  //     .range([3, 0.5]);

  //   $: starPath = geoPath(projection).pointRadius((d) =>
  //     magnitudeScale(d.properties.mag)
  //   );

  // $: starPath = geoPath().projection(projection).pointRadius((d) =>
  //     magnitudeScale(d.properties.mag)

  // Note, we could do this with plotting stars as a single path, but then the
  // pointRadius function gets the whole feature collection rather than each individual feature.
  //   svg
  //     .selectAll("path")
  //     .data(stars.features)
  //     .enter()
  //     .append("path")
  //     .attr("d", starPath)
  //     .attr("fill", "#ddd");
</script>

<h3>This is the map</h3>

<div class="chart-wrapper" bind:clientWidth={width}>
  <svg class="chart" {width} {height} role="figure">
    <!-- <g>
      {#each stars.features as star}
        <path fill="none" stroke="silver" d={starPath(star)} />
      {/each}
    </g> -->

    <!-- <g>
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
    </g> -->
  </svg>
</div>

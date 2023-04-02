<script>
	// h/t https://observablehq.com/@pcarleton/visualizing-the-night-sky-working-with-d3-celestial
  import { geoEqualEarth, geoEquirectangular, geoPath, geoCircle } from "d3-geo";
	import { json } from "d3-fetch";
	//import { extent } from "d3-array";
	import { scaleLinear } from "d3-scale";
	import Tooltip from './Tooltip.svelte';
	//import names from './names.json';
	
	let width = 1200;
	let height = 600;
	let padding = 10;

	// fetch star data
	let data;
	
	json(
		// load the star-data from github
    "https://raw.githubusercontent.com/seblammers/starmap/master/src/data/stars.6.meta.json"
  ).then((d) => {
		
		
		/*console.log("outside")
		let joined = [];
		for (let i = 0; i < d.features.length; i++) {
			
			let id = d.features[i].id;
			let match = names[id];
			
			d.features[i].meta = match;
			joined[i] = d.features[i].id;
			
			if (id === 9598) {
				console.log("this d", d.features[i]);
				console.log(match);
				
				//d.features[i].meta = match;
				//console.log("after d", d.features[i]);
			}
		}
		
		j = joined;
		console.log({j}) */
		data = d //.features.filter(x => x.properties.mag > 3);
  });
	$: projection = geoEquirectangular().fitExtent([[10, 10], [width-padding,height-padding]], data);
  $: path = geoPath(projection).pointRadius(d => magnitudeScale(d.properties.mag));
	$: magnitudeScale = scaleLinear()
    .domain([-1.44, 6])
    .range([3, 0.5]);
	
	let hoveredData;
	
</script>

<svg {width} {height} on:mouseleave={() => hoveredData = undefined}>
	{#if data}
		<g id="stars">
			{#each data.features as s}
				<circle 
								cx={projection(s.geometry.coordinates)[0]} 
								cy={projection(s.geometry.coordinates)[1]} 
								r={hoveredData == s ? 5 : magnitudeScale(s.properties.mag)} 
								fill="white"
								on:mouseover={() => hoveredData = s}
								on:focus={() => hoveredData = s}/>
			{/each}
			<!--{#each data.features as star}
				<path 
							d={path(star)} 
							fill={hoveredData == star ? "#fcfcfc" : "#d6d6d6"}
							on:mouseover={() => hoveredData = star}
							on:focus={() => hoveredData = star}
				/>
			{/each}-->
		</g>
	{/if}
</svg>

{#if hoveredData}
	<Tooltip data={hoveredData} {width} {projection} />
{/if}
	
<style>
	svg {
    background-color: #03041b;
		stroke: none;
  }
	
</style>

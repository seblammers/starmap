<script>
	import { fly } from "svelte/transition";
  export let data;
  export let width;
	export let projection;

	// get screen coordinates from hovered
	// star-data via projection
  $: [x,y] = projection(data.geometry.coordinates);

  let tooltipWidth;

  const xNudge = 15;
  const yNudge = 30;

  $: xPosition =
    x + tooltipWidth > width ? x - tooltipWidth - xNudge : x + xNudge;
  $: yPosition = y + yNudge;
	
	let id2name = (id) => {
		// get "proper name" where available
		// else return "HIP ID"
  	if (id.length === 0) return undefined;
  
  	const match = names[id];
		
		if (match && match.name !== "") {
			return match.name;
		}
		return `HIP ${id}`;	
	};
</script>

<div
  class="tooltip"
  transition:fly={{ y: 10 }}
  style="position: absolute; top: {yPosition}px; left: {xPosition}px"
  bind:clientWidth={tooltipWidth}
>
	{#if data.meta}
		{#if data.meta.name}
			<em>{data.meta.name}</em>
		{/if}
	{/if}
  <h1>Star ID: {data.id}</h1>
</div>

<style>
  .tooltip {
    padding: 6px;
    background: #fcfcfc;
		color: #0a0a0a;
    border-radius: 3px;
    pointer-events: none;
    transition: top 300ms ease, left 300ms ease;
  }

  h1 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: none;
    width: 100%;
  }
</style>

<script>
  import { fly } from "svelte/transition";
  import { format } from "d3-format";
  export let data;
  export let width;
  export let projection;

  let formatter = format(".2s");
  // get screen coordinates from hovered
  // star-data via projection
  $: [x, y] = projection(data.geometry.coordinates);

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
  <strong>Distance:</strong>
  <em>{formatter(data.wiki.light_years)} light years</em><br />

  {#if data.wiki.year > 1900}
    <strong>Date:</strong> <em>{data.wiki.closest_match}</em><br />
  {:else}
    <strong>Year:</strong> <em>{data.wiki.year}</em><br /><br />
  {/if}

  <strong>Event:</strong> <em>{data.wiki.events}</em>
</div>

<style>
  .tooltip {
    padding: 8px;
    background: #fcfcfc;
    color: #0a0a0a;
    border-radius: 3px;
    pointer-events: none;
    transition: top 300ms ease, left 300ms ease;
    max-width: 30ch;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: none;
    width: 100%;
  }
</style>

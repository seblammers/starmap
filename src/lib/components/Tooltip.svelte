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

  let mobile;

  $: if (width < 900) {
    mobile = true;
  } else {
    mobile = false;
  }
</script>

<div
  class="tooltip flow"
  class:mobile
  transition:fly={{ y: 10 }}
  style="position: absolute; top: {yPosition}px; left: {xPosition}px"
  bind:clientWidth={tooltipWidth}
>
  <strong>Star ID:</strong>
  {data.id}
  <br />
  {#if data.meta}
    {#if data.meta.name != ""}
      <strong>Star Name:</strong>
      {data.meta.name}<br />
    {/if}
  {/if}
  <strong>Distance:</strong>
  {formatter(data.wiki.light_years)} light years<br />

  {#if data.wiki.year > 1900}
    <strong>Date:</strong> {data.wiki.closest_match}<br /><br />
  {:else}
    <strong>Year:</strong> {data.wiki.year}<br /><br />
  {/if}

  <strong>Event(s):</strong>
  <ul>{@html data.wiki.events}</ul>
</div>

<style>
  .mobile {
    position: relative !important;
    top: 0px !important;
    left: 0px !important;
    max-width: inherit !important;
  }

  .tooltip {
    --flow-space: var(--space-2xs);
    padding: var(--space-xs);
    font-size: var(--step-0);
    background: #fcfcfc;
    color: #0a0a0a;
    border-radius: var(--radius);
    border: 2px solid var(--dark);
    pointer-events: none;
    transition: top 300ms ease, left 300ms ease;
    max-width: 30ch;
    font-family: var(--primaryFont);
  }

  ul {
    padding: var(--space-xs) var(--space-s);
    margin-top: var(--space-3xs);
  }
</style>

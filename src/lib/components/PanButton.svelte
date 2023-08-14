<script>
  export let direction; // up, down, left, right
  export let fun = console.log("yay"); // function to handle panning
  export let width;
  export let height;

  const xNudge = 15;
  const yNudge = 40;
  let xPosition, yPosition;

  $: {
    if (direction == "right") {
      xPosition = width - xNudge;
      yPosition = height / 2 - yNudge;
    } else if (direction == "left") {
      xPosition = 0 - xNudge;
      yPosition = height / 2 - yNudge;
    } else if (direction == "up") {
      xPosition = width / 2 - xNudge;
      yPosition = 0 - yNudge;
    } else if (direction == "down") {
      xPosition = width / 2 - xNudge;
      yPosition = height - yNudge;
    }
  }
</script>

{#if direction == "right"}
  <button title={"Pan right"} id="pan-right" on:click={fun}> &#8594; </button>
{:else if direction == "left"}
  <button title={"Pan left"} id="pan-left" on:click={fun}> &#8592; </button>
{:else if direction == "up"}
  <button class="pad" title={"Pan up"} id="pan-up" on:click={fun}>
    &#8593;
  </button>
{:else if direction == "down"}
  <!-- style="position: absolute; top: {yPosition}px; left: {xPosition}px" -->
  <button class="pad" title={"Pan down"} id="pan-down" on:click={fun}>
    &#8595;
  </button>
{/if}

<style>
  button {
    background: var(--light-transparent);
    color: var(--light);
    min-height: var(--space-2xs);
    min-width: var(--space-2xs);
    padding: var(--space-2xs);
    padding: var(--space-2xs) var(--space-s);
    font-family: var(--primaryFont);
  }
  .pad {
    padding: var(--space-2xs) var(--space-s);
  }
</style>

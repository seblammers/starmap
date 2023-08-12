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
  <button
    style="position: absolute; top: {yPosition}px; left: {xPosition}px"
    title={"Pan right"}
    id="pan-right"
    on:click={fun}
  >
    &#8594;
  </button>
{:else if direction == "left"}
  <button
    style="position: absolute; top: {yPosition}px; left: {xPosition}px"
    title={"Pan left"}
    id="pan-left"
    on:click={fun}
  >
    &#8592;
  </button>
{:else if direction == "up"}
  <button
    style="position: absolute; top: {yPosition}px; left: {xPosition}px"
    class="pad"
    title={"Pan up"}
    id="pan-up"
    on:click={fun}
  >
    &#8593;
  </button>
{:else if direction == "down"}
  <button
    style="position: absolute; top: {yPosition}px; left: {xPosition}px"
    class="pad"
    title={"Pan down"}
    id="pan-down"
    on:click={fun}
  >
    &#8595;
  </button>
{/if}

<style>
  button {
    padding: var(--space-2xs);
    font-family: var(--primaryFont);
  }
  .pad {
    padding: var(--space-2xs) var(--space-s);
  }
</style>

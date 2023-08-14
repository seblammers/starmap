<script>
  export let xPos;
  export let yPos;

  const xNudge = 15;
  const yNudge = 40;
  let xPosition, yPosition;
</script>

<div class="parent">
  <button title={"Pan right"} id="pan-right" on:click={() => ($xPos -= 150)}
    >&#x25B6;</button
  >

  <button title={"Pan left"} id="pan-left" on:click={() => ($xPos += 150)}
    >&#x25C0;</button
  >

  <button
    title={"Pan up"}
    id="pan-up"
    class="rotate"
    on:click={() => ($yPos += 150)}>&#x25B2;</button
  >

  <button
    title={"Pan down"}
    id="pan-down"
    class="rotate"
    on:click={() => ($yPos -= 150)}>&#x25BC;</button
  >
</div>

<style>
  /* .rotate {
    transform: rotate(-90deg);
  } */
  /* button {
    background: var(--light-transparent);
    color: var(--light);
    min-height: var(--space-2xs);
    min-width: var(--space-2xs);
    padding: var(--space-2xs);
    padding: var(--space-2xs) var(--space-s);
    font-family: var(--primaryFont);
  } */
  button {
    text-align: center;
    margin: var(--space-2xs);
    padding: var(--space-2xs);
  }
  .parent {
    display: grid;
    grid-template-columns: repeat(3, var(--space-l));
    grid-template-rows: repeat(2, var(--space-l));
    grid-column-gap: var(--space-2xs);
    grid-row-gap: var(--space-2xs);
    max-width: 50vw;
  }

  #pan-up {
    grid-area: 1 / 2 / 2 / 3;
    align-self: center;
    justify-self: center;
  }
  #pan-left {
    grid-area: 2 / 1 / 3 / 2;
    align-self: center;
    justify-self: center;
  }
  #pan-right {
    grid-area: 2 / 3 / 3 / 4;
    align-self: center;
    justify-self: center;
  }
  #pan-down {
    grid-area: 3 / 2 / 4 / 3;
    align-self: center;
    justify-self: center;
  }
  #pan-down {
    grid-area: 2 / 2 / 3 / 3;
    align-self: center;
    justify-self: center;
  }
</style>

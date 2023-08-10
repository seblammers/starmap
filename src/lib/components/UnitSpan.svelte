<script>
  import { format } from "d3-format";
  export let value;
  export let isKm;
  export let handleClick;
  export let formatString = ".3s";
  let formatter = format(formatString);

  // toggle between unit-labels
  $: label = isKm ? "km" : "mi";

  // toggle between km and miles
  $: shownValue = isKm ? value : value / 1.609334;

  // extra bits for the labels
  const title = "Click to toggle km / mi";
  const options = ["km", "mi"];
  const uniqueID = Math.floor(Math.random() * 100);
</script>

<div
  role="radiogroup"
  class="group-container"
  aria-labelledby={`label-${uniqueID}`}
  id={`group-${uniqueID}`}
>
  <div class="legend" id={`label-${uniqueID}`}>{title}</div>
  <div>
    {#each options as option}
      <input
        type="radio"
        id={`${option}-${uniqueID}`}
        value={option}
        bind:group={isKm}
      />
      <label for={`${option}-${uniqueID}`}>
        {option}
      </label>
    {/each}
  </div>
</div>
<span
  role="button"
  tabindex="0"
  class="clickable"
  {title}
  on:click={handleClick}
  on:keypress={handleClick}
>
  {formatter(shownValue)}
  {label}
</span>

<style>
  .clickable {
    text-decoration: underline;
  }
  .clickable:hover {
    cursor: pointer;
  }
  input {
    opacity: 0;
    position: absolute;
  }
  .group-container {
    opacity: 0;
    display: inline;
    position: absolute;
    z-index: -2;
  }
</style>

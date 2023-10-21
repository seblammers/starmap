<script>
  // these are the props that need to be declared for the unit span:
  // the numerical value
  export let value;
  // the variable that keeps track of the current user-choice
  export let isKm;
  // the function that handles the toggling
  export let handleClick;
  // formatting has a default value, but can be specified individually
  export let formatString = ".3s";

  // we import a helper from d3 to handle number formatting
  import { format } from "d3-format";
  let formatter = format(formatString);

  // the magic happens here:
  // toggle between unit-labels
  $: label = isKm ? "km" : "mi";

  // and here:
  // toggle between km and miles
  $: shownValue = isKm ? value : value / 1.609334;

  // title (shown on hover)
  const title = "Tap to toggle km / mi";
</script>

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
    text-decoration: underline dotted var(--accent) 1px;
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

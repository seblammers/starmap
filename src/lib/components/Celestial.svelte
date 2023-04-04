<script>
  /* see this stackoverflow
        https://stackoverflow.com/questions/59629947/how-do-i-load-an-external-js-library-in-svelte-sapper

        If importing fails, you can always do it the old-fashioned way, adding the <script src="..."> tag to your main template.html, and continuing to use ace as a global. <script src="..."> tags inside Svelte components will load asynchronously — in other words, your component's code will generally run before the external script has loaded.
    */

  // import celestial from "d3-celestial";
  // import { celestialConfig } from "./CelestialConfig.js";
  // import "$lib/styles/celestial.css";
  // import { onMount } from "svelte";
  // import { browser } from "$app/env";
  // import * as d3 from "d3";

  // let th = d3.scaleBand();
  // let Celestial;

  // if (browser) {
  //   onMount(() => {
  //     // we need to use onMount because the div hasn't
  //     // been created by the time the init code runs
  //     Celestial = celestial.Celestial();
  //     console.log(Celestial);
  //     Celestial.display(celestialConfig);

  //     return () => {
  //       // any cleanup code goes here
  //     };
  //   });
  // }
</script>

<!-- <svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="https://cdn.jsdelivr.net/npm/d3-geo-projection@4"></script>
  <script src="./node_modules/d3-celestial/celestial.min.js"></script> 
</svelte:head> -->

<div style="overflow:hidden;">
  <div id="celestial-map" />
</div>

<div id="celestial-form" />

<script>
  // import Starmap from "$lib/components/Starmap.svelte";
  // import Celestial from "../lib/components/Celestial.svelte";
  // import FromObservable from "../lib/components/FromObservable.svelte";
  // import Mike from "../lib/components/Mike.svelte";
  export let data;

  $: sdata = data.data;
  console.log("I loaded stuff, ", sdata);

  $: console.log("I need time", sdata);
</script>

<h1>Let's start fresh!</h1>

<pre>{JSON.stringify(data.data.features, null, "\t")}</pre>

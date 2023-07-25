<script>
  import Starmap from "$lib/components/Starmap.svelte";

  export let data;

  $: stardata = data.data;
</script>

<h1>Let's start fresh!</h1>

<p>Listen, this is a large thing, but it's going to be ok.</p>

<Starmap data={stardata} />

<p>Heeeeeeey, it worked kinda like you thought! Nice!</p>

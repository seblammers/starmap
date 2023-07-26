<script>
  import Starmap from "$lib/components/Starmap.svelte";

  export let data;

  $: stardata = data.data;
</script>

<h1>Stories from the Stars</h1>

<p>What happened when the light started travelling towards you?</p>

<Starmap data={stardata} />

<p>Turns out, a lot.</p>

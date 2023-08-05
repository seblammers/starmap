<script>
  import Heading from "$lib/components/Heading.svelte";
  import Intro from "$lib/components/Intro.svelte";
  import Starmap from "$lib/components/Starmap.svelte";
  import Methods from "$lib/components/Methods.svelte";

  export let data;

  $: stardata = data.data;
</script>

<Heading />

<Intro />

<Starmap data={stardata} />

<Methods />

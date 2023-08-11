<script>
  import Meta from "$lib/components/Meta.svelte";
  import Heading from "$lib/components/Heading.svelte";
  import Intro from "$lib/components/Intro.svelte";
  import Starmap from "$lib/components/Starmap.svelte";
  import Methods from "$lib/components/Methods.svelte";
  import Notes from "$lib/components/Notes.svelte";

  export let data;

  $: stardata = data.data;
</script>

<Meta />

<Heading />

<Intro />

<Starmap data={stardata} />

<Methods />

<Notes />

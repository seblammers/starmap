<script>
  import Meta from "$lib/components/Meta.svelte";
  import Heading from "$lib/components/Heading.svelte";
  import Intro from "$lib/components/Intro.svelte";
  import StarmapCanvas from "$lib/components/StarmapCanvas.svelte";
  import WrapUp from "$lib/components/WrapUp.svelte";
  import Notes from "$lib/components/Notes.svelte";
  import Methods from "$lib/components/Methods.svelte";

  export let data;

  $: stardata = data.data;
</script>

<Meta />

<Heading />

<Intro />

<StarmapCanvas data={stardata} />

<WrapUp />

<Notes />

<Methods />

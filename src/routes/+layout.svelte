<script>
  import "$lib/styles/global.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="layout">
  <main class="flow">
    <slot />
  </main>
</div>

<Footer />

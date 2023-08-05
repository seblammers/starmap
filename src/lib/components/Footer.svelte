<script>
  let width;
  $: mobile = width < 900;
</script>

<svelte:window bind:innerWidth={width} />

<footer class:mobile>
  <p>
    &copy; {new Date().getFullYear()} Design & Development
  </p>
  <p class="no-top">
    <a
      href="https://www.sebastianlammers.com/"
      target="_blank"
      rel="noopener noreferrer">Sebastian Lammers</a
    >
  </p>
  <p
    class="scroll-to-top"
    on:click={() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }}
  >
    Scroll to top &uarr;
  </p>
</footer>

<style>
  .no-top {
    margin-top: 0;
  }
  footer {
    font-weight: 300;
    background: var(--accent);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-m) var(--space-m);
    width: 100%;
  }

  a:hover,
  .scroll-to-top:hover {
    color: var(--dark);
  }

  footer > * {
    flex: 0 1 auto;
  }
  .scroll-to-top {
    cursor: pointer;
  }
  .mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .mobile > * {
    margin: var(--space-xs);
  }
  .mobile > .no-top {
    margin-top: 0;
  }
</style>

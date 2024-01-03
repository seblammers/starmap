<footer>
  <p>
    &copy; 2023-{new Date().getFullYear()} Design & Development
  </p>
  <p class="no-top">
    <a rel="me" href="https://vis.social/@seblammers" />
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
  <p>[*]</p>
</footer>

<style>
  .no-top {
    margin-top: 0;
  }
  footer {
    font-weight: 300;
    font-size: var(--step-0);
    background: var(--light);
    color: var(--dark);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: var(--space-m) var(--space-m);
    width: 100%;
  }

  a:hover,
  .scroll-to-top:hover {
    color: var(--accent);
  }

  footer > * {
    flex: 0 1 auto;
    margin: var(--space-s);
  }
  .scroll-to-top {
    cursor: pointer;
    margin: var(--space-m);
  }
</style>

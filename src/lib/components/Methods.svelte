<h2 id="methods">Methods</h2>

<p>Data were collected and merged from 3 sources:</p>
<ol>
  <li>
    <a href="https://github.com/ofrohn/d3-celestial" target="_blank"
      >d3-celestial</a
    > <span class="grey">for coordinates.</span>
  </li>
  <li>
    <a href="https://github.com/astronexus/HYG-Database" target="_blank"
      >HYG Database</a
    > <span class="grey">for distances.</span>
  </li>
  <li>
    <a
      href="https://en.wikipedia.org/wiki/Timelines_of_world_history"
      target="_blank">Wikipedia</a
    > <span class="grey">for historic events.</span>
  </li>
</ol>

<br />

<p>
  This site is powered by
  <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>. The map is
  built with
  <a href="https://svelte.dev/" target="_blank">Svelte</a>
  & <a href="https://d3js.org/" target="_blank">d3</a>.
</p>

<p>
  The fonts used throughout are
  <a href="https://andada.huertatipografica.com/" target="_blank"
    ><em>Andada Pro</em></a
  >
  &
  <a href="https://en.wikipedia.org/wiki/Roboto" target="_blank"
    ><span class="roboto">Roboto</span></a
  >.
</p>
<p>
  For more details, feel free to check out the code for <a
    href="https://github.com/seblammers/starmap"
    target="_blank">this project on Github</a
  >.
</p>

<style>
  .grey {
    color: var(--grey);
  }
  .roboto {
    font-family: var(--primaryFont);
    font-weight: 700;
  }
</style>

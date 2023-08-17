<script>
  let dataSun = [
    {
      name: "Earth",
      size: 6371,
      distance: 0,
    },
    {
      name: "Sun",
      size: 695508,
      distance: 0.0000158127,
    },
  ];

  let dataSirius = [
    {
      name: "Earth",
      size: 6371,
      distance: 0,
    },
    {
      name: "Sirius",
      size: 1.711 * 695508,
      distance: 8.6,
    },
  ];

  import DotPlot from "./DotPlot.svelte";
  import UnitSpan from "./UnitSpan.svelte";
  const distanceLightYear = 9460000000000;

  // keep track of which unit is used
  let isKm = true;

  function handleClick() {
    isKm = !isKm;
  }
</script>

<div class="spacer" />

<p>
  It takes the light just 8 min 19 s to go from the Sun to your eyes! So it
  makes sense that we measure the vast distances of stars and other celestial
  bodies in light years.
</p>
<p>
  What do you think, how many kms can light travel in one year? How much is "a
  light year"? Let me tell you: <UnitSpan
    value={distanceLightYear}
    {handleClick}
    {isKm}
    formatString=".3s"
  />. Yes, that's right, the "T" stands for trillions: <UnitSpan
    value={distanceLightYear}
    {handleClick}
    {isKm}
    formatString=",.3r"
  />.
</p>

<p>
  I think it is amazing to think about: The light from the stars traveled for
  years and years until it reaches us. That means, for many stars the light you
  see now started traveling towards you when you were not even born!
</p>

<p>
  So this project is about a simple idea: What if each star could tell you what
  was happening on Earth when its light started racing towards your eye balls.
</p>

<p>
  Below, you'll find a map of the night sky that you can interact with. You can
  hover each star<sup><a id="n1" href="#notes">1</a></sup> to see how far away
  it is and what happened on Earth during the time when the light started
  traveling towards you. For more precise star selection, use the controls below
  the map to zoom in and move around. It's easy to get lost in there, so if you
  want to go back to the initial overview just hit the "Reset" button. All
  events were taken from Wikipedia timelines and matched<sup
    ><a id="n2" href="#notes">2</a></sup
  >
  to the respective amount of light years.
</p>
<p>
  The brighter stars are represented by larger circles. Those are the ones that
  are best visible to the naked eye. That's also why they have proper names like <em
    >Polaris</em
  >, <em>Vega</em>, or <em>Sirius</em>.
</p>

<p>Which star tells the most interesting story to you?</p>

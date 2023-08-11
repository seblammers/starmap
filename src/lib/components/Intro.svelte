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
  const distanceSun = 149600000;
  const distanceWorld = 28081;

  // keep track of which unit is used
  let isKm = true;

  function handleClick() {
    isKm = !isKm;
  }
</script>

<div class="spacer" />

<p>
  We have been gazing at the stars since the dawn of humankind. They helped us
  navigate the oceans, understand the cyclic nature of the seasons and inspired
  a myriad of stories.
</p>

<h2>
  This project is not about all <em>that</em>
</h2>

<p>
  It's not a story <em>about</em> the stars. Rather, it's trying to convey some
  of the stories <em>from</em> the stars. What could those be, you ask...?
</p>

<p>
  The stars our ancestors were looking at, we are looking at, and future
  generations will be looking at, they seem to be so reliable. They just keep on
  sending their light towards us, so we can marvel at them.
</p>

<p>
  But the crazy distances that the light needs to travel in order to reach our
  eyes...? That is <em>astonishing</em>. To grapple these numbers, let's start
  with the star that is closest to us: the Sun.
</p>

<p>
  You might think the Sun is quite far away, right? True, it's <UnitSpan
    value={distanceSun}
    {handleClick}
    {isKm}
    formatString=",.3r"
  />
  away. For perspective: if you travel around the world, starting from Paris, to
  New York and then proceed to fly across the US all the way to Hong Kong and then
  onwards back to Paris, you traveled merely <UnitSpan
    value={distanceWorld}
    {handleClick}
    {isKm}
    formatString=",.3r"
  />. Which means it would take more than 5,000 of those trips to go to the Sun.
  Turns out planes are not so fast after all.
</p>
<p>
  But you know what is super fast? Light. Yes. It takes the light just 8 min 19
  s to go from the Sun to our eyes! So it makes sense that we measure the vast
  distances of stars and other celestial bodies in light years.
</p>

<p>
  What do you think, how many kms can light travel in one year? How much is "a
  light year"? <UnitSpan
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

<p>I know, these numbers are hard to grasp.</p>

<p>
  Let's make that more clear: Here is how long the light needs to travel from
  the Sun to you <em>if one light year would take one second</em> (surprise, it's
  super fast):
</p>

<DotPlot data={dataSun} />

<p>
  Compare that to one of the brightest Stars <em>Sirius</em>, which is 8.6 light
  years away:
</p>

<DotPlot data={dataSirius} />

<p>
  I think it is amazing to think about: the light from the stars traveled for
  years and years until it reaches us. That means, for many stars the light you
  see now started traveling towards you when you were not even born!
</p>

<p>
  So this project is about a simple idea: What if each star could tell you what
  was happening on Earth when its light started racing towards your eye balls.
</p>

<h2>
  <em>That</em> is what this project is about
</h2>

<p>
  Below, you'll find a map of the night sky that you can interact with. You can
  hover each star to see how far away it is and what happened on Earth during
  the time when the light started traveling towards you. Try to zoom in to be
  able to better select which star you learn about. It's easy to get lost in
  there, so if you want to go back to the initial overview just hit the "Reset"
  button. All events were taken from Wikipedia timelines and matched<sup
    ><a id="n1" href="#notes">1</a></sup
  >
  to the respective amount of light years.
</p>

<p>Which star tells the most interesting story to you?</p>

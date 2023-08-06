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
</script>

<div class="spacer" />

<p>
  Hi Philip, ich hab jetzt mal hier wild reingeschrieben. Werde das
  wahrscheinlich noch ausdünnen oder abändern. :)
</p>
<p>So, the Sun is quite far away, right?</p>
<p>It's actually 149,600,000 km.</p>
<p>
  For perspective: if you travel from Paris to New York and then proceed to fly
  across the US all the way to Hong Kong and then onwards back to Paris, you
  traveled merely 28,081 km. Which means it would take more than 5,000 of those
  trips to go to the sun.
</p>
<p>
  Turns out planes are not so fast after all. But you know what is super fast?
  Light. Yes.
</p>
<p>It takes the light just 8 min 19 s to go from the Sun to your eyes!</p>

<p>
  So it makes sense that we measure the vast distances of stars and other
  celestial bodies in light years.
</p>

<p>
  What do you think how many kms can light travel in one year? How much is a
  light year?
</p>

<p>9.46 trillion kilometers. Yes, that's right: 9,460,000,000,000 km.</p>

<p>I know, these numbers are hard to grasp.</p>

<p>
  Let's make that more clear: Here is how long the light needs to travel from
  the sun to earth if one light year would take one second:
</p>

<p>
  Compare that to one of the brightest Stars <em>Sirius</em>, which 8.6 light
  years away:
</p>

<p>
  I think it is amazing to think about: the light from the stars traveled for
  years and years until it reaches us.
</p>

<p>
  But what fascinates me even more is to think about the time on earth that
  connects me, seeing the stars with the people on Earth that existed when the
  star light started traveling towards me.
</p>

<p>
  In case of <em>Sirius</em>, that's just 8.6 years ago, so roughly the
  beginning of the year 2015.
</p>

<p>
  That's the time of the <em>Charlie Hebdo</em> shooting. It's also the time of
  the premiere of <em>John Wick</em> in cinemas in Germany, as one email of a friend
  reminds me. (I live in Germany.)
</p>

<p>
  Below, you'll find a map of the night sky that you can interact with. You can
  hover each star to see how far away it is and what happened on Earth during
  the time when the light started traveling towards you. Try to zoom in to be
  able to better select which star you learn about. It's easy to get lost in
  there, so if you want to go back to the initial overview just hit the "Reset"
  button.
</p>

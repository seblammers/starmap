<script>
  import UnitSpan from "./UnitSpan.svelte";
  const distanceSun = 149600000;
  const distanceWorld = 28081;

  // keep track of which unit is used
  let isKm = true;

  function handleClick() {
    isKm = !isKm;
  }
</script>

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
  New York, then proceed to fly across the US, then all the way to Hong Kong and
  <em>then</em> onwards back to Paris, you traveled merely <UnitSpan
    value={distanceWorld}
    {handleClick}
    {isKm}
    formatString=",.3r"
  />. If you were to do that as with as few stops as possible, it would still
  take you at least 36 hours. And it would take more than 5,000 of those trips
  to go to the Sun. Turns out planes are not so fast after all.
</p>
<p>
  But you know what is super fast? Light. Yes. It takes the light just 8 min 19
  s to go from the Sun to our eyes! So it makes sense that we measure the vast
  distances of stars and other celestial bodies in light years.
</p>

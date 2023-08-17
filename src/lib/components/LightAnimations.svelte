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

<p>I know, these numbers are hard to grasp.</p>

<p>
  Let's make that more clear: Here is how long the light would need to travel
  from the Sun to you <em>if one light year would take one second</em> (surprise,
  it's super fast):
</p>

<DotPlot data={dataSun} />

<p>
  Compare that to one of the brightest Stars <em>Sirius</em>, which is 8.6 light
  years away:
</p>

<DotPlot data={dataSirius} />

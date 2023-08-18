# [Stories from the night sky](https://storiesfromthenightsky.netlify.app/)

## Idea
The light from the stars travels for years (and years) until it reaches your eyes.
This interactive map of the night sky shows you for each star what happened on Earth when the light started traveling from the star to you. 
That way, any star has a  story to tell you. You can zoom in, move around and hover all the stars to reveal the historical events they are connected to. 

## Methods
Data were collected and merged from 3 sources:

1. [d3-celestial](https://github.com/ofrohn/d3-celestial) (for coordinates)
2. [HYG Database](https://github.com/astronexus/HYG-Database) (for distances)
3. [Wikipedia](https://en.wikipedia.org/wiki/Timelines_of_world_history) (for historic events)

The site is powered by [SvelteKit](https://kit.svelte.dev/). The map is built with [Svelte](https://svelte.dev/) & [d3](https://d3js.org/).

The fonts used throughout are [Andada Pro](https://andada.huertatipografica.com/) & [Roboto](https://en.wikipedia.org/wiki/Roboto).
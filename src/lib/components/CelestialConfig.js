export const celestialConfig = {
    location: true,
    interactive: true,
    controls: false,
    projection: "equirectangular",
    transform: "equatorial",
    datapath: "@d3-celestial/data/",
    stars: {
      show: true,    // Show stars
      limit: 6,      // Show only stars brighter than limit magnitude
      colors: true,  // Show stars in spectral colors, if not use "color"
      style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
      names: false,  // Show star names (Bayer, Flamsteed, Variable star, Gliese, whichever applies first)
      proper: false, // Show proper name (if present)
      desig: false,  // Show all names, including Draper and Hipparcos
      namelimit: 2.5,  // Show only names for stars brighter than namelimit
      namestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", align: "left", baseline: "top" },
      size: 4,       // Maximum size (radius) of star circle in pixels
      data: 'stars.6.json' // Data source for stellar data
      //data: 'stars.8.json' // Alternative deeper data source for stellar data
    },
    dsos: {
      show: false,   // Show Deep Space Objects
      limit: 6,      // Show only DSOs brighter than limit magnitude
      names: true,   // Show DSO names
      desig: true,   // Show short DSO names
      namelimit: 4,  // Show only names for DSOs brighter than namelimit
      namestyle: { fill: "#cccccc", font: "11px Helvetica, Arial, serif", align: "left", baseline: "top" },
      data: 'dsos.bright.json',  // Data source for DSOs
      //data: 'dsos.6.json'  // Alternative broader data source for DSOs
      //data: 'dsos.14.json' // Alternative deeper data source for DSOs
      symbols: {  //DSO symbol styles
        gg: {shape: "circle", fill: "#ff0000"},                                 // Galaxy cluster
        g:  {shape: "ellipse", fill: "#ff0000"},                                // Generic galaxy
        s:  {shape: "ellipse", fill: "#ff0000"},                                // Spiral galaxy
        s0: {shape: "ellipse", fill: "#ff0000"},                                // Lenticular galaxy
        sd: {shape: "ellipse", fill: "#ff0000"},                                // Dwarf galaxy
        e:  {shape: "ellipse", fill: "#ff0000"},                                // Elliptical galaxy
        i:  {shape: "ellipse", fill: "#ff0000"},                                // Irregular galaxy
        oc: {shape: "circle", fill: "#ffcc00", stroke: "#ffcc00", width: 1.5},  // Open cluster
        gc: {shape: "circle", fill: "#ff9900"},                                 // Globular cluster
        en: {shape: "square", fill: "#ff00cc"},                                 // Emission nebula
        bn: {shape: "square", fill: "#ff00cc", stroke: "#ff00cc", width: 2},    // Generic bright nebula
        sfr:{shape: "square", fill: "#cc00ff", stroke: "#cc00ff", width: 2},    // Star forming region
        rn: {shape: "square", fill: "#00ooff"},                                 // Reflection nebula
        pn: {shape: "diamond", fill: "#00cccc"},                                // Planetary nebula
        snr:{shape: "diamond", fill: "#ff00cc"},                                // Supernova remnant
        dn: {shape: "square", fill: "#999999", stroke: "#999999", width: 2},    // Dark nebula grey
        pos:{shape: "marker", fill: "#cccccc", stroke: "#cccccc", width: 1.5}   // Generic marker
      }
    },
    constellations: {
      show: false,   // Show constellations
      names: false,   // Show constellation names
      desig: true,   // Show short constellation names (3 letter designations)
      namestyle: { fill:"#cccc99", font: "12px Helvetica, Arial, sans-serif", align: "center", baseline: "middle" },
      lines: false,   // Show constellation lines
      linestyle: { stroke: "#cccccc", width: 1, opacity: 0.6 },
      bounds: false,  // Show constellation boundaries
      boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
    },
    mw: {
      show: false,    // Show Milky Way as filled polygons
      style: { fill: "#ffffff", opacity: "0.15" }
    },
    lines: {
      graticule: { show: false, stroke: "#cccccc", width: 0.6, opacity: 0.8 },    // Show graticule lines
      equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },   // Show equatorial plane
      ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },     // Show ecliptic plane
      galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },     // Show galactic plane
      supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 } // Show supergalactic plane
    }
  };
  
  
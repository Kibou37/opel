/**
 * OPEL Museum - content data (edit this file to add cars, articles, timeline).
 * Works with file:// - no fetch required.
 */
(function () {
  "use strict";

  function car(cfg) {
    var img = cfg.image || null;
    return {
      id: cfg.id,
      name: cfg.name,
      generation: cfg.generation,
      years: cfg.years,
      yearStart: cfg.yearStart,
      yearEnd: cfg.yearEnd,
      short: cfg.short,
      description: cfg.description || cfg.short,
      history: cfg.history || cfg.description || cfg.short,
      specs: cfg.specs || {},
      engines: (cfg.engines || []).map(function (e, i) {
        return {
          id: cfg.id + "-eng-" + i,
          name: e.name,
          meta: e.meta,
          sound: e.sound || "media/sounds/placeholder.mp3",
        };
      }),
      transmissions: cfg.transmissions || ["5-speed manual", "4-speed automatic"],
      trims: cfg.trims || [],
      facts: cfg.facts || [],
      related: cfg.related || [],
      gallery: img ? [img] : [],
      video: null,
      image: img,
    };
  }

  var cars = [
    car({
      id: "gt",
      name: "GT",
      generation: "A",
      years: "1968-1973",
      yearStart: 1968,
      yearEnd: 1973,
      short: "Opel's classic sports coupe - long bonnet, short deck, pure desire.",
      history:
        "The Opel GT arrived as a confident sporting statement: dramatic proportions, a folding headlamp arrangement, and enough character to become one of the brand's most recognisable silhouettes.",
      specs: { Body: "Coupe", Layout: "Front-engine, RWD", Nickname: "Baby Corvette (informal)" },
      engines: [
        { name: "1.9", meta: "Classic four-cylinder" },
        { name: "1.1", meta: "Early entry engine" },
      ],
      trims: ["GT 1900", "GT 1100"],
      facts: ["Headlamps rotate into the body.", "A lasting icon of late-60s Opel design."],
      related: ["manta-b", "calibra"],
      image: "media/cars/gt/hero.jpg",
    }),
    car({
      id: "kadett-c",
      name: "Kadett",
      generation: "C",
      years: "1973-1979",
      yearStart: 1973,
      yearEnd: 1979,
      short: "The third-generation Kadett that defined Opel's compact identity in the 1970s.",
      history:
        "Introduced in 1973, the Kadett C continued Opel's tradition of accessible motoring across saloon, coupe, and estate bodies.",
      specs: { Body: "Saloon / Coupe / Estate", Layout: "Front-engine, RWD" },
      engines: [
        { name: "1.2 S", meta: "60 PS / Carburettor" },
        { name: "1.9 GT/E", meta: "105 PS / Injection" },
      ],
      trims: ["Base", "City", "Berlinetta", "GT/E", "Aero"],
      facts: ["GT/E brought injection to the Kadett line.", "Coupes remain collector favourites."],
      related: ["kadett-e", "astra-f", "manta-b"],
      image: "media/cars/kadett-c/hero.jpg",
    }),
    car({
      id: "kadett-e",
      name: "Kadett",
      generation: "E",
      years: "1984-1991",
      yearStart: 1984,
      yearEnd: 1991,
      short: "The last Kadett generation before the Astra name took over in many markets.",
      history:
        "Kadett E modernised the compact Opel with cleaner lines, broader variants, and GSi performance that still has a devoted following.",
      specs: { Body: "Hatch / Saloon / Estate / Convertible", Layout: "FWD" },
      engines: [
        { name: "1.6i", meta: "Everyday petrol" },
        { name: "2.0 GSi", meta: "Hot-hatch hero" },
      ],
      trims: ["LS", "GL", "GT", "GSi", "Cabrio"],
      facts: ["Direct predecessor of Astra F in many markets.", "GSi is a 1980s favourite."],
      related: ["kadett-c", "astra-f", "astra-g"],
      image: "media/cars/kadett-e/hero.jpg",
    }),
    car({
      id: "ascona-b",
      name: "Ascona",
      generation: "B",
      years: "1975-1981",
      yearStart: 1975,
      yearEnd: 1981,
      short: "Mid-size Opel of the late classic era - and a rally legend in 400 form.",
      history:
        "Ascona B covered family motoring and, through the Ascona 400, one of Opel's proudest competition chapters.",
      specs: { Body: "Saloon / Estate", Layout: "Front-engine, RWD", Related: "Manta B platform" },
      engines: [
        { name: "1.6 / 1.9 / 2.0", meta: "Core petrol range" },
        { name: "2.4 400", meta: "Homologation special" },
      ],
      trims: ["Base", "SR", "400"],
      facts: ["Sister to Manta B.", "Ascona 400 remains a motorsport icon."],
      related: ["manta-b", "rekord-e", "kadett-c"],
      image: "media/cars/ascona-b/hero.jpg",
    }),
    car({
      id: "rekord-e",
      name: "Rekord",
      generation: "E",
      years: "1977-1986",
      yearStart: 1977,
      yearEnd: 1986,
      short: "Large family Opel before the Omega era - spacious and formal.",
      history:
        "Rekord E carried Opel's upper-mainstream saloon and estate duties through the late 1970s and early 1980s with calm, practical authority.",
      specs: { Body: "Saloon / Estate", Layout: "Front-engine, RWD" },
      engines: [
        { name: "1.8 / 2.0", meta: "Four-cylinder" },
        { name: "2.2 / 2.5", meta: "Larger petrol options" },
      ],
      trims: ["Berlina", "CD"],
      facts: ["Predecessor spirit to Omega.", "Estates were workhorses across Europe."],
      related: ["omega-a", "senator-a", "ascona-b"],
      image: "media/cars/rekord-e/hero.jpg",
    }),
    car({
      id: "monza-a",
      name: "Monza",
      generation: "A",
      years: "1978-1986",
      yearStart: 1978,
      yearEnd: 1986,
      short: "Grand-touring coupe sibling to the Senator - long, elegant, rare today.",
      history:
        "The Monza A gave Opel a proper large coupe: shared Senator roots, distinctive proportions, and a presence that still stops collectors.",
      specs: { Body: "Coupe", Layout: "Front-engine, RWD", Sibling: "Senator A" },
      engines: [
        { name: "2.5 / 2.8 / 3.0", meta: "Inline-six range" },
      ],
      trims: ["Base", "GSE"],
      facts: ["Closely related to Senator A.", "Increasingly scarce on the road."],
      related: ["senator-a", "senator-b", "calibra"],
      image: "media/cars/monza-a/hero.jpg",
    }),
    car({
      id: "manta-b",
      name: "Manta",
      generation: "B",
      years: "1975-1988",
      yearStart: 1975,
      yearEnd: 1988,
      short: "Opel's enduring sports coupe of the late classic era.",
      history:
        "Manta B stayed in production into the late 1980s - from everyday coupes to GT/E and rare motorsport-linked variants.",
      specs: { Body: "Coupe / Hatch coupe", Layout: "Front-engine, RWD" },
      engines: [
        { name: "1.9 / 2.0", meta: "Core range" },
        { name: "GT/E", meta: "Injected performance" },
      ],
      trims: ["Berlinetta", "GT/E", "GT/J", "Exclusive"],
      facts: ["Long-lived coupe lineage.", "Strong club culture."],
      related: ["ascona-b", "kadett-c", "calibra"],
      image: "media/cars/manta-b/hero.jpg",
    }),
    car({
      id: "senator-a",
      name: "Senator",
      generation: "A",
      years: "1978-1986",
      yearStart: 1978,
      yearEnd: 1986,
      short: "Flagship presence before the Omega era.",
      history:
        "Senator A presented Opel in its most formal suit - long bonnet, composed stance, and six-cylinder ambition.",
      specs: { Body: "Saloon", Layout: "Front-engine, RWD", Sibling: "Monza A" },
      engines: [{ name: "2.8 / 3.0", meta: "Inline-six" }],
      trims: ["Base", "CD"],
      facts: ["Related to Monza A.", "Sat above Rekord in the range."],
      related: ["monza-a", "omega-a", "senator-b"],
      image: "media/cars/senator-a/hero.jpg",
    }),
    car({
      id: "senator-b",
      name: "Senator",
      generation: "B",
      years: "1987-1993",
      yearStart: 1987,
      yearEnd: 1993,
      short: "Second-generation flagship - smoother, more aerodynamic, executive.",
      history:
        "Senator B refined Opel's top saloon with contemporary aerodynamics and a quieter luxury brief for the late 1980s.",
      specs: { Body: "Saloon", Layout: "Front-engine, RWD" },
      engines: [
        { name: "2.5 / 3.0", meta: "Six-cylinder options" },
      ],
      trims: ["CD", "24V"],
      facts: ["More aerodynamic than Senator A.", "A rare sight today."],
      related: ["senator-a", "omega-a", "omega-b"],
      image: "media/cars/senator-b/hero.jpg",
    }),
    car({
      id: "corsa-a",
      name: "Corsa",
      generation: "A",
      years: "1982-1993",
      yearStart: 1982,
      yearEnd: 1993,
      short: "Opel's first Corsa - the small car that started a long city-car story.",
      history:
        "Corsa A brought Opel into the modern supermini class with compact dimensions and broad European appeal.",
      specs: { Body: "Hatch / Saloon (some markets)", Layout: "FWD" },
      engines: [
        { name: "1.0 / 1.2 / 1.3", meta: "Core petrol range" },
        { name: "GSi", meta: "Sporty small Opel" },
      ],
      trims: ["Swing", "Lux", "GSi"],
      facts: ["Start of the Corsa nameplate.", "Built for dense European cities."],
      related: ["corsa-b", "corsa-c", "kadett-e"],
      image: "media/cars/corsa-a/hero.jpg",
    }),
    car({
      id: "corsa-b",
      name: "Corsa",
      generation: "B",
      years: "1993-2000",
      yearStart: 1993,
      yearEnd: 2000,
      short: "Rounder, friendlier supermini of the 1990s - a sales giant.",
      history:
        "Corsa B softened the look and expanded the Corsa's popularity across Europe with hatch and saloon variants.",
      specs: { Body: "Hatch / Saloon / Estate (Combo-related)", Layout: "FWD" },
      engines: [
        { name: "1.2 / 1.4", meta: "Everyday petrol" },
        { name: "1.6 GSi / Sport", meta: "Hotter versions" },
      ],
      trims: ["Eco", "Swing", "Sport", "GSi"],
      facts: ["One of Opel's highest-volume models of the decade.", "Very common across Europe."],
      related: ["corsa-a", "corsa-c", "tigra-a"],
      image: "media/cars/corsa-b/hero.jpg",
    }),
    car({
      id: "corsa-c",
      name: "Corsa",
      generation: "C",
      years: "2000-2006",
      yearStart: 2000,
      yearEnd: 2006,
      short: "Third-generation Corsa - safer, sharper, ready for the 2000s.",
      history:
        "Corsa C brought a more structured design and improved safety while keeping Opel's supermini formula intact before the 2007 cut-off of this museum.",
      specs: { Body: "3/5-door hatch", Layout: "FWD" },
      engines: [
        { name: "1.0 / 1.2 / 1.4", meta: "Petrol range" },
        { name: "1.7 DI / DTI", meta: "Diesel options" },
      ],
      trims: ["Comfort", "Cosmo", "Sport", "GSi"],
      facts: ["Last Corsa fully inside the pre-2007 collection window.", "GSi kept a sporty edge."],
      related: ["corsa-b", "astra-g", "meriva-a"],
      image: "media/cars/corsa-c/hero.jpg",
    }),
    car({
      id: "tigra-a",
      name: "Tigra",
      generation: "A",
      years: "1994-2001",
      yearStart: 1994,
      yearEnd: 2001,
      short: "A coupe built on Corsa bones - style-led and instantly 1990s.",
      history:
        "Tigra A turned supermini underpinnings into a fashion coupe: low roof, distinctive glasshouse, and strong period charm.",
      specs: { Body: "Coupe", Layout: "FWD", Platform: "Corsa B related" },
      engines: [
        { name: "1.4 / 1.6", meta: "Petrol range" },
      ],
      trims: ["Base", "Sport"],
      facts: ["Closely related to Corsa B.", "A design icon of mid-90s Opel."],
      related: ["corsa-b", "calibra", "speedster"],
      image: "media/cars/tigra-a/hero.jpg",
    }),
    car({
      id: "vectra-a",
      name: "Vectra",
      generation: "A",
      years: "1988-1995",
      yearStart: 1988,
      yearEnd: 1995,
      short: "The first Vectra - modern mid-size Opel that also underpinned Calibra.",
      history:
        "Vectra A replaced Ascona thinking with a cleaner FWD mid-size package and became the technical base for the Calibra coupe.",
      specs: { Body: "Saloon / Hatch / Estate", Layout: "FWD / optional 4x4" },
      engines: [
        { name: "1.6 / 1.8 / 2.0", meta: "Core petrol" },
        { name: "2.0 Turbo 4x4", meta: "High performance" },
      ],
      trims: ["GL", "GT", "CD", "2000", "Turbo"],
      facts: ["Donor platform for Calibra.", "Wide European footprint."],
      related: ["calibra", "vectra-b", "ascona-b"],
      image: "media/cars/vectra-a/hero.jpg",
    }),
    car({
      id: "vectra-b",
      name: "Vectra",
      generation: "B",
      years: "1995-2002",
      yearStart: 1995,
      yearEnd: 2002,
      short: "Second Vectra - smoother design and a strong fleet favourite.",
      history:
        "Vectra B refined the mid-size formula with softer styling, broader engines, and huge popularity among private and company buyers.",
      specs: { Body: "Saloon / Hatch / Estate", Layout: "FWD" },
      engines: [
        { name: "1.6 / 1.8 / 2.0", meta: "Petrol staples" },
        { name: "2.5 V6", meta: "Smooth six" },
      ],
      trims: ["Base", "Sport", "CD", "GSi"],
      facts: ["Extremely common across Europe.", "Estates were especially practical."],
      related: ["vectra-a", "vectra-c", "omega-b"],
      image: "media/cars/vectra-b/hero.jpg",
    }),
    car({
      id: "vectra-c",
      name: "Vectra",
      generation: "C",
      years: "2002-2008",
      yearStart: 2002,
      yearEnd: 2008,
      short: "Third Vectra - larger, more premium, including Signum lifestyle sibling.",
      history:
        "Vectra C moved upmarket with a bigger body and a more executive stance. Production continues slightly past 2007, but the model firmly belongs in this era.",
      specs: { Body: "Saloon / Hatch / Estate", Layout: "FWD", Related: "Signum" },
      engines: [
        { name: "1.8 / 2.2", meta: "Petrol" },
        { name: "2.0 / 3.0 DTI / CDTI", meta: "Diesel range" },
      ],
      trims: ["Elegance", "Cosmo", "GTS", "OPC"],
      facts: ["Shared DNA with Signum.", "OPC versions sharpened the image."],
      related: ["vectra-b", "signum", "astra-h"],
      image: "media/cars/vectra-c/hero.jpg",
    }),
    car({
      id: "calibra",
      name: "Calibra",
      generation: "A",
      years: "1989-1997",
      yearStart: 1989,
      yearEnd: 1997,
      short: "One of the most aerodynamic production coupes of its era.",
      history:
        "Based on Vectra underpinnings, Calibra combined dramatic proportions with a headline Cd figure and lasting style.",
      specs: { Body: "Coupe", Layout: "FWD / optional 4x4", Cd: "0.26" },
      engines: [
        { name: "2.0 8V / 16V", meta: "115-150 PS" },
        { name: "2.0 Turbo 4x4", meta: "204 PS" },
      ],
      trims: ["8V", "16V", "Turbo 4x4", "V6"],
      facts: ["Cd 0.26 made wind-tunnel headlines.", "Shared DNA with Vectra A."],
      related: ["vectra-a", "manta-b", "tigra-a"],
      image: "media/cars/calibra/hero.jpg",
    }),
    car({
      id: "omega-a",
      name: "Omega",
      generation: "A",
      years: "1986-1994",
      yearStart: 1986,
      yearEnd: 1994,
      short: "Executive refinement with aerodynamic confidence - Car of the Year 1987.",
      history:
        "Omega A arrived as a thoroughly modern large Opel with low drag and serious executive ambition.",
      specs: { Body: "Saloon / Estate", Layout: "RWD", Notable: "COTY 1987" },
      engines: [
        { name: "1.8 / 2.0", meta: "Four-cylinder" },
        { name: "3.0 24V", meta: "204 PS V6" },
      ],
      trims: ["GL", "GLS", "CD", "3000"],
      facts: ["European Car of the Year 1987.", "Estates offered huge capacity."],
      related: ["rekord-e", "omega-b", "senator-b"],
      image: "media/cars/omega-a/hero.jpg",
    }),
    car({
      id: "omega-b",
      name: "Omega",
      generation: "B",
      years: "1994-2003",
      yearStart: 1994,
      yearEnd: 2003,
      short: "Second Omega - larger luxury saloon, including the legendary Lotus Omega spirit's successor era.",
      history:
        "Omega B continued Opel's rear-drive executive line with more space, equipment, and a lasting reputation among enthusiasts.",
      specs: { Body: "Saloon / Estate", Layout: "RWD" },
      engines: [
        { name: "2.0 / 2.5 / 3.0", meta: "Petrol range" },
        { name: "2.5 TD / 2.2 DTI", meta: "Diesel options" },
      ],
      trims: ["Sport", "CD", "MV6", "Executive"],
      facts: ["Last traditional large RWD Opel saloon line of the era.", "Estates are prized by families and fleets."],
      related: ["omega-a", "senator-b", "vectra-b"],
      image: "media/cars/omega-b/hero.jpg",
    }),
    car({
      id: "astra-f",
      name: "Astra",
      generation: "F",
      years: "1991-1998",
      yearStart: 1991,
      yearEnd: 1998,
      short: "The first Astra - successor to the Kadett name in most markets.",
      history:
        "Astra F replaced Kadett E and introduced the Astra badge across much of Europe with a full body range.",
      specs: { Body: "Hatch / Saloon / Estate / Cabrio", Layout: "FWD" },
      engines: [
        { name: "1.6i", meta: "75-100 PS" },
        { name: "2.0 16V", meta: "GSi performance" },
      ],
      trims: ["GL", "CD", "GSi", "Cabrio"],
      facts: ["GSi 16V is a 1990s cult hatch.", "Cabrio versions were popular."],
      related: ["kadett-e", "astra-g", "calibra"],
      image: "media/cars/astra-f/hero.jpg",
    }),
    car({
      id: "astra-g",
      name: "Astra",
      generation: "G",
      years: "1998-2004",
      yearStart: 1998,
      yearEnd: 2004,
      short: "Second Astra - tougher look, strong safety push, OPC beginnings.",
      history:
        "Astra G brought a more solid visual language, improved safety, and early OPC performance variants that sharpened Opel's image.",
      specs: { Body: "Hatch / Saloon / Estate / Coupe / Cabrio", Layout: "FWD" },
      engines: [
        { name: "1.6 / 1.8 / 2.0", meta: "Petrol" },
        { name: "2.0 Turbo OPC", meta: "Performance flagship" },
      ],
      trims: ["Club", "Comfort", "Sport", "OPC"],
      facts: ["Bertone coupe/cabrio variants.", "Important early OPC chapter."],
      related: ["astra-f", "astra-h", "speedster"],
      image: "media/cars/astra-g/hero.jpg",
    }),
    car({
      id: "astra-h",
      name: "Astra",
      generation: "H",
      years: "2004-2009",
      yearStart: 2004,
      yearEnd: 2009,
      short: "Third Astra - contemporary hatch including the dramatic GTC coupe.",
      history:
        "Astra H arrived before this museum's 2007 boundary and defined mid-2000s compact Opel style, especially in three-door GTC form.",
      specs: { Body: "Hatch / Estate / TwinTop", Layout: "FWD" },
      engines: [
        { name: "1.6 / 1.8", meta: "Petrol staples" },
        { name: "2.0 Turbo OPC", meta: "Hot hatch" },
      ],
      trims: ["Enjoy", "Cosmo", "GTC", "OPC"],
      facts: ["GTC silhouette is a highlight.", "TwinTop added a folding hardtop."],
      related: ["astra-g", "vectra-c", "corsa-c"],
      image: "media/cars/astra-h/hero.jpg",
    }),
    car({
      id: "speedster",
      name: "Speedster",
      generation: "A",
      years: "2000-2005",
      yearStart: 2000,
      yearEnd: 2005,
      short: "Mid-engined roadster - Opel's purest driving toy of the early 2000s.",
      history:
        "Developed with Lotus DNA under the skin, the Speedster (VX220 in the UK) was a minimalist mid-engine roadster with razor focus.",
      specs: { Body: "Roadster", Layout: "Mid-engine, RWD", Related: "Lotus Elise platform family" },
      engines: [
        { name: "2.2", meta: "Naturally aspirated" },
        { name: "2.0 Turbo", meta: "High-power version" },
      ],
      trims: ["Base", "Turbo"],
      facts: ["Lotus-related chassis philosophy.", "A highlight of emotional Opel engineering."],
      related: ["tigra-a", "astra-g", "gt"],
      image: "media/cars/speedster/hero.jpg",
    }),
    car({
      id: "zafira-a",
      name: "Zafira",
      generation: "A",
      years: "1999-2005",
      yearStart: 1999,
      yearEnd: 2005,
      short: "Compact MPV with Flex7 seating - clever family packaging.",
      history:
        "Zafira A popularised flexible seven-seat packaging in a compact footprint and became a defining family Opel of the early 2000s.",
      specs: { Body: "Compact MPV", Layout: "FWD", Seating: "Flex7" },
      engines: [
        { name: "1.6 / 1.8 / 2.0", meta: "Petrol" },
        { name: "2.0 DI / DTI", meta: "Diesel" },
      ],
      trims: ["Comfort", "Elegance", "Sport", "OPC"],
      facts: ["Flex7 seating was a key selling point.", "OPC version was an unlikely hot MPV."],
      related: ["astra-g", "meriva-a", "vectra-b"],
      image: "media/cars/zafira-a/hero.jpg",
    }),
    car({
      id: "meriva-a",
      name: "Meriva",
      generation: "A",
      years: "2003-2010",
      yearStart: 2003,
      yearEnd: 2010,
      short: "Small MPV for urban families - tall, practical, approachable.",
      history:
        "Meriva A targeted young families with easy access, compact length, and a friendlier stance than a full-size MPV.",
      specs: { Body: "Mini MPV", Layout: "FWD" },
      engines: [
        { name: "1.4 / 1.6 / 1.8", meta: "Petrol" },
        { name: "1.7 CDTI", meta: "Diesel" },
      ],
      trims: ["Enjoy", "Cosmo", "OPC"],
      facts: ["Launched within the museum window.", "Later generations added Freestyle doors - this first stays simpler."],
      related: ["corsa-c", "zafira-a", "astra-h"],
      image: "media/cars/meriva-a/hero.jpg",
    }),
    car({
      id: "frontera-b",
      name: "Frontera",
      generation: "B",
      years: "1998-2004",
      yearStart: 1998,
      yearEnd: 2004,
      short: "Opel's rugged SUV of the turn of the millennium.",
      history:
        "Frontera B continued Opel's body-on-frame SUV story with short- and long-wheelbase versions aimed at leisure and light off-road use.",
      specs: { Body: "SUV (3/5 door)", Layout: "4x4" },
      engines: [
        { name: "2.2", meta: "Petrol" },
        { name: "2.2 DTI / 3.2 V6", meta: "Range toppers" },
      ],
      trims: ["Sport", "Limited"],
      facts: ["Part of Opel's 1990s-2000s SUV chapter.", "Sport three-door looks the most adventurous."],
      related: ["omega-b", "zafira-a", "vectra-b"],
      image: "media/cars/frontera-b/hero.jpg",
    }),
    car({
      id: "signum",
      name: "Signum",
      generation: "A",
      years: "2003-2008",
      yearStart: 2003,
      yearEnd: 2008,
      short: "Lifestyle hatch on Vectra C bones - unusual, spacious, overlooked.",
      history:
        "Signum stretched Vectra thinking into a more individual four-door hatch with lounge-like rear space and a distinct silhouette.",
      specs: { Body: "Liftback", Layout: "FWD", Platform: "Vectra C" },
      engines: [
        { name: "1.8 / 2.2", meta: "Petrol" },
        { name: "2.0 / 3.0 CDTI", meta: "Diesel" },
      ],
      trims: ["Elegance", "Cosmo", "Sport"],
      facts: ["Rear Travel Assistant concept seating.", "A cult oddity for Opel fans."],
      related: ["vectra-c", "omega-b", "astra-h"],
      image: "media/cars/signum/hero.jpg",
    }),
  ];

  // Chronological collection order
  cars.sort(function (a, b) {
    return a.yearStart - b.yearStart || a.name.localeCompare(b.name);
  });

  window.OPEL = {
    site: {
      name: "OPEL",
      tagline: "A private digital museum of Opel automobiles before 2007",
      cultCarIds: ["gt", "manta-b", "speedster", "calibra", "astra-g", "omega-a"],
      worldBanner: "media/world/banner.jpg",
    },
    cars: cars,
    worldCategories: [
      {
        id: "concepts",
        name: "Concept Cars",
        description: "Ideas that never reached the showroom - or redefined it.",
        image: "media/world/concepts/cover.png",
      },
      {
        id: "opc",
        name: "OPC",
        description: "Opel Performance Center - sharper, faster, focused.",
        image: "media/world/opc/banner.jpg",
      },
      {
        id: "rare",
        name: "Rare Versions",
        description: "Limited runs, special editions, forgotten variants.",
        image: "media/cars/manta-b/hero.jpg",
      },
      {
        id: "motorsport",
        name: "Motorsport",
        description: "Rally stages, circuits, and racing heritage.",
        image: "media/home/hero-02.jpg",
      },
      {
        id: "facts",
        name: "Interesting Facts",
        description: "Details, anecdotes, and quiet curiosities.",
        image: "media/cars/calibra/hero.jpg",
      },
    ],
    articles: [
      {
        id: "experimental-gt",
        category: "concepts",
        date: "1965",
        title: "Experimental GT",
        excerpt: "A dream coupe that previewed Opel's sporting imagination.",
        body: [
          "Long before the production GT arrived in 1968, Opel sketched a freer idea of sporting desire. The Experimental GT was not a catalogue car - it was a statement that Russelsheim could sculpt emotion as confidently as it built family saloons.",
          "Its long bonnet, short deck, and theatrical proportions announced a brand ready to play with silhouette. The study helped prove that Opel design could be theatrical without abandoning engineering clarity.",
          "Seen today, the Experimental GT feels like the prologue to a chapter that would later include Manta, Calibra, and Speedster - proof that popular brands can still dream in curves.",
        ],
        image: "media/world/concepts/experimental-gt.jpg",
      },
      {
        id: "cd-concept",
        category: "concepts",
        date: "1969",
        title: "CD Concept",
        excerpt: "A grand touring study with futuristic calm.",
        body: [
          "The Opel CD Concept explored a refined grand-touring direction: low, wide, and serene rather than aggressive. Its canopy-like glasshouse and clean planes suggested a future where Opel could speak the language of luxury touring as fluently as compact utility.",
          "In period photographs the car looks almost quiet - a metallic study in restraint. That calm is part of its power. Where the Experimental GT shouted sport, the CD whispered sophistication.",
          "As a museum piece of ideas, the CD remains one of the most elegant reminders that Opel's concept history was never only about showmanship. It was also about taste.",
        ],
        image: "media/world/concepts/cd-concept.jpg",
      },
      {
        id: "tech-1",
        category: "concepts",
        date: "1981",
        title: "Tech 1",
        excerpt: "Aerodynamics, glass, and a glimpse of 1980s futurism.",
        body: [
          "Tech 1 arrived as Opel's bold aerodynamic essay of the early 1980s - a concept that treated airflow as architecture. Large glass surfaces, carefully managed surfaces, and a low drag figure made it a laboratory on wheels.",
          "More than a styling exercise, Tech 1 previewed how efficiency and drama could share the same body. The car suggested that tomorrow's Opel might look advanced without abandoning everyday purpose.",
          "In the story of Opel concepts, Tech 1 stands as a bridge between the sculptural 1960s studies and the sharper, more electronic design language of later decades.",
        ],
        image: "media/world/concepts/tech-1.jpg",
      },
      {
        id: "junior-concept",
        category: "concepts",
        date: "1983",
        title: "Junior Concept",
        excerpt: "A compact idea about city life, colour, and approachable design.",
        body: [
          "The Junior concept imagined small-car motoring with personality: approachable proportions, playful detailing, and a sense that city cars need not feel apologetic.",
          "It belongs to a strand of Opel thinking that treated compact vehicles as design opportunities rather than leftovers. That attitude later echoed in production cars that tried to make everyday mobility feel deliberate.",
          "As a museum note, the Junior is less about rarity and more about intent - Opel asking what a friendly future might look like at street scale.",
        ],
        image: "media/world/concepts/junior.jpg",
      },
      {
        id: "opc-origins",
        category: "opc",
        date: "1999",
        title: "OPC Origins",
        excerpt: "How Opel Performance Center sharpened the brand's edge.",
        body: [
          "OPC - Opel Performance Center - gave sporting ambition a clear badge and a clearer mission. Instead of scattered hot variants, Opel concentrated engineering focus into cars with genuine road intent: stronger brakes, sharper chassis work, and engines that felt purposeful rather than merely loud.",
          "The Astra OPC generation that followed became the public face of the idea for many enthusiasts. Blue paint, spoilers, and serious turbo power turned a family hatch into a club for people who liked their Opels intense.",
          "OPC mattered culturally as much as technically. It told Europe that Opel could be emotional on purpose - not only practical by default.",
        ],
        image: "media/world/opc/origins.jpg",
      },
      {
        id: "gtc-concept",
        category: "concepts",
        date: "2003",
        title: "GTC Concept",
        excerpt: "Early-2000s drama that pointed toward hotter Astras.",
        body: [
          "The GTC Concept distilled early-2000s Opel performance theatre: coupe attitude, strong stance, and a design language ready for showroom heat.",
          "Concepts like this mattered because they connected exhibition-floor spectacle with production OPC and GTC models that customers could actually buy. Drama was not only for display stands.",
          "Within this museum's 2007 boundary, the GTC Concept is a late-chapter reminder that Opel still knew how to sketch desire before the decade closed.",
        ],
        image: "media/world/concepts/gtc-concept.jpg",
      },
      {
        id: "astra-g-opc",
        category: "opc",
        date: "1999",
        title: "Astra G OPC",
        excerpt: "The early OPC hatch that made performance feel reachable.",
        body: [
          "Astra G OPC helped define what a modern Opel hot hatch could be: turbo thrust, focused hardware, and styling that signalled intent without abandoning everyday usability.",
          "For many drivers it was the first OPC they could imagine owning - sporting enough to feel special, familiar enough to live with. That balance is part of why the model still resonates in enthusiast memory.",
          "In this collection, Astra G OPC sits at the hinge between 1990s GSi culture and the sharper OPC identity of the 2000s.",
        ],
        image: "media/world/opc/cover.png",
      },
      {
        id: "zafira-opc",
        category: "opc",
        date: "2001",
        title: "Zafira OPC",
        excerpt: "The unlikely hot MPV with serious turbo character.",
        body: [
          "A performance MPV sounds like a joke until you meet Zafira OPC. Opel took the flexible Flex7 family machine and gave it turbo power and chassis seriousness that made the whole idea strangely convincing.",
          "It remains one of OPC's most memorable experiments: proof that Performance Center thinking was not limited to hatches and saloons. Even people-carriers could be dramatic.",
          "As a museum story, Zafira OPC is valuable precisely because it is unexpected - a reminder that Opel's sporting department enjoyed bending categories.",
        ],
      },
      {
        id: "vectra-c-opc",
        category: "opc",
        date: "2005",
        title: "Vectra C OPC",
        excerpt: "A fast executive with OPC attitude before 2007.",
        body: [
          "Vectra C OPC stretched the OPC idea into larger executive metal. High power, firm purpose, and a more serious silhouette showed that Opel Performance Center was not only a hot-hatch label.",
          "It belongs to the final years inside this museum's boundary: an assertive, late-period statement that everyday Opel platforms could still host serious performance engineering.",
          "Collectors often remember it as the grown-up OPC - less playful than Astra, more intentional as a long-distance machine with teeth.",
        ],
      },
      {
        id: "corsa-opc-era",
        category: "opc",
        date: "2007",
        title: "Corsa OPC arrives",
        excerpt: "Supermini aggression at the edge of this museum's timeline.",
        body: [
          "By 2007 the Corsa OPC brought OPC energy firmly into the supermini class - compact, loud in character, and aimed at drivers who wanted the badge at a smaller scale.",
          "Sitting on the edge of this collection's year limit, it marks how completely OPC had become a brand language across Opel's range: from Astra to Zafira to Corsa.",
          "In museum terms it is a closing note of the pre-2008 chapter: Opel still speaking performance fluently at every size.",
        ],
      },
      {
        id: "manta-400",
        category: "rare",
        date: "1981",
        title: "Manta 400",
        excerpt: "Homologation special with motorsport purpose.",
        body: [
          "The Manta 400 was not built to be numerous. It was built to go racing - a homologation-linked special whose rarity today is part of its myth. Wide arches, serious intent, and competition purpose separate it from everyday Mantas.",
          "For enthusiasts, the 400 is one of the most desirable Opel coupes of the classic era: scarce, purposeful, and tightly bound to motorsport ambition.",
          "In a museum of popular Opels, the Manta 400 is the reminder that some road cars exist mainly to unlock faster stories on stages and circuits.",
        ],
        image: "media/cars/manta-b/hero.jpg",
      },
      {
        id: "lotus-omega",
        category: "rare",
        date: "1990",
        title: "Lotus Omega",
        excerpt: "An executive rocket with Lotus engineering DNA.",
        body: [
          "The Lotus Omega (Carlton in some markets) remains one of Opel's most extraordinary collaborations: a large saloon transformed into a high-speed legend with Lotus involvement and twin-turbo force.",
          "It was never meant to be ordinary company transport. Limited numbers, extreme performance for its day, and an almost understated exterior made it a wolf in a tailored suit.",
          "Within this collection it stands beside Speedster and Manta 400 as proof that Opel's rarest chapters are often its most memorable.",
        ],
        image: "media/home/hero-03.jpg",
      },
      {
        id: "omega-evolution-500",
        category: "rare",
        date: "1991",
        title: "Omega Evolution 500",
        excerpt: "Irmscher-tuned homologation muscle for the Omega A era.",
        body: [
          "The Omega Evolution 500 belongs to the rare club of Opels created with motorsport paperwork and road-car theatre in mind. Irmscher involvement and limited production made it far more than a Cosmo with stripes.",
          "It captures a late-1980s / early-1990s idea of executive aggression: big saloon presence, competition echoes, and scarcity that collectors still chase.",
          "As a museum entry it deepens the Omega story beyond Car of the Year respectability - into the sharper edge of special editions.",
        ],
        image: "media/cars/omega-a/hero.jpg",
      },
      {
        id: "calibra-turbo-4x4",
        category: "rare",
        date: "1992",
        title: "Calibra Turbo 4x4",
        excerpt: "All-wheel drive, turbo power, and coupe drama.",
        body: [
          "The Calibra Turbo 4x4 combined one of Europe's most aerodynamic coupe shapes with turbo performance and four-wheel drive seriousness. It was the Calibra for people who wanted more than a beautiful Cd figure.",
          "Compared with everyday Calibras, the Turbo 4x4 feels like the model that closes the gap between showroom elegance and motorsport-adjacent hardware.",
          "In this museum it sits naturally between design landmark and rare performance variant - a coupe that looked calm and could still surprise.",
        ],
        image: "media/cars/calibra/hero.jpg",
      },
      {
        id: "kadett-e-gsi-16v",
        category: "rare",
        date: "1988",
        title: "Kadett E GSi 16V",
        excerpt: "A cult 16-valve hatch from the last Kadett years.",
        body: [
          "Before Astra took the name, Kadett E GSi 16V gave the compact Opel a properly sharp edge. The 16-valve engine, sporting trim, and hatch practicality created a late-1980s favourite that still has a loyal following.",
          "It represents the peak of Kadett performance culture just as the nameplate prepared to change - a final flourish of a long European story.",
          "For collectors of pre-Astra Opels, the GSi 16V is often the one that still feels alive on a back road.",
        ],
        image: "media/cars/kadett-e/hero.jpg",
      },
      {
        id: "ascona-400-rally",
        category: "motorsport",
        date: "1982",
        title: "Ascona 400 & Rally Glory",
        excerpt: "When Opel fought at the sharp end of world rallying.",
        body: [
          "The Ascona 400 era remains a highlight of Opel's competition history. Homologation specials, works ambition, and results on the world stage turned a family name into a rally weapon.",
          "Walter Rohrl's association with Opel's rally programme helped cement the period in motorsport memory - proof that Russelsheim engineering could win under dust, gravel, and pressure.",
          "In this museum the Ascona 400 story links road cars to stages: the same brand that built school-run saloons also chased championship seconds.",
        ],
        image: "media/cars/ascona-b/hero.jpg",
      },
      {
        id: "manta-400-rally",
        category: "motorsport",
        date: "1983",
        title: "Manta 400 on Stage",
        excerpt: "Coupe silhouette, rally purpose, enduring legend.",
        body: [
          "After Ascona, the Manta 400 carried Opel's rally identity into a more overtly sporting shape. The coupe body made the competition story visible even at rest.",
          "Rally Mantas remain among the most photographed competition Opels - wide, purposeful, and instantly recognisable to enthusiasts who grew up with Group B-era theatre.",
          "Together with the road-going homologation cars, they form a complete motorsport chapter: paperwork, pace notes, and popular myth.",
        ],
        image: "media/home/hero-04.jpg",
      },
      {
        id: "calibra-dtm",
        category: "motorsport",
        date: "1993",
        title: "Calibra in DTM",
        excerpt: "Touring-car theatres for Opel's aero coupe.",
        body: [
          "Calibra's racing life in DTM and related touring-car arenas gave the road coupe a second identity: not only a Cd hero, but a silhouette that could fight under wings and stickers.",
          "For fans, seeing Calibra race connected showroom elegance with circuit aggression. The dual life is part of why the model still feels larger than its production numbers alone suggest.",
          "This museum treats Calibra DTM as a bridge between design landmark and motorsport memory.",
        ],
        image: "media/home/hero-03-calibra-track.jpg",
      },
      {
        id: "astra-v8-coupe-dtm",
        category: "motorsport",
        date: "2000",
        title: "Astra V8 Coupe DTM",
        excerpt: "Early-2000s DTM spectacle with Opel colours.",
        body: [
          "The Astra V8 Coupe DTM project brought Opel into a loud, televised touring-car era. Dramatic aero, V8 soundtrack, and manufacturer pride made it a centrepiece of early-2000s motorsport branding.",
          "Even visitors who never watched a race weekend recognise the silhouette from posters and period media - a racing Astra that looked nothing like a shopping hatch.",
          "Inside this collection's timeline it is one of the clearest images of Opel as a motorsport manufacturer rather than only a road-car maker.",
        ],
        image: "media/home/hero-02.jpg",
      },
      {
        id: "blitz-badge",
        category: "facts",
        date: "1960s-",
        title: "The Blitz",
        excerpt: "Why the lightning bolt still defines Opel's identity.",
        body: [
          "The Blitz - Opel's lightning-bolt emblem - is one of the most instantly readable marks in European motoring. It suggests energy, industry, and forward motion without needing a long wordmark.",
          "Across decades of design change, the badge remained a constant: on grilles, steering wheels, and brochure covers. That continuity is rare and valuable for a brand with so many body styles and generations.",
          "In this museum the Blitz is more than decoration. It is the visual shorthand that ties GT drama, Corsa practicality, and OPC aggression into one identity.",
        ],
        image: "media/brand/opel-logo.png",
      },
      {
        id: "russelsheim",
        category: "facts",
        date: "1862-",
        title: "Russelsheim",
        excerpt: "The town and factory town that shaped Opel's industrial voice.",
        body: [
          "Russelsheim is more than a pin on a map. For Opel it is origin, workplace, and cultural centre of gravity - the place where industrial habit became automotive identity.",
          "Factory gates, design studios, and generations of workers turned a local industrial story into a European one. Many Opels in this museum were imagined or engineered with Russelsheim as their home address.",
          "Understanding Opel without Russelsheim is like reading only the last chapter of a long book.",
        ],
      },
      {
        id: "from-kadett-to-astra",
        category: "facts",
        date: "1991",
        title: "From Kadett to Astra",
        excerpt: "A name change that still confuses - and still matters.",
        body: [
          "When Astra replaced Kadett in many markets in 1991, Opel did more than refresh a compact car. It refreshed a vocabulary that families had used for decades.",
          "Kadett had meant accessible Opel mobility for generations. Astra carried that role forward with new safety ambitions, new styling, and eventually OPC chapters that Kadett fans could only have imagined.",
          "This museum keeps both names visible - because the story is continuous even when the badge lettering changes.",
        ],
        image: "media/cars/astra-f/hero.jpg",
      },
      {
        id: "car-of-the-year",
        category: "facts",
        date: "1987",
        title: "Car of the Year moments",
        excerpt: "When European jurors put Opel at the centre of the stage.",
        body: [
          "European Car of the Year awards marked moments when Opel's mainstream engineering received continental applause - most famously with Omega A, which arrived as a thoroughly modern large Opel.",
          "Awards do not define a museum, but they help explain why certain models feel like landmarks rather than mere generations. They were publicly recognised as turning points.",
          "In this collection those moments sit beside cult cars and rally legends: different kinds of importance, same brand timeline.",
        ],
        image: "media/cars/omega-a/hero.jpg",
      },
      {
        id: "design-language",
        category: "facts",
        date: "1968-2007",
        title: "Two Opels at once",
        excerpt: "Practicality and desire sharing one badge.",
        body: [
          "One of Opel's enduring fascinations is dual character. The same company built school-run Corsas and lightning-bolt sports icons; fleet Vectras and wind-cheating Calibras; quiet Omegas and mid-engined Speedsters.",
          "That range is not confusion - it is breadth. Popular manufacturers that last for decades inevitably speak more than one design dialect.",
          "This digital museum is organised to let both voices be heard: everyday engineering and the cars that made people look twice.",
        ],
        image: "media/cars/speedster/hero.jpg",
      },
    ],
    timeline: [
      {
        year: "1862",
        title: "Beginnings in Russelsheim",
        text: "Adam Opel founds a company that would later move from sewing machines and bicycles into the automobile age.",
      },
      {
        year: "1899",
        title: "First automobiles",
        text: "Opel enters motor manufacturing and begins its long automotive chapter.",
      },
      {
        year: "1909",
        title: "Opel 4/8 PS \"Doctor's Car\"",
        text: "An early popular Opel helps broaden motoring beyond the wealthiest buyers.",
      },
      {
        year: "1929",
        title: "General Motors era begins",
        text: "A new industrial chapter expands Opel's scale, methods, and European reach.",
      },
      {
        year: "1935",
        title: "Olympia",
        text: "A modern small Opel advances unitary construction thinking in popular form.",
      },
      {
        year: "1962",
        title: "Kadett A",
        text: "A new Kadett generation strengthens Opel's compact-car presence for the postwar boom.",
      },
      {
        year: "1968",
        title: "Opel GT",
        text: "A dramatic sports coupe becomes an enduring icon of Opel desire.",
      },
      {
        year: "1970",
        title: "Ascona and Manta",
        text: "A twin launch gives Opel a modern saloon/coupe pairing for the new decade.",
      },
      {
        year: "1975",
        title: "Manta B",
        text: "The long-running Manta generation that would define Opel coupe culture into the late 1980s.",
      },
      {
        year: "1978",
        title: "Senator A",
        text: "A large executive Opel expands the brand's presence above Rekord territory.",
      },
      {
        year: "1982",
        title: "Corsa A and Ascona 400 glory",
        text: "A modern supermini arrives while Opel's rally programme writes one of its finest chapters.",
      },
      {
        year: "1986",
        title: "Omega A",
        text: "Aerodynamics, executive ambition, and Car of the Year recognition follow.",
      },
      {
        year: "1989",
        title: "Calibra",
        text: "A wind-cheating coupe becomes a design landmark of late-century Opel.",
      },
      {
        year: "1990",
        title: "Lotus Omega",
        text: "A rare twin-turbo collaboration creates one of Opel's most legendary saloons.",
      },
      {
        year: "1991",
        title: "Astra replaces Kadett",
        text: "A new compact nameplate begins in many markets, carrying Kadett's everyday mission forward.",
      },
      {
        year: "1993",
        title: "Corsa B and Tigra path",
        text: "A softer supermini generation spreads widely as Opel prepares sportier small-car ideas.",
      },
      {
        year: "1999",
        title: "OPC gathers pace",
        text: "Opel Performance Center identity hardens around sharper Astras and a clearer sporting badge.",
      },
      {
        year: "2000",
        title: "Speedster",
        text: "A mid-engined roadster brings pure driving focus to the Opel range.",
      },
      {
        year: "2001",
        title: "Zafira A era",
        text: "Flexible seven-seat packaging becomes a defining Opel family idea - including unlikely OPC heat.",
      },
      {
        year: "2004",
        title: "Astra H",
        text: "A new Astra generation continues compact Opel life toward the mid-2000s.",
      },
      {
        year: "2007",
        title: "Collection boundary",
        text: "This museum focuses on Opel automobiles and stories up to 2007.",
      },
    ],
    history: {
      title: "History of Opel",
      lead: "From Russelsheim workshops to a European automotive institution.",
      sections: [
        {
          heading: "Industrial roots",
          paragraphs: [
            "Opel's story begins long before the motor car became ubiquitous. What started with sewing machines and bicycles grew into one of Europe's significant industrial names - a company that learned scale, discipline, and product clarity early.",
            "When automobiles arrived, Opel adapted with the same manufacturing instinct that had already turned workshops into factories. Russelsheim became not only a workplace but a cultural address for the brand.",
            "That industrial patience matters. Many later Opels feel practical because the company was practical long before it was fashionable.",
          ],
        },
        {
          heading: "Under a wider sky",
          paragraphs: [
            "The General Motors chapter from 1929 enlarged Opel's means and markets. Methods changed, ambitions widened, and Opel cars became familiar across Europe in a way few national makers matched.",
            "Yet the cars retained a recognisable character: engineered for real roads, real budgets, and real weather. International ownership did not erase local voice.",
            "This museum treats that era not as a footnote but as the framework that made Kadett, Rekord, Ascona, and later Astra possible at volume.",
          ],
        },
        {
          heading: "Popular motoring",
          paragraphs: [
            "Through the decades, Opel became associated with accessible, well-engineered cars for everyday life. Fleet buyers, families, and first-car drivers all found models that felt honest rather than theatrical.",
            "Names like Kadett, Rekord, Ascona, Corsa, Vectra, and Astra formed a vocabulary of ordinary European mobility. Generations changed; the mission stayed readable.",
            "Popular does not mean dull. Inside those ordinary nameplates lived GSi edges, diesel workhorses, cabrios, and quiet design improvements that only reveal themselves when you look closely.",
          ],
        },
        {
          heading: "Design & emotion",
          paragraphs: [
            "Alongside practicality, Opel shaped desire: GT, Manta, Calibra, Speedster, and concept studies spoke in curves as well as specifications.",
            "Concept cars such as the Experimental GT and CD showed that Russelsheim studios could dream in grand gestures. Production icons proved those dreams could survive price lists.",
            "This museum gathers that dual identity into one quiet digital showroom - the school-run hatch and the lightning-bolt coupe under the same Blitz.",
          ],
        },
        {
          heading: "Competition & OPC",
          paragraphs: [
            "Motorsport gave Opel a louder public voice: Ascona 400 and Manta 400 on rally stages, Calibra and Astra theatre in touring cars, posters that outlived race weekends.",
            "Later, OPC concentrated road-car performance into a badge customers could trust. Astra OPC, unlikely machines like Zafira OPC, and sharper Vectras extended the idea that Opel could be intense on purpose.",
            "Together, rally legends and OPC road cars explain why enthusiasts still argue about Opel with affection rather than only nostalgia.",
          ],
        },
        {
          heading: "Until 2007",
          paragraphs: [
            "This collection stops at 2007 by design. Boundaries help a museum stay coherent. Inside that limit sit enough generations, body styles, and stories for years of looking.",
            "What you find here is not a complete encyclopaedia. It is a curated room: cult models near the entrance, deeper shelves for history, timeline, and World of Opel essays.",
            "The invitation is simple - walk slowly, open a car page, follow a related model, and let the Blitz lead you onward.",
          ],
        },
      ],
    },
    about: {
      title: "About the project",
      paragraphs: [
        "OPEL is a private digital collection dedicated to automobiles of the Opel brand produced before 2007.",
        "It is not a commercial catalogue and not a dealer brochure archive. It is a personal museum - built for looking, reading, and remembering.",
        "Use the Collection to browse models by generation and year. Open a car page for story, specifications, engines, and related models. Play engine notes where sound files are available.",
        "World of Opel gathers essays on concepts, OPC, rare versions, motorsport, and curious facts. History and Timeline tell the longer brand narrative in two complementary ways - prose and chronology.",
        "The Gallery collects photography already present in the museum: car heroes, banners, and article images. More pictures will arrive as the collection grows.",
        "English is used throughout so the museum stays consistent as a single quiet showroom. Content will continue to deepen - especially stories, technical notes, and media - without chasing commercial noise.",
      ],
    },
    gallery: [],
  };

  function pushGalleryItem(list, entry) {
    if (!entry || !entry.image) return;
    var exists = list.some(function (g) {
      return g.image === entry.image;
    });
    if (exists) return;
    list.push({
      id: "g" + (list.length + 1),
      caption: entry.caption,
      carId: entry.carId || null,
      image: entry.image,
    });
  }

  var galleryItems = [];

  window.OPEL.cars.forEach(function (c) {
    if (c.image) {
      pushGalleryItem(galleryItems, {
        caption: c.name + " " + c.generation,
        carId: c.id,
        image: c.image,
      });
    }
    (c.gallery || []).forEach(function (img) {
      pushGalleryItem(galleryItems, {
        caption: c.name + " " + c.generation,
        carId: c.id,
        image: img,
      });
    });
  });

  window.OPEL.articles.forEach(function (a) {
    pushGalleryItem(galleryItems, {
      caption: a.title,
      image: a.image,
    });
  });

  window.OPEL.worldCategories.forEach(function (cat) {
    pushGalleryItem(galleryItems, {
      caption: cat.name,
      image: cat.image,
    });
  });

  [
    { image: "media/home/hero-01.jpg", caption: "Speedster - mountain road" },
    { image: "media/home/hero-02.jpg", caption: "Astra V8 Coupe DTM" },
    { image: "media/home/hero-03.jpg", caption: "Lotus Omega" },
    { image: "media/home/hero-04.jpg", caption: "Manta - studio" },
    { image: "media/home/hero-01-calibra-germany.jpg", caption: "Calibra - Germany" },
    { image: "media/home/hero-02-manta-road.jpg", caption: "Manta - road" },
    { image: "media/home/hero-03-calibra-track.jpg", caption: "Calibra - track" },
    { image: "media/home/hero-04-manta-classic.jpg", caption: "Manta - classic" },
    { image: "media/home/hero-05-calibra-monza.jpg", caption: "Calibra - Monza" },
    {
      image: "media/world/banner.jpg",
      caption: "World of Opel - coastal lineup",
    },
    {
      image: "media/cars/kadett-c/hero-showroom-side.jpg",
      caption: "Kadett C - showroom",
      carId: "kadett-c",
    },
  ].forEach(function (extra) {
    pushGalleryItem(galleryItems, extra);
  });

  window.OPEL.gallery = galleryItems;

  window.OPEL.getCar = function (id) {
    return window.OPEL.cars.find(function (c) {
      return c.id === id;
    });
  };

  window.OPEL.getArticle = function (id) {
    return window.OPEL.articles.find(function (a) {
      return a.id === id;
    });
  };

  window.OPEL.articlesByCategory = function (categoryId) {
    return window.OPEL.articles.filter(function (a) {
      return a.category === categoryId;
    });
  };

  window.OPEL.searchCars = function (query) {
    var q = String(query || "")
      .trim()
      .toLowerCase();
    if (!q) return window.OPEL.cars.slice();
    return window.OPEL.cars.filter(function (car) {
      var hay = [car.name, car.generation, car.years, String(car.yearStart), String(car.yearEnd)]
        .join(" ")
        .toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  };
})();


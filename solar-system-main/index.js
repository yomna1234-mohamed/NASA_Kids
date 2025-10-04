$(window).on("load", function () {
  var body = $("body"),
    universe = $("#universe"),
    solarsys = $("#solar-system");

  var init = function () {
    body.removeClass("view-2D opening")
      .addClass("view-3D")
      .delay(2000)
      .queue(function () {
        $(this).removeClass("hide-UI").addClass("set-speed");
        $(this).dequeue();
      });
  };

  var setView = function (view) {
    universe.removeClass().addClass(view);
  };

  $("#toggle-data").click(function (e) {ط
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function (e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  $("#data a").click(function (e) {
    var ref = $(this).attr("class");
    solarsys.removeClass().addClass(ref);
    $(this).parent().find("a").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });

  $(".set-view").click(function () {
    body.toggleClass("view-3D view-2D");
  });
  $(".set-zoom").click(function () {
    body.toggleClass("zoom-large zoom-close");
  });
  $(".set-speed").click(function () {
    setView("scale-stretched set-speed");
  });
  $(".set-size").click(function () {
    setView("scale-s set-size");
  });
  $(".set-distance").click(function () {
    setView("scale-d set-distance");
  });

  init();
});

$(document).ready(function () {
  const planetData = [
    {
      name: "Mercury",
      position: "First planet from the Sun.",
      size: "Diameter 4,880 km; smallest planet; very dense with large metallic core (75% of diameter).",
      surface: "Heavily cratered, like the Moon; has plains and cliffs (scarps) from cooling and shrinking.",
      atmosphere: "Extremely thin exosphere of oxygen, sodium, and helium.",
      orbitAndRotation: "Orbits Sun in 88 Earth days; fastest planet (47 km/s).",
      temperature: "Extreme range: -180°C to 430°C.",
      moons: "No moons or rings.",
      specialFeatures: "Massive metallic core; named after Roman messenger god for speed.",
    },
    {
      name: "Venus",
      position: "Second planet from the Sun.",
      size: "Almost same size and mass as Earth; rocky terrestrial planet.",
      surface: "Surface hidden by thick clouds; rocky with mountains and volcanoes.",
      atmosphere: "Dense CO₂ and sulfuric acid clouds; strongest greenhouse effect.",
      orbitAndRotation: "Year = 225 Earth days; rotates very slowly (243 Earth days).",
      temperature: "Hottest planet (465°C).",
      moons: "No moons.",
      specialFeatures: "Rotates opposite Earth (sun rises west).",
    },
    {
      name: "Earth",
      position: "Third planet from the Sun; formed 4.5 billion years ago.",
      size: "Diameter about 12,756 km; oblate spheroid (flattened at poles).",
      surface: "71% water, 29% land.",
      atmosphere: "Mostly nitrogen and oxygen; supports life 'structure': Solid inner core, liquid outer core, mantle, crust.",
      orbitAndRotation: "Orbits Sun in 365 days; rotates in 24 hours. 'tilt': Tilted 23.5°, causing seasons.",
      temperature: "Average ~15°C; ranges from -89°C (Antarctica) to 57°C (deserts).",
      moons: "1 moon (affects tides, stabilizes climate).",
      specialFeatures: "Only planet known to support life; active plate tectonics.",
    },
    {
      name: "Mars",
      position: "Fourth planet from the Sun.",
      size: "About half Earth’s diameter.",
      surface: "Cold desert with volcanoes (Olympus Mons), canyons, polar ice caps.",
      atmosphere: "Thin CO₂ atmosphere; not breathable.",
      orbitAndRotation: "Day = 24h 37m; Year = 687 Earth days; has seasons.",
      temperature: "Cold, below freezing.",
      moons: "Two moons: Phobos and Deimos.",
      specialFeatures: "Red Planet (iron oxide dust).",
    },
    {
      name: "Jupiter",
      position: "Fifth planet from the Sun.",
      size: "Largest planet; 11 times Earth’s diameter.",
      surface: "No solid surface; gas giant.",
      atmosphere: "Hydrogen and helium; storms and clouds.",
      orbitAndRotation: "Day = 10 hours; Year = 12 Earth years.",
      temperature: "Very cold (-110°C).",
      moons: "95+ moons (Io, Europa, Ganymede, Callisto).'rings': Faint dust rings.",
      specialFeatures: "Great Red Spot (giant storm).",
    },
    {
      name: "Saturn",
      position: "Sixth planet from the Sun.",
      size: "Second largest planet.",
      surface: "No solid surface; gas giant.",
      atmosphere: "Hydrogen and helium; yellowish color.",
      orbitAndRotation: "Day = 10.7 hours; Year = 29.5 Earth years.",
      temperature: "Very cold (approx -140°C).",
      moons: "80+ moons (Titan largest).'rings': Most famous; made of ice and rock.",
      specialFeatures: "Least dense planet — could float in water.",
    },
    {
      name: "Uranus",
      position: "Seventh planet from the Sun.",
      size: "Third largest planet; 4x Earth’s width.",
      surface: "No solid surface; ice giant.",
      atmosphere: "Hydrogen, helium, methane (blue-green color).",
      orbitAndRotation: "Day = 17 hours; Year = 84 Earth years.",
      temperature: "Coldest planet (-224°C).",
      moons: "20+ moons.'rings': Faint dark rings.'tilt': 98° — rotates on its side.",
      specialFeatures: "Extreme: 42 years daylight, 42 years darkness.",
    },
    {
      name: "Neptune",
      position: "Eighth and farthest planet from the Sun.",
      size: "Diameter ~4x Earth.",
      surface: "No solid surface; ice giant.",
      atmosphere: "Hydrogen, helium, methane (vivid blue color).",
      orbitAndRotation: "Day = 16 hours; Year = 164.8 Earth years.",
      temperature: "Very cold (-214°C).",
      moons: "14 moons; Triton has icy volcanoes.'rings': Faint dusty rings.",
      specialFeatures: "Fastest winds in solar system (1,200 mph).",
    },
  ];

  function updateInfoBox() {
    const selectedScale = $("input[name='scale']:checked").val();
    const currentPlanetName = $("#data a.active").data("planet");

    const data = planetData.find((p) => p.name === currentPlanetName);

    if (selectedScale === "information" && data) {
      $("#planet-info")
        .html(
          `<h3>${data.name}</h3>
         <p><strong> Position:</strong> ${data.position || "N/A"}</p>
         <p><strong> Size:</strong> ${data.size || "N/A"}</p>
         <p><strong> Surface:</strong> ${data.surface || "N/A"}</p>
         <p><strong> atmosphere:</strong> ${data.atmosphere || "N/A"}</p>
         <p><strong> orbitAndRotation:</strong> ${data.orbitAndRotation || "N/A"}</p>
         <p><strong> Temp:</strong> ${data.temperature || "N/A"}</p>
         <p><strong> Moons:</strong> ${data.moons || "N/A"}</p>
         <p><strong> Special:</strong> ${data.specialFeatures || "N/A"}</p>`
        )
        .removeClass("hidden");
    } else {
      $("#planet-info").addClass("hidden");
    }
  }

  $("input[name='scale']").change(function () {
    updateInfoBox();
  });

  $("#data a").click(function () {
    $("#data a").removeClass("active");
    $(this).addClass("active");
    updateInfoBox();
  });

  updateInfoBox();
});
(function () {
  "use strict";

  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function carMedia(car) {
    if (car.image) {
      return '<img src="' + window.OPEL_UI.path(car.image) + '" alt="' + car.name + " " + car.generation + '" loading="lazy" />';
    }
    return window.OPEL_UI.mediaPlaceholder(car.name + " " + car.generation);
  }

  function articleMedia(article) {
    if (article.image) {
      return (
        '<img src="' +
        window.OPEL_UI.path(article.image) +
        '" alt="' +
        article.title +
        '" loading="lazy" />'
      );
    }
    return window.OPEL_UI.mediaPlaceholder(article.title);
  }

  function normalizeSpecs(specs) {
    if (!specs) return [];
    if (Array.isArray(specs)) {
      return specs.filter(function (item) {
        return item && item.label && item.value;
      });
    }
    if (typeof specs === "object") {
      return Object.keys(specs).map(function (key) {
        return { label: key, value: specs[key] };
      });
    }
    return [];
  }

  function renderSpecsHtml(specs) {
    var items = normalizeSpecs(specs);
    if (!items.length) return "";
    return (
      '<div class="article-stats reveal">' +
      items
        .map(function (item) {
          return (
            '<div class="article-stat">' +
            '<div class="article-stat__label">' +
            item.label +
            "</div>" +
            '<div class="article-stat__value">' +
            item.value +
            "</div></div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function pageHeroHtml(opts) {
    var image = opts.image || null;
    var cls = "page-hero" + (image ? " page-hero--banner" : "");
    var media = image
      ? '<div class="page-hero__media" style="background-image:url(\'' +
        window.OPEL_UI.path(image) +
        '\')" role="img" aria-label="' +
        (opts.title || "") +
        '"></div><div class="page-hero__veil" aria-hidden="true"></div>'
      : "";
    return (
      '<section class="' +
      cls +
      '">' +
      media +
      '<div class="page-hero__content">' +
      (opts.eyebrow
        ? '<p class="page-hero__eyebrow">' + opts.eyebrow + "</p>"
        : "") +
      '<h1 class="page-hero__title">' +
      opts.title +
      "</h1>" +
      (opts.lead ? '<p class="page-hero__lead">' + opts.lead + "</p>" : "") +
      "</div></section>"
    );
  }

  function categoryBannerImage(cat) {
    if (cat && cat.image) return cat.image;
    if (!cat || !window.OPEL) return null;
    var withImage = window.OPEL.articlesByCategory(cat.id).find(function (a) {
      return !!a.image;
    });
    return withImage ? withImage.image : null;
  }

  function renderHome() {
    var cult = document.getElementById("home-cult");
    var timelineMount = document.getElementById("home-timeline");
    var latest = document.getElementById("home-latest");
    var articles = document.getElementById("home-articles");
    if (!window.OPEL) return;

    initHeroSlider();

    if (cult) {
      var cultIds = (window.OPEL.site && window.OPEL.site.cultCarIds) || [
        "gt",
        "manta-b",
        "speedster",
        "calibra",
        "astra-g",
        "omega-a",
      ];
      var cultCars = cultIds
        .map(function (id) {
          return window.OPEL.getCar(id);
        })
        .filter(Boolean);
      var cultCard = function (car) {
        return (
          '<a class="cult-marquee__item tile" href="' +
          window.OPEL_UI.carHref(car.id) +
          '">' +
          '<div class="tile__media">' +
          carMedia(car) +
          "</div>" +
          '<div class="car-card__meta"><span>' +
          car.generation +
          "</span><span>" +
          car.years +
          "</span></div>" +
          '<div class="tile__title">' +
          car.name +
          "</div>" +
          "</a>"
        );
      };
      var sequence = cultCars.map(cultCard).join("");
      cult.innerHTML = '<div class="cult-marquee__track">' + sequence + "</div>";
      initCultMarquee(cult);
    }

    if (timelineMount) {
      timelineMount.innerHTML = window.OPEL.timeline
        .slice(0, 3)
        .map(function (item) {
          var preview =
            item.text ||
            (item.paragraphs && item.paragraphs[0]) ||
            "";
          return (
            '<article class="home-timeline__item reveal">' +
            '<div class="home-timeline__year">' +
            item.year +
            "</div>" +
            '<div class="home-timeline__body">' +
            '<h3 class="home-timeline__title">' +
            item.title +
            "</h3>" +
            '<p class="home-timeline__text">' +
            preview +
            "</p>" +
            "</div>" +
            "</article>"
          );
        })
        .join("");
    }

    if (latest) {
      latest.innerHTML = window.OPEL.cars
        .slice()
        .reverse()
        .slice(0, 3)
        .map(function (car) {
          return (
            '<a class="tile tile--dark reveal" href="' +
            window.OPEL_UI.carHref(car.id) +
            '">' +
            '<div class="tile__media">' +
            carMedia(car) +
            "</div>" +
            '<div class="tile__date">' +
            car.years +
            "</div>" +
            '<div class="tile__title">' +
            car.name +
            " " +
            car.generation +
            "</div>" +
            '<p class="car-card__desc">' +
            car.short +
            "</p>" +
            "</a>"
          );
        })
        .join("");
    }

    if (articles) {
      articles.innerHTML = window.OPEL.articles
        .slice(0, 3)
        .map(function (a) {
          return (
            '<a class="tile reveal" href="' +
            window.OPEL_UI.articleHref(a.id) +
            '">' +
            '<div class="tile__date">' +
            a.date +
            "</div>" +
            '<div class="tile__title">' +
            a.title +
            "</div>" +
            '<div class="tile__media" style="margin-top:16px">' +
            articleMedia(a) +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    }
  }

  function initCultMarquee(root) {
    var track = root.querySelector(".cult-marquee__track");
    if (!track) return;

    var compactQuery = window.matchMedia("(max-width: 800px)");
    var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var offset = 0;
    var speed = 0.45;
    var paused = false;
    var pointerActive = false;
    var dragActive = false;
    var suppressClick = false;
    var lastX = 0;
    var moved = 0;
    var half = 0;
    var rafId = 0;
    var dragThreshold = 8;

    function isCompact() {
      return compactQuery.matches;
    }

    function removeClones() {
      track.querySelectorAll('[data-clone="1"]').forEach(function (el) {
        el.remove();
      });
    }

    function ensureClones() {
      removeClones();
      if (isCompact()) return;
      var items = track.querySelectorAll(
        '.cult-marquee__item:not([data-clone="1"])'
      );
      items.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute("data-clone", "1");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    function measure() {
      half = track.scrollWidth / 2;
    }

    function wrapOffset() {
      if (!half) return;
      while (offset <= -half) offset += half;
      while (offset > 0) offset -= half;
    }

    function apply() {
      track.style.transform = "translateX(" + offset + "px)";
    }

    function stopAnimation() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function tick() {
      if (!isCompact() && !reduceQuery.matches && !paused && !dragActive) {
        offset -= speed;
        wrapOffset();
        apply();
      }
      rafId = requestAnimationFrame(tick);
    }

    function enterCompactMode() {
      root.classList.add("is-compact");
      root.classList.remove("is-dragging");
      pointerActive = false;
      dragActive = false;
      suppressClick = false;
      paused = false;
      removeClones();
      stopAnimation();
      track.style.transform = "";
    }

    function enterDesktopMode() {
      root.classList.remove("is-compact");
      ensureClones();
      measure();
      wrapOffset();
      apply();
      if (!rafId && !reduceQuery.matches) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function syncMode() {
      if (isCompact()) {
        enterCompactMode();
      } else {
        enterDesktopMode();
        if (reduceQuery.matches) {
          stopAnimation();
        }
      }
    }

    root.addEventListener("mouseenter", function () {
      if (!isCompact()) paused = true;
    });

    root.addEventListener("mouseleave", function () {
      if (!pointerActive) paused = false;
    });

    root.addEventListener("mousedown", function (e) {
      if (isCompact() || e.button !== 0) return;
      pointerActive = true;
      dragActive = false;
      suppressClick = false;
      moved = 0;
      lastX = e.clientX;
      paused = true;
    });

    window.addEventListener("mousemove", function (e) {
      if (!pointerActive) return;
      var dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);

      if (!dragActive && moved > dragThreshold) {
        dragActive = true;
        root.classList.add("is-dragging");
      }

      if (!dragActive) return;

      e.preventDefault();
      offset += dx;
      wrapOffset();
      apply();
    });

    window.addEventListener("mouseup", function () {
      if (!pointerActive) return;
      if (dragActive) suppressClick = true;
      pointerActive = false;
      dragActive = false;
      root.classList.remove("is-dragging");
      if (!root.matches(":hover")) paused = false;
    });

    root.addEventListener(
      "click",
      function (e) {
        if (suppressClick) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick = false;
        }
        moved = 0;
      },
      true
    );

    window.addEventListener("resize", function () {
      syncMode();
      if (!isCompact()) {
        measure();
        wrapOffset();
        apply();
      }
    });

    if (typeof ResizeObserver !== "undefined") {
      var resizeObserver = new ResizeObserver(function () {
        if (isCompact()) return;
        measure();
        wrapOffset();
        apply();
      });
      resizeObserver.observe(root);
    }

    if (compactQuery.addEventListener) {
      compactQuery.addEventListener("change", syncMode);
    } else if (compactQuery.addListener) {
      compactQuery.addListener(syncMode);
    }

    if (reduceQuery.addEventListener) {
      reduceQuery.addEventListener("change", syncMode);
    } else if (reduceQuery.addListener) {
      reduceQuery.addListener(syncMode);
    }

    syncMode();
  }

  function initHeroSlider() {
    var root = document.getElementById("home-hero");
    if (!root) return;
    var slides = root.querySelectorAll(".hero__slide");
    var pips = root.querySelectorAll(".pip");
    if (slides.length < 2) return;
    var index = 0;
    var timer;

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        slide.classList.toggle("is-active", n === index);
      });
      pips.forEach(function (pip, n) {
        pip.classList.toggle("is-active", n === index);
      });
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(function () {
        go(index + 1);
      }, 5500);
    }

    pips.forEach(function (pip) {
      pip.addEventListener("click", function () {
        go(Number(pip.getAttribute("data-slide")) || 0);
        start();
      });
    });

    start();
  }

  function renderCollection() {
    var grid = document.getElementById("collection-grid");
    var input = document.getElementById("collection-search");
    if (!grid || !window.OPEL) return;

    function paint(list) {
      if (!list.length) {
        grid.innerHTML = '<p class="search-empty">No cars found</p>';
        return;
      }
      grid.innerHTML = list
        .map(function (car) {
          return (
            '<a class="tile reveal is-visible" href="' +
            window.OPEL_UI.carHref(car.id) +
            '">' +
            '<div class="tile__media">' +
            carMedia(car) +
            "</div>" +
            '<div class="car-card__meta"><span>Gen. ' +
            car.generation +
            "</span><span>" +
            car.years +
            "</span></div>" +
            '<div class="tile__title">' +
            car.name +
            "</div>" +
            '<p class="car-card__desc">' +
            car.short +
            "</p>" +
            "</a>"
          );
        })
        .join("");
    }

    paint(window.OPEL.cars);
    if (input) {
      input.addEventListener("input", function () {
        paint(window.OPEL.searchCars(input.value));
      });
    }
  }

  function renderCar() {
    var root = document.getElementById("car-page");
    if (!root || !window.OPEL) return;
    var car = window.OPEL.getCar(qs("id"));
    if (!car) {
      root.innerHTML =
        '<div class="container page-pad"><p class="t-h">Car not found</p><a class="btn-ghost" href="' +
        window.OPEL_UI.path("pages/collection.html") +
        '">Back to collection →</a></div>';
      return;
    }

    document.title = car.name + " " + car.generation + " — OPEL";

    function renderParagraphs(paragraphs, withLead) {
      return (paragraphs || [])
        .map(function (p, index) {
          var cls = withLead && index === 0 ? ' class="article-block__lead"' : "";
          return "<p" + cls + ">" + p + "</p>";
        })
        .join("");
    }

    var specsHtml = renderSpecsHtml(car.specs);

    var storyHtml = "";
    if (car.sections && car.sections.length) {
      storyHtml = car.sections
        .map(function (section, index) {
          return (
            '<section class="article-block reveal article-block--no-figure">' +
            '<div class="article-block__index" aria-hidden="true">' +
            String(index + 1).padStart(2, "0") +
            "</div>" +
            '<div class="article-block__main">' +
            '<h2 class="article-block__title">' +
            section.heading +
            "</h2>" +
            '<div class="article-block__body">' +
            renderParagraphs(section.body, true) +
            "</div></div></section>"
          );
        })
        .join("");
    } else {
      storyHtml =
        '<div class="article-block article-block--simple reveal">' +
        '<div class="article-block__body article-block__body--wide">' +
        renderParagraphs([car.history], true) +
        "</div></div>";
    }

    var enginesHtml = car.engines
      .map(function (eng) {
        return (
          '<article class="engine-card engine-card--rich" data-sound="' +
          window.OPEL_UI.path(eng.sound) +
          '" tabindex="0" role="button" aria-label="Play engine sound for ' +
          eng.name +
          '">' +
          '<div class="engine-card__pulse" aria-hidden="true"></div>' +
          '<div class="engine-card__head">' +
          '<div class="engine-card__name">' +
          eng.name +
          "</div>" +
          '<div class="engine-card__meta">' +
          eng.meta +
          "</div></div>" +
          (eng.description
            ? '<div class="engine-card__text">' + eng.description + "</div>"
            : "") +
          '<div class="engine-card__hint">Click to hear the engine · Hover for animation</div>' +
          "</article>"
        );
      })
      .join("");

    var trimDetails =
      car.trimDetails && car.trimDetails.length
        ? car.trimDetails
        : (car.trims || []).map(function (name) {
            return { name: name, description: "" };
          });

    var trimsHtml = trimDetails
      .map(function (trim) {
        return (
          '<article class="trim-card reveal">' +
          '<h3 class="trim-card__name">' +
          trim.name +
          "</h3>" +
          (trim.description
            ? '<p class="trim-card__text">' + trim.description + "</p>"
            : "") +
          "</article>"
        );
      })
      .join("");

    var transmissionHtml =
      '<p class="car-transmission__list">' +
      car.transmissions.join(" · ") +
      "</p>" +
      (car.transmissionNotes
        ? '<div class="car-transmission__notes">' +
          renderParagraphs(
            Array.isArray(car.transmissionNotes)
              ? car.transmissionNotes
              : [car.transmissionNotes]
          ) +
          "</div>"
        : "");

    var facts = car.facts
      .map(function (f, i) {
        return (
          '<div class="fact-item reveal"><div class="fact-item__num">' +
          String(i + 1).padStart(2, "0") +
          '</div><div class="fact-item__text">' +
          f +
          "</div></div>"
        );
      })
      .join("");

    var related = (car.related || [])
      .map(function (id) {
        return window.OPEL.getCar(id);
      })
      .filter(Boolean)
      .map(function (c) {
        return (
          '<a class="tile" href="' +
          window.OPEL_UI.carHref(c.id) +
          '">' +
          '<div class="tile__media">' +
          carMedia(c) +
          "</div>" +
          '<div class="tile__title">' +
          c.name +
          " " +
          c.generation +
          "</div>" +
          "</a>"
        );
      })
      .join("");

    root.innerHTML =
      pageHeroHtml({
        eyebrow: car.years + " · Generation " + car.generation,
        title: car.name,
        lead: car.description,
        image: car.image,
      }) +
      '<section class="section surface-white car-page">' +
      '<div class="container">' +
      '<article class="article-editorial">' +
      specsHtml +
      '<div class="article-editorial__sections">' +
      storyHtml +
      "</div>" +
      '<section class="car-detail-block reveal">' +
      '<div class="car-detail-block__head">' +
      '<span class="article-spread__eyebrow">Powertrain</span>' +
      '<h2 class="car-detail-block__title">Engines</h2>' +
      "</div>" +
      '<div class="engine-list engine-list--rich">' +
      enginesHtml +
      "</div></section>" +
      '<section class="car-detail-block reveal">' +
      '<div class="car-detail-block__head">' +
      '<span class="article-spread__eyebrow">Equipment</span>' +
      '<h2 class="car-detail-block__title">Trims &amp; equipment</h2>' +
      "</div>" +
      '<div class="trim-grid">' +
      trimsHtml +
      "</div></section>" +
      '<section class="car-detail-block reveal">' +
      '<div class="car-detail-block__head">' +
      '<span class="article-spread__eyebrow">Drivetrain</span>' +
      '<h2 class="car-detail-block__title">Transmissions</h2>' +
      "</div>" +
      '<div class="car-transmission">' +
      transmissionHtml +
      "</div></section>" +
      '<section class="car-detail-block reveal">' +
      '<div class="car-detail-block__head">' +
      '<span class="article-spread__eyebrow">Notes</span>' +
      '<h2 class="car-detail-block__title">Interesting facts</h2>' +
      "</div>" +
      '<div class="fact-list">' +
      facts +
      "</div></section>" +
      '<footer class="article-editorial__footer">' +
      '<a class="btn-ghost" href="' +
      window.OPEL_UI.path("pages/collection.html") +
      '">← Back to collection</a>' +
      "</footer></article></div></section>" +
      '<section class="section surface-dark">' +
      '<div class="container">' +
      '<div class="section-head"><h2 class="section-head__title">Related</h2>' +
      '<a class="section-head__link btn-ghost btn-ghost--light" href="' +
      window.OPEL_UI.path("pages/collection.html") +
      '">Full collection →</a></div>' +
      '<div class="related-grid">' +
      related +
      "</div></div></section>";

    initEngineSounds();
  }

  function initEngineSounds() {
    var cards = document.querySelectorAll(".engine-card");
    var audio = new Audio();
    audio.preload = "none";

    cards.forEach(function (card) {
      function play() {
        var src = card.getAttribute("data-sound");
        cards.forEach(function (c) {
          c.classList.remove("is-active");
        });
        card.classList.add("is-active");
        audio.pause();
        audio.src = src;
        var playPromise = audio.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function () {
            card.querySelector(".engine-card__hint").textContent =
              "Add an MP3 to media/sounds to enable audio";
          });
        }
      }

      card.addEventListener("click", play);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          play();
        }
      });
    });
  }

  function renderHistory() {
    var root = document.getElementById("history-page");
    if (!root || !window.OPEL) return;
    var h = window.OPEL.history;

    function renderParagraphs(paragraphs, withLead) {
      return (paragraphs || [])
        .map(function (p, index) {
          var cls = withLead && index === 0 ? ' class="article-block__lead"' : "";
          return "<p" + cls + ">" + p + "</p>";
        })
        .join("");
    }

    function renderFigure(image, caption, alt) {
      if (!image) return "";
      return (
        '<figure class="article-block__figure reveal">' +
        '<div class="article-block__figure-media">' +
        '<img src="' +
        window.OPEL_UI.path(image) +
        '" alt="' +
        (alt || caption || "History of Opel") +
        '" loading="lazy" />' +
        "</div>" +
        (caption
          ? '<figcaption class="article-block__caption">' + caption + "</figcaption>"
          : "") +
        "</figure>"
      );
    }

    var heroHtml = h.heroImage
      ? '<figure class="history-hero reveal">' +
        '<div class="history-hero__media">' +
        '<img src="' +
        window.OPEL_UI.path(h.heroImage) +
        '" alt="' +
        (h.heroCaption || h.title) +
        '" loading="eager" />' +
        "</div>" +
        (h.heroCaption
          ? '<figcaption class="history-hero__caption">' + h.heroCaption + "</figcaption>"
          : "") +
        "</figure>"
      : "";

    root.innerHTML =
      '<section class="section surface-white history-page">' +
      '<div class="container">' +
      '<article class="article-editorial">' +
      heroHtml +
      (h.lead
        ? '<p class="history-lead reveal">' + h.lead + "</p>"
        : "") +
      '<div class="article-editorial__sections">' +
      h.sections
        .map(function (section, index) {
          var figureHtml = renderFigure(
            section.image,
            section.caption,
            section.heading
          );
          return (
            '<section class="article-block reveal' +
            (figureHtml ? "" : " article-block--no-figure") +
            '">' +
            '<div class="article-block__index" aria-hidden="true">' +
            String(index + 1).padStart(2, "0") +
            "</div>" +
            '<div class="article-block__main">' +
            '<h2 class="article-block__title">' +
            section.heading +
            "</h2>" +
            '<div class="article-block__body">' +
            renderParagraphs(section.paragraphs, true) +
            "</div></div>" +
            figureHtml +
            "</section>"
          );
        })
        .join("") +
      "</div></article></div></section>";
  }

  function renderTimeline() {
    var root = document.getElementById("timeline-list");
    if (!root || !window.OPEL) return;
    root.innerHTML = window.OPEL.timeline
      .map(function (item) {
        var body = item.paragraphs
          ? item.paragraphs
              .map(function (p, i) {
                var cls = i === 0 ? ' class="timeline__lead"' : "";
                return "<p" + cls + ">" + p + "</p>";
              })
              .join("")
          : '<p class="timeline__lead">' + item.text + "</p>";
        var figureHtml = item.image
          ? '<figure class="timeline__figure reveal">' +
            '<div class="timeline__figure-media">' +
            '<img src="' +
            window.OPEL_UI.path(item.image) +
            '" alt="' +
            (item.caption || item.title) +
            '" loading="lazy" />' +
            "</div>" +
            (item.caption
              ? '<figcaption class="timeline__caption">' + item.caption + "</figcaption>"
              : "") +
            "</figure>"
          : "";
        return (
          '<article class="timeline__item reveal' +
          (item.image ? " timeline__item--with-image" : "") +
          '">' +
          '<div class="timeline__year">' +
          item.year +
          "</div>" +
          '<div class="timeline__content">' +
          '<div class="timeline__body">' +
          '<h2 class="timeline__title">' +
          item.title +
          "</h2>" +
          '<div class="timeline__text">' +
          body +
          "</div></div>" +
          figureHtml +
          "</div></article>"
        );
      })
      .join("");
  }

  function renderAbout() {
    var root = document.getElementById("about-prose");
    if (!root || !window.OPEL) return;
    var about = window.OPEL.about;

    function renderParagraphs(paragraphs, withLead) {
      return (paragraphs || [])
        .map(function (p, index) {
          var cls = withLead && index === 0 ? ' class="article-block__lead"' : "";
          return "<p" + cls + ">" + p + "</p>";
        })
        .join("");
    }

    function renderFigure(image, caption, alt) {
      if (!image) return "";
      return (
        '<figure class="article-block__figure reveal">' +
        '<div class="article-block__figure-media">' +
        '<img src="' +
        window.OPEL_UI.path(image) +
        '" alt="' +
        (alt || caption || "About the museum") +
        '" loading="lazy" />' +
        "</div>" +
        (caption
          ? '<figcaption class="article-block__caption">' + caption + "</figcaption>"
          : "") +
        "</figure>"
      );
    }

    if (about.sections && about.sections.length) {
      var heroHtml = about.heroImage
        ? '<figure class="history-hero reveal">' +
          '<div class="history-hero__media">' +
          '<img src="' +
          window.OPEL_UI.path(about.heroImage) +
          '" alt="' +
          (about.heroCaption || about.title || "About") +
          '" loading="eager" />' +
          "</div>" +
          (about.heroCaption
            ? '<figcaption class="history-hero__caption">' +
              about.heroCaption +
              "</figcaption>"
            : "") +
          "</figure>"
        : "";

      root.innerHTML =
        '<article class="article-editorial">' +
        heroHtml +
        (about.lead
          ? '<p class="history-lead reveal">' + about.lead + "</p>"
          : "") +
        '<div class="article-editorial__sections">' +
        about.sections
          .map(function (section, index) {
            var figureHtml = renderFigure(
              section.image,
              section.caption,
              section.heading
            );
            return (
              '<section class="article-block reveal' +
              (figureHtml ? "" : " article-block--no-figure") +
              '">' +
              '<div class="article-block__index" aria-hidden="true">' +
              String(index + 1).padStart(2, "0") +
              "</div>" +
              '<div class="article-block__main">' +
              '<h2 class="article-block__title">' +
              section.heading +
              "</h2>" +
              '<div class="article-block__body">' +
              renderParagraphs(section.paragraphs, true) +
              "</div></div>" +
              figureHtml +
              "</section>"
            );
          })
          .join("") +
        "</article>";
    } else {
      root.innerHTML = about.paragraphs
        .map(function (p) {
          return "<p>" + p + "</p>";
        })
        .join("");
    }
  }

  function renderWorldIndex() {
    var root = document.getElementById("world-categories");
    if (!root || !window.OPEL) return;

    var hero = document.getElementById("world-hero");
    if (hero) {
      var bannerImage =
        (window.OPEL.site && window.OPEL.site.worldBanner) ||
        (window.OPEL.worldCategories.find(function (c) {
          return !!c.image;
        }) || {}).image ||
        (window.OPEL.articles.find(function (a) {
          return !!a.image;
        }) || {}).image ||
        null;
      hero.outerHTML = pageHeroHtml({
        eyebrow: "Stories & themes",
        title: "World of Opel",
        lead: "Concept cars, OPC, rare versions, motorsport, and curious facts.",
        image: bannerImage,
      });
    }

    root.innerHTML = window.OPEL.worldCategories
      .map(function (cat) {
        var media = cat.image
          ? '<img src="' +
            window.OPEL_UI.path(cat.image) +
            '" alt="' +
            cat.name +
            '" loading="lazy" />'
          : window.OPEL_UI.mediaPlaceholder(cat.name);
        return (
          '<a class="tile reveal" href="' +
          window.OPEL_UI.path(
            "pages/world/category.html?id=" + encodeURIComponent(cat.id)
          ) +
          '">' +
          '<div class="tile__media">' +
          media +
          "</div>" +
          '<div class="tile__title">' +
          cat.name +
          "</div>" +
          '<p class="car-card__desc">' +
          cat.description +
          "</p>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderWorldCategory() {
    var root = document.getElementById("category-page");
    if (!root || !window.OPEL) return;
    var id = qs("id");
    var cat = window.OPEL.worldCategories.find(function (c) {
      return c.id === id;
    });
    if (!cat) {
      root.innerHTML = '<div class="container page-pad"><p class="t-h">Category not found</p></div>';
      return;
    }
    document.title = cat.name + " — World of Opel";
    var list = window.OPEL.articlesByCategory(cat.id);
    var chips = window.OPEL.worldCategories
      .map(function (c) {
        return (
          '<a href="' +
          window.OPEL_UI.path(
            "pages/world/category.html?id=" + encodeURIComponent(c.id)
          ) +
          '" class="' +
          (c.id === cat.id ? "is-active" : "") +
          '">' +
          c.name +
          "</a>"
        );
      })
      .join("");

    root.innerHTML =
      pageHeroHtml({
        eyebrow: "World of Opel",
        title: cat.name,
        lead: cat.description,
        image: categoryBannerImage(cat),
      }) +
      '<section class="section surface-white"><div class="container">' +
      '<div class="cat-list">' +
      chips +
      "</div>" +
      '<div class="tile-grid">' +
      (list.length
        ? list
            .map(function (a) {
              return (
                '<a class="tile" href="' +
                window.OPEL_UI.articleHref(a.id) +
                '">' +
                '<div class="tile__media">' +
                articleMedia(a) +
                "</div>" +
                '<div class="tile__date">' +
                a.date +
                "</div>" +
                '<div class="tile__title">' +
                a.title +
                "</div>" +
                '<p class="car-card__desc">' +
                a.excerpt +
                "</p>" +
                "</a>"
              );
            })
            .join("")
        : '<p class="search-empty">Articles coming soon</p>') +
      "</div></div></section>";
  }

  function renderArticle() {
    var root = document.getElementById("article-page");
    if (!root || !window.OPEL) return;
    var article = window.OPEL.getArticle(qs("id"));
    if (!article) {
      root.innerHTML = '<div class="container page-pad"><p class="t-h">Article not found</p></div>';
      return;
    }
    document.title = article.title + " — OPEL";
    var cat = window.OPEL.worldCategories.find(function (c) {
      return c.id === article.category;
    });

    function renderParagraphs(paragraphs, withLead) {
      return (paragraphs || [])
        .map(function (p, index) {
          var cls = withLead && index === 0 ? ' class="article-block__lead"' : "";
          return "<p" + cls + ">" + p + "</p>";
        })
        .join("");
    }

    var specsHtml = renderSpecsHtml(article.specs);

    var sectionsHtml = "";
    if (article.sections && article.sections.length) {
      sectionsHtml = article.sections
        .map(function (section, index) {
          var figureHtml = "";
          if (article.gallery && article.gallery[index]) {
            var item = article.gallery[index];
            figureHtml =
              '<figure class="article-block__figure reveal">' +
              '<div class="article-block__figure-media">' +
              '<img src="' +
              window.OPEL_UI.path(item.image) +
              '" alt="' +
              (item.caption || article.title) +
              '" loading="lazy" />' +
              "</div>" +
              (item.caption
                ? '<figcaption class="article-block__caption">' +
                  item.caption +
                  "</figcaption>"
                : "") +
              "</figure>";
          }

          var blockClass =
            "article-block reveal" +
            (figureHtml ? "" : " article-block--no-figure");

          return (
            '<section class="' +
            blockClass +
            '">' +
            '<div class="article-block__index" aria-hidden="true">' +
            String(index + 1).padStart(2, "0") +
            "</div>" +
            '<div class="article-block__main">' +
            '<h2 class="article-block__title">' +
            section.heading +
            "</h2>" +
            '<div class="article-block__body">' +
            renderParagraphs(section.body, true) +
            "</div>" +
            "</div>" +
            figureHtml +
            "</section>"
          );
        })
        .join("");
    } else {
      sectionsHtml =
        '<div class="article-block article-block--simple reveal">' +
        '<div class="article-block__body article-block__body--wide">' +
        renderParagraphs(
          Array.isArray(article.body) ? article.body : [article.body],
          true
        ) +
        "</div></div>";
    }

    var galleryRemainder =
      article.gallery && article.sections
        ? article.gallery.slice(article.sections.length)
        : article.gallery || [];

    var galleryHtml = "";
    if (galleryRemainder.length) {
      galleryHtml =
        '<section class="article-spread reveal">' +
        '<div class="article-spread__head">' +
        '<span class="article-spread__eyebrow">Press gallery</span>' +
        '<h2 class="article-spread__title">Photography</h2>' +
        "</div>" +
        '<div class="article-gallery article-gallery--spread">' +
        galleryRemainder
          .map(function (item) {
            return (
              '<figure class="article-gallery__item">' +
              '<div class="article-gallery__media">' +
              '<img src="' +
              window.OPEL_UI.path(item.image) +
              '" alt="' +
              (item.caption || article.title) +
              '" loading="lazy" />' +
              "</div>" +
              (item.caption
                ? '<figcaption class="article-gallery__caption">' +
                  item.caption +
                  "</figcaption>"
                : "") +
              "</figure>"
            );
          })
          .join("") +
        "</div></section>";
    }

    root.innerHTML =
      pageHeroHtml({
        eyebrow:
          (cat ? cat.name : "World of Opel") + " · " + article.date,
        title: article.title,
        lead: article.excerpt,
        image: article.image || categoryBannerImage(cat),
      }) +
      '<section class="section surface-white article-page">' +
      '<div class="container">' +
      '<article class="article-editorial">' +
      specsHtml +
      '<div class="article-editorial__sections">' +
      sectionsHtml +
      "</div>" +
      galleryHtml +
      '<footer class="article-editorial__footer">' +
      '<a class="btn-ghost" href="' +
      window.OPEL_UI.path(
        "pages/world/category.html?id=" + encodeURIComponent(article.category)
      ) +
      '">← Back to ' +
      (cat ? cat.name : "category") +
      "</a></footer>" +
      "</article></div></section>";
  }

  function renderGallery() {
    var root = document.getElementById("gallery-grid");
    if (!root || !window.OPEL) return;

    var items = window.OPEL.gallery.map(function (g, index) {
      var car = g.carId ? window.OPEL.getCar(g.carId) : null;
      var label = g.caption || (car ? car.name : "Opel");
      var src = g.image || (car && car.image) || null;
      var media = src
        ? '<img src="' +
          window.OPEL_UI.path(src) +
          '" alt="' +
          label +
          '" loading="lazy" />'
        : window.OPEL_UI.mediaPlaceholder(label);
      return {
        index: index,
        label: label,
        src: src,
        html:
          '<button type="button" class="gallery-item" data-index="' +
          index +
          '" aria-label="Open ' +
          label +
          '">' +
          media +
          "</button>",
      };
    });

    root.innerHTML = items
      .map(function (i) {
        return i.html;
      })
      .join("");

    var lightbox = document.getElementById("lightbox");
    var lightboxStage = document.getElementById("lightbox-stage");
    var current = 0;

    function open(i) {
      current = i;
      var item = items[current];
      if (item.src) {
        lightboxStage.innerHTML =
          '<img class="lightbox__img" src="' +
          window.OPEL_UI.path(item.src) +
          '" alt="' +
          item.label +
          '" />';
      } else {
        lightboxStage.innerHTML =
          '<div class="tile__placeholder" style="width:min(90vw,900px);aspect-ratio:16/10">' +
          item.label +
          "</div>";
      }
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    root.querySelectorAll(".gallery-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(Number(btn.getAttribute("data-index")));
      });
    });

    document.getElementById("lightbox-close").addEventListener("click", close);
    document.getElementById("lightbox-prev").addEventListener("click", function () {
      open((current - 1 + items.length) % items.length);
    });
    document.getElementById("lightbox-next").addEventListener("click", function () {
      open((current + 1) % items.length);
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") open((current - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") open((current + 1) % items.length);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");
    if (page === "home") renderHome();
    if (page === "collection") renderCollection();
    if (page === "car") renderCar();
    if (page === "history") renderHistory();
    if (page === "timeline") renderTimeline();
    if (page === "world") renderWorldIndex();
    if (page === "world-category") renderWorldCategory();
    if (page === "article") renderArticle();
    if (page === "gallery") renderGallery();
    if (page === "about") renderAbout();
    if (window.OPEL_UI && window.OPEL_UI.refreshReveal) {
      window.OPEL_UI.refreshReveal();
    }
  });
})();

(function () {
  "use strict";

  function basePath() {
    var body = document.body;
    return (body && body.getAttribute("data-base")) || "";
  }

  function path(rel) {
    return basePath() + rel;
  }

  var ICONS = {
    search:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  };

  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    mount.innerHTML =
      '<header class="site-header">' +
      '<div class="site-header__inner">' +
      '<button type="button" class="nav-menu-btn" id="menu-open" aria-label="Open menu">' +
      '<span class="nav-menu-btn__icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
      "<span>Menu</span>" +
      "</button>" +
      '<a class="site-logo" href="' +
      path("index.html") +
      '" aria-label="OPEL home">' +
      '<img src="' +
      path("media/brand/opel-logo.png") +
      '" alt="Opel" width="1024" height="813" />' +
      "</a>" +
      '<div class="nav-actions">' +
      '<button type="button" class="nav-icon-btn" id="search-open" aria-label="Search">' +
      ICONS.search +
      "</button>" +
      "</div>" +
      "</div>" +
      "</header>" +
      '<div class="menu-overlay" id="menu-overlay" hidden>' +
      '<button type="button" class="menu-overlay__close" id="menu-close">Close</button>' +
      '<nav class="menu-overlay__list" aria-label="Primary">' +
      '<a href="' +
      path("index.html") +
      '">Home</a>' +
      '<a href="' +
      path("pages/collection.html") +
      '">Collection</a>' +
      '<div class="menu-overlay__sub" id="menu-cars"></div>' +
      '<a href="' +
      path("pages/history.html") +
      '">History of Opel</a>' +
      '<a href="' +
      path("pages/timeline.html") +
      '">Timeline</a>' +
      '<a href="' +
      path("pages/world/index.html") +
      '">World of Opel</a>' +
      '<div class="menu-overlay__sub" id="menu-world"></div>' +
      '<a href="' +
      path("pages/gallery.html") +
      '">Gallery</a>' +
      '<a href="' +
      path("pages/about.html") +
      '">About</a>' +
      "</nav>" +
      "</div>" +
      '<div class="search-panel" id="search-panel">' +
      '<div class="search-panel__inner">' +
      '<label class="sr-only" for="global-search">Search cars</label>' +
      '<input id="global-search" type="search" placeholder="Search by model, generation, year…" autocomplete="off" />' +
      '<div class="search-panel__results" id="search-results"></div>' +
      "</div>" +
      "</div>";

    var carsMount = document.getElementById("menu-cars");
    if (carsMount && window.OPEL) {
      carsMount.innerHTML = window.OPEL.cars
        .map(function (car) {
          return (
            '<a href="' +
            path("pages/car.html?id=" + encodeURIComponent(car.id)) +
            '">' +
            car.name +
            " " +
            car.generation +
            "</a>"
          );
        })
        .join("");
    }

    var worldMount = document.getElementById("menu-world");
    if (worldMount && window.OPEL) {
      worldMount.innerHTML = window.OPEL.worldCategories
        .map(function (cat) {
          return (
            '<a href="' +
            path("pages/world/category.html?id=" + encodeURIComponent(cat.id)) +
            '">' +
            cat.name +
            "</a>"
          );
        })
        .join("");
    }

    var overlay = document.getElementById("menu-overlay");
    var openBtn = document.getElementById("menu-open");
    var closeBtn = document.getElementById("menu-close");
    var searchPanel = document.getElementById("search-panel");
    var searchOpen = document.getElementById("search-open");
    var searchInput = document.getElementById("global-search");
    var searchResults = document.getElementById("search-results");

    function openMenu() {
      overlay.hidden = false;
      requestAnimationFrame(function () {
        overlay.classList.add("is-open");
      });
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () {
        if (!overlay.classList.contains("is-open")) overlay.hidden = true;
      }, 450);
    }

    function openSearch() {
      searchPanel.classList.add("is-open");
      searchInput.focus();
      renderSearch(searchInput.value || "");
    }

    function closeSearch() {
      searchPanel.classList.remove("is-open");
    }

    function toggleSearch(e) {
      e.stopPropagation();
      if (searchPanel.classList.contains("is-open")) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    function renderSearch(q) {
      if (!window.OPEL) return;
      var list = window.OPEL.searchCars(q);
      if (!list.length) {
        searchResults.innerHTML = '<p class="search-empty">No cars found</p>';
        return;
      }
      searchResults.innerHTML = list
        .map(function (car) {
          return (
            '<a class="search-result" href="' +
            path("pages/car.html?id=" + encodeURIComponent(car.id)) +
            '"><span>' +
            car.name +
            " " +
            car.generation +
            '</span><span class="search-result__meta">' +
            car.years +
            "</span></a>"
          );
        })
        .join("");
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    searchOpen.addEventListener("click", toggleSearch);
    searchPanel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    document.addEventListener("click", function () {
      if (searchPanel.classList.contains("is-open")) closeSearch();
    });
    searchInput.addEventListener("input", function () {
      renderSearch(searchInput.value);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
        closeSearch();
      }
    });
  }

  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;

    mount.innerHTML =
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="site-footer__grid">' +
      "<div>" +
      '<div class="site-footer__brand">OPEL</div>' +
      "<p>A private digital museum of Opel automobiles produced before 2007. Built for looking, reading, and remembering.</p>" +
      "</div>" +
      '<div class="site-footer__col">' +
      "<h3>Explore</h3>" +
      '<a href="' +
      path("pages/collection.html") +
      '">Collection</a>' +
      '<a href="' +
      path("pages/history.html") +
      '">History</a>' +
      '<a href="' +
      path("pages/timeline.html") +
      '">Timeline</a>' +
      '<a href="' +
      path("pages/world/index.html") +
      '">World of Opel</a>' +
      "</div>" +
      '<div class="site-footer__col">' +
      "<h3>More</h3>" +
      '<a href="' +
      path("pages/gallery.html") +
      '">Gallery</a>' +
      '<a href="' +
      path("pages/about.html") +
      '">About</a>' +
      "</div>" +
      "</div>" +
      '<div class="site-footer__bottom">' +
      "<span>Personal collection · Non-commercial</span>" +
      "<span>Opel automobiles until 2007</span>" +
      "</div>" +
      "</div>" +
      "</footer>";
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  window.OPEL_UI = {
    path: path,
    basePath: basePath,
    refreshReveal: initReveal,
    mediaPlaceholder: function (label) {
      return (
        '<div class="tile__placeholder" role="img" aria-label="' +
        label +
        '">' +
        label +
        "</div>"
      );
    },
    carHref: function (id) {
      return path("pages/car.html?id=" + encodeURIComponent(id));
    },
    articleHref: function (id) {
      return path("pages/world/article.html?id=" + encodeURIComponent(id));
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    initReveal();
  });
})();

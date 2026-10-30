(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */

  function readTheme() {
    try { return localStorage.getItem("ja-theme"); } catch (e) { return null; }
  }
  function writeTheme(v) {
    try { localStorage.setItem("ja-theme", v); } catch (e) {}
  }

  var saved = readTheme();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      writeTheme(next);
      toggle.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  /* ---------- sticky nav state ---------- */

  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- reveal on scroll ----------
     The page is complete at rest: elements are visible by default.
     Only items below the first viewport get a pre-state, added here
     by script, so the first painted frame always shows everything. */

  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!reduce && "IntersectionObserver" in window && revealables.length) {
    var vh = window.innerHeight;
    var pending = revealables.filter(function (el) {
      return el.getBoundingClientRect().top > vh * 0.9;
    });
    pending.forEach(function (el, i) {
      el.classList.add("is-pre");
      el.style.transitionDelay = (Math.min(i, 4) * 60) + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove("is-pre");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    pending.forEach(function (el) { io.observe(el); });
    // failsafe: nothing stays hidden if the observer never fires
    // (page capture, restored scroll position, odd embeddings)
    setTimeout(function () {
      pending.forEach(function (el) { el.classList.remove("is-pre"); });
    }, 2500);
  }

  /* ---------- counters ---------- */

  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  function runCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    if (reduce) { el.textContent = String(target); return; }
    var start = performance.now();
    var dur = 1100;
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { co.observe(el); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---------- hero pipeline ---------- */

  var pipe = document.getElementById("pipe");
  if (pipe) {
    var nodes = Array.prototype.slice.call(pipe.querySelectorAll(".node"));
    var clock = document.getElementById("pipeClock");
    var label = document.getElementById("pipeStage");

    if (reduce) {
      nodes.forEach(function (n) { n.classList.add("is-done"); });
      if (clock) clock.textContent = "static";
      if (label) label.textContent = "motion reduced";
    } else {
      var DWELL = 1150;
      var idx = 0;
      var t0 = performance.now();
      var running = true;

      function paint() {
        nodes.forEach(function (n, i) {
          n.classList.toggle("is-live", i === idx);
          n.classList.toggle("is-done", i < idx);
          var bar = n.querySelector(".bar i");
          if (bar) bar.style.width = i < idx ? "100%" : i === idx ? "100%" : "0%";
        });
        if (label) label.textContent = nodes[idx].getAttribute("data-stage") || "";
      }

      function step() {
        if (!running) return;
        idx += 1;
        if (idx >= nodes.length) {
          idx = 0;
          t0 = performance.now();
          nodes.forEach(function (n) {
            n.classList.remove("is-done", "is-live");
            var bar = n.querySelector(".bar i");
            if (bar) bar.style.width = "0%";
          });
        }
        paint();
        setTimeout(step, idx === 0 ? DWELL + 500 : DWELL);
      }

      function tickClock(now) {
        if (!running) return;
        if (clock) {
          var s = (now - t0) / 1000;
          clock.textContent = "T+" + s.toFixed(1).padStart(4, "0") + "s";
        }
        requestAnimationFrame(tickClock);
      }

      paint();
      setTimeout(step, DWELL);
      requestAnimationFrame(tickClock);

      document.addEventListener("visibilitychange", function () {
        running = !document.hidden;
        if (running) { t0 = performance.now(); setTimeout(step, DWELL); requestAnimationFrame(tickClock); }
      });
    }
  }

  /* ---------- marquee: duplicate the track so the loop is seamless ---------- */

  var mq = document.querySelector(".marquee-in");
  if (mq && !reduce) {
    mq.innerHTML = mq.innerHTML + mq.innerHTML;
  }

  /* ---------- copy buttons ---------- */

  Array.prototype.slice.call(document.querySelectorAll("[data-copy]")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("ok");
        setTimeout(function () { btn.textContent = old; btn.classList.remove("ok"); }, 1600);
      };
      var fallback = function () {
        var row = btn.closest(".copyrow");
        var v = row && row.querySelector(".v");
        if (v && window.getSelection) {
          var r = document.createRange();
          r.selectNodeContents(v);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(r);
          btn.textContent = "Selected";
          setTimeout(function () { btn.textContent = "Copy"; }, 1600);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  /* ---------- active section in nav ---------- */

  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (sectionLinks.length && "IntersectionObserver" in window) {
    var map = {};
    sectionLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) map[el.id] = a;
    });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          sectionLinks.forEach(function (a) { a.classList.remove("is-active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }
})();

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

/* ---------- contact form ----------
   With a POST endpoint configured it submits for real. Without one it falls
   back to opening a pre-filled email, so the form is never a dead end. Either
   way the submit is intercepted — this page is static and has no backend. */

(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');
  var to = form.getAttribute("data-to") || "";

  function setError(field, message) {
    var slot = field.parentElement.querySelector(".field-err");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (!slot) return;
    if (message) { slot.textContent = message; slot.hidden = false; }
    else { slot.textContent = ""; slot.hidden = true; }
  }

  function validate() {
    var ok = true;
    var first = null;
    Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (el) {
      var v = (el.value || "").trim();
      var msg = "";
      if (el.hasAttribute("required") && !v) msg = "This one is needed.";
      else if (el.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "That address looks incomplete.";
      setError(el, msg);
      if (msg) { ok = false; if (!first) first = el; }
    });
    if (first) first.focus();
    return ok;
  }

  function say(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
    status.hidden = false;
  }

  function values() {
    var out = {};
    Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (el) {
      out[el.name] = (el.value || "").trim();
    });
    return out;
  }

  /* no endpoint yet: hand the message to the visitor's mail client, and keep
     the text on screen so nothing is lost if that does not open */
  function mailFallback(v) {
    var subject = "Site enquiry — " + (v.name || "no name");
    var body =
      "Name: " + (v.name || "") + "\n" +
      "Email: " + (v.email || "") + "\n" +
      "Links: " + (v.links || "—") + "\n\n" +
      (v.message || "");
    var href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    try { window.location.href = href; } catch (e) {}
    say("Your email app should be opening. If it does not, copy the address above and paste this message in — nothing here is lost.", "warn");
  }

  /* Web3Forms wants its key in the body and always posts to one fixed URL.
     Everything else (Formspree and friends) takes a plain JSON POST to the
     URL you were given. A value that is not a URL is treated as a Web3Forms
     access key, because pasting the bare key into the endpoint is the easy
     mistake — and `fetch("somekey")` resolves against the site, which hands
     back the 404 page and a confusing "Unexpected token '<'" JSON error. */
  var W3_URL = "https://api.web3forms.com/submit";

  function config() {
    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var isUrl = /^https?:\/\//i.test(endpoint);
    var key = (form.getAttribute("data-key") || "").trim() || (isUrl ? "" : endpoint);
    return { key: key, url: key ? W3_URL : (isUrl ? endpoint : "") };
  }

  /* Read the response without assuming it is JSON. A misconfigured endpoint
     usually answers with an HTML error page, and calling .json() on that
     throws a parser error that tells the visitor nothing. */
  function readReply(r) {
    return r.text().then(function (body) {
      var data = null;
      try { data = JSON.parse(body); } catch (err) {}
      if (data === null) {
        throw new Error(
          r.ok
            ? "The form service replied with a page instead of a result. Check the endpoint or access key."
            : "The form service returned an error (" + r.status + ")."
        );
      }
      if (!r.ok || data.success === false) {
        throw new Error(data.message || "The form service rejected the message.");
      }
      return data;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var v = values();

    var cfg = config();
    if (!cfg.url) { mailFallback(v); return; }

    var payload = {
      name: v.name,
      email: v.email,
      links: v.links || "",
      message: v.message
    };
    if (cfg.key) {
      payload.access_key = cfg.key;
      payload.subject = "Portfolio enquiry from " + (v.name || "someone");
      payload.from_name = v.name || "Portfolio site";
      payload.replyto = v.email || "";
    }

    var original = button.innerHTML;
    button.disabled = true;
    button.textContent = form.getAttribute("data-sending") || "Sending…";
    if (status) status.hidden = true;

    fetch(cfg.url, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(readReply)
      .then(function () {
        form.reset();
        say(form.getAttribute("data-ok") || "Sent.", "ok");
      })
      .catch(function (err) {
        var base = form.getAttribute("data-failed") || "That did not send.";
        var detail = err && err.message ? " " + err.message : "";
        say(base + detail, "bad");
      })
      .then(function () {
        button.disabled = false;
        button.innerHTML = original;
      });
  });

  /* clear a field's error as soon as the visitor starts fixing it */
  Array.prototype.forEach.call(form.querySelectorAll("input, textarea"), function (el) {
    el.addEventListener("input", function () { setError(el, ""); });
  });
})();

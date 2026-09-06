/* ============================================================
   PRISMATIC SOUL — main.js
   - Hamburger nav toggle
   - Cookie consent (consent-gated analytics stub)
   - Smooth-scroll for in-page anchors (respects reduced motion)
   ============================================================ */

(function () {
  "use strict";

  /* -----  Hamburger nav  ----------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    // close the nav when a link inside it is tapped
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // close the nav on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* -----  Cookie consent  ---------------------------------- */
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  const consent = localStorage.getItem("ps-cookie-consent");

  function loadAnalytics() {
    // Cloudflare Web Analytics is cookieless, but we still gate it
    // behind explicit consent for an extra-light privacy posture.
    if (localStorage.getItem("ps-cookie-consent") !== "accepted") return;
    if (window.__psAnalyticsLoaded) return;
    window.__psAnalyticsLoaded = true;
    // Placeholder for Cloudflare Web Analytics beacon — token swapped at deploy:
    // const s = document.createElement("script");
    // s.defer = true;
    // s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    // s.setAttribute("data-cf-beacon", '{"token":"YOUR_TOKEN"}');
    // document.head.appendChild(s);
  }

  if (banner) {
    // If already consented, remove the banner element entirely (no chance of it reappearing).
    if (consent) {
      banner.remove();
      if (consent === "accepted") loadAnalytics();
    } else {
      // First visit — show the banner.
      banner.removeAttribute("hidden");
      banner.style.display = "flex";
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("ps-cookie-consent", "accepted");
        banner.remove();
        loadAnalytics();
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        localStorage.setItem("ps-cookie-consent", "declined");
        banner.remove();
      });
    }
  }

  /* -----  Smooth scroll (respects reduced motion)  --------- */
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        const id = a.getAttribute("href").slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });
  }
})();

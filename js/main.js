    document.addEventListener("DOMContentLoaded", function () {

      /* ── CURSOR PERSONALIZADO ── */
      const cursor = document.getElementById("cursor");
      const ring = document.getElementById("cursor-ring");
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + "px"; cursor.style.top = my + "px"; });
      function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(animRing); }
      animRing();
      document.querySelectorAll("a, button, .data-card, .membro-card, .parceiro-item, .risco-tag, .apoio-card, .processo-card, .hero-stat").forEach(el => {
        el.addEventListener("mouseenter", () => { cursor.classList.add("hover"); ring.classList.add("hover"); });
        el.addEventListener("mouseleave", () => { cursor.classList.remove("hover"); ring.classList.remove("hover"); });
      });

      /* ── NAVBAR SCROLL ── */
      const navbar = document.getElementById("navbar");
      const links = document.querySelectorAll(".nav-links a");
      const sections = document.querySelectorAll("section, header");
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
        document.getElementById("progress-bar").style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + "%";
        document.getElementById("back-to-top").classList.toggle("visible", window.scrollY > 500);
        let current = "";
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
        links.forEach(a => { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
      });

      /* ── HAMBURGER ── */
      const btn = document.getElementById("hamburger-btn");
      const menu = document.getElementById("nav-menu");
      btn.addEventListener("click", () => { menu.classList.toggle("active"); btn.classList.toggle("open"); });
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("active"); btn.classList.remove("open"); }));

      /* ── REVEAL ON SCROLL ── */
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));

      /* ── COUNTER ANIMATION ── */
      const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const isFloat = el.dataset.count.includes(".");
            const duration = 1800;
            const start = performance.now();
            function step(now) {
              const progress = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              const val = isFloat ? (target * ease).toFixed(2) : Math.round(target * ease);
              el.textContent = val.toLocaleString("pt-BR");
              if (progress < 1) requestAnimationFrame(step);
              else el.textContent = target.toLocaleString("pt-BR");
            }
            requestAnimationFrame(step);
            counterObs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll("[data-count]").forEach(el => counterObs.observe(el));

      /* ── BACK TO TOP ── */
      document.getElementById("back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

      /* ── MODAIS ── */
      document.querySelectorAll("[data-modal]").forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
          document.getElementById(card.dataset.modal).classList.add("open");
        });
      });
      document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
          document.getElementById(btn.dataset.close).classList.remove("open");
        });
      });
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("open"); });
      });
      document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".modal-overlay").forEach(o => o.classList.remove("open")); });

      /* ── PARALLAX HERO ── */
      window.addEventListener("scroll", () => {
        const hero = document.querySelector("#hero .hero-content");
        if (hero) hero.style.transform = "translateY(" + (window.scrollY * 0.22) + "px)";
      });

    });

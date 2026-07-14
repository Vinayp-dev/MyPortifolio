gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCompactScreen = window.matchMedia("(max-width: 768px)").matches;

/* ---- Nav scroll state ---- */
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: "top -80",
  onUpdate: (self) => nav.classList.toggle("scrolled", self.scroll() > 80),
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

if (!prefersReducedMotion && !isCompactScreen) {
  /* ---- Hero entrance ---- */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(".hero .reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.15 })
    .from(".hero-photo-frame", { opacity: 0, scale: 0.92, rotation: -2, duration: 1 }, "-=0.5");

  /* Doodle stroke draw */
  document.querySelectorAll(".doodle-stroke").forEach((el) => {
    const len = el.getTotalLength?.() || 300;
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
  });
  gsap.to(".doodle-stroke", { strokeDashoffset: 0, duration: 1.8, stagger: 0.15, ease: "power2.inOut", delay: 0.6 });

  /* ---- Scrollytelling: timeline-based crossfade ---- */
  const panels = gsap.utils.toArray(".story-panel");
  const dots = gsap.utils.toArray(".story-dot");
  const visuals = gsap.utils.toArray(".story-visual");
  const progressBar = document.querySelector(".story-progress-bar");

  gsap.set(panels, { opacity: 0, y: 50, pointerEvents: "none" });
  gsap.set(panels[0], { opacity: 1, y: 0, pointerEvents: "auto" });
  gsap.set(visuals, { opacity: 0, y: 14, scale: 0.98 });
  gsap.set(visuals[0], { opacity: 1, y: 0, scale: 1 });

  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top top",
      end: () => `+=${window.innerHeight * (panels.length + 0.2)}`,
      pin: ".story-pin",
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressBar.style.width = `${self.progress * 100}%`;
        const activeIdx = Math.min(
          Math.round(self.progress * (panels.length - 1)),
          panels.length - 1
        );
        dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIdx));
        visuals.forEach((visual, i) => visual.classList.toggle("active", i === activeIdx));
      },
    },
  });

  panels.forEach((panel, i) => {
    if (i === 0) return;
    const prev = panels[i - 1];
    storyTl
      .to(prev, { opacity: 0, y: -35, duration: 0.8, ease: "power2.inOut" })
      .to(prev, { pointerEvents: "none", duration: 0 }, "<")
      .to(panel, { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }, "<0.35")
      .to(panel, { pointerEvents: "auto", duration: 0 }, "<");
  });

  /* ---- Section reveals ---- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power2.out",
    });
  });

  /* ---- Project cards: staggered slide-in ---- */
  ScrollTrigger.batch(".project-card", {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        x: -50,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    },
  });

  /* ---- Skill groups ---- */
  ScrollTrigger.batch(".skill-group", {
    start: "top 92%",
    once: true,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });

  /* ---- Certificate cards ---- */
  ScrollTrigger.batch(".cert-card", {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    },
  });

  /* ---- Hero photo parallax ---- */
  gsap.to(".hero-visual", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
    y: 60,
    opacity: 0.4,
  });

  /* ---- Hide scroll hint ---- */
  gsap.to(".scroll-hint", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=150",
      scrub: true,
    },
    opacity: 0,
    y: 16,
  });

  /* ---- Refresh on resize ---- */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
} else {
  document.querySelectorAll(".reveal, .story-panel").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  document.querySelectorAll(".story-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === 0);
  });
  document.querySelectorAll(".story-visual").forEach((visual, i) => {
    visual.classList.toggle("active", i === 0);
  });
}

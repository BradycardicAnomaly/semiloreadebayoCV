const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const panels = [...document.querySelectorAll(".research-grid")];

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

filterButtons.forEach((button, index) => {
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? filterButtons.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + filterButtons.length) % filterButtons.length;
    filterButtons[nextIndex].focus();
    filterButtons[nextIndex].click();
  });
});

const readMoreButtons = [...document.querySelectorAll(".read-more")];

readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "Read more" : "Show less";
    details.hidden = isExpanded;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));

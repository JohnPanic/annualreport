const reportToggle = document.querySelector(".report-toggle");
const reportClose = document.querySelector(".report-close");
const reportMenu = document.querySelector("#report-menu");
const toggleMark = document.querySelector(".toggle-mark");
const chapterLinks = document.querySelectorAll(".chapter-menu a");
const siteHeader = document.querySelector(".site-header");
const mobileHeaderQuery = window.matchMedia("(max-width: 800px)");
let lastScrollY = window.scrollY;

function setReportMenu(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  reportMenu.setAttribute("aria-hidden", String(!isOpen));
  reportToggle.setAttribute("aria-expanded", String(isOpen));
  toggleMark.textContent = isOpen ? "x" : "+";
}

reportToggle.addEventListener("click", () => {
  const isOpen = reportToggle.getAttribute("aria-expanded") === "true";
  setReportMenu(!isOpen);
});

reportClose.addEventListener("click", () => setReportMenu(false));

chapterLinks.forEach((link) => {
  link.addEventListener("click", () => setReportMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setReportMenu(false);
  }
});

function updateHeaderVisibility() {
  if (!siteHeader) {
    return;
  }

  if (!mobileHeaderQuery.matches || document.body.classList.contains("menu-open")) {
    siteHeader.classList.remove("is-hidden");
    lastScrollY = window.scrollY;
    return;
  }

  const currentScrollY = window.scrollY;
  const isScrollingDown = currentScrollY > lastScrollY;
  const isPastHeader = currentScrollY > siteHeader.offsetHeight;

  siteHeader.classList.toggle("is-hidden", isScrollingDown && isPastHeader);
  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
document.addEventListener("scroll", updateHeaderVisibility, { passive: true });
if (mobileHeaderQuery.addEventListener) {
  mobileHeaderQuery.addEventListener("change", updateHeaderVisibility);
} else {
  mobileHeaderQuery.addListener(updateHeaderVisibility);
}
updateHeaderVisibility();

const animatedCharts = document.querySelectorAll(".chart-animate");

if (animatedCharts.length > 0) {
  function revealVisibleCharts() {
    animatedCharts.forEach((chart) => {
      const chartTop = chart.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.85;

      if (chartTop < triggerPoint) {
        chart.classList.add("is-visible");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const chartObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.01 }
    );

    animatedCharts.forEach((chart) => chartObserver.observe(chart));
  }

  window.addEventListener("scroll", revealVisibleCharts, { passive: true });
  window.addEventListener("resize", revealVisibleCharts);
  const chartRevealTimer = window.setInterval(() => {
    revealVisibleCharts();

    if (document.querySelectorAll(".chart-animate:not(.is-visible)").length === 0) {
      window.clearInterval(chartRevealTimer);
    }
  }, 250);
  revealVisibleCharts();
}

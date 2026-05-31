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

const reportToggle = document.querySelector(".report-toggle");
const reportClose = document.querySelector(".report-close");
const reportMenu = document.querySelector("#report-menu");
const toggleMark = document.querySelector(".toggle-mark");
const chapterLinks = document.querySelectorAll(".chapter-menu a");

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

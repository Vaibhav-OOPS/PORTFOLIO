const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const scrollTopBtn = document.querySelector(".scroll-top");
const yearEl = document.getElementById("currentYear");
const emailBtn = document.getElementById("emailBtn");
const emailReveal = document.getElementById("emailReveal");

const setYear = () => {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
};

const toggleNav = () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open");
};

const closeNavOnLink = (event) => {
  if (event.target.matches(".nav-links a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
};

const handleScroll = () => {
  const scrolled = window.scrollY > 50;
  header.classList.toggle("header-shadow", scrolled);
  scrollTopBtn.classList.toggle("show", window.scrollY > 400);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const revealEmail = () => {
  if (!emailBtn || !emailReveal) return;
  const email = emailBtn.dataset.email;
  emailReveal.textContent = email;
  emailReveal.classList.add("visible");
};

const toggleResumeViewer = (event) => {
  const button = event.target.closest(".view-resume-btn");
  if (!button) return;
  
  const resumeId = button.dataset.resume;
  const viewer = document.getElementById(`resumeViewer${resumeId.slice(-1)}`);
  
  if (!viewer) return;
  
  const isVisible = viewer.style.display !== "none";
  viewer.style.display = isVisible ? "none" : "block";
  button.textContent = isVisible ? "View Resume" : "Hide Resume";
  
  // Smooth scroll to viewer when opening
  if (!isVisible) {
    setTimeout(() => {
      viewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
};

const init = () => {
  setYear();
  navToggle.addEventListener("click", toggleNav);
  navLinks.addEventListener("click", closeNavOnLink);
  window.addEventListener("scroll", handleScroll, { passive: true });
  scrollTopBtn.addEventListener("click", scrollToTop);
  emailBtn?.addEventListener("click", revealEmail);
  
  // Handle resume viewer buttons
  const resumeContainer = document.getElementById("resume");
  if (resumeContainer) {
    resumeContainer.addEventListener("click", toggleResumeViewer);
  }
};

document.addEventListener("DOMContentLoaded", init);


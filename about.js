// Navbar toggle for mobile
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when link clicked (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menuIcon.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Scroll reveal for sections
function revealOnScroll() {
  const elements = document.querySelectorAll('.section-title, .feature-card, .hero-content');
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight * 0.85) {
      el.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);
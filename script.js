// Mobile menu toggle
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menuIcon.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Scroll reveal animations
function checkScroll() {
  const elements = document.querySelectorAll('.section-title, .feature-card, .action-buttons');
  elements.forEach(el => {
    const elPos = el.getBoundingClientRect().top;
    if(elPos < window.innerHeight * 0.85){
      el.style.animation = 'fadeInUp 0.6s ease forwards';
    }
  });
}

window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Dropdown toggle (if used in future)
function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

window.onclick = function(event) {
  const menu = document.getElementById("dropdownMenu");
  if (menu && !event.target.matches('.menu') && !event.target.closest('#dropdownMenu')) {
    menu.style.display = "none";
  }
}
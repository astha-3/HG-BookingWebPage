document.addEventListener('DOMContentLoaded', () => {
  // ===== Header + Nav =====
  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = header.querySelectorAll('nav a:not([href="#booking"]), nav button');
  const bookBtn = header.querySelector('a[href="#booking"]'); // Book Now button
  
  let lastScrollTop = 0;

  // ===== Scroll: Hide/Show Header + Dynamic Nav Color =====
  window.addEventListener('scroll', () => {
    const st = window.scrollY;

    // 1️⃣ Hide / Show Header
    if (st > lastScrollTop && st > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScrollTop = st <= 0 ? 0 : st;

    // 2️⃣ Dynamic nav color based on hero visibility
    const hero = document.getElementById('home');
    if (hero) {
      const heroRect = hero.getBoundingClientRect();
      const heroVisible = heroRect.bottom > 0;

      // Nav links
      menuLinks.forEach(link => {
        link.classList.toggle('text-brand-50', heroVisible); // white on hero
        link.classList.toggle('text-brand-700', !heroVisible); // deep blue after hero
      });

      // Book Now button text
      if (bookBtn) {
        bookBtn.classList.toggle('text-brand-50', heroVisible); // white on hero
        bookBtn.classList.toggle('text-brand-700', !heroVisible); // dark on light sections
      }
    }
  });

  // ===== Mobile Menu Toggle =====
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // ===== Alpine.js Calendar (Optional) =====
  document.addEventListener('alpine:init', () => {
    Alpine.data('calendar', () => ({
      selectedDay: new Date().getDate()
    }));
  });
});
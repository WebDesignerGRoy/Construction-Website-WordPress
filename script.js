/* ============================================
   MORPH® CONSTRUCTION STUDIO — SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL BEHAVIOR =====
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ===== SCROLL FADE-UP ANIMATIONS =====
  const fadeElements = document.querySelectorAll(
    '.service-card, .blog-card, .portfolio-item, .stat-card, .testimonial-card, .contact-info-item, .quote-grid, .why-grid, .cta-banner-right, .tagline-content'
  );

  // Add fade-up class to elements
  fadeElements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid items
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        const delay = Math.min(index * 80, 400); // max 400ms delay

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));


  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-primary');
      const originalText = btn.textContent;

      // Simple validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e74c3c';
          valid = false;
          setTimeout(() => input.style.borderColor = '', 2000);
        }
      });

      if (!valid) return;

      // Simulate form submission
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.75';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#27ae60';
        btn.style.opacity = '1';
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }


  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.querySelector('button').addEventListener('click', () => {
      const input = newsletterForm.querySelector('input');
      if (!input.value.trim() || !input.value.includes('@')) {
        input.style.borderColor = '#e74c3c';
        input.focus();
        setTimeout(() => input.style.borderColor = '', 2000);
        return;
      }

      const btn = newsletterForm.querySelector('button');
      btn.textContent = '✓';
      btn.style.background = '#27ae60';
      input.value = '';
      input.placeholder = 'Subscribed! Thank you.';

      setTimeout(() => {
        btn.textContent = '→';
        btn.style.background = '';
        input.placeholder = 'Your email address';
      }, 3000);
    });
  }


  // ===== PORTFOLIO ITEM HOVER LABELS =====
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '2';
    });
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '';
    });
  });


  // ===== PLAY BUTTON ANIMATION =====
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Pulse animation on click
      playBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        playBtn.style.transform = '';
      }, 150);
      // Could open a video modal here
      alert('🎬 Video tour coming soon!');
    });
  }


  // ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--orange)'
            : '';
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(s => sectionObserver.observe(s));


  // ===== STAT NUMBER COUNT-UP ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-card h3');

  const countUp = (el) => {
    const text = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;

    const target = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');
    const isDecimal = numMatch[0].includes('.');
    const duration = 1500;
    const steps = 50;
    const stepValue = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = stepValue * step;
      if (step >= steps) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
    }, duration / steps);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));


  // ===== PARALLAX HERO =====
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
      }
    }, { passive: true });
  }

});

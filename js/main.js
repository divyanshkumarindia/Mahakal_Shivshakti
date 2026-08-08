/* ==========================================================================
   MAHAKAL SHIVSHAKTI COAL TRANSPORT ENTERPRISE - INTERACTIVE JS & TRANSITIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initNavigation();
  initAnimatedCounters();
  initFormSubmissions();
  initScrollAnimations();
});

/* 1. Smooth Page Changing Transition (Matching mahakalcoal.co.in) */
function initPageTransitions() {
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }

  // Fade out transition overlay on initial page load
  window.addEventListener('pageshow', () => {
    overlay.classList.remove('active');
  });

  // Intercept internal link clicks for smooth page wipe transition
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');

      // Only transition internal HTML links (ignoring hash links or external protocols)
      if (
        targetUrl &&
        !targetUrl.startsWith('#') &&
        !targetUrl.startsWith('tel:') &&
        !targetUrl.startsWith('mailto:') &&
        !targetUrl.startsWith('http://') &&
        !targetUrl.startsWith('https://')
      ) {
        e.preventDefault();
        
        // Trigger smooth transition overlay
        overlay.classList.add('active');

        // Use Native CSS View Transitions API if supported
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            window.location.href = targetUrl;
          });
        } else {
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 300);
        }
      }
    });
  });
}

/* 2. Mobile Menu Drawer & Nav Links */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.querySelector('i').className = isOpen ? 'ri-close-line' : 'ri-menu-line';
    });
  }

  // Highlight active link based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* 3. Animated Counter for Industrial Statistics */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target'), 10);
        const duration = 1800;
        const stepTime = 30;
        const steps = Math.ceil(duration / stepTime);
        const increment = countTo / steps;

        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current);
          }
        }, stepTime);

        observerInstance.unobserve(target);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => observer.observe(el));
}

/* 4. Interactive Form Validation & Feedback Toast */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Submitting...';
      }

      setTimeout(() => {
        showToast('Thank you! Your message has been received successfully. Our team will contact you shortly.');
        form.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1200);
    });
  });
}

/* 5. Global Toast Notification */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="font-size: 1.3rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* 6. Scroll Reveal Animations */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.intro-card, .company-card, .service-card, .contact-info-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
}

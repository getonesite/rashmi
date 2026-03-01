/* ============================================
   Classic Blue Cafe - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ---------- Scroll Animations ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  function checkFadeIn() {
    fadeElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn();

  /* ---------- Contact Form Validation ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      contactForm.querySelectorAll('.contact-form-group').forEach(function (group) {
        group.classList.remove('error');
      });

      // Validate Name
      const nameInput = document.getElementById('name');
      if (nameInput && nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your full name.');
        isValid = false;
      }

      // Validate Email
      const emailInput = document.getElementById('email');
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, 'Please enter a valid email address.');
          isValid = false;
        }
      }

      // Validate Message
      const messageInput = document.getElementById('message');
      if (messageInput && messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters.');
        isValid = false;
      }

      if (isValid) {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
      }
    });
  }

  function showError(input, message) {
    const group = input.closest('.contact-form-group');
    if (group) {
      group.classList.add('error');
      const errorMsg = group.querySelector('.error-msg');
      if (errorMsg) {
        errorMsg.textContent = message;
      }
    }
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

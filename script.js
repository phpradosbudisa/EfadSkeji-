/* ============================================
   Google Analytics Event Tracking
   ============================================ */

// Track custom events
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track phone clicks
document.addEventListener('DOMContentLoaded', function() {
  const phoneLinks = document.querySelectorAll('.phone-link');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'phone_click', 'Phone number clicked');
    });
  });

  // Track social media clicks
  const socialLinks = document.querySelectorAll('[data-ga-event="social_click"]');
  socialLinks.forEach(link => {
    link.addEventListener('click', function() {
      const platform = this.getAttribute('aria-label') || 'Unknown';
      trackEvent('Social', 'social_click', platform);
    });
  });
});

/* ============================================
   Mobile Menu Toggle
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      nav.setAttribute('aria-expanded', !isExpanded);
      
      // Close menu when clicking outside
      if (!isExpanded) {
        document.addEventListener('click', closeMenuOnOutsideClick);
      }
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function closeMenuOnOutsideClick(event) {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  }
});

/* ============================================
   Smooth Scrolling
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Track navigation clicks
        trackEvent('Navigation', 'section_click', href);
      }
    });
  });
});

/* ============================================
   Form Validation
   ============================================ */

function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  const fieldName = field.name;
  const errorMessage = field.parentElement.querySelector('.error-message');
  let isValid = true;
  let error = '';

  // Remove previous error state
  field.setAttribute('aria-invalid', 'false');
  if (errorMessage) {
    errorMessage.textContent = '';
  }

  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    error = 'To polje je obvezno.';
  }

  // Email validation
  if (fieldType === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      error = 'Vnesite veljaven e-poštni naslov.';
    }
  }

  // Phone validation (optional but if provided should be valid)
  if (fieldName === 'phone' && value) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 8) {
      isValid = false;
      error = 'Vnesite veljavno telefonsko številko.';
    }
  }

  // Set error state
  if (!isValid) {
    field.setAttribute('aria-invalid', 'true');
    if (errorMessage) {
      errorMessage.textContent = error;
    }
  }

  return isValid;
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = form.querySelectorAll('input, textarea');
  
  fields.forEach(field => {
    // Validate on blur
    field.addEventListener('blur', function() {
      validateField(this);
    });

    // Clear error on input
    field.addEventListener('input', function() {
      if (this.getAttribute('aria-invalid') === 'true') {
        validateField(this);
      }
    });
  });
});

/* ============================================
   EmailJS Integration
   ============================================ */

// Initialize EmailJS
(function() {
  emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
})();

function submitContactForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('.btn-submit');
  const formMessage = form.querySelector('.form-message');
  const honeypot = form.querySelector('#website');

  // Honeypot spam check
  if (honeypot && honeypot.value) {
    // Bot detected, silently fail
    return;
  }

  // Validate all fields
  const fields = form.querySelectorAll('input[required], textarea[required]');
  let isFormValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    showFormMessage(formMessage, 'Prosimo, popravite napake v obrazcu.', 'error');
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.classList.add('loading');

  // Get form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim() || 'Ni navedeno',
    service: document.getElementById('service').value || 'Ni navedeno',
    message: document.getElementById('message').value.trim()
  };

  // Send email via EmailJS
  // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message,
    to_email: 'info@efadskejic.si' // Your email
  })
  .then(function(response) {
    // Success
    showFormMessage(formMessage, 'Hvala! Vaše sporočilo je bilo uspešno poslano. Odgovoril vam bom v najkrajšem možnem času.', 'success');
    form.reset();
    
    // Track form submission
    trackEvent('Contact', 'form_submit', 'Contact form submitted successfully');
    
    // Reset button state after delay
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    }, 2000);
  }, function(error) {
    // Error
    console.error('EmailJS Error:', error);
    showFormMessage(formMessage, 'Oprostite, prišlo je do napake. Prosimo, poskusite znova ali me pokličite neposredno.', 'error');
    
    // Track form error
    trackEvent('Contact', 'form_error', 'Contact form submission failed');
    
    // Reset button state
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
  });
}

function showFormMessage(element, message, type) {
  if (!element) return;
  
  element.textContent = message;
  element.className = `form-message ${type}`;
  element.setAttribute('role', 'alert');
  
  // Scroll to message
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Clear message after 10 seconds for success, keep error visible
  if (type === 'success') {
    setTimeout(() => {
      element.textContent = '';
      element.className = 'form-message';
    }, 10000);
  }
}

// Attach form submit handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', submitContactForm);
  }
});

/* ============================================
   Portfolio Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.querySelector('.lightbox-close');
  const portfolioButtons = document.querySelectorAll('.portfolio-view-btn');

  function openLightbox(imageSrc, title) {
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title;
    if (lightboxTitle) {
      lightboxTitle.textContent = title;
    }
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Track lightbox open
    trackEvent('Portfolio', 'lightbox_open', title);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Track lightbox close
    if (lightboxTitle) {
      trackEvent('Portfolio', 'lightbox_close', lightboxTitle.textContent);
    }
  }

  // Open lightbox on portfolio button click
  portfolioButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const portfolioItem = this.closest('.portfolio-item');
      const image = portfolioItem.querySelector('.portfolio-image');
      const title = portfolioItem.querySelector('h3').textContent;
      
      if (image && image.src) {
        openLightbox(image.src, title);
      }
    });
  });

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

  // Close on background click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
});

/* ============================================
   FAQ Accordion
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answer = this.nextElementSibling;
      
      // Close all other FAQs
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.setAttribute('aria-expanded', 'false');
          const otherAnswer = q.nextElementSibling;
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });
      
      // Toggle current FAQ
      this.setAttribute('aria-expanded', !isExpanded);
      if (answer) {
        if (isExpanded) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
      
      // Track FAQ interaction
      const questionText = this.querySelector('span').textContent;
      trackEvent('FAQ', isExpanded ? 'faq_close' : 'faq_open', questionText);
    });
  });
});

/* ============================================
   Current Year in Footer
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/* ============================================
   Scroll to Top (Optional Enhancement)
   ============================================ */

// Add scroll to top button functionality if needed
document.addEventListener('DOMContentLoaded', function() {
  let scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Nazaj na vrh');
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    trackEvent('Navigation', 'scroll_to_top', 'Scroll to top clicked');
  });
  
  scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

/* ============================================
   Lazy Loading Images (if not using native)
   ============================================ */

// Native lazy loading is used in HTML, but this provides fallback
document.addEventListener('DOMContentLoaded', function() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }
  
  // Fallback for browsers that don't support native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
});

/* ============================================
   Performance: Debounce function
   ============================================ */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Example: Debounced scroll handler
const handleScroll = debounce(() => {
  // Scroll handling code here if needed
}, 100);

/* ============================================
   Error Handling
   ============================================ */

window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  // You can send error reports to analytics here
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: e.error ? e.error.toString() : 'Unknown error',
      fatal: false
    });
  }
});

/* ============================================
   Advanced Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return; // Skip animations if user prefers reduced motion
  }

  // Advanced Intersection Observer with multiple thresholds
  const createAdvancedObserver = (callback, options = {}) => {
    const defaultOptions = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px 0px -100px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  };

  // Complex animation function with multiple stages
  function animateElement(element, animationType = 'fadeInUp') {
    const animations = {
      fadeInUp: {
        from: { opacity: 0, transform: 'translateY(60px) scale(0.95)' },
        to: { opacity: 1, transform: 'translateY(0) scale(1)' }
      },
      fadeInLeft: {
        from: { opacity: 0, transform: 'translateX(-60px) rotate(-5deg)' },
        to: { opacity: 1, transform: 'translateX(0) rotate(0deg)' }
      },
      fadeInRight: {
        from: { opacity: 0, transform: 'translateX(60px) rotate(5deg)' },
        to: { opacity: 1, transform: 'translateX(0) rotate(0deg)' }
      },
      scaleIn: {
        from: { opacity: 0, transform: 'scale(0.8) rotateY(15deg)' },
        to: { opacity: 1, transform: 'scale(1) rotateY(0deg)' }
      },
      slideUp: {
        from: { opacity: 0, transform: 'translateY(80px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      },
      rotateIn: {
        from: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
        to: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
      }
    };

    const anim = animations[animationType] || animations.fadeInUp;
    
    element.style.opacity = anim.from.opacity;
    element.style.transform = anim.from.transform;
    element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        element.style.opacity = anim.to.opacity;
        element.style.transform = anim.to.transform;
      }, 50);
    });
  }

  // Staggered group animation
  function animateGroup(elements, animationType, staggerDelay = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        animateElement(el, animationType);
        el.classList.add('animated');
      }, index * staggerDelay);
    });
  }

  // Service Cards - Complex staggered animation
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    const serviceObserver = createAdvancedObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const ratio = entry.intersectionRatio;
          if (ratio > 0.1) {
            setTimeout(() => {
              animateElement(entry.target, index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight');
              entry.target.classList.add('animated');
            }, index * 150);
          }
        }
      });
    }, { rootMargin: '0px 0px -150px 0px' });
    
    serviceCards.forEach(card => serviceObserver.observe(card));
  }

  // Portfolio Items - Scale and fade with rotation
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (portfolioItems.length > 0) {
    const portfolioObserver = createAdvancedObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          setTimeout(() => {
            animateElement(entry.target, 'scaleIn');
            entry.target.classList.add('animated');
          }, index * 200);
        }
      });
    });
    
    portfolioItems.forEach(item => portfolioObserver.observe(item));
  }

  // Testimonials - Slide up with stagger
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (testimonials.length > 0) {
    const testimonialObserver = createAdvancedObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          animateElement(entry.target, 'slideUp');
          entry.target.classList.add('animated');
        }
      });
    });
    
    testimonials.forEach((testimonial, index) => {
      testimonial.style.transitionDelay = `${index * 0.15}s`;
      testimonialObserver.observe(testimonial);
    });
  }

  // Section Headers - Complex entrance
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    const headerObserver = createAdvancedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const label = entry.target.querySelector('.section-label');
          const title = entry.target.querySelector('.section-title');
          const description = entry.target.querySelector('.section-description');
          
          if (label) {
            setTimeout(() => animateElement(label, 'fadeInDown'), 0);
          }
          if (title) {
            setTimeout(() => animateElement(title, 'fadeInUp'), 200);
          }
          if (description) {
            setTimeout(() => animateElement(description, 'fadeInUp'), 400);
          }
          
          entry.target.classList.add('animated');
        }
      });
    });
    
    headerObserver.observe(header);
  }

  // About Section - Split animation
  const aboutImage = document.querySelector('.about-image');
  const aboutContent = document.querySelector('.about-content');
  
  if (aboutImage && aboutContent) {
    const aboutObserver = createAdvancedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => animateElement(aboutImage, 'fadeInLeft'), 0);
          setTimeout(() => animateElement(aboutContent, 'fadeInRight'), 300);
        }
      });
    });
    
    aboutObserver.observe(aboutImage.closest('.about-section'));
  }

  // FAQ Items - Accordion with animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const faqObserver = createAdvancedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          setTimeout(() => {
            animateElement(entry.target, 'fadeInUp');
            entry.target.classList.add('animated');
          }, index * 100);
        }
      });
    });
    
    faqObserver.observe(item);
  });

  // Contact Items - Sequential reveal
  const contactItems = document.querySelectorAll('.contact-item');
  if (contactItems.length > 0) {
    const contactObserver = createAdvancedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactItems.forEach((item, index) => {
            if (!item.classList.contains('animated')) {
              setTimeout(() => {
                animateElement(item, index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight');
                item.classList.add('animated');
              }, index * 200);
            }
          });
        }
      });
    });
    
    contactObserver.observe(document.querySelector('.contact-section'));
  }

  // Area Items - Grid reveal animation
  const areaItems = document.querySelectorAll('.area-item');
  if (areaItems.length > 0) {
    const areaObserver = createAdvancedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          areaItems.forEach((item, index) => {
            if (!item.classList.contains('animated')) {
              setTimeout(() => {
                animateElement(item, 'scaleIn');
                item.classList.add('animated');
              }, index * 50);
            }
          });
        }
      });
    });
    
    areaObserver.observe(document.querySelector('.service-areas-section'));
  }

  // Hero Features - Sequential reveal
  const heroFeatures = document.querySelectorAll('.hero-feature');
  heroFeatures.forEach((feature, index) => {
    setTimeout(() => {
      animateElement(feature, 'fadeInLeft');
      feature.classList.add('animated');
    }, index * 200);
  });

  // Counter animation for stats with scroll trigger
  function animateCounter(element, target, duration = 2000) {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    
    let start = 0;
    const suffix = element.textContent.match(/[^0-9]/g)?.join('') || '';
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  // Stats observer with complex trigger
  const statsObserver = createAdvancedObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const statNumbers = entry.target.querySelectorAll('.stat-number, .stats-number');
        statNumbers.forEach((stat, index) => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          if (number) {
            setTimeout(() => {
              stat.textContent = '0' + (text.includes('+') ? '+' : '');
              animateCounter(stat, number, 2000);
            }, index * 300);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsElements = document.querySelectorAll('.hero-stats, .hero-stats-card, .stat-item');
  statsElements.forEach(el => statsObserver.observe(el));
});

/* ============================================
   Advanced Parallax Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Hero image parallax
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
      const heroRect = heroImage.getBoundingClientRect();
      if (heroRect.top < windowHeight && heroRect.bottom > 0) {
        const rate = (scrolled - heroRect.top) * 0.15;
        heroImage.style.transform = `translateY(${rate}px) scale(1.02)`;
      }
    }

    // About image parallax
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
      const aboutRect = aboutImage.getBoundingClientRect();
      if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
        const rate = (scrolled - aboutRect.top) * 0.1;
        aboutImage.style.transform = `translateY(${rate}px)`;
      }
    }

    // Portfolio images parallax
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    portfolioImages.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const rate = (scrolled - rect.top) * (0.05 + index * 0.02);
        img.style.transform = `translateY(${rate}px) scale(1.05)`;
      }
    });

    // Floating elements
    const floatingElements = document.querySelectorAll('.service-icon-wrapper, .contact-icon-wrapper');
    floatingElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const float = Math.sin((scrolled + index * 100) / 200) * 5;
        el.style.transform = `translateY(${float}px)`;
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
});

/* ============================================
   Scroll Progress and Reveal Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Scroll progress indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }, { passive: true });
  };

  createScrollProgress();

  // Advanced reveal with progress tracking
  const revealElements = document.querySelectorAll('.reveal, section');
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      const progress = entry.intersectionRatio;
      
      if (progress > 0.1 && !entry.target.classList.contains('revealing')) {
        entry.target.classList.add('revealing');
        
        // Animate based on scroll progress
        const animate = () => {
          const rect = entry.target.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementHeight = rect.height;
          
          // Calculate progress through element
          let progress = 1 - (elementTop / (windowHeight + elementHeight));
          progress = Math.max(0, Math.min(1, progress));
          
          // Apply transform based on progress
          if (progress > 0) {
            const opacity = Math.min(1, progress * 1.5);
            const translateY = (1 - progress) * 50;
            
            entry.target.style.opacity = opacity;
            entry.target.style.transform = `translateY(${translateY}px)`;
          }
          
          if (progress < 1 && elementTop < windowHeight + elementHeight) {
            requestAnimationFrame(animate);
          } else {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('active');
          }
        };
        
        requestAnimationFrame(animate);
      }
    });
  }, {
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    rootMargin: '0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});

/* ============================================
   Hover Effects Enhancement
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Add hover-lift class to cards
  const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
  cards.forEach(card => {
    card.classList.add('hover-lift');
  });

  // Add hover-scale to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.classList.add('hover-scale');
  });

  // Add hover-glow to primary buttons
  const primaryButtons = document.querySelectorAll('.btn-primary');
  primaryButtons.forEach(btn => {
    btn.classList.add('hover-glow');
  });
});

/* ============================================
   Loading Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to body on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });
});

/* ============================================
   Console Message
   ============================================ */

console.log('%cEfad Skejić - Vodovodar', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cProfesionalne vodovodne storitve v Sloveniji', 'color: #666; font-size: 14px;');
console.log('%cKontakt: info@efadskejic.si', 'color: #666; font-size: 12px;');

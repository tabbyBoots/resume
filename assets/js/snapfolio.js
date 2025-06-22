/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jun 13 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  let currentTypedInstance = null;
  
  function initializeTyped() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
      // Destroy existing instance if it exists
      if (currentTypedInstance) {
        currentTypedInstance.destroy();
        currentTypedInstance = null;
      }
      
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      if (typed_strings) {
        typed_strings = typed_strings.split(',').map(str => str.trim());
        currentTypedInstance = new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 60,           // Slower, more natural typing speed
          backSpeed: 25,           // Slower backspacing for smoothness
          backDelay: 3000,         // Longer pause before backspacing
          startDelay: 800,         // Initial delay for better UX
          showCursor: true,
          cursorChar: '|',
          autoInsertCss: true,
          fadeOut: true,           // Smooth fade effect
          fadeOutClass: 'typed-fade-out',
          fadeOutDelay: 1000,      // Fade out delay for smoother transitions
          smartBackspace: true,    // Only backspace what doesn't match the previous string
          shuffle: false,          // Keep consistent order
          bindInputFocusEvents: false,
          contentType: 'html'      // Allow HTML content if needed
        });
      }
    }
  }
  
  // Initialize typed.js on page load
  initializeTyped();
  
  // Listen for reinitialize event from language switching
  document.addEventListener('reinitializeTyped', () => {
    setTimeout(initializeTyped, 200);
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * EmailJS Configuration and Contact Form Handler
   */
  function initEmailJS() {
    // Initialize EmailJS with your public key
    emailjs.init("Bd9z2bR927qXfbk0S");
    
    // Handle contact form submission
    const contactForm = document.querySelector('.php-email-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loadingDiv = contactForm.querySelector('.loading');
        const errorDiv = contactForm.querySelector('.error-message');
        const successDiv = contactForm.querySelector('.sent-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
          from_name: contactForm.querySelector('input[name="name"]').value,
          from_email: contactForm.querySelector('input[name="email"]').value,
          subject: contactForm.querySelector('input[name="subject"]').value,
          message: contactForm.querySelector('textarea[name="message"]').value,
          to_email: 'test@bloomski.com' // Your receiving email
        };
        
        // Send email using EmailJS
        emailjs.send('service_bim3r24', 'template_y5zabhp', formData)
          .then(function(response) {
            console.log('Email sent successfully:', response);
            
            // Hide loading, show success
            loadingDiv.style.display = 'none';
            successDiv.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button after delay
            setTimeout(() => {
              submitBtn.disabled = false;
              successDiv.style.display = 'none';
            }, 5000);
            
          }, function(error) {
            console.error('Email send failed:', error);
            
            // Hide loading, show error
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Failed to send message. Please try again or contact directly via email.';
            
            // Re-enable submit button
            submitBtn.disabled = false;
            
            // Hide error after delay
            setTimeout(() => {
              errorDiv.style.display = 'none';
            }, 5000);
          });
      });
    }
  }
  
  // Initialize EmailJS when page loads
  window.addEventListener('load', initEmailJS);

})();

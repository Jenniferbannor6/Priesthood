// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initEventSlider();
  initServicesTabs();
  initPastorCarousel();
  initFormValidation();
  initScrollAnimations();
  initSmoothScrolling();
  initSearch();
  initDonationForm();
  initNewsletter();
  initHeroRotation();
  initAmountButtons();
  initFeeToggle();
});

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  // Create mobile menu toggle button if not exists
  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navbar.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('active');
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ===== Event Slider =====
function initEventSlider() {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.event-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (!slides.length || !sliderTrack) return;
  
  let currentSlide = 0;
  let slideInterval;
  let isPaused = false;
  const slideDuration = 5000; // 5 seconds per slide
  
  // Function to show specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    setTimeout(() => {
      slides[index].style.opacity = '1';
    }, 50);
    
    // Update dots
    dots[index].classList.add('active');
    
    // Update track position
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    
    currentSlide = index;
  }
  
  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }
  
  // Function to go to previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }
  
  // Function to start auto-slide
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, slideDuration);
  }
  
  // Function to pause slider
  function pauseSlider() {
    isPaused = true;
    clearInterval(slideInterval);
  }
  
  // Function to resume slider
  function resumeSlider() {
    isPaused = false;
    startAutoSlide();
  }
  
  // Initialize slider
  showSlide(0);
  startAutoSlide();
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      pauseSlider();
      showSlide(index);
      setTimeout(resumeSlider, slideDuration + 1000);
    });
  });
  
  // Event listeners for buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      pauseSlider();
      prevSlide();
      setTimeout(resumeSlider, slideDuration + 1000);
    });
    
    nextBtn.addEventListener('click', () => {
      pauseSlider();
      nextSlide();
      setTimeout(resumeSlider, slideDuration + 1000);
    });
  }
  
  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', pauseSlider);
    sliderContainer.addEventListener('mouseleave', resumeSlider);
    sliderContainer.addEventListener('touchstart', pauseSlider);
    sliderContainer.addEventListener('touchend', () => {
      setTimeout(resumeSlider, slideDuration + 1000);
    });
  }
}

// ===== Services Tabs =====
function initServicesTabs() {
  const serviceTabs = document.querySelectorAll('.service-tab');
  const serviceContents = document.querySelectorAll('.service-content');
  
  if (!serviceTabs.length) return;
  
  function showService(serviceType) {
    // Hide all service contents
    serviceContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    serviceTabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Show selected service content
    const selectedContent = document.getElementById(`${serviceType}-services`);
    if (selectedContent) {
      selectedContent.classList.add('active');
    }
    
    // Activate selected tab
    document.querySelector(`[data-service="${serviceType}"]`).classList.add('active');
  }
  
  // Event listeners for tabs
  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const serviceType = tab.getAttribute('data-service');
      showService(serviceType);
    });
  });
  
  // Initialize with first tab active
  showService('online');
}

// ===== Pastor Image Carousel =====
function initPastorCarousel() {
  const pastorImages = document.querySelectorAll('.pastor-image');
  const pastorDots = document.querySelectorAll('.pastor-dot');
  const prevBtn = document.querySelector('.pastor-prev');
  const nextBtn = document.querySelector('.pastor-next');
  
  if (pastorImages.length < 2) return;
  
  let currentIndex = 0;
  let carouselInterval;
  const intervalDuration = 4000;
  
  function showImage(index) {
    // Hide all images
    pastorImages.forEach(img => img.classList.remove('active'));
    pastorDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current image
    pastorImages[index].classList.add('active');
    pastorDots[index].classList.add('active');
    
    currentIndex = index;
  }
  
  function nextImage() {
    const nextIndex = (currentIndex + 1) % pastorImages.length;
    showImage(nextIndex);
  }
  
  function prevImage() {
    const prevIndex = (currentIndex - 1 + pastorImages.length) % pastorImages.length;
    showImage(prevIndex);
  }
  
  function startCarousel() {
    carouselInterval = setInterval(nextImage, intervalDuration);
  }
  
  function stopCarousel() {
    clearInterval(carouselInterval);
  }
  
  function resetCarousel() {
    stopCarousel();
    startCarousel();
  }
  
  // Event listeners for dots
  pastorDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showImage(index);
      resetCarousel();
    });
  });
  
  // Event listeners for buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevImage();
      resetCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      nextImage();
      resetCarousel();
    });
    
    // Pause on hover
    const pastorContainer = document.querySelector('.pastor-images-container');
    if (pastorContainer) {
      pastorContainer.addEventListener('mouseenter', stopCarousel);
      pastorContainer.addEventListener('mouseleave', startCarousel);
    }
  }
  
  // Start the carousel
  startCarousel();
}

// ===== Form Validation =====
function initFormValidation() {
  const bibleCollegeForm = document.getElementById('bibleCollegeForm');
  const donationForm = document.getElementById('donationForm');
  
  // Bible College Form
  if (bibleCollegeForm) {
    bibleCollegeForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateForm(this)) return;
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      submitBtn.disabled = true;
      
      try {
        // Simulate API call
        await simulateSubmission();
        
        // Show success message
        showSuccessMessage(this, 'Bible College Application');
        
        // Reset form
        this.reset();
        
      } catch (error) {
        showErrorMessage('Submission failed. Please try again.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
    
    // Add input validation feedback
    const inputs = bibleCollegeForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  }
  
  // Donation Form
  if (donationForm) {
    donationForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = this.querySelector('#donorEmail').value;
      const amount = this.querySelector('#customAmount').value || 
                    document.querySelector('.amount-btn.active')?.getAttribute('data-amount') || '0';
      
      if (!validateEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
      }
      
      if (parseFloat(amount) <= 0) {
        showErrorMessage('Please select or enter a donation amount');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Donation...';
      submitBtn.disabled = true;
      
      try {
        await simulateSubmission();
        
        showSuccessMessage(this, 'Donation');
        this.reset();
        resetAmountButtons();
        
      } catch (error) {
        showErrorMessage('Donation processing failed. Please try again.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('[required]');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let message = '';
  
  // Remove previous error
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  field.classList.remove('error');
  
  // Validate based on field type
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    message = 'This field is required';
  } else if (field.type === 'email' && value && !validateEmail(value)) {
    isValid = false;
    message = 'Please enter a valid email address';
  } else if (field.type === 'tel' && value && !validatePhone(value)) {
    isValid = false;
    message = 'Please enter a valid phone number';
  }
  
  if (!isValid) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: var(--error-color);
      font-size: 0.9rem;
      margin-top: 5px;
    `;
    field.parentNode.appendChild(errorDiv);
  }
  
  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
  return re.test(phone);
}

function simulateSubmission() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

function showSuccessMessage(form, type) {
  // Remove existing success message
  const existingSuccess = form.parentNode.querySelector('.success-message');
  if (existingSuccess) existingSuccess.remove();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div style="background: var(--success-color); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-top: 20px;">
      <h4 style="margin-bottom: 10px;"><i class="fas fa-check-circle"></i> ${type} Successful!</h4>
      <p>Thank you for your submission. We will contact you within 24 hours.</p>
    </div>
  `;
  
  form.parentNode.insertBefore(successDiv, form.nextSibling);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    successDiv.style.opacity = '0';
    successDiv.style.transition = 'opacity 0.5s ease';
    setTimeout(() => successDiv.remove(), 500);
  }, 10000);
}

function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <div style="background: var(--error-color); color: white; padding: 15px; border-radius: 10px; text-align: center; margin: 20px 0; position: fixed; top: 100px; right: 20px; z-index: 10000; max-width: 300px; animation: slideInRight 0.3s ease;">
      <p><i class="fas fa-exclamation-circle"></i> ${message}</p>
    </div>
  `;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    errorDiv.style.transition = 'opacity 0.5s ease';
    setTimeout(() => errorDiv.remove(), 500);
  }, 5000);
}

// ===== Donation Form Amount Buttons =====
function initAmountButtons() {
  const amountButtons = document.querySelectorAll('.amount-btn');
  
  amountButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      amountButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Update custom amount field
      const customAmountInput = document.getElementById('customAmount');
      if (customAmountInput) {
        customAmountInput.value = this.getAttribute('data-amount');
      }
    });
  });
}

function resetAmountButtons() {
  const amountButtons = document.querySelectorAll('.amount-btn');
  amountButtons.forEach(btn => btn.classList.remove('active'));
}

// ===== Fee Toggle =====
function initFeeToggle() {
  const feeOptions = document.querySelectorAll('.fee-option');
  
  if (feeOptions.length) {
    feeOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove active class from all options
        feeOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Update form if needed
        const countrySelect = document.getElementById('country');
        if (countrySelect) {
          if (this.querySelector('.fee-amount').textContent.includes('₵')) {
            countrySelect.value = 'GH';
          } else {
            countrySelect.value = 'US';
          }
        }
      });
    });
  }
}

// ===== Donation Form =====
function initDonationForm() {
  const donationForm = document.getElementById('donationForm');
  if (!donationForm) return;
  
  // Custom amount input validation
  const customAmountInput = document.getElementById('customAmount');
  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      // If custom amount is entered, remove active class from amount buttons
      if (this.value) {
        document.querySelectorAll('.amount-btn').forEach(btn => {
          btn.classList.remove('active');
        });
      }
    });
  }
  
  // Currency change effect
  const currencySelect = document.getElementById('currency');
  if (currencySelect) {
    currencySelect.addEventListener('change', function() {
      const amountButtons = document.querySelectorAll('.amount-btn');
      const amounts = {
        'USD': [20, 50, 100, 200, 500],
        'GHS': [100, 250, 500, 1000, 2500],
        'EUR': [18, 45, 90, 180, 450],
        'GBP': [16, 40, 80, 160, 400]
      };
      
      const selectedCurrency = this.value;
      const selectedAmounts = amounts[selectedCurrency] || amounts['USD'];
      
      amountButtons.forEach((button, index) => {
        const symbol = getCurrencySymbol(selectedCurrency);
        button.textContent = `${symbol}${selectedAmounts[index]}`;
        button.setAttribute('data-amount', selectedAmounts[index]);
      });
      
      // Reset active state
      amountButtons.forEach(btn => btn.classList.remove('active'));
    });
  }
}

function getCurrencySymbol(currency) {
  const symbols = {
    'USD': '$',
    'GHS': '₵',
    'EUR': '€',
    'GBP': '£'
  };
  return symbols[currency] || '$';
}

// ===== Newsletter Forms =====
function initNewsletter() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!validateEmail(email)) {
        showNewsletterMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate subscription
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Store in localStorage
        const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
        subscriptions.push({
          email: email,
          date: new Date().toISOString()
        });
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        
        showNewsletterMessage('Thank you for subscribing!', 'success');
        this.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  });
}

function showNewsletterMessage(message, type) {
  // Remove existing message
  const existingMsg = document.querySelector('.newsletter-message');
  if (existingMsg) existingMsg.remove();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `newsletter-message ${type}`;
  messageDiv.style.cssText = `
    margin-top: 15px;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  
  if (type === 'success') {
    messageDiv.style.background = 'rgba(76, 175, 80, 0.2)';
    messageDiv.style.color = 'var(--success-color)';
    messageDiv.style.border = '1px solid var(--success-color)';
  } else {
    messageDiv.style.background = 'rgba(244, 67, 54, 0.2)';
    messageDiv.style.color = 'var(--error-color)';
    messageDiv.style.border = '1px solid var(--error-color)';
  }
  
  messageDiv.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    ${message}
  `;
  
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transition = 'opacity 0.5s ease';
      setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
  }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (!fadeElements.length) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    
    // Skip if it's just "#" or external link
    if (href === '#' || href.includes('http')) return;
    
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, href);
      }
    });
  });
}

// ===== Search Functionality =====
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (!searchInput || !searchBtn) return;
  
  // Sample search data
  const searchData = {
    courses: [
      'Homiletics',
      'Ministerial Ethics',
      'Church Administration and Leadership',
      'Five-Fold Ministry and Spiritual Gifts',
      'Practical Ministry',
      'Ministry and Marriage',
      'Psychology of Personnel Management',
      'Communication Skills and Basic IT',
      'Ministerial Sacrifice',
      'Common Mistakes Pastors Do'
    ],
    ministries: [
      'Grace Ministry',
      'Love Ministry',
      'Choir & Music',
      'Priya Tower',
      'Children Ministry'
    ],
    lecturers: [
      'Apostle Emmanuel Amankwah',
      'Rev. Eric Dautey',
      'Rev. Kwame Bannor',
      'Rev. Paul Opoku Peprah'
    ]
  };
  
  function performSearch(query) {
    if (!query.trim()) return;
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // Search in courses
    searchData.courses.forEach(course => {
      if (course.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'Course', title: course, link: 'bible-college.html#courses' });
      }
    });
    
    // Search in ministries
    searchData.ministries.forEach(ministry => {
      if (ministry.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'Ministry', title: ministry, link: 'index.html#ministries' });
      }
    });
    
    // Search in lecturers
    searchData.lecturers.forEach(lecturer => {
      if (lecturer.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'Lecturer', title: lecturer, link: 'bible-college.html#lecturers' });
      }
    });
    
    displaySearchResults(results);
  }
  
  function displaySearchResults(results) {
    // Remove existing results
    const existingResults = document.querySelector('.search-results');
    if (existingResults) existingResults.remove();
    
    if (results.length === 0) {
      showSearchMessage('No results found. Try different keywords.');
      return;
    }
    
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.98);
      border-radius: 10px;
      padding: 15px;
      margin-top: 10px;
      z-index: 1000;
      max-height: 400px;
      overflow-y: auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      border: 1px solid rgba(255, 215, 0, 0.3);
    `;
    
    results.forEach(result => {
      const resultItem = document.createElement('a');
      resultItem.href = result.link;
      resultItem.className = 'search-result-item';
      resultItem.style.cssText = `
        display: block;
        padding: 12px;
        color: white;
        text-decoration: none;
        border-bottom: 1px solid rgba(255, 215, 0, 0.2);
        transition: all 0.3s ease;
        border-radius: 5px;
      `;
      
      resultItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: rgba(255, 215, 0, 0.2); color: var(--accent-color); padding: 4px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">${result.type}</span>
          <span>${result.title}</span>
        </div>
      `;
      
      resultItem.addEventListener('mouseenter', () => {
        resultItem.style.background = 'rgba(255, 215, 0, 0.1)';
      });
      
      resultItem.addEventListener('mouseleave', () => {
        resultItem.style.background = 'transparent';
      });
      
      resultsContainer.appendChild(resultItem);
    });
    
    searchInput.parentNode.appendChild(resultsContainer);
    
    // Close results when clicking outside
    document.addEventListener('click', function closeResults(e) {
      if (!searchInput.parentNode.contains(e.target)) {
        resultsContainer.remove();
        document.removeEventListener('click', closeResults);
      }
    });
  }
  
  function showSearchMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'search-message';
    messageDiv.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.95);
      color: var(--accent-color);
      padding: 15px;
      border-radius: 10px;
      margin-top: 10px;
      z-index: 1000;
      text-align: center;
      border: 1px solid rgba(255, 215, 0, 0.3);
    `;
    messageDiv.textContent = message;
    
    searchInput.parentNode.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transition = 'opacity 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
  
  // Event listeners
  searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
  
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      const existingResults = document.querySelector('.search-results');
      if (existingResults) existingResults.remove();
    }
  });
}

// ===== Hero Background Rotation =====
function initHeroRotation() {
  const hero = document.querySelector('.hero:not(.hero-bible)');
  if (!hero) return;
  
  const heroImages = [
    'images/hero-church.jpg',
    'images/hero-bible.jpg'
  ];
  
  let currentHero = 0;
  
  // Preload images
  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  setInterval(() => {
    currentHero = (currentHero + 1) % heroImages.length;
    hero.style.backgroundImage = `url(${heroImages[currentHero]})`;
  }, 8000);
}
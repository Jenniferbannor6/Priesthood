// ===== WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Priesthood Family Chapel - Website Loaded');
    
    // Initialize all features
    initMobileMenu();
    initEventSlider();
    initServicesTabs();
    initPastorSlider();
    initModals();
    initQuickJoin();
    initCopyButtons();
    initSmoothScroll();
    initThemeToggle();
    initBackgroundSlider();
    initPrayerRequest();
    initGalleryFilters();
    
    // Fix any content visibility issues
    setTimeout(fixContentVisibility, 100);
    
    // ===== FIX FOR FOUNDER IMAGES ON MOBILE =====
    fixMobileFounderImages();
    
    // ===== FIX FOR ALL BUTTONS =====
    fixAllButtons();
});

// ===== FIX CONTENT VISIBILITY =====
function fixContentVisibility() {
    document.querySelectorAll('*').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.display = '';
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.innerHTML = mobileNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav) mobileNav.classList.remove('active');
            if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== EVENTS SLIDER - UPDATED =====
function initEventSlider() {
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevEventBtn');
    const nextBtn = document.getElementById('nextEventBtn');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        showSlide(prevIndex);
    }
    
    // Next/Previous buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause auto slide on hover
    const slider = document.querySelector('.events-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto slide
    showSlide(0);
    startAutoSlide();
}

// ===== SERVICES TABS =====
function initServicesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabBtns.length) return;
    
    function showTab(tabId) {
        // Hide all tabs
        tabContents.forEach(content => content.classList.remove('active'));
        tabBtns.forEach(btn => btn.classList.remove('active'));
        
        // Show selected tab
        const tabElement = document.getElementById(tabId + '-tab');
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
        
        if (tabElement) tabElement.classList.add('active');
        if (tabButton) tabButton.classList.add('active');
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // Initialize with first tab
    if (tabBtns.length > 0) {
        const firstTab = tabBtns[0].getAttribute('data-tab');
        showTab(firstTab);
    }
}

// ===== PASTOR SLIDER - FIXED FOR MOBILE =====
function initPastorSlider() {
    const pastorSlides = document.querySelectorAll('.pastor-slide');
    const pastorIndicators = document.querySelectorAll('.indicator');
    const prevPastorBtn = document.querySelector('.prev-pastor');
    const nextPastorBtn = document.querySelector('.next-pastor');
    
    if (!pastorSlides.length) return;
    
    let currentPastorSlide = 0;
    let pastorSlideInterval;
    
    // Force show images on mobile
    if (window.innerWidth <= 768) {
        pastorSlides.forEach(slide => {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
            slide.style.display = 'block';
        });
        
        // Show only first slide on mobile
        if (pastorSlides[0]) {
            pastorSlides[0].classList.add('active');
        }
        return; // Don't run slider on mobile if only 1 image
    }
    
    function showPastorSlide(index) {
        pastorSlides.forEach(slide => slide.classList.remove('active'));
        pastorIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentPastorSlide = index;
        if (pastorSlides[currentPastorSlide]) {
            pastorSlides[currentPastorSlide].classList.add('active');
        }
        if (pastorIndicators[currentPastorSlide]) {
            pastorIndicators[currentPastorSlide].classList.add('active');
        }
    }
    
    function nextPastorSlide() {
        let nextIndex = currentPastorSlide + 1;
        if (nextIndex >= pastorSlides.length) nextIndex = 0;
        showPastorSlide(nextIndex);
    }
    
    function prevPastorSlide() {
        let prevIndex = currentPastorSlide - 1;
        if (prevIndex < 0) prevIndex = pastorSlides.length - 1;
        showPastorSlide(prevIndex);
    }
    
    // Navigation buttons
    if (prevPastorBtn) prevPastorBtn.addEventListener('click', prevPastorSlide);
    if (nextPastorBtn) nextPastorBtn.addEventListener('click', nextPastorSlide);
    
    // Indicator navigation
    pastorIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showPastorSlide(index));
    });
    
    // Auto rotate every 4 seconds
    function startPastorRotation() {
        pastorSlideInterval = setInterval(nextPastorSlide, 4000);
    }
    
    function stopPastorRotation() {
        clearInterval(pastorSlideInterval);
    }
    
    // Pause on hover
    const pastorSlider = document.querySelector('.pastor-image-slider');
    if (pastorSlider) {
        pastorSlider.addEventListener('mouseenter', stopPastorRotation);
        pastorSlider.addEventListener('mouseleave', startPastorRotation);
    }
    
    // Start auto rotation only on desktop
    if (window.innerWidth > 768 && pastorSlides.length > 1) {
        showPastorSlide(0);
        startPastorRotation();
    }
}

// ===== IMPROVED MODALS =====
function initModals() {
    // Open modal buttons
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset to options view if it's a prayer/registration modal
                if (modalId === 'prayerModal' || modalId === 'registrationModal') {
                    resetModalToOptions(modalId);
                }
            }
        });
    });
    
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // WhatsApp Registration
    document.querySelectorAll('#whatsappRegistration, #whatsappModalBtn, #whatsappBibleCollege').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://wa.me/233249392178?text=Hello!%20I%20would%20like%20to%20register%20for%20Bible%20College.', '_blank');
        });
    });
    
    // WhatsApp Prayer
    document.querySelectorAll('#whatsappPrayer').forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://wa.me/233249392178?text=Hello!%20I%20would%20like%20to%20request%20prayer.', '_blank');
        });
    });
    
    // Email Prayer
    document.querySelectorAll('#emailPrayer').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'mailto:priesthoodfamilybiblecollege@gmail.com?subject=Prayer%20Request&body=Dear%20Prayer%20Team,%0A%0AI%20would%20like%20to%20request%20prayer%20for:%0A%0A%0A%0AName:%0AContact:%0A';
        });
    });
    
    // Email Registration
    document.querySelectorAll('#emailRegistrationBible').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'mailto:priesthoodfamilybiblecollege@gmail.com?subject=Bible%20College%20Registration&body=Dear%20Bible%20College%20Team,%0A%0AI%20am%20interested%20in%20registering%20for%20the%20Bible%20College%20program.%0A%0APlease%20send%20me%20more%20information.%0A%0AName:%0APhone:%0AEmail:%0ACurrent%20Ministry:%0A';
        });
    });
    
    // Form buttons
    setupFormModals();
}

function setupFormModals() {
    // Registration Modal
    const showFormBtn = document.getElementById('showRegistrationForm');
    const registrationOptions = document.getElementById('registrationOptions');
    const registrationForm = document.getElementById('registrationFormContainer');
    const backToRegistrationOptions = document.getElementById('backToRegistrationOptions');
    
    if (showFormBtn && registrationOptions && registrationForm) {
        showFormBtn.addEventListener('click', function() {
            registrationOptions.style.display = 'none';
            registrationForm.style.display = 'block';
        });
    }
    
    if (backToRegistrationOptions && registrationOptions && registrationForm) {
        backToRegistrationOptions.addEventListener('click', function() {
            registrationOptions.style.display = 'block';
            registrationForm.style.display = 'none';
        });
    }
    
    // Prayer Modal
    const formPrayerBtn = document.getElementById('formPrayer');
    const prayerOptions = document.getElementById('prayerOptions');
    const prayerForm = document.getElementById('prayerFormContainer');
    const backToPrayerOptions = document.getElementById('backToPrayerOptions');
    
    if (formPrayerBtn && prayerOptions && prayerForm) {
        formPrayerBtn.addEventListener('click', function() {
            prayerOptions.style.display = 'none';
            prayerForm.style.display = 'block';
        });
    }
    
    if (backToPrayerOptions && prayerOptions && prayerForm) {
        backToPrayerOptions.addEventListener('click', function() {
            prayerOptions.style.display = 'block';
            prayerForm.style.display = 'none';
        });
    }
}

function resetModalToOptions(modalId) {
    const options = document.getElementById(modalId + 'Options');
    const form = document.getElementById(modalId + 'FormContainer');
    
    if (options) options.style.display = 'block';
    if (form) form.style.display = 'none';
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== PRAYER REQUEST FIX =====
function initPrayerRequest() {
    const prayerButtons = document.querySelectorAll('#openPrayerBtn, #openPrayerBtnMobile, .prayer-request-btn, .prayer-footer-btn');
    
    prayerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const prayerModal = document.getElementById('prayerModal');
            
            if (prayerModal) {
                prayerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset to options view
                const prayerOptions = document.getElementById('prayerOptions');
                const prayerForm = document.getElementById('prayerFormContainer');
                if (prayerOptions && prayerForm) {
                    prayerOptions.style.display = 'block';
                    prayerForm.style.display = 'none';
                }
            }
        });
    });
}

// ===== QUICK JOIN =====
function initQuickJoin() {
    const quickJoinBtn = document.getElementById('quickJoinBtn');
    const quickJoinDropdown = document.getElementById('quickJoinDropdown');
    
    if (quickJoinBtn && quickJoinDropdown) {
        quickJoinBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            quickJoinDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!quickJoinBtn.contains(e.target) && !quickJoinDropdown.contains(e.target)) {
                quickJoinDropdown.classList.remove('show');
            }
        });
        
        // Prevent dropdown close when clicking inside
        quickJoinDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// ===== COPY BUTTONS =====
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn, .copy-momo-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.getAttribute('data-number') || '0547367600';
            const originalText = this.innerHTML;
            const originalBg = this.style.background;
            
            // Copy to clipboard
            navigator.clipboard.writeText(number).then(() => {
                // Show success feedback
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.background = '#4CAF50';
                this.style.color = 'white';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = originalBg;
                    this.style.color = '';
                }, 2000);
                
            }).catch(err => {
                // Show error feedback
                this.innerHTML = '<i class="fas fa-times"></i> Failed';
                this.style.background = '#f44336';
                this.style.color = 'white';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = originalBg;
                    this.style.color = '';
                }, 2000);
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.includes('http')) return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 100;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== DARK/LIGHT MODE TOGGLE =====
function initThemeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, toggleBtn);
    
    // Toggle theme on click
    toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, this);
    });
}

function updateThemeIcon(theme, button) {
    const icon = button.querySelector('i') || button;
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== BACKGROUND IMAGE SLIDER =====
function initBackgroundSlider() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const images = [
        'images/hero-church.jpg',
        'images/hero-bible.jpg'
    ];
    
    let currentImage = 0;
    
    // Change background image every 8 seconds
    if (images.length > 1) {
        setInterval(() => {
            currentImage = (currentImage + 1) % images.length;
            hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${images[currentImage]}')`;
        }, 8000);
    }
}

// ===== GALLERY FILTERS =====
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FIX FOR FOUNDER IMAGES ON MOBILE =====
function fixMobileFounderImages() {
    if (window.innerWidth <= 768) {
        const founderSlides = document.querySelectorAll('.pastor-slide');
        const founderImages = document.querySelectorAll('.pastor-slide img');
        
        founderSlides.forEach(slide => {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
            slide.style.display = 'block';
        });
        
        founderImages.forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
        });
        
        // Show only first slide
        if (founderSlides[0]) {
            founderSlides[0].classList.add('active');
            founderSlides[0].style.opacity = '1';
            founderSlides[0].style.visibility = 'visible';
        }
        
        // Hide other slides
        for (let i = 1; i < founderSlides.length; i++) {
            founderSlides[i].style.display = 'none';
        }
    }
}

// ===== FIX ALL BUTTONS =====
function fixAllButtons() {
    // Make sure all interactive elements work
    const allButtons = document.querySelectorAll('button, [role="button"], .btn, a[href="#"]');
    
    allButtons.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.setAttribute('tabindex', '0');
        
        // Add visual feedback on click
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', function() {
    fixMobileFounderImages();
});

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ===== EMERGENCY FIX FOR MISSING CSS =====
function injectEmergencyCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Emergency CSS fixes */
        .mobile-nav.active {
            display: flex !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
        }
        
        .pastor-slide.active {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }
        
        @media (max-width: 768px) {
            .pastor-slide {
                opacity: 1 !important;
                visibility: visible !important;
                position: relative !important;
            }
            
            .pastor-slide img {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            }
        }
        
        .modal.active {
            display: flex !important;
        }
        
        .quick-join-dropdown.show {
            display: block !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== RUN EMERGENCY FIXES =====
window.addEventListener('load', function() {
    injectEmergencyCSS();
    fixMobileFounderImages();
    fixAllButtons();
    
    // Last resort: Force show all hidden content
    setTimeout(() => {
        document.querySelectorAll('[style*="display: none"], [style*="opacity: 0"], [style*="visibility: hidden"]').forEach(el => {
            if (el.classList.contains('pastor-slide') || el.classList.contains('event-slide')) {
                return; // Don't mess with sliders
            }
            el.style.display = '';
            el.style.opacity = '';
            el.style.visibility = '';
        });
    }, 1000);
});

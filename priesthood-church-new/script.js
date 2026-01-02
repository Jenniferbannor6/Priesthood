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
            mobileNav.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// ===== EVENTS SLIDER - UPDATED =====
function initEventSlider() {
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
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
        dots[currentSlide].classList.add('active');
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
        document.getElementById(tabId + '-tab').classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
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

// ===== PASTOR SLIDER - NEW FUNCTION =====
function initPastorSlider() {
    const pastorSlides = document.querySelectorAll('.pastor-slide');
    const pastorDots = document.querySelectorAll('.pastor-dot');
    const pastorPrevBtn = document.querySelector('.pastor-prev-btn');
    const pastorNextBtn = document.querySelector('.pastor-next-btn');
    
    if (!pastorSlides.length || pastorSlides.length < 2) return;
    
    let currentPastorSlide = 0;
    let pastorSlideInterval;
    
    function showPastorSlide(index) {
        pastorSlides.forEach(slide => slide.classList.remove('active'));
        pastorDots.forEach(dot => dot.classList.remove('active'));
        
        currentPastorSlide = index;
        pastorSlides[currentPastorSlide].classList.add('active');
        if (pastorDots[currentPastorSlide]) pastorDots[currentPastorSlide].classList.add('active');
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
    if (pastorPrevBtn) pastorPrevBtn.addEventListener('click', prevPastorSlide);
    if (pastorNextBtn) pastorNextBtn.addEventListener('click', nextPastorSlide);
    
    // Dot navigation
    pastorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showPastorSlide(index));
    });
    
    // Auto rotate every 4 seconds
    function startPastorRotation() {
        pastorSlideInterval = setInterval(nextPastorSlide, 4000);
    }
    
    function stopPastorRotation() {
        clearInterval(pastorSlideInterval);
    }
    
    // Pause on hover
    const pastorSlider = document.querySelector('.pastor-slider');
    if (pastorSlider) {
        pastorSlider.addEventListener('mouseenter', stopPastorRotation);
        pastorSlider.addEventListener('mouseleave', startPastorRotation);
    }
    
    // Start auto rotation
    showPastorSlide(0);
    startPastorRotation();
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
                document.documentElement.style.overflow = 'hidden';
                
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
        document.documentElement.style.overflow = 'auto';
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
                document.documentElement.style.overflow = 'hidden';
                
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
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 100;
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
    
    const themeIcon = toggleBtn.querySelector('i');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    // Toggle theme on click
    toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        icon.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        icon.title = 'Switch to Dark Mode';
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
    
    // Preload images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Change background image every 8 seconds
    setInterval(() => {
        currentImage = (currentImage + 1) % images.length;
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${images[currentImage]}')`;
    }, 8000);
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

// ===== FORM VALIDATION =====
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error message if not exists
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                errorMsg.style.color = '#f44336';
                errorMsg.style.fontSize = '0.9rem';
                errorMsg.style.marginTop = '5px';
                input.parentNode.appendChild(errorMsg);
            }
        } else {
            input.classList.remove('error');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    return isValid;
}

// ===== LOADING STATE =====
function showLoading(element) {
    element.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
        </div>
    `;
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
}

// ===== BIBLE COLLEGE SPECIFIC FUNCTIONS =====
function initBibleCollegeFunctions() {
    // Initialize course duration styling
    document.querySelectorAll('.course-duration').forEach(element => {
        element.style.display = 'inline-block';
        element.style.background = 'rgba(255, 215, 0, 0.2)';
        element.style.color = 'var(--accent-color)';
        element.style.padding = '5px 15px';
        element.style.borderRadius = '15px';
        element.style.fontSize = '0.9rem';
        element.style.marginTop = '10px';
        element.style.fontWeight = '600';
        element.style.border = '1px solid rgba(255, 215, 0, 0.3)';
    });
    
    // Bible College specific buttons
    const whatsappBibleCollege = document.getElementById('whatsappBibleCollege');
    const formRegistrationBible = document.getElementById('formRegistrationBible');
    const emailRegistrationBible = document.getElementById('emailRegistrationBible');
    const whatsappModalBtn = document.getElementById('whatsappModalBtn');
    const formModalBtn = document.getElementById('formModalBtn');
    const emailModalBtn = document.getElementById('emailModalBtn');
    const backToModalOptions = document.getElementById('backToModalOptions');
    const registrationOptions = document.getElementById('registrationOptions');
    const registrationForm = document.getElementById('registrationFormContainer');
    
    // WhatsApp Registration from main page
    if (whatsappBibleCollege) {
        whatsappBibleCollege.addEventListener('click', function() {
            window.open('https://wa.me/233249392178?text=Hello!%20I%20would%20like%20to%20register%20for%20Bible%20College.', '_blank');
        });
    }
    
    // Form Registration from main page
    if (formRegistrationBible) {
        formRegistrationBible.addEventListener('click', function() {
            const modal = document.getElementById('registrationModal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Show form immediately
                if (registrationOptions && registrationForm) {
                    registrationOptions.style.display = 'none';
                    registrationForm.style.display = 'block';
                }
            }
        });
    }
    
    // Email Registration from main page
    if (emailRegistrationBible) {
        emailRegistrationBible.addEventListener('click', function() {
            window.location.href = 'mailto:priesthoodfamilybiblecollege@gmail.com?subject=Bible%20College%20Registration&body=Dear%20Bible%20College%20Team,%0A%0AI%20am%20interested%20in%20registering%20for%20the%20Bible%20College%20program.%0A%0APlease%20send%20me%20more%20information.%0A%0AName:%0APhone:%0AEmail:%0ACurrent%20Ministry:%0A';
        });
    }
    
    // Modal WhatsApp button
    if (whatsappModalBtn) {
        whatsappModalBtn.addEventListener('click', function() {
            window.open('https://wa.me/233249392178?text=Hello!%20I%20would%20like%20to%20register%20for%20Bible%20College.', '_blank');
        });
    }
    
    // Modal Form button
    if (formModalBtn && registrationOptions && registrationForm) {
        formModalBtn.addEventListener('click', function() {
            registrationOptions.style.display = 'none';
            registrationForm.style.display = 'block';
        });
    }
    
    // Modal Email button
    if (emailModalBtn) {
        emailModalBtn.addEventListener('click', function() {
            window.location.href = 'mailto:priesthoodfamilybiblecollege@gmail.com?subject=Bible%20College%20Registration&body=Dear%20Bible%20College%20Team,%0A%0AI%20am%20interested%20in%20registering%20for%20the%20Bible%20College%20program.%0A%0APlease%20send%20me%20more%20information.%0A%0AName:%0APhone:%0AEmail:%0ACurrent%20Ministry:%0A';
        });
    }
    
    // Back to options button
    if (backToModalOptions && registrationOptions && registrationForm) {
        backToModalOptions.addEventListener('click', function() {
            registrationOptions.style.display = 'block';
            registrationForm.style.display = 'none';
        });
    }
}

// ===== INITIALIZE BIBLE COLLEGE FUNCTIONS ON THAT PAGE =====
if (document.querySelector('body').classList.contains('bible-college-page') || window.location.pathname.includes('bible-college')) {
    document.addEventListener('DOMContentLoaded', initBibleCollegeFunctions);
}

// ===== GALLERY PAGE FUNCTIONS =====
function initGalleryPageFunctions() {
    const galleryImages = [
        // Sunday Worship (SW)
        { src: 'images/SW_001.jpg', category: 'SW', title: 'Sunday Worship Service', description: 'Morning worship session with the congregation' },
        { src: 'images/SW_002.jpg', category: 'SW', title: 'Sunday Congregation', description: 'Church members in worship and praise' },
        { src: 'images/SW_003.jpg', category: 'SW', title: 'Sunday Sermon', description: 'Pastor delivering the word of God' },
        
        // Night of Glory (NG)
        { src: 'images/NG_001.jpg', category: 'NG', title: 'Night of Glory', description: 'Powerful Friday night deliverance service' },
        { src: 'images/NG_002.jpg', category: 'NG', title: 'Night Worship', description: 'Intense worship and prayer session' },
        { src: 'images/NG_003.jpg', category: 'NG', title: 'Glory Night', description: 'Special night of miracles and healing' },
        
        // Bible College (BC)
        { src: 'images/BC_001.jpg', category: 'BC', title: 'Bible College Class', description: 'Students in classroom learning session' },
        { src: 'images/BC_002.jpg', category: 'BC', title: 'Bible College Graduation', description: 'Graduation ceremony for Bible College students' },
        { src: 'images/BC_003.jpg', category: 'BC', title: 'Practical Ministry', description: 'Hands-on ministry training session' },
        
        // Children Ministry (CM)
        { src: 'images/CM_001.jpg', category: 'CM', title: 'Children Ministry', description: 'Kids Sunday school and activities' },
        { src: 'images/CM_002.jpg', category: 'CM', title: 'Children\'s Church', description: 'Young worshippers in service' },
        { src: 'images/CM_003.jpg', category: 'CM', title: 'Kids Activity', description: 'Children engaged in learning activities' },
        
        // Choir & Music (CHOIR)
        { src: 'images/CHOIR_001.jpg', category: 'CHOIR', title: 'Choir Performance', description: 'Choir ministering during service' },
        { src: 'images/CHOIR_002.jpg', category: 'CHOIR', title: 'Music Ministry', description: 'Praise team leading worship' },
        { src: 'images/CHOIR_003.jpg', category: 'CHOIR', title: 'Choir Rehearsal', description: 'Choir practice session' },
        
        // Love Ministry (LOVE)
        { src: 'images/LOVE_001.jpg', category: 'LOVE', title: 'Love Ministry Outreach', description: 'Community service and outreach program' },
        { src: 'images/LOVE_002.jpg', category: 'LOVE', title: 'Community Service', description: 'Helping the needy in the community' },
        { src: 'images/LOVE_003.jpg', category: 'LOVE', title: 'Outreach Program', description: 'Sharing love with the community' },
        
        // Grace Ministry (GRACE)
        { src: 'images/GRACE_001.jpg', category: 'GRACE', title: 'Grace Ministry', description: 'Teaching and discipleship sessions' },
        { src: 'images/GRACE_002.jpg', category: 'GRACE', title: 'Discipleship Class', description: 'Training believers in grace' },
        
        // Events (EV)
        { src: 'images/EV_001.jpg', category: 'EV', title: 'Church Event', description: 'Special church program and gathering' },
        { src: 'images/EV_002.jpg', category: 'EV', title: 'Special Service', description: 'Anniversary or celebration service' },
        { src: 'images/EV_003.jpg', category: 'EV', title: 'Conference', description: 'Church conference or seminar' },
        
        // Youth Ministry (YOUTH)
        { src: 'images/YOUTH_001.jpg', category: 'YOUTH', title: 'Youth Ministry', description: 'Young people in fellowship and worship' },
        { src: 'images/YOUTH_002.jpg', category: 'YOUTH', title: 'Youth Program', description: 'Youth activities and programs' },
        { src: 'images/YOUTH_003.jpg', category: 'YOUTH', title: 'Youth Fellowship', description: 'Young believers gathering together' }
    ];
    
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Function to get category full name
    function getCategoryName(code) {
        const categories = {
            'SW': 'Sunday Worship',
            'NG': 'Night of Glory',
            'BC': 'Bible College',
            'EV': 'Events',
            'CM': 'Children Ministry',
            'CHOIR': 'Choir & Music',
            'LOVE': 'Love Ministry',
            'GRACE': 'Grace Ministry',
            'YOUTH': 'Youth Ministry',
            'all': 'All Photos'
        };
        return categories[code] || code;
    }
    
    // Function to get category icon
    function getCategoryIcon(code) {
        const icons = {
            'SW': 'fas fa-church',
            'NG': 'fas fa-star',
            'BC': 'fas fa-graduation-cap',
            'EV': 'fas fa-calendar-alt',
            'CM': 'fas fa-child',
            'CHOIR': 'fas fa-music',
            'LOVE': 'fas fa-heart',
            'GRACE': 'fas fa-hands-praying',
            'YOUTH': 'fas fa-users'
        };
        return icons[code] || 'fas fa-image';
    }
    
    // Function to create gallery item
    function createGalleryItem(image) {
        const item = document.createElement('div');
        item.className = `gallery-item category-${image.category}`;
        item.dataset.category = image.category;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.loading = 'lazy';
        
        // Handle image loading errors
        img.onerror = function() {
            console.log(`Image failed to load: ${image.src}`);
            this.style.display = 'none';
            
            // Create fallback content
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #004080, #001a33);
                color: white;
                padding: 20px;
                text-align: center;
            `;
            fallback.innerHTML = `
                <i class="${getCategoryIcon(image.category)}" style="font-size: 3rem; margin-bottom: 15px; color: #FFD700;"></i>
                <h3 style="margin-bottom: 10px; font-size: 1.2rem;">${image.title}</h3>
                <p style="font-size: 0.9rem; opacity: 0.8;">${image.description}</p>
                <p style="font-size: 0.8rem; margin-top: 10px; color: #FFD700;">(Add image: ${image.src})</p>
            `;
            
            item.appendChild(fallback);
        };
        
        const category = document.createElement('div');
        category.className = 'gallery-category';
        category.innerHTML = `<i class="${getCategoryIcon(image.category)}"></i> ${getCategoryName(image.category)}`;
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `
            <h4>${image.title}</h4>
            <p>${image.description}</p>
        `;
        
        item.appendChild(img);
        item.appendChild(category);
        item.appendChild(overlay);
        
        return item;
    }
    
    // Load gallery images
    function loadGalleryImages(filter = 'all') {
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        const filteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === filter);
        
        if (filteredImages.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-images">
                    <i class="fas fa-images"></i>
                    <h3>No Photos Found</h3>
                    <p>No images available for the "${getCategoryName(filter)}" category yet.</p>
                    <p>Add images to the "images" folder with the correct naming convention.</p>
                    <div style="margin-top: 20px;">
                        <button class="btn btn-primary" onclick="loadGalleryImages('all')">
                            <i class="fas fa-layer-group"></i> View All Photos
                        </button>
                    </div>
                </div>
            `;
            return;
        }
        
        filteredImages.forEach(image => {
            const galleryItem = createGalleryItem(image);
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Initialize filter buttons
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter images
                const filter = this.getAttribute('data-filter');
                loadGalleryImages(filter);
            });
        });
        
        // Load initial gallery
        loadGalleryImages('all');
    }
}

// ===== INITIALIZE GALLERY FUNCTIONS ON THAT PAGE =====
if (document.querySelector('body').classList.contains('gallery-page') || window.location.pathname.includes('gallery')) {
    document.addEventListener('DOMContentLoaded', initGalleryPageFunctions);
}

// ===== GLOBAL WINDOW FUNCTIONS =====
// Make gallery functions available globally for onclick events
window.loadGalleryImages = function(filter = 'all') {
    // This is a simplified version for the onclick handler
    if (typeof initGalleryPageFunctions === 'function') {
        // Re-run the gallery initialization with the specified filter
        const event = new Event('galleryFilterChange');
        event.filter = filter;
        document.dispatchEvent(event);
    }<!-- Slider Fix Script - FIXED VERSION -->
<script>
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Slider fix script loaded');
  
  // ========== EVENTS SLIDER FIX ==========
  const eventSlides = document.querySelectorAll('.event-slide');
  const eventDots = document.querySelectorAll('.dot');
  const prevEventBtn = document.getElementById('prevEventBtn');
  const nextEventBtn = document.getElementById('nextEventBtn');
  
  if (eventSlides.length > 0) {
    let currentEventSlide = 0;
    let eventInterval;
    
    // Function to show specific slide
    function showEventSlide(index) {
      // Remove active class from all slides
      eventSlides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      eventDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Set new slide index
      currentEventSlide = index;
      
      // Add active class to current slide and dot
      if (eventSlides[currentEventSlide]) {
        eventSlides[currentEventSlide].classList.add('active');
      }
      
      if (eventDots[currentEventSlide]) {
        eventDots[currentEventSlide].classList.add('active');
      }
      
      console.log('Showing event slide:', currentEventSlide);
    }
    
    // Next slide function
    function nextEvent() {
      let nextIndex = currentEventSlide + 1;
      if (nextIndex >= eventSlides.length) {
        nextIndex = 0;
      }
      showEventSlide(nextIndex);
    }
    
    // Previous slide function
    function prevEvent() {
      let prevIndex = currentEventSlide - 1;
      if (prevIndex < 0) {
        prevIndex = eventSlides.length - 1;
      }
      showEventSlide(prevIndex);
    }
    
    // Event listeners for buttons
    if (prevEventBtn) {
      prevEventBtn.addEventListener('click', function() {
        prevEvent();
        resetEventInterval();
      });
    }
    
    if (nextEventBtn) {
      nextEventBtn.addEventListener('click', function() {
        nextEvent();
        resetEventInterval();
      });
    }
    
    // Dot click events
    eventDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showEventSlide(index);
        resetEventInterval();
      });
    });
    
    // Auto slide function
    function startEventAutoSlide() {
      eventInterval = setInterval(nextEvent, 4000); // Change every 4 seconds
    }
    
    function stopEventAutoSlide() {
      if (eventInterval) {
        clearInterval(eventInterval);
      }
    }
    
    function resetEventInterval() {
      stopEventAutoSlide();
      startEventAutoSlide();
    }
    
    // Hover pause
    const eventsSlider = document.getElementById('eventsSlider');
    if (eventsSlider) {
      eventsSlider.addEventListener('mouseenter', stopEventAutoSlide);
      eventsSlider.addEventListener('mouseleave', startEventAutoSlide);
    }
    
    // Initialize slider
    showEventSlide(0);
    startEventAutoSlide();
  }
  
  // ========== FOUNDER SLIDER FIX ==========
  const pastorSlides = document.querySelectorAll('.pastor-slide');
  const pastorIndicators = document.querySelectorAll('.indicator');
  const prevPastorBtn = document.querySelector('.prev-pastor');
  const nextPastorBtn = document.querySelector('.next-pastor');
  
  if (pastorSlides.length > 1) {
    let currentPastorSlide = 0;
    let pastorInterval;
    
    // Function to show specific slide
    function showPastorSlide(index) {
      // Remove active class from all slides
      pastorSlides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all indicators
      pastorIndicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      // Set new slide index
      currentPastorSlide = index;
      
      // Add active class to current slide and indicator
      if (pastorSlides[currentPastorSlide]) {
        pastorSlides[currentPastorSlide].classList.add('active');
      }
      
      if (pastorIndicators[currentPastorSlide]) {
        pastorIndicators[currentPastorSlide].classList.add('active');
      }
    }
    
    // Next slide function
    function nextPastor() {
      let nextIndex = currentPastorSlide + 1;
      if (nextIndex >= pastorSlides.length) {
        nextIndex = 0;
      }
      showPastorSlide(nextIndex);
    }
    
    // Previous slide function
    function prevPastor() {
      let prevIndex = currentPastorSlide - 1;
      if (prevIndex < 0) {
        prevIndex = pastorSlides.length - 1;
      }
      showPastorSlide(prevIndex);
    }
    
    // Event listeners for buttons
    if (prevPastorBtn) {
      prevPastorBtn.addEventListener('click', function() {
        prevPastor();
        resetPastorInterval();
      });
    }
    
    if (nextPastorBtn) {
      nextPastorBtn.addEventListener('click', function() {
        nextPastor();
        resetPastorInterval();
      });
    }
    
    // Indicator click events
    pastorIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        showPastorSlide(index);
        resetPastorInterval();
      });
    });
    
    // Auto slide function
    function startPastorAutoSlide() {
      pastorInterval = setInterval(nextPastor, 3500); // Change every 3.5 seconds
    }
    
    function stopPastorAutoSlide() {
      if (pastorInterval) {
        clearInterval(pastorInterval);
      }
    }
    
    function resetPastorInterval() {
      stopPastorAutoSlide();
      startPastorAutoSlide();
    }
    
    // Hover pause
    const pastorSlider = document.getElementById('pastorSlider');
    if (pastorSlider) {
      pastorSlider.addEventListener('mouseenter', stopPastorAutoSlide);
      pastorSlider.addEventListener('mouseleave', startPastorAutoSlide);
    }
    
    // Initialize slider
    showPastorSlide(0);
    startPastorAutoSlide();
  }
});
</script>
};

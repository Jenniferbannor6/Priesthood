// ===== GLOBAL VARIABLES =====
let darkMode = localStorage.getItem('darkMode') === 'true';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Website initialized');
    
    // ===== 1. DARK/LIGHT MODE =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    const theme = document.documentElement;
    
    // Set initial mode
    if (darkMode) {
        theme.setAttribute('data-theme', 'dark');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        theme.setAttribute('data-theme', 'light');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Toggle function
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            
            if (darkMode) {
                theme.setAttribute('data-theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                theme.setAttribute('data-theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
            console.log('Dark mode:', darkMode ? 'ON' : 'OFF');
        });
    }
    
    // ===== 2. MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Change icon
            if (mobileNav.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking links
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // ===== 3. PRAYER REQUEST BUTTONS =====
    const prayerBtns = document.querySelectorAll('[data-modal="prayerModal"], .prayer-footer-btn');
    prayerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('prayerModal');
        });
    });
    
    // ===== 4. MODAL SYSTEM =====
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // ===== 5. FORM BUTTONS =====
    // WhatsApp prayer
    const whatsappPrayer = document.getElementById('whatsappPrayer');
    if (whatsappPrayer) {
        whatsappPrayer.addEventListener('click', function() {
            window.open('https://wa.me/233249392178?text=Hello!%20I%20need%20prayer.', '_blank');
        });
    }
    
    // Email prayer
    const emailPrayer = document.getElementById('emailPrayer');
    if (emailPrayer) {
        emailPrayer.addEventListener('click', function() {
            window.location.href = 'mailto:priesthoodfamilybiblecollege@gmail.com?subject=Prayer%20Request&body=Dear%20Prayer%20Team,%0A%0AI%20would%20like%20to%20request%20prayer%20for:%0A%0A[Please%20describe%20your%20prayer%20request%20here]%0A%0AName:%0APhone:%0AEmail:%0A';
        });
    }
    
    // Form prayer
    const formPrayer = document.getElementById('formPrayer');
    const prayerFormContainer = document.getElementById('prayerFormContainer');
    const backToPrayerOptions = document.getElementById('backToPrayerOptions');
    const prayerOptions = document.getElementById('prayerOptions');
    
    if (formPrayer && prayerFormContainer && prayerOptions) {
        formPrayer.addEventListener('click', function() {
            prayerOptions.style.display = 'none';
            prayerFormContainer.style.display = 'block';
        });
        
        if (backToPrayerOptions) {
            backToPrayerOptions.addEventListener('click', function() {
                prayerOptions.style.display = 'block';
                prayerFormContainer.style.display = 'none';
            });
        }
    }
    
    // ===== 6. COPY TO CLIPBOARD =====
    const copyButtons = document.querySelectorAll('.copy-btn, .copy-momo-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.getAttribute('data-number') || '0547367600';
            
            navigator.clipboard.writeText(number).then(() => {
                // Show toast
                showToast('Phone number copied to clipboard: ' + number);
            }).catch(err => {
                console.log('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = number;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Phone number copied!');
            });
        });
    });
    
    // ===== 7. QUICK JOIN BUTTON =====
    const quickJoinBtn = document.getElementById('quickJoinBtn');
    const quickJoinDropdown = document.getElementById('quickJoinDropdown');
    
    if (quickJoinBtn && quickJoinDropdown) {
        quickJoinBtn.addEventListener('click', function() {
            quickJoinDropdown.classList.toggle('show');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!quickJoinBtn.contains(e.target) && !quickJoinDropdown.contains(e.target)) {
                quickJoinDropdown.classList.remove('show');
            }
        });
    }
    
    // ===== 8. SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 9. FOUNDER IMAGES ON MOBILE =====
    function checkMobileImages() {
        if (window.innerWidth <= 768) {
            const founderImages = document.querySelectorAll('.pastor-slide img');
            founderImages.forEach(img => {
                img.style.display = 'block';
                img.style.visibility = 'visible';
                img.style.opacity = '1';
            });
        }
    }
    
    // Run on load and resize
    checkMobileImages();
    window.addEventListener('resize', checkMobileImages);
    
    // ===== 10. TOAST NOTIFICATIONS =====
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    console.log('✅ All functions initialized');
});

// ===== LOAD EVENT =====
window.addEventListener('load', function() {
    console.log('✅ Page fully loaded');
    
    // Force show images on mobile
    if (window.innerWidth <= 768) {
        const founderSlides = document.querySelectorAll('.pastor-slide');
        founderSlides.forEach(slide => {
            slide.style.display = 'block';
            slide.style.visibility = 'visible';
            slide.style.opacity = '1';
        });
    }
});

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const watchDemoBtn = document.getElementById('watchDemoBtn');
const demoModal = document.getElementById('demoModal');
const closeDemoModal = document.getElementById('closeDemoModal');
const demoVideo = document.getElementById('demoVideo');

// Demo video URL - using a smartphone demo video
const demoVideoUrl = 'https://www.youtube.com/watch?v=keYat4iSYAQ';

// Header scroll effect with throttle
let lastScrollPosition = 0;
let ticking = false;

function handleScroll() {
    lastScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });

        ticking = true;
    }
}

// Mobile navigation toggle with animation timing
function toggleNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    // Ensure smooth animation when closing
    if (!navLinks.classList.contains('active')) {
        navLinks.style.transition = 'right 0.3s ease-in-out';
    }
}

// Close mobile nav when clicking a nav link
function closeNavOnClick() {
    if (navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Demo modal functions
function openDemoModal() {
    demoModal.classList.add('active');
    demoVideo.src = demoVideoUrl;
    document.body.classList.add('no-scroll');
}

function closeDemoModalFunc() {
    demoModal.classList.remove('active');
    demoVideo.src = '';
    document.body.classList.remove('no-scroll');
}

// Smooth scroll to section with improved timing
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeNavOnClick();
    }
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Event Listeners
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleResize);
navToggle.addEventListener('click', toggleNav);

// Demo modal event listeners
if (watchDemoBtn) {
    watchDemoBtn.addEventListener('click', openDemoModal);
}

if (closeDemoModal) {
    closeDemoModal.addEventListener('click', closeDemoModalFunc);
}

// Close modal when clicking outside
if (demoModal) {
    demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            closeDemoModalFunc();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        closeDemoModalFunc();
    }
});

// Apply smooth scroll to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.getAttribute('href').length > 1) {
        link.addEventListener('click', smoothScroll);
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    handleScroll();
    initFAQ();
    initBackToTop();
});
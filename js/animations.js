// Animation functions to enhance the user experience

// Intersection Observer for element animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate when they come into view
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    // Create the observer with options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animated');
                
                // Remove from observation after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
        
        // Set initial styles for animations
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        element.style.opacity = '0';
        element.style.transition = `all 0.8s ease ${delay}ms`;
        
        // Set different initial transforms based on animation type
        switch(animationType) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(0.9)';
                break;
            default:
                element.style.transform = 'translateY(0)';
        }
    });
    
    // Add animation classes when elements are in view
    document.addEventListener('scroll', () => {
        animatedElements.forEach(element => {
            if (element.classList.contains('animated')) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0) scale(1)';
            }
        });
    }, { passive: true });
    
    // Trigger initial animations for elements already in viewport
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('animated');
            element.style.opacity = '1';
            element.style.transform = 'translate(0) scale(1)';
        }
    });
});

// Parallax effect for hero section
const heroSection = document.getElementById('hero');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) {
            const parallaxOffset = scrollPosition * 0.4;
            heroSection.style.backgroundPosition = `center ${-parallaxOffset}px`;
        }
    }, { passive: true });
}

// Smooth hover animations for interactive elements
document.querySelectorAll('.feature-card, .pricing-card, .btn-primary, .btn-secondary').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.5s ease';
    });
});

// Add subtle animation to product image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    // Float animation
    setInterval(() => {
        heroImage.style.transition = 'transform 3s ease-in-out';
        if (heroImage.style.transform === 'translateY(-8px)') {
            heroImage.style.transform = 'translateY(0)';
        } else {
            heroImage.style.transform = 'translateY(-8px)';
        }
    }, 3000);
    
    // Subtle rotation on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (window.innerWidth > 768) { // Only on desktop
            heroImage.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg) translateY(${heroImage.style.transform.includes('-8px') ? '-8px' : '0'})`;
        }
    }, { passive: true });
}

// Smooth counter animation for numbers
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target > 0 ? 1 : 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = start;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, stepTime);
}

// Initialize stats counter animation when in viewport
const statsElements = document.querySelectorAll('.stats-counter');
if (statsElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsElements.forEach(stat => {
        statsObserver.observe(stat);
    });
}
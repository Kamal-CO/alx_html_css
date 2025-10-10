// Mobile navigation toggle for dropdown
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Smooth scrolling and mobile menu close
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Get the target section from href attribute
        const targetId = link.getAttribute('href');
        
        // Only smooth scroll if it's an internal link (starts with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = mainNav.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
    }
});
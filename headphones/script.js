// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
    }
});
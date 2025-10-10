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

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
const formSuccess = document.getElementById('formSuccess');

// Validation patterns
const patterns = {
    name: /^[a-zA-ZÀ-ÿ\s']{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{10,500}$/
};

// Error messages
const errorMessages = {
    name: 'Please enter a valid name (2-50 characters)',
    email: 'Please enter a valid email address',
    message: 'Message must be between 10 and 500 characters'
};

// Real-time validation
contactForm.addEventListener('input', (e) => {
    if (e.target.matches('.form-input')) {
        validateField(e.target);
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        await submitForm();
    }
});

function validateField(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    const value = field.value.trim();
    
    if (patterns[fieldName].test(value)) {
        field.classList.remove('error');
        errorElement.classList.remove('show');
        return true;
    } else {
        field.classList.add('error');
        errorElement.textContent = errorMessages[fieldName];
        errorElement.classList.add('show');
        return false;
    }
}

function validateForm() {
    const fields = contactForm.querySelectorAll('.form-input');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function submitForm() {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        formSuccess.classList.add('show');
        contactForm.reset();
        
        // Reset form labels
        contactForm.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
            document.getElementById(`${input.name}Error`).classList.remove('show');
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset loading state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

// Add placeholder for label animation
document.querySelectorAll('.form-input').forEach(input => {
    input.setAttribute('placeholder', ' ');
});
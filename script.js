// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
        });
    });
});

// Form submission handling with validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Enhanced validation
    if (!name) {
        showValidationError('name', 'Please enter your name');
        return;
    }
    
    if (!email) {
        showValidationError('email', 'Please enter your email');
        return;
    }
    
    if (!validateEmail(email)) {
        showValidationError('email', 'Please enter a valid email address');
        return;
    }
    
    if (!message) {
        showValidationError('message', 'Please enter your message');
        return;
    }
    
    // In a real project, you would send this data to a server
    // For now, we'll just show a success message
    const formElement = document.getElementById('contact-form');
    formElement.innerHTML = `
        <div class="success-message">
            <h3>Thank you for your message!</h3>
            <p>I'll get back to you shortly.</p>
            <button id="send-another" class="submit-btn">Send Another Message</button>
        </div>
    `;
    
    document.getElementById('send-another').addEventListener('click', function() {
        window.location.reload();
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show validation error
function showValidationError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    
    // Remove any existing error messages
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    inputElement.parentElement.appendChild(errorElement);
    
    // Add error class to input
    inputElement.classList.add('error');
    
    // Remove error class when input is changed
    inputElement.addEventListener('input', function() {
        this.classList.remove('error');
        const error = this.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

// Scroll animation for skills section
window.addEventListener('scroll', function() {
    const skillsSection = document.querySelector('.skills');
    const skillsSectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (skillsSectionPosition < screenPosition) {
        document.querySelectorAll('.progress').forEach(progress => {
            progress.style.width = progress.style.width; // This triggers the CSS transition
        });
    }
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing animation effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroElement = document.querySelector('.hero h1');
    const originalText = heroElement.innerHTML;
    const subtitleElement = document.querySelector('.hero .subtitle');
    
    // Clear the text for animation
    heroElement.innerHTML = '';
    subtitleElement.style.opacity = '0';
    
    // Typing animation function
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroElement.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Show subtitle with fade-in effect after typing completes
            subtitleElement.style.transition = 'opacity 1s ease';
            subtitleElement.style.opacity = '1';
            
            // Show CTA button with animation
            document.querySelector('.hero .cta-button').style.opacity = '1';
            document.querySelector('.hero .cta-button').style.transform = 'translateY(0)';
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 500);
});

// Image gallery for projects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            this.classList.toggle('expanded');
        });
    });
});

// WhatsApp contact button functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            window.open(`https://wa.me/${this.dataset.number}`, '_blank');
        });
    }
});

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switch');
    
    if (themeSwitcher) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitcher.checked = true;
        }
        
        themeSwitcher.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Project filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else if (card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});



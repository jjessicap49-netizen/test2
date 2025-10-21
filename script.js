// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const message = form.querySelector('textarea');

            let isValid = true;
            let errorMessage = '';

            if (!name.value.trim()) {
                errorMessage += 'Name is required.\n';
                isValid = false;
            }

            if (!email.value.trim()) {
                errorMessage += 'Email is required.\n';
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                errorMessage += 'Please enter a valid email address.\n';
                isValid = false;
            }

            if (!message.value.trim()) {
                errorMessage += 'Message is required.\n';
                isValid = false;
            }

            if (isValid) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            } else {
                alert(errorMessage);
            }
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Search Functionality
function initSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', () => {
            searchBox.classList.add('active');
            searchInput.focus();
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchBox.classList.remove('active');
                searchInput.value = '';
            });
        }

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`Search results for: "${query}"\n\n(Search functionality would connect to a backend service)`);
                }
            }
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-question');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const isActive = parent.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    initFormValidation();
    initNewsletterSignup();
    initSearch();
    initFAQ();
});

// Theme Toggle Logic
const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
};

const updateThemeIcons = (isDark) => {
    const icons = ['theme-icon', 'theme-icon-desktop', 'theme-icon-mobile'];
    icons.forEach(id => {
        const icon = document.getElementById(id);
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
};

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
    updateThemeIcons(true);
} else {
    updateThemeIcons(false);
}

// Bind Theme Toggles
['theme-toggle', 'theme-toggle-desktop', 'theme-toggle-mobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', toggleTheme);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skill bars
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(skillsSection);
}

// Form submission
const contactForm = document.querySelector('form');
if (contactForm && contactForm.id !== 'newsletter-form') { // avoid intercepting disabled form if it's the only one
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const message = messageInput ? messageInput.value : '';
        
        if (name && email && message) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

function handleAlert(){
    if(typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Coming Soon..',
            text: 'More projects will be added here soon.',
            icon: 'info',
            confirmButtonColor: '#6c63ff'
        });
    } else {
        alert("Coming Soon..");
    }
}

function openPDFModal() {
    const modal = document.getElementById("pdfModal");
    if(modal) modal.classList.remove("hidden");
}

function closePDFModal() {
    const modal = document.getElementById("pdfModal");
    if(modal) modal.classList.add("hidden");
}
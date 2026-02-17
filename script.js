// ===== MOBILE MENU LOGIC =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== TYPING EFFECT =====
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
    "Full Stack MERN Developer",
    "Professional Graphic Designer",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
let isTyping = true;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        isTyping = false;
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        isTyping = true;
        setTimeout(type, typingDelay + 500);
    }
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// ===== BACK TO TOP BUTTON (Already in HTML) =====
const backToTopBtn = document.getElementById('backToTop');

// ===== SCROLL EVENT HANDLER =====
function handleScroll() {
    // Scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Back to top button
    if (winScroll > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(16, 16, 16, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(16, 16, 16, 0.95)';
    }
    
    // Animate elements on scroll
    animateOnScroll();
}

// ===== ANIMATE ELEMENTS ON SCROLL =====
function animateOnScroll() {
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-per');
    skillBars.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (skillPosition < screenPosition && !skill.classList.contains('animated')) {
            const width = skill.style.width;
            skill.style.width = '0%';
            setTimeout(() => {
                skill.style.width = width;
                skill.classList.add('animated');
            }, 300);
        }
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition && !card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, index * 100);
        }
    });
    
    // Animate stats
    const statBoxes = document.querySelectorAll('.stat-box h4');
    statBoxes.forEach(stat => {
        const statPosition = stat.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (statPosition < screenPosition && !stat.classList.contains('animated')) {
            const finalValue = stat.textContent;
            if (finalValue.includes('+') || finalValue.includes('%')) {
                let current = 0;
                const increment = parseInt(finalValue) / 20;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= parseInt(finalValue)) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                        stat.classList.add('animated');
                    } else {
                        stat.textContent = Math.floor(current) + finalValue.replace(/[0-9]/g, '');
                    }
                }, 50);
            }
        }
    });
    
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition && !card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, index * 100);
        }
    });
    
    // Animate blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition && !card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, index * 100);
        }
    });
}

// ===== BACK TO TOP FUNCTIONALITY =====
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PROJECT MODAL FUNCTIONALITY =====
function initializeProjectModals() {
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const projectCard = this.closest('.project-card');
            const title = projectCard.querySelector('.project-title').textContent;
            const description = projectCard.querySelector('.project-desc').textContent;
            const tags = Array.from(projectCard.querySelectorAll('.tag')).map(tag => tag.textContent);
            const imgSrc = projectCard.querySelector('img').src;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'project-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="modal-body">
                        <h3>${title}</h3>
                        <div class="modal-tags">
                            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <p>${description}</p>
                        <p><strong>Project Details:</strong> This project demonstrates advanced techniques with clean code architecture, responsive design, and optimized performance.</p>
                        <div class="project-features">
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Responsive Design</li>
                                <li>Clean Code Architecture</li>
                                <li>Performance Optimized</li>
                                <li>Cross-browser Compatible</li>
                            </ul>
                        </div>
                        <div class="modal-links">
                            <a href="https://github.com/walidbhuiyan334" target="_blank" class="btn">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="#" class="btn" style="background: transparent; border-color: var(--primary-color); color: var(--primary-color);">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .project-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: var(--card-bg);
                    border-radius: 15px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 1px solid var(--border-color);
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                
                .close-modal {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    color: #fff;
                    font-size: 30px;
                    cursor: pointer;
                    z-index: 10;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    transition: 0.3s;
                }
                
                .close-modal:hover {
                    background: var(--primary-color);
                }
                
                .modal-content img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 15px 15px 0 0;
                }
                
                .modal-body {
                    padding: 40px;
                }
                
                .modal-body h3 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                    color: #fff;
                }
                
                .modal-tags {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }
                
                .modal-body p {
                    color: var(--text-gray);
                    margin-bottom: 15px;
                    line-height: 1.7;
                }
                
                .project-features {
                    margin: 25px 0;
                }
                
                .project-features h4 {
                    color: #fff;
                    margin-bottom: 10px;
                    font-size: 1.2rem;
                }
                
                .project-features ul {
                    padding-left: 20px;
                }
                
                .project-features li {
                    color: var(--text-gray);
                    margin-bottom: 8px;
                    line-height: 1.6;
                }
                
                .modal-links {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Close modal functionality
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                    style.remove();
                }, 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                        style.remove();
                    }, 300);
                }
            });
            
            // Add escape key to close modal
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                        style.remove();
                        document.removeEventListener('keydown', handleEscape);
                    }, 300);
                }
            };
            
            document.addEventListener('keydown', handleEscape);
        });
    });
}

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Form validation
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const subject = this.querySelector('#subject').value.trim();
        const message = this.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (Replace with actual fetch)
        setTimeout(() => {
            // Success simulation
            showMessage('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (for debugging)
            console.log('Form submitted:', { name, email, subject, message });
            
        }, 1500);
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showMessage(text, type) {
        // Remove existing messages
        const existingMsg = contactForm.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Add message styles
        const messageStyle = document.createElement('style');
        messageStyle.textContent = `
            .form-message {
                margin-top: 20px;
                padding: 15px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .form-message.success {
                background: rgba(0, 210, 133, 0.1);
                border: 1px solid var(--primary-color);
                color: var(--primary-color);
            }
            
            .form-message.error {
                background: rgba(255, 50, 50, 0.1);
                border: 1px solid #ff3232;
                color: #ff3232;
            }
            
            .form-message i {
                font-size: 1.2rem;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(messageStyle);
        
        contactForm.appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
                messageStyle.remove();
            }, 300);
        }, 5000);
    }
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== VISITOR COUNTER =====
function updateVisitorCounter() {
    let visitCount = localStorage.getItem('portfolioVisits');
    if (!visitCount) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }
    localStorage.setItem('portfolioVisits', visitCount);
    
    // Display count in footer (optional)
    const footer = document.querySelector('footer p');
    if (footer) {
        const visitsText = document.createElement('span');
        visitsText.className = 'visitor-count';
        visitsText.style.cssText = 'color: #666; font-size: 0.8rem; margin-left: 10px;';
        visitsText.textContent = `Visits: ${visitCount}`;
        footer.appendChild(visitsText);
    }
}

// ===== LAZY LOAD IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ===== COPY EMAIL FUNCTION =====
function initializeEmailCopy() {
    const emailElement = document.querySelector('.hero-info span');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy';
        
        emailElement.addEventListener('click', () => {
            const email = emailElement.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailElement.textContent;
                emailElement.textContent = 'Copied to clipboard!';
                emailElement.style.color = 'var(--primary-color)';
                
                setTimeout(() => {
                    emailElement.textContent = originalText;
                    emailElement.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener("DOMContentLoaded", function() { 
    // Start typing effect
    if(typedTextSpan) setTimeout(type, newTextDelay + 250);
    
    // Initialize all features
    initializeProjectModals();
    initializeContactForm();
    initializeSmoothScroll();
    initializeLazyLoading();
    updateVisitorCounter();
    initializeEmailCopy();
    
    // Set initial styles for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.querySelectorAll('.blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial animation check
    animateOnScroll();
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveNavLink();
});

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Tab navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// ===== CURRENT YEAR IN FOOTER =====
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    if (footerText && footerText.textContent.includes('2024')) {
        footerText.textContent = footerText.textContent.replace('2024', currentYear);
    }
}

// Initialize current year
updateCurrentYear();

// ===== ADD CURSOR TO TYPING EFFECT =====
function addTypingCursor() {
    if (typedTextSpan) {
        // Create cursor element
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '|';
        
        // Add cursor styles
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .typing-cursor {
                color: var(--primary-color);
                animation: blink 1s infinite;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyle);
        
        // Insert cursor after typed text
        typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);
    }
}

// Add typing cursor
addTypingCursor();
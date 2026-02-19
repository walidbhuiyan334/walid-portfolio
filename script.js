// ===== MODERN CONFIGURATION =====
const CONFIG = {
    typingDelay: 80,
    erasingDelay: 40,
    newTextDelay: 2000,
    scrollThreshold: 300,
    animationThreshold: 50,
    formSubmitDelay: 1500,
    localStoragePrefix: 'portfolio_'
};

// ===== DARK MODE DETECTION =====
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
    document.documentElement.style.setProperty('--bg-color', '#101010');
}

// ===== MOBILE MENU WITH GESTURE SUPPORT =====
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.touchStartX = 0;
        
        if (this.hamburger && this.navMenu) {
            this.init();
        }
    }
    
    init() {
        this.hamburger.addEventListener('click', (e) => this.toggleMenu(e));
        this.setupEventListeners();
        this.setupGestureSupport();
    }
    
    toggleMenu(e) {
        e?.stopPropagation();
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
        
        // Announce for screen readers
        this.navMenu.setAttribute('aria-expanded', this.isOpen);
    }
    
    setupEventListeners() {
        // Close on link click
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    setupGestureSupport() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isOpen) return;
            
            const touchEndX = e.touches[0].clientX;
            const diffX = this.touchStartX - touchEndX;
            
            if (diffX > 50) { // Swipe left to close
                this.closeMenu();
            }
        }, { passive: true });
    }
    
    closeMenu() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.navMenu.setAttribute('aria-expanded', 'false');
    }
}

// ===== ADVANCED TYPING EFFECT =====
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.typed-text');
        this.texts = [
            "Full Stack MERN Developer",
            "Professional Graphic Designer",
            "Video Editor",
        ];
        this.currentIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.cursor = null;
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        this.createCursor();
        this.type();
    }
    
    createCursor() {
        this.cursor = document.createElement('span');
        this.cursor.className = 'modern-cursor';
        this.cursor.innerHTML = '<span class="cursor-glow"></span>';
        this.element.parentNode.insertBefore(this.cursor, this.element.nextSibling);
        
        const style = document.createElement('style');
        style.textContent = `
            .modern-cursor {
                display: inline-block;
                width: 3px;
                height: 1.2em;
                background: linear-gradient(135deg, var(--primary-color), #00ffaa);
                margin-left: 4px;
                border-radius: 2px;
                position: relative;
                animation: cursorPulse 1.2s infinite;
            }
            
            .cursor-glow {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: inherit;
                filter: blur(4px);
                opacity: 0.7;
            }
            
            @keyframes cursorPulse {
                0%, 100% { opacity: 1; transform: scaleY(1); }
                50% { opacity: 0.5; transform: scaleY(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    type() {
        const currentText = this.texts[this.currentIndex];
        const displayText = this.isDeleting 
            ? currentText.substring(0, this.charIndex - 1)
            : currentText.substring(0, this.charIndex + 1);
        
        this.element.textContent = displayText;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            this.isDeleting = true;
            setTimeout(() => this.type(), CONFIG.newTextDelay);
            return;
        }
        
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            setTimeout(() => this.type(), CONFIG.typingDelay);
            return;
        }
        
        this.charIndex += this.isDeleting ? -1 : 1;
        setTimeout(() => this.type(), this.isDeleting ? CONFIG.erasingDelay : CONFIG.typingDelay);
    }
}

// ===== SMOOTH SCROLL WITH PROGRESS =====
class ScrollManager {
    constructor() {
        this.progressBar = null;
        this.backToTop = document.getElementById('backToTop');
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        this.createProgressBar();
        this.setupEventListeners();
        this.updateActiveNavLink();
    }
    
    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'modern-progress';
        document.body.appendChild(this.progressBar);
        
        const style = document.createElement('style');
        style.textContent = `
            .modern-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color), #00ffaa, var(--primary-color));
                background-size: 200% 100%;
                z-index: 1001;
                transition: width 0.1s ease;
                box-shadow: 0 0 15px rgba(0, 210, 133, 0.5);
                animation: gradientShift 2s linear infinite;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 0%; }
                100% { background-position: 200% 0%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        if (this.backToTop) {
            this.backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(0);
            });
        }
    }
    
    handleScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = scrolled + '%';
        }
        
        if (this.backToTop) {
            this.backToTop.style.display = winScroll > CONFIG.scrollThreshold ? 'flex' : 'none';
            this.backToTop.style.transform = winScroll > CONFIG.scrollThreshold 
                ? 'translateY(0)' : 'translateY(100px)';
        }
        
        if (this.navbar) {
            this.navbar.classList.toggle('scrolled', winScroll > 50);
        }
    }
    
    smoothScrollTo(target, duration = 800) {
        const start = window.pageYOffset;
        const change = target - start;
        const startTime = performance.now();
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            window.scrollTo(0, start + change * this.easeInOutCubic(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.pageYOffset;
            const navbarHeight = this.navbar?.offsetHeight || 60;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });
    }
}

// ===== ADVANCED PROJECT MODAL =====
class ProjectModal {
    constructor() {
        this.modal = null;
        this.currentProject = null;
        this.init();
    }
    
    init() {
        document.querySelectorAll('.project-card .btn').forEach(button => {
            button.addEventListener('click', (e) => this.openModal(e));
        });
        
        this.addModalStyles();
    }
    
    openModal(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const card = e.target.closest('.project-card');
        if (!card) return;
        
        this.currentProject = {
            title: card.querySelector('.project-title')?.textContent || 'Project Title',
            description: card.querySelector('.project-desc')?.textContent || '',
            tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent),
            image: card.querySelector('img')?.src || '',
            github: 'https://github.com/walidbhuiyan334',
            demo: '#'
        };
        
        this.renderModal();
    }
    
    renderModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'glass-modal';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        
        this.modal.innerHTML = `
            <div class="modal-container">
                <button class="modal-close" aria-label="Close modal">
                    <span></span>
                    <span></span>
                </button>
                
                ${this.currentProject.image ? `
                    <div class="modal-media">
                        <img src="${this.currentProject.image}" alt="${this.currentProject.title}" loading="lazy">
                        <div class="media-overlay"></div>
                    </div>
                ` : ''}
                
                <div class="modal-content">
                    <h2 class="modal-title gradient-text">${this.currentProject.title}</h2>
                    
                    <div class="modal-tags">
                        ${this.currentProject.tags.map(tag => 
                            `<span class="modern-tag">${tag}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="modal-description">
                        <p>${this.currentProject.description}</p>
                    </div>
                    
                    <div class="modal-features">
                        <h3>Key Features</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> Responsive Design</li>
                            <li><i class="fas fa-check-circle"></i> Clean Architecture</li>
                            <li><i class="fas fa-check-circle"></i> Performance Optimized</li>
                            <li><i class="fas fa-check-circle"></i> Cross-browser Compatible</li>
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="${this.currentProject.github}" target="_blank" class="modern-btn primary">
                            <i class="fab fa-github"></i>
                            <span>View Code</span>
                        </a>
                        <a href="${this.currentProject.demo}" target="_blank" class="modern-btn secondary">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        document.body.style.overflow = 'hidden';
        
        this.modal.classList.add('active');
        this.setupModalEvents();
    }
    
    setupModalEvents() {
        const closeBtn = this.modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        }, { once: true });
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .glass-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
            }
            
            .glass-modal.active {
                opacity: 1;
            }
            
            .modal-container {
                background: rgba(22, 22, 22, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                max-width: 900px;
                width: 100%;
                max-height: 85vh;
                overflow-y: auto;
                border: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
                transform: translateY(30px) scale(0.95);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            
            .glass-modal.active .modal-container {
                transform: translateY(0) scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .modal-close span {
                position: absolute;
                width: 20px;
                height: 2px;
                background: #fff;
                transition: 0.3s;
            }
            
            .modal-close span:first-child {
                transform: rotate(45deg);
            }
            
            .modal-close span:last-child {
                transform: rotate(-45deg);
            }
            
            .modal-close:hover {
                background: var(--primary-color);
                transform: rotate(90deg);
            }
            
            .modal-media {
                position: relative;
                height: 300px;
                overflow: hidden;
            }
            
            .modal-media img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .modal-container:hover .modal-media img {
                transform: scale(1.05);
            }
            
            .media-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, transparent 0%, rgba(22, 22, 22, 0.9) 100%);
            }
            
            .modal-content {
                padding: 40px;
            }
            
            .gradient-text {
                background: linear-gradient(135deg, #fff, var(--primary-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 2rem;
                margin-bottom: 20px;
            }
            
            .modern-tag {
                padding: 6px 15px;
                background: rgba(0, 210, 133, 0.1);
                border: 1px solid rgba(0, 210, 133, 0.2);
                border-radius: 30px;
                color: var(--primary-color);
                font-size: 14px;
                transition: 0.3s;
            }
            
            .modern-tag:hover {
                background: var(--primary-color);
                color: #000;
                transform: translateY(-2px);
            }
            
            .modal-features {
                margin: 30px 0;
                padding: 25px;
                background: rgba(255, 255, 255, 0.02);
                border-radius: 15px;
            }
            
            .modal-features h3 {
                color: #fff;
                margin-bottom: 15px;
                font-size: 1.3rem;
            }
            
            .feature-list {
                list-style: none;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .feature-list li {
                color: var(--text-gray);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .feature-list i {
                color: var(--primary-color);
            }
            
            .modern-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 12px 30px;
                border-radius: 30px;
                font-weight: 600;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                text-decoration: none;
            }
            
            .modern-btn.primary {
                background: var(--primary-color);
                color: #000;
            }
            
            .modern-btn.secondary {
                background: transparent;
                border: 2px solid var(--primary-color);
                color: var(--primary-color);
            }
            
            .modern-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0, 210, 133, 0.2);
            }
            
            @media (max-width: 768px) {
                .modal-media {
                    height: 200px;
                }
                .modal-content {
                    padding: 25px;
                }
                .gradient-text {
                    font-size: 1.6rem;
                }
                .feature-list {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== SMART CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputEffects();
    }
    
    setupInputEffects() {
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', () => {
                field.parentElement.classList.remove('focused');
                if (field.value) {
                    field.parentElement.classList.add('filled');
                } else {
                    field.parentElement.classList.remove('filled');
                }
            });
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        this.setLoadingState(submitBtn, true);
        
        try {
            // Simulate API call with modern fetch
            await this.submitToAPI(formData);
            this.showMessage('Message sent successfully! I\'ll respond within 24 hours.', 'success');
            this.form.reset();
            this.resetFieldStates();
        } catch (error) {
            this.showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false, originalContent);
        }
    }
    
    getFormData() {
        return {
            name: this.form.querySelector('#name')?.value.trim() || '',
            email: this.form.querySelector('#email')?.value.trim() || '',
            subject: this.form.querySelector('#subject')?.value.trim() || '',
            message: this.form.querySelector('#message')?.value.trim() || ''
        };
    }
    
    validateForm(data) {
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showMessage('Please fill in all fields', 'error');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    async submitToAPI(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, CONFIG.formSubmitDelay);
        });
    }
    
    setLoadingState(button, isLoading, originalContent = '') {
        button.disabled = isLoading;
        button.innerHTML = isLoading 
            ? '<i class="fas fa-spinner fa-spin"></i> Sending...' 
            : originalContent;
    }
    
    resetFieldStates() {
        this.form.querySelectorAll('.focused, .filled').forEach(el => {
            el.classList.remove('focused', 'filled');
        });
    }
    
    showMessage(text, type) {
        const existingMsg = this.form.querySelector('.form-message-modern');
        if (existingMsg) existingMsg.remove();
        
        const message = document.createElement('div');
        message.className = `form-message-modern ${type}`;
        message.innerHTML = `
            <div class="message-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
            <button class="message-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        this.form.appendChild(message);
        
        setTimeout(() => message.remove(), 5000);
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationObserver {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll(
            '.project-card, .service-card, .blog-card, .skill-category, .testimonial-card'
        );
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            this.observer.observe(el);
        });
        
        // Add styles for in-view elements
        const style = document.createElement('style');
        style.textContent = `
            .in-view {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== VISITOR ANALYTICS =====
class VisitorAnalytics {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            const visits = this.updateVisitorCount();
            this.displayVisitorCount(visits);
            this.trackPageView();
        } catch (e) {
            console.log('Analytics unavailable');
        }
    }
    
    updateVisitorCount() {
        const key = CONFIG.localStoragePrefix + 'visits';
        let visits = localStorage.getItem(key);
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem(key, visits);
        return visits;
    }
    
    displayVisitorCount(visits) {
        const footer = document.querySelector('footer p');
        if (footer && !footer.querySelector('.visitor-badge')) {
            const badge = document.createElement('span');
            badge.className = 'visitor-badge';
            badge.innerHTML = `
                <i class="fas fa-eye"></i>
                <span class="count">${visits}</span>
                <span class="label">views</span>
            `;
            footer.appendChild(badge);
            
            // Add badge styles
            const style = document.createElement('style');
            style.textContent = `
                .visitor-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    background: rgba(0, 210, 133, 0.1);
                    border: 1px solid rgba(0, 210, 133, 0.2);
                    border-radius: 30px;
                    margin-left: 15px;
                    font-size: 13px;
                    color: var(--primary-color);
                }
                
                .visitor-badge i {
                    font-size: 12px;
                }
                
                .visitor-badge .count {
                    font-weight: 700;
                }
                
                .visitor-badge .label {
                    color: var(--text-gray);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    trackPageView() {
        // Track page load time
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    }
}

// ===== CLIPBOARD MANAGER =====
class ClipboardManager {
    constructor() {
        this.init();
    }
    
    init() {
        const emailElement = document.querySelector('.hero-info span');
        if (emailElement?.textContent.includes('@')) {
            this.setupEmailCopy(emailElement);
        }
    }
    
    setupEmailCopy(element) {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy email';
        
        element.addEventListener('click', async () => {
            const email = element.textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                this.showTooltip(element, '✓ Email copied!');
            } catch (err) {
                this.showTooltip(element, '❌ Copy failed', 'error');
            }
        });
    }
    
    showTooltip(element, message, type = 'success') {
        const tooltip = document.createElement('div');
        tooltip.className = `copy-tooltip ${type}`;
        tooltip.textContent = message;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = rect.top - 40 + 'px';
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
        
        // Add tooltip styles
        const style = document.createElement('style');
        style.textContent = `
            .copy-tooltip {
                background: var(--card-bg);
                color: var(--primary-color);
                padding: 8px 15px;
                border-radius: 30px;
                font-size: 14px;
                transform: translateX(-50%);
                border: 1px solid var(--primary-color);
                box-shadow: 0 10px 25px rgba(0, 210, 133, 0.2);
                transition: opacity 0.3s ease;
                z-index: 10000;
            }
            
            .copy-tooltip.error {
                color: #ff3232;
                border-color: #ff3232;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== LAZY LOADING WITH INTERSECTION OBSERVER =====
class LazyLoader {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.01
            });
            
            this.observeImages();
        } else {
            this.loadAllImages();
        }
    }
    
    observeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.observer.observe(img);
        });
    }
    
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            this.observer.unobserve(img);
        }
    }
    
    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ===== CURRENT YEAR UPDATER =====
function updateFooterYear() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace(/\d{4}/g, currentYear);
    }
}

// ===== RESIZE HANDLER WITH DEBOUNCE =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleResize = debounce(() => {
    if (window.innerWidth > 991) {
        const menu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (menu?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}, 250);

// About section tabs functionality
// About Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the tab id
            const tabId = btn.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Stat Numbers Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    
    // Trigger animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modern components
    const mobileMenu = new MobileMenu();
    const typingEffect = new TypingEffect();
    const scrollManager = new ScrollManager();
    const projectModal = new ProjectModal();
    const contactForm = new ContactForm();
    const animationObserver = new AnimationObserver();
    const visitorAnalytics = new VisitorAnalytics();
    const clipboardManager = new ClipboardManager();
    const lazyLoader = new LazyLoader();
    
    // Update footer year
    updateFooterYear();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
});

// ===== ADD GLOBAL STYLES =====
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    :root {
        --primary-glow: 0 0 20px rgba(0, 210, 133, 0.3);
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    ::selection {
        background: var(--primary-color);
        color: #000;
    }
    
    /* Smooth scrolling for the whole page */
    html {
        scroll-behavior: smooth;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-color);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #00b371;
    }
`;
document.head.appendChild(globalStyles);
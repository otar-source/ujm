// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // ----- DOM Elements -----
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const statNumbers = document.querySelectorAll('.stat-number');
    const newsContainer = document.getElementById('news-container');
    const newsletterForm = document.getElementById('newsletter-form');
    const yearSpan = document.getElementById('current-year');

    // ----- Mobile Menu Toggle -----
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    } else {
        console.warn('Mobile menu elements not found');
    }

    // ----- Animated Counter Function -----
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    // ----- Initialize Counters when in viewport -----
    function initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // ----- EXPANDABLE NEWS SECTION -----
    function loadExpandableNews() {
        if (!newsContainer) return;

        // News data with short and long descriptions
        const newsData = [
            {
                id: 1,
                title: "4th Edition JCCO Touches 200+ Young Hearts",
                category: "Outreach Report",
                date: "Dec 15, 2024",
                image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                shortDesc: "Our recent outreach in Rivers State saw over 200 children participate in life-changing gospel teachings, games, and received essential school supplies.",
                longDesc: "The 4th edition of Jesus' Children Community Outreach was held in Port Harcourt, Rivers State, with over 200 children from 15 communities. The day included Bible lessons from Luke 2:40, memory verse competitions, health talks, and distribution of 250 school bags and Bibles. 85 children gave their lives to Christ for the first time. Local churches partnered to provide follow-up discipleship. Testimonies from parents highlighted the positive behavior changes in their children."
            },
            {
                id: 2,
                title: "From Shy Child to Confident Prayer Leader",
                category: "Transformation Story",
                date: "Nov 28, 2024",
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                shortDesc: "Meet Sarah, a 12-year-old who transformed from a shy participant to a confident prayer leader through our mentorship programs.",
                longDesc: "Sarah joined our Teens Empowerment Program in 2023 as a quiet, withdrawn girl who struggled to speak in public. Through consistent mentorship, character development classes, and prayer sessions, she discovered her gift in intercession. Today, Sarah leads the children's prayer team, organizes weekly prayer meetings, and has become a role model for younger children. Her mother testified, 'The change in Sarah is miraculous; she now leads family devotions and encourages her siblings.'"
            },
            {
                id: 3,
                title: "Partnership Expands School Outreach Impact",
                category: "Ministry Update",
                date: "Nov 10, 2024",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                shortDesc: "New partnership with Glow for Jesus Foundation enables us to reach 5 additional schools across Delta State in 2025.",
                longDesc: "We are thrilled to announce a strategic partnership with Glow for Jesus Foundation, a faith-based organization dedicated to youth development. This collaboration will expand our School Outreach Initiative to five new schools in Delta State, reaching an estimated 800 students. The program will include weekly Bible clubs, career guidance, and mentorship from trained volunteers. Additionally, the partnership will provide school supplies and scholarships for 50 underprivileged children. We give God all the glory for this open door."
            }
        ];

        // Build HTML
        newsContainer.innerHTML = newsData.map(article => `
            <div class="news-card expandable-card fade-in" data-id="${article.id}">
                <div class="news-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="news-content">
                    <span class="news-category">${article.category}</span>
                    <h3 class="news-title">${article.title}</h3>
                    <div class="news-short">
                        <p class="news-excerpt">${article.shortDesc}</p>
                        <span class="read-more-indicator">
                            <i class="fas fa-chevron-down"></i> Click to read more
                        </span>
                    </div>
                    <div class="news-long" style="display: none;">
                        <p>${article.longDesc}</p>
                    </div>
                    <div class="news-date">
                        <i class="far fa-calendar"></i>
                        <span>${article.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach click handlers to each short description
        document.querySelectorAll('.expandable-card .news-short').forEach(short => {
            short.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.expandable-card');
                const longDesc = card.querySelector('.news-long');
                const indicatorIcon = this.querySelector('.read-more-indicator i');
                const indicatorSpan = this.querySelector('.read-more-indicator');

                if (!longDesc || !indicatorIcon) return;

                if (longDesc.style.display === 'none') {
                    // Expand
                    longDesc.style.display = 'block';
                    indicatorIcon.classList.remove('fa-chevron-down');
                    indicatorIcon.classList.add('fa-chevron-up');
                    indicatorSpan.innerHTML = '<i class="fas fa-chevron-up"></i> Show less';
                    this.classList.add('expanded');

                    // Optional: smooth scroll to keep card visible
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                } else {
                    // Collapse
                    longDesc.style.display = 'none';
                    indicatorIcon.classList.remove('fa-chevron-up');
                    indicatorIcon.classList.add('fa-chevron-down');
                    indicatorSpan.innerHTML = '<i class="fas fa-chevron-down"></i> Click to read more';
                    this.classList.remove('expanded');
                }
            });
        });
    }

    // ----- Newsletter Form Handler -----
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');

            if (!emailInput || !emailInput.value) {
                showNotification('Please enter your email address', 'error');
                return;
            }

            // Simulate API call
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ----- Smooth Scroll for Anchor Links -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && mobileMenuBtn) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // ----- Lazy Loading Images (if any have data-src) -----
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }

    // ----- Add loading class to form submit buttons -----
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
            }
        });
    });

    // ----- Set current year in footer -----
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ----- Initialize All Features -----
    initCounters();
    loadExpandableNews();   // This now renders the expandable cards
    initLazyLoading();
});

// ===== Global Helper Functions =====

// Notification System (used by newsletter form)
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Add styles for notification if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                border-left: 4px solid #4361ee;
            }
            .notification.success { border-left-color: #4cc9f0; }
            .notification.error { border-left-color: #e63946; }
            .notification i { font-size: 1.2rem; }
            .notification.success i { color: #4cc9f0; }
            .notification.error i { color: #e63946; }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                margin-left: 10px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Auto-remove notification
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Initial navbar state on load
window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.pageYOffset > 100) {
        navbar.classList.add('scroll-up');
    }
});
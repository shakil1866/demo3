/**
 * Excellence School District - Main JavaScript
 * Pure JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initPageLoader();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
});

/**
 * Page Loader
 * Hides loader after animation completes
 */
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    // Hide loader after animation
    setTimeout(() => {
        loader.classList.add('hidden');

        // Trigger hero animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 2500);
}

/**
 * Navbar
 * Adds scroll effect to navbar
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu
 * Toggle mobile menu on hamburger click
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link, .btn-primary');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Scroll Animations
 * Trigger animations when elements come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Counter Animations
 * Animate stat numbers when they come into view
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    if (!counters.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate a single counter
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Tab Functionality
 * For inner pages with tabbed content
 */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        const tabContainer = btn.closest('.tabs-container');

        // Remove active class from all tabs in this container
        tabContainer.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        btn.classList.add('active');

        // Hide all tab content in this container
        tabContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Show target tab content
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

/**
 * Filter Functionality
 * For filtering cards (schools, news, etc.)
 */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const container = btn.closest('[class*="section"]').querySelector('.grid-3, .grid-4');

        if (!container) return;

        // Update active filter button
        btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        const cards = container.querySelectorAll('.card');
        cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/**
 * Smooth Scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Add stagger animation delay to cards
 */
document.querySelectorAll('.grid-3, .grid-4').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add(`stagger-${index % 4}`);
    });
});

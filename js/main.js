/**
 * Portfolio Website - Main JavaScript
 * Optimized vanilla JavaScript for smooth scrolling and interactions
 */

(function() {
    'use strict';

    const nav = document.querySelector('.navbar');

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        const navHeight = nav?.offsetHeight || 0;

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll spy with requestAnimationFrame for better performance
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        if (!sections.length || !navLinks.length) return;

        let ticking = false;

        function updateActiveLink() {
            let current = '';
            const scrollPosition = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop - (nav?.offsetHeight || 0) - 20) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateActiveLink(); // Initial call
    }

    // Entrance animations on scroll using IntersectionObserver
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.card, .principle, .capability-item, .audience-item');
        elements.forEach(el => observer.observe(el));
    }

    // Optional: Add CSS for fade-in if not in main stylesheet
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card, .principle, .capability-item, .audience-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .nav-links a.active {
                color: var(--color-accent);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all functions when DOM is ready
    function init() {
        initSmoothScroll();
        initScrollSpy();
        addAnimationStyles();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

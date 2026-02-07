/**
 * Portfolio Animations — MagicUI-inspired scroll reveals
 * Uses IntersectionObserver for performant scroll-triggered animations.
 * No external libraries required.
 */

(function () {
    'use strict';

    // ---- Scroll-triggered blur-fade reveals ----
    const animatedElements = document.querySelectorAll(
        '.blur-fade, .blur-fade-left, .blur-fade-right, .scale-in'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        animatedElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        animatedElements.forEach((el) => el.classList.add('is-visible'));
    }

    // ---- Active dock nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const dockLinks = document.querySelectorAll('.dock-nav a[href^="#"]');

    if (sections.length && dockLinks.length) {
        window.addEventListener(
            'scroll',
            () => {
                let current = '';
                sections.forEach((section) => {
                    const top = section.offsetTop - 120;
                    if (window.scrollY >= top) {
                        current = section.getAttribute('id');
                    }
                });

                dockLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            },
            { passive: true }
        );
    }

    // ---- Smooth scroll for dock nav links ----
    dockLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
})();

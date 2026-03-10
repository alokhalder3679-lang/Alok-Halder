// Setup DOM content loaded event
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Sticky Header Implementation
       ========================================== */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.querySelector('.nav-container').classList.add('glass');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const menuIcon = document.querySelector('.menu-icon i');
    const navbar = document.querySelector('.navbar');

    menuIcon.parentElement.addEventListener('click', () => {
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-menu');
            menuIcon.classList.add('bx-x');
        } else {
            menuIcon.classList.add('bx-menu');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.add('bx-menu');
            menuIcon.classList.remove('bx-x');
        });
    });

    /* ==========================================
       Active Navigation Link Update on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment to trigger active link slightly earlier than the exact top
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            } else if (!current && link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       Intersection Observer for Fade-up Reveal
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================
       Parallax effect for background shapes
       ========================================== */
    const shapes = document.querySelectorAll('.bg-shape');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (window.innerWidth / 2 - e.pageX) / speed;
            const yOffset = (window.innerHeight / 2 - e.pageY) / speed;

            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

});

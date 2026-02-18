// Tech Milan 2K26 - Optimized Logic & Animation
// Focus: Performance (60fps) + Visual Impact

// === 1. Three.js Background (Optimized Starfield) ===
(() => {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    // Performance check: disable on low-power mode or if reduced motion is preferred
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false }); // Antialias off for perf
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry: Particles
    const particlesCount = 700; // Optimal count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40; // Spread out
    }

    const material = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    // Throttled mouse move
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX * 0.0005;
        mouseY = e.clientY * 0.0005;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = mouseY * 0.5;
        particles.rotation.y += mouseX * 0.5;

        // Gentle wave effect
        camera.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// === 2. UI Interactions (Navbar & Scroll) ===
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
});

// === 3. Custom Cursor (Optimized - CSS Transform) ===
(() => {
    const cursor = document.querySelector('.cursor');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Direct transform for lowest latency
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Hover Effects
    const hoverElements = document.querySelectorAll('a, button, .category-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(2.5)`;
            cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.2)';
            cursor.style.border = 'none';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1)`;
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--primary)';
        });
    });
})();

// === 4. Countdown Timer ===
(() => {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;

    const eventDate = new Date('February 25, 2026 09:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const gap = eventDate - now;

        if (gap < 0) {
            document.getElementById('countdown').innerHTML = "<h3>Event has started!</h3>";
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        try {
            document.getElementById('days').innerText = d < 10 ? '0' + d : d;
            document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
            document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
            document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
        } catch (e) {
            // Elements might not exist on all pages
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
})();

// === 5. Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800); // Minimum view time
    }
});

// === 6. Dynamic Events Loader ===
// (Kept simple to avoid complexity - can be expanded if needed)
if (typeof eventsData !== 'undefined') {
    // Logic to render events if eventsData is present (from events.js)
    // For now, assuming static HTML for main page or separate implementation
}

// Initial Animations (AOS replacement with lightweight IntersectionObserver)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .section-title, .hero-content, .event-title-large').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add this CSS via JS for the observer classes to work without cluttering style.css too much
const style = document.createElement('style');
style.innerHTML = `
    .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
// === 7. Scroll Spy for Active Navigation ===
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    /* Only run on pages with sections to track (mainly index.html) */
    if (sections.length === 0) return;

    function scrollSpy() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for navbar height (approx 100px)
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link href matches current section
            // Handle both "#section" and "index.html#section" formats
            const href = link.getAttribute('href');
            if (href.includes('#' + current) || (current === 'home' && href.endsWith('#home'))) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
});

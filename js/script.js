// Tech Milan 2K26 - Optimized Logic & Animation
// Focus: Performance (60fps) + Visual Impact

// === 1. Three.js Background (Optimized Starfield) ===
(() => {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40;
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

    let mouseX = 0;
    let mouseY = 0;

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
        camera.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileBtn) {
                        mobileBtn.querySelector('i').classList.remove('fa-times');
                        mobileBtn.querySelector('i').classList.add('fa-bars');
                    }
                }
            }
        });
    });
});

// === 3. Custom Cursor ===
(() => {
    const cursor = document.querySelector('.cursor');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

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
        } catch (e) { }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
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
        }, 800);
    }
});

// === 6. Dynamic Events Loader ===
if (typeof eventsData !== 'undefined') {
    // Logic handled in page-specific scripts
}

// === 7. IntersectionObserver for Animations ===
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .category-card, .highlight-card, .timeline-item, .section-title, .hero-content, .about-stat-card').forEach(el => {
    observer.observe(el);
});

// === 8. Scroll Spy ===
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0) return;

    function scrollSpy() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href.includes('#' + current) || (current === 'home' && href.endsWith('#home'))) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
});

// === 9. Horizontal Banner Slideshow ===
(() => {
    const wrapper = document.querySelector('.slideshow-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!wrapper || !slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                clearInterval(slideInterval);
                currentSlide = i;
                goToSlide(currentSlide);
                startAuto();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        // Move the wrapper
        wrapper.style.transform = 'translateX(-' + (index * 100) + '%)';
        // Update dots
        var allDots = document.querySelectorAll('.slider-dots .dot');
        for (var d = 0; d < allDots.length; d++) {
            allDots[d].classList.remove('active');
        }
        if (allDots[index]) {
            allDots[index].classList.add('active');
        }
    }

    function goNext() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function goPrev() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    function startAuto() {
        clearInterval(slideInterval);
        slideInterval = setInterval(goNext, 4000);
    }

    // Arrow click handlers
    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clearInterval(slideInterval);
            goNext();
            startAuto();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clearInterval(slideInterval);
            goPrev();
            startAuto();
        });
    }

    // Start autoplay
    startAuto();

    // === Touch Swipe Support for Mobile ===
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    const slideshowContainer = document.querySelector('.hero-slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                clearInterval(slideInterval);
                if (diff > 0) {
                    goNext();
                } else {
                    goPrev();
                }
                startAuto();
            }
        }, { passive: true });
    }
})();

// === 10. Animated Number Counter ===
(() => {
    const statCards = document.querySelectorAll('.about-stat-card h3');
    if (!statCards.length) return;

    const animateCounter = (el) => {
        const text = el.textContent.trim();
        const match = text.match(/^([₹]?)(\d+)([kK]?)([+]?)$/);
        if (!match) return;

        const prefix = match[1];
        const targetNum = parseInt(match[2]);
        const suffix = match[3] + match[4];
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * targetNum);
            el.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = prefix + targetNum + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(el => counterObserver.observe(el));
})();

// === 11. Back to Top Button ===
(() => {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// === 12. FAQ Accordion ===
(() => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
})();

// === 13. Page Transition Effect ===
(() => {
    const overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) return;

    // Fade in on load
    document.addEventListener('DOMContentLoaded', () => {
        overlay.classList.remove('active');
    });

    // Intercept navigation to other pages
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Only intercept same-site page navigation (not anchors, not external)
            if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
})();

// === 14. Cursor Particle Trail ===
(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particles = [];
    const maxParticles = 12;

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.4) return; // throttle

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.7;
            box-shadow: 0 0 6px rgba(0, 243, 255, 0.5);
            transition: all 0.6s ease-out;
        `;
        document.body.appendChild(particle);
        particles.push(particle);

        // Animate out
        requestAnimationFrame(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) scale(0)`;
        });

        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
            const idx = particles.indexOf(particle);
            if (idx > -1) particles.splice(idx, 1);
        }, 600);

        // Limit particles
        while (particles.length > maxParticles) {
            const old = particles.shift();
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
    });
})();

// === 15. Event Search Filter (for sub-pages) ===
(() => {
    const searchInput = document.getElementById('event-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.glass-panel[data-event-name]');

        cards.forEach(card => {
            const name = (card.getAttribute('data-event-name') || '').toLowerCase();
            const desc = (card.getAttribute('data-event-desc') || '').toLowerCase();
            if (name.includes(query) || desc.includes(query)) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = '';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    });
})();
// Tech Milan 2K26 - Handcrafted Interactive Experience
// Every feature here is intentional. Not vibe-coded.

// === 1. Three.js Background (Multi-layer Parallax Starfield) ===
(() => {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Layer 1: Far stars (slow, small, cyan)
    const farCount = 500;
    const farPos = new Float32Array(farCount * 3);
    for (let i = 0; i < farCount * 3; i++) farPos[i] = (Math.random() - 0.5) * 60;
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute('position', new THREE.BufferAttribute(farPos, 3));
    const farMat = new THREE.PointsMaterial({
        size: 0.02, color: 0x00f3ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
    });
    const farStars = new THREE.Points(farGeo, farMat);
    scene.add(farStars);

    // Layer 2: Near stars (faster, purple)
    const nearCount = 300;
    const nearPos = new Float32Array(nearCount * 3);
    for (let i = 0; i < nearCount * 3; i++) nearPos[i] = (Math.random() - 0.5) * 30;
    const nearGeo = new THREE.BufferGeometry();
    nearGeo.setAttribute('position', new THREE.BufferAttribute(nearPos, 3));
    const nearMat = new THREE.PointsMaterial({
        size: 0.04, color: 0xbc13fe, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending
    });
    const nearStars = new THREE.Points(nearGeo, nearMat);
    scene.add(nearStars);

    // Layer 3: Ambient gold glow
    const glowCount = 80;
    const glowPos = new Float32Array(glowCount * 3);
    for (let i = 0; i < glowCount * 3; i++) glowPos[i] = (Math.random() - 0.5) * 20;
    const glowGeo = new THREE.BufferGeometry();
    glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));
    const glowMat = new THREE.PointsMaterial({
        size: 0.08, color: 0xffe600, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending
    });
    const glowStars = new THREE.Points(glowGeo, glowMat);
    scene.add(glowStars);

    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        // Smooth lerp for mouse follow
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        farStars.rotation.y = elapsedTime * 0.02 + mouseX * 0.1;
        farStars.rotation.x = mouseY * 0.1;
        nearStars.rotation.y = elapsedTime * 0.04 + mouseX * 0.2;
        nearStars.rotation.x = mouseY * 0.2;
        glowStars.rotation.y = elapsedTime * 0.01 + mouseX * 0.05;

        camera.position.y = Math.sin(elapsedTime * 0.3) * 0.3;
        camera.position.x = Math.cos(elapsedTime * 0.2) * 0.2;

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

// === 4. Countdown Timer (with digit animation) ===
(() => {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;

    const eventDate = new Date('February 25, 2026 09:00:00').getTime();

    function animateDigit(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const formatted = value < 10 ? '0' + value : '' + value;
        if (el.innerText !== formatted) {
            el.style.transform = 'translateY(-5px)';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.innerText = formatted;
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 100);
        }
    }

    const updateTimer = () => {
        const now = new Date().getTime();
        const gap = eventDate - now;

        if (gap < 0) {
            countdown.innerHTML = "<h3 style='color: var(--primary); font-family: var(--font-heading);'>🚀 Event is LIVE!</h3>";
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
            animateDigit('days', d);
            animateDigit('hours', h);
            animateDigit('minutes', m);
            animateDigit('seconds', s);
        } catch (e) { }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
})();

// === 5. Preloader (triggers hero reveals after) ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Staggered reveal for hero elements
                document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
                    setTimeout(() => el.classList.add('in-view'), i * 150);
                });
            }, 600);
        }, 1000);
    }
});

// === 6. Dynamic Events Loader ===
if (typeof eventsData !== 'undefined') {
    // Logic handled in page-specific scripts
}

// === 7. Reveal on Scroll (Staggered with configurable delays) ===
(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Also observe legacy elements
    document.querySelectorAll('.glass-card, .category-card, .highlight-card, .timeline-item, .section-title, .about-stat-card').forEach(el => {
        if (!el.classList.contains('reveal')) {
            revealObserver.observe(el);
        }
    });
})();

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
            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
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

// === 16. Scroll Progress Bar ===
(() => {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
})();

// === 17. Typed Text Effect ===
(() => {
    const typedEl = document.querySelector('.typed-text');
    if (!typedEl) return;

    let strings;
    try {
        strings = JSON.parse(typedEl.dataset.strings || '[]');
    } catch (e) {
        strings = ['The Pinnacle of Innovation & Sportsmanship'];
    }
    if (!strings.length) return;

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentString = strings[stringIndex];

        if (isDeleting) {
            typedEl.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedEl.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    // Start after preloader
    setTimeout(type, 1800);
})();

// === 18. Magnetic Button Effect ===
(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
})();

// === 19. Timeline Progress on Scroll ===
(() => {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    if (!timeline || !progress) return;

    const updateTimelineProgress = () => {
        const rect = timeline.getBoundingClientRect();
        const timelineTop = rect.top;
        const timelineHeight = rect.height;
        const windowHeight = window.innerHeight;

        const scrolled = Math.max(0, Math.min(1,
            (windowHeight - timelineTop) / (timelineHeight + windowHeight * 0.5)
        ));

        progress.style.height = (scrolled * 100) + '%';
    };

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();
})();

// === 20. Button Ripple Effect ===
(() => {
    document.querySelectorAll('.btn-neon, .btn-outline').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.classList.add('btn-ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
})();

// === 21. Interactive Card Glow follows cursor ===
(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.category-card, .highlight-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const glow = card.querySelector('.card-glow');
            if (!glow) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.top = (y - 100) + 'px';
            glow.style.left = (x - 100) + 'px';
        });
    });
})();

// === 22. Easter Egg: Konami Code → Confetti ===
(() => {
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                konamiIndex = 0;
                for (let i = 0; i < 60; i++) {
                    setTimeout(() => createConfetti(), i * 30);
                }
            }
        } else {
            konamiIndex = 0;
        }
    });

    function createConfetti() {
        const confetti = document.createElement('div');
        const colors = ['#00f3ff', '#bc13fe', '#ffe600', '#ff6b6b', '#4ecdc4'];
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            pointer-events: none;
            z-index: 99999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        `;
        document.body.appendChild(confetti);

        const duration = Math.random() * 2000 + 1500;
        const rotation = Math.random() * 720 - 360;
        const drift = Math.random() * 100 - 50;

        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${drift}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }).onfinish = () => confetti.remove();
    }
})();

// === 23. Smooth countdown digit transitions (CSS injection) ===
(() => {
    const style = document.createElement('style');
    style.textContent = `
        .time-box span:first-child {
            transition: transform 0.2s ease, opacity 0.2s ease;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
})();
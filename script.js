document.addEventListener('DOMContentLoaded', () => {

    // --- Global Background Music Logic (Simplified) ---
    const globalBgMusic = document.getElementById('global-bg-music');
    // Removed musicToggleButton and related logic as per request.
    // The <audio> tag itself now manages autoplay (muted) and loop.
    // The browser will attempt to play it as soon as it's allowed (e.g., after the initial user interaction)

    // --- Celebration Overlay & Balloons Logic ---
    const celebrationOverlay = document.getElementById('celebration-overlay');
    const headerH1 = document.querySelector('header h1');

    if (celebrationOverlay) {
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');

            balloon.style.left = `${Math.random() * 100}vw`;

            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 3;

            balloon.style.animation = `
                balloon-float 10s ease-in-out infinite alternate,
                balloon-rise ${duration}s linear ${delay}s forwards
            `;

            const string = document.createElement('div');
            string.classList.add('balloon-string');
            balloon.appendChild(string);

            celebrationOverlay.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, (delay + duration) * 1000 + 500);
        }

        const numberOfBalloons = 20;
        for (let i = 0; i < numberOfBalloons; i++) {
            createBalloon();
        }

        const overlayFadeOutStartDelay = 4000;
        const overlayTransitionDuration = 1500;

        setTimeout(() => {
            celebrationOverlay.classList.add('fade-out');
            // Attempt to play global background music muted as overlay fades
            // This is crucial for trying to get it to start without a direct click.
            globalBgMusic.play().catch(e => console.log("Muted autoplay prevented:", e));
        }, overlayFadeOutStartDelay);

        const totalOverlayTime = overlayFadeOutStartDelay + overlayTransitionDuration + 500;

        setTimeout(() => {
            celebrationOverlay.remove();
            setTimeout(() => {
                if (headerH1) {
                    headerH1.classList.add('reveal-text');
                }
            }, 500);
        }, totalOverlayTime);

    } else {
        // Fallback: If no overlay, just play H1 and global music immediately
        if (headerH1) {
            headerH1.classList.add('reveal-text');
        }
        globalBgMusic.play().catch(e => console.log("Muted autoplay prevented on fallback:", e));
    }


    // --- Reusable Carousel Function (for Memories) ---
    function setupCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const items = carousel.querySelectorAll('img') || carousel.querySelectorAll('.carousel-item');
        if (items.length === 0) return;

        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentItemIndex = 0;

        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
        }

        showItem(currentItemIndex);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
                showItem(currentItemIndex);
            });
        }
        if (nextBtn) {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        }

        setInterval(() => {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        }, 5000);
    }

    setupCarousel('.memories-carousel');

    // --- Scroll Reveal Animation for Sections ---
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Audio Handling Notes ---
    // Individual audio players (#memories) are manual play.
    // Global background music attempts to play muted automatically.
});

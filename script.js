document.addEventListener('DOMContentLoaded', () => {

    // --- Celebration Overlay & Balloons Logic ---
    const celebrationOverlay = document.getElementById('celebration-overlay');
    const headerH1 = document.querySelector('header h1'); // Get the H1 element

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

        // Start fading out the overlay after 4 seconds
        setTimeout(() => {
            celebrationOverlay.classList.add('fade-out');
        }, 4000);

        // Fully remove the overlay AND THEN START THE H1 ANIMATION
        setTimeout(() => {
            celebrationOverlay.remove();
            // *** THIS IS THE KEY CHANGE ***
            if (headerH1) {
                headerH1.classList.add('reveal-text'); // Add the class to start typing animation
            }
        }, 6000); // Overlay takes 1.5s to fade out after 4s, so 5.5s total. Add a small buffer.
    } else {
        // Fallback: If for some reason overlay isn't there, just show the H1 anyway
        if (headerH1) {
            headerH1.classList.add('reveal-text');
        }
    }


    // --- Reusable Carousel Function (only for Memories) ---
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
            currentItemIndex = (currentItemIndex + 1) % items.length; // Fixed typo
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

    // --- Audio Handling Note ---
    // Browsers heavily restrict autoplay. Users may need to click play.
    // The 'autoplay' attribute is still on the audio tags.
});

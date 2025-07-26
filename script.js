document.addEventListener('DOMContentLoaded', () => {

    // --- Celebration Overlay & Balloons Logic ---
    const celebrationOverlay = document.getElementById('celebration-overlay');
    if (celebrationOverlay) {
        // Function to create and animate a single balloon
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');

            // Randomize starting position and size slightly
            balloon.style.left = `${Math.random() * 100}vw`; // Anywhere across the width
            balloon.style.bottom = `${-100 - (Math.random() * 200)}px`; // Start off-screen below

            // Randomize animation duration for variety
            const duration = 10 + Math.random() * 10; // 10 to 20 seconds
            balloon.style.animationDuration = `${duration}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`; // Stagger appearance

            // Add a string for a more realistic look
            const string = document.createElement('div');
            string.classList.add('balloon-string');
            balloon.appendChild(string);

            // Append to overlay
            celebrationOverlay.appendChild(balloon);

            // Remove balloon after its animation is likely complete to clean up DOM
            setTimeout(() => {
                balloon.remove();
            }, (duration * 1000) + 5000); // Duration in ms + buffer
        }

        // Generate a number of balloons
        const numberOfBalloons = 20; // You can adjust this number
        for (let i = 0; i < numberOfBalloons; i++) {
            createBalloon();
        }

        // Fade out the overlay after a few seconds
        setTimeout(() => {
            celebrationOverlay.classList.add('fade-out');
        }, 4000); // Start fading out after 4 seconds (adjust as needed)

        // Fully remove the overlay from DOM after it's faded out
        setTimeout(() => {
            celebrationOverlay.remove();
        }, 6000); // Total time for fade out (4s delay + 1.5s transition + buffer)
    }

    // --- Reusable Carousel Function (only for Memories) ---
    function setupCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return; // Exit if carousel not found

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

        // Initial display
        showItem(currentItemIndex);

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
                showItem(currentItemIndex);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentItemIndex = (currentItemIndex + 1) % items.length;
                showItem(currentItemIndex);
            });
        }

        // Auto-slide
        setInterval(() => {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        }, 5000); // Change item every 5 seconds
    }

    // Initialize carousel for Memories section only
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

    // --- Header H1 Text Reveal Animation ---
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        headerH1.classList.add('reveal-text');
    }

    // --- Audio Handling Note ---
    // Browsers heavily restrict autoplay. Users may need to click play.
    // The 'autoplay' attribute is still on the audio tags.
});

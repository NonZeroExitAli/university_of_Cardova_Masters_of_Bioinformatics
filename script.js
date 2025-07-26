document.addEventListener('DOMContentLoaded', () => {

    // --- Reusable Carousel Function ---
    function setupCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return; // Exit if carousel not found

        // Handle either direct img elements or carousel-item divs
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

        // Auto-slide (optional, but adds dynamism)
        setInterval(() => {
            currentItemIndex = (currentItemIndex + 1) % items.length;
            showItem(currentItemIndex);
        }, 5000); // Change item every 5 seconds
    }

    // Initialize carousels for specific sections
    setupCarousel('.memories-carousel'); // For the memories section
    setupCarousel('.wishes-carousel');   // For the wishes section

    // --- Scroll Reveal Animation for Sections ---
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    scrollRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Header H1 Text Reveal Animation ---
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        // Add a class that triggers the CSS typing animation
        headerH1.classList.add('reveal-text');
    }

    // --- Audio Handling (Important Note) ---
    // Modern browsers heavily restrict autoplay of audio/video without user interaction.
    // The 'autoplay' attribute is included, but it's likely to be blocked.
    // Providing 'controls' allows the user to play the music themselves.
    // If you want a truly seamless experience, you might need a simple
    // "click anywhere to start" overlay that plays the main intro music.
    // For now, we'll ensure controls are visible.

    // You could try to play all audio elements on a single, first user interaction
    // For example, if you had a "Start Journey" button.
    // const startButton = document.getElementById('start-journey-button'); // hypothetical button
    // if (startButton) {
    //     startButton.addEventListener('click', () => {
    //         document.querySelectorAll('audio').forEach(audio => {
    //             audio.play().catch(e => console.log("Audio autoplay failed:", e.message));
    //         });
    //         // Hide start button/overlay
    //     });
    // }
});

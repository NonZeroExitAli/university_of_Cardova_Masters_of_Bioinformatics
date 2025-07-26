document.addEventListener('DOMContentLoaded', () => {

    // --- Global Background Music Logic ---
    const globalBgMusic = document.getElementById('global-bg-music');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicToggleIcon = musicToggleButton.querySelector('.icon');

    // Music is set to autoplay in HTML (unmuted), so initially assume it's playing
    // However, browsers will likely block unmuted autoplay, so we need to prepare for that.
    let isMusicPlaying = true; // Assume it's trying to play

    // Function to update the button text/icon
    function updateMusicToggleButton() {
        if (globalBgMusic.paused) { // If it's paused, it's off
            musicToggleIcon.textContent = '🔇';
            musicToggleButton.innerHTML = `<span class="icon">🔇</span> Music Off`;
            isMusicPlaying = false;
        } else { // If it's not paused, it's on (or trying to play)
            musicToggleIcon.textContent = '🎶';
            musicToggleButton.innerHTML = `<span class="icon">🎶</span> Music On`;
            isMusicPlaying = true;
        }
    }

    // Click handler for the toggle button
    musicToggleButton.addEventListener('click', () => {
        if (isMusicPlaying) { // If it's currently on, turn it off
            globalBgMusic.pause();
            isMusicPlaying = false;
        } else { // If it's currently off, turn it on
            globalBgMusic.play().catch(e => console.log("Music play prevented on click (likely first interaction needed):", e));
            isMusicPlaying = true;
        }
        updateMusicToggleButton(); // Update button state
    });

    // Initial button state (will show Music On)
    updateMusicToggleButton();

    // Add an event listener to the audio itself to ensure the button state is always correct
    // if the browser decides to pause it for any reason (e.g., policy, tab switch)
    globalBgMusic.addEventListener('play', updateMusicToggleButton);
    globalBgMusic.addEventListener('pause', updateMusicToggleButton);
    globalBgMusic.addEventListener('volumechange', () => {
        // If the volume is set to 0 by the user/browser, consider it "off" visually
        if (globalBgMusic.volume === 0 || globalBgMusic.muted) {
            musicToggleIcon.textContent = '🔇';
            musicToggleButton.innerHTML = `<span class="icon">🔇</span> Music Off`;
        } else {
            musicToggleIcon.textContent = '🎶';
            musicToggleButton.innerHTML = `<span class="icon">🎶</span> Music On`;
        }
    });


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
            // Attempt to play global background music unmuted here.
            // This is the point where it might be blocked.
            globalBgMusic.play().catch(e => console.log("Unmuted autoplay prevented (likely needs user interaction):", e));
            // Update button state immediately after trying to play
            updateMusicToggleButton();
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
        globalBgMusic.play().catch(e => console.log("Unmuted autoplay prevented on fallback (likely needs user interaction):", e));
        updateMusicToggleButton(); // Update button state
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
});

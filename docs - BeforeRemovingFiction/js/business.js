// Sample card zoom effect on scroll
function initSampleCardZoom() {
    const sampleCards = document.querySelectorAll('.sample-card');

    if (sampleCards.length === 0) return;

    function updateCardStates() {
        const viewportCenter = window.innerHeight / 2;

        sampleCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
            const threshold = window.innerHeight * 0.3; // 30% of viewport height

            if (distanceFromCenter < threshold) {
                card.classList.add('in-view');
            } else {
                card.classList.remove('in-view');
            }
        });
    }

    // Update on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateCardStates);
    }, { passive: true });

    // Initial check
    updateCardStates();
}

// Sticky CTA button scroll behavior
function initStickyCTA() {
    const ctaButton = document.getElementById('ctaButton');
    if (!ctaButton) return;

    function updateCTAState() {
        const scrollY = window.scrollY;
        const scrollThreshold = 100; // Show after scrolling 100px

        if (scrollY > scrollThreshold) {
            ctaButton.classList.add('visible');

            // Add 'scrolled' class when not at the very top
            if (scrollY > 200) {
                ctaButton.classList.add('scrolled');
            } else {
                ctaButton.classList.remove('scrolled');
            }
        } else {
            ctaButton.classList.remove('visible', 'scrolled');
        }
    }

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateCTAState);
    }, { passive: true });

    // Initial state (hidden)
    updateCTAState();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSampleCardZoom();
        initStickyCTA();
    });
} else {
    initSampleCardZoom();
    initStickyCTA();
}

// Modal functionality for contact options
(function () {
    const ctaButton = document.getElementById('ctaButton');
    const modal = document.getElementById('contactModal');
    const closeButton = document.getElementById('closeModal');

    // Open modal
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
})();

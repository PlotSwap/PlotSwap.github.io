// Business Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // === TOOLTIP FUNCTIONALITY FOR MOBILE ===
    const exampleButtons = document.querySelectorAll('.example-btn');

    exampleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // On mobile, toggle active class to show tooltip
            if (window.innerWidth <= 768) {
                e.preventDefault();
                button.classList.toggle('active');

                // Close other tooltips
                exampleButtons.forEach(otherBtn => {
                    if (otherBtn !== button) {
                        otherBtn.classList.remove('active');
                    }
                });
            }
        });
    });

    // === FORM HANDLING ===
    const businessForm = document.getElementById('businessForm');
    const formStatus = document.getElementById('formStatus');

    if (businessForm) {
        businessForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                contactName: document.getElementById('contactName').value,
                businessName: document.getElementById('businessName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                serviceType: document.getElementById('serviceType').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.contactName || !formData.businessName || !formData.email || !formData.serviceType || !formData.message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (in production, this would send to a backend)
            try {
                // Show loading state
                const submitBtn = businessForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Create mailto link as fallback
                const serviceNames = {
                    'one-and-done': 'One and Done ($100)',
                    'full-production': 'Full Production ($1,000)',
                    'not-sure': 'Not Sure Yet'
                };

                const emailSubject = encodeURIComponent(`Business Inquiry - ${formData.businessName}`);
                const emailBody = encodeURIComponent(
                    `Contact Name: ${formData.contactName}\n` +
                    `Business Name: ${formData.businessName}\n` +
                    `Email: ${formData.email}\n` +
                    `Phone: ${formData.phone || 'Not provided'}\n` +
                    `Service Interest: ${serviceNames[formData.serviceType]}\n\n` +
                    `Message:\n${formData.message}`
                );

                // Open mailto link
                window.location.href = `mailto:russell@plotswap.org?subject=${emailSubject}&body=${emailBody}`;

                // Show success message
                showFormStatus('Your inquiry has been prepared! Your email client should open shortly.', 'success');

                // Reset form
                businessForm.reset();

                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('Something went wrong. Please try again or contact us directly at russell@plotswap.org', 'error');

                // Restore button
                const submitBtn = businessForm.querySelector('.btn-submit');
                submitBtn.textContent = 'Send Inquiry';
                submitBtn.disabled = false;
            }
        });
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        // Auto-hide after 5 seconds for error messages
        if (type === 'error') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // === FAQ TOGGLE ===
    const toggleMoreFaqBtn = document.getElementById('toggleMoreFaq');
    const moreFaqItems = document.getElementById('moreFaqItems');

    if (toggleMoreFaqBtn && moreFaqItems) {
        toggleMoreFaqBtn.addEventListener('click', () => {
            const isHidden = moreFaqItems.style.display === 'none';

            if (isHidden) {
                moreFaqItems.style.display = 'grid';
                toggleMoreFaqBtn.textContent = 'Fewer Questions';
            } else {
                moreFaqItems.style.display = 'none';
                toggleMoreFaqBtn.textContent = 'More Questions';
            }
        });
    }

    // === MORE SHOWS TOGGLE ===
    const toggleMoreShowsBtn = document.getElementById('toggleMoreShows');
    const moreShows = document.getElementById('moreShows');


    if (toggleMoreShowsBtn && moreShows) {
        toggleMoreShowsBtn.addEventListener('click', () => {
            const isHidden = moreShows.style.display === 'none';

            if (isHidden) {
                moreShows.style.display = 'grid';
                toggleMoreShowsBtn.textContent = 'Fewer Shows';
            } else {
                moreShows.style.display = 'none';
                toggleMoreShowsBtn.textContent = 'More Shows';
            }
        });
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === PRICING CARD ANIMATIONS ===
    const pricingCards = document.querySelectorAll('.pricing-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
});

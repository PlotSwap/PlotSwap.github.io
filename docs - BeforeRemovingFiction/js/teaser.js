// Teaser questionnaire state management
let currentStep = 0;
const userChoices = [];
const ticketLink = 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f';

// All teaser steps with breadcrumb reveal structure
const steps = [
    {
        // Step 0: Warning - Opening hook
        title: 'WARNING!',
        message: 'The less you know, the harder it hits.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Convince Me', action: 'next' }
        ],
        showBack: false
    },
    {
        // Step 1: Are you sure?
        title: '',
        message: 'I\'ll tell you what it is, but think for a second.<br><br>Wouldn\'t it be fun to go in blind?',
        buttons: [
            { text: 'You\'re right, I\'m in', action: 'link', url: ticketLink },
            { text: 'Tell me anyway', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 2: First breadcrumb
        title: '',
        message: 'This is Plot Swap.',
        buttons: [
            { text: 'That\'s all I need', action: 'link', url: ticketLink },
            { text: 'Keep going', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 3: Add detail
        title: '',
        message: 'Plot Swap has professional actors.',
        buttons: [
            { text: 'Sold', action: 'link', url: ticketLink },
            { text: 'And?', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 4: Playful pushback
        title: '',
        message: 'Professional actors wasn\'t enough to convince you?',
        buttons: [
            { text: 'Fine, I\'ll go', action: 'link', url: ticketLink },
            { text: 'Nope, keep talking', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 5: Add more
        title: '',
        message: 'Professional actors performing original works.',
        buttons: [
            { text: 'Okay, I\'m interested', action: 'link', url: ticketLink },
            { text: 'What else?', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 6: The hook
        title: '',
        message: 'Original works that let you choose the story.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Wait, what?', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 7: Explain the mechanic
        title: '',
        message: 'It\'s a choose-your-adventure. Live. With real actors.<br><br>You make choices. The story changes.<br><br>No two nights are the same.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'How does that work?', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 8: The mechanics
        title: '',
        message: 'Three times during the show, someone in the audience makes a choice.<br><br>A or B. Left or right.<br><br>The actors adapt. The story splits.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'That sounds intense', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 9: Reassurance
        title: '',
        message: 'It\'s not scary. It\'s like chatting with a friend who happens to be a character in a story.<br><br>You might be chosen. You might just watch. Either way, you\'re part of it.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Okay, I\'m curious', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 10: The vision
        title: '',
        message: 'This is just the beginning.<br><br>Imagine being inside a bank heist. A murder mystery. A romance.<br><br>Not watching it. Living it.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'That\'s ambitious', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 11: The reality
        title: '',
        message: 'We\'re small. We\'re scrappy. We\'re building something that doesn\'t exist yet.<br><br>But right now? We have a show you can actually experience.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Tell me more', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 12: Social proof
        title: '',
        message: 'You could follow us on Instagram. Be an early adopter.<br><br>Then in 2027 you can say "Plot Swap? I\'ve known about them since 2026."',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Any discounts?', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 13: Urgency
        title: '',
        message: 'Early shows are already discounted. We\'re small, so tickets are cheap.<br><br>But the price goes up as we grow.<br><br>Now is the time.',
        buttons: [
            { text: 'Buy Tickets', action: 'link', url: ticketLink },
            { text: 'Fair enough', action: 'next' }
        ],
        showBack: true
    },
    {
        // Step 14: Final CTA
        title: '',
        message: 'Here\'s the truth: This show is weird, wonderful, and unlike anything you\'ve seen.<br><br>We can\'t explain it. You have to feel it.<br><br>So... are you in?',
        buttons: [
            { text: 'Get Tickets', action: 'link', url: ticketLink },
            { text: 'Email Russell', action: 'email', url: 'mailto:russell@plotswap.org' }
        ],
        showBack: true
    }
];

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    renderInitialStep();
});

// Render initial step (only called once)
function renderInitialStep() {
    const container = document.getElementById('quiz-container');
    const step = steps[0];

    // Build initial HTML with persistent structure
    container.innerHTML = `
        <div class="quiz-background"></div>
        <div class="quiz-gradient-overlay"></div>
        <button class="quiz-btn quiz-back-btn" onclick="goBack()" style="display: none;">Back</button>
        <div class="quiz-step active">
            <div class="quiz-context"></div>
            <h1 class="quiz-title">${step.title}</h1>
            <p class="quiz-message">${step.message}</p>
            <div class="quiz-buttons">
                <button class="quiz-btn quiz-btn-secondary" id="left-btn">${step.buttons[0].text}</button>
                <button class="quiz-btn" id="right-btn">${step.buttons[1].text}</button>
            </div>
        </div>
    `;

    // Set up button event listeners
    setupButtonListeners();
}

// Update content without re-rendering buttons
function updateStep(stepIndex) {
    const step = steps[stepIndex];
    const titleElement = document.querySelector('.quiz-title');
    const messageElement = document.querySelector('.quiz-message');
    const contextElement = document.querySelector('.quiz-context');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const backBtn = document.querySelector('.quiz-back-btn');
    const stepContainer = document.querySelector('.quiz-step');

    // Fade out
    stepContainer.classList.remove('active');
    stepContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update content
        titleElement.textContent = step.title;
        titleElement.style.display = step.title ? 'block' : 'none';
        messageElement.innerHTML = step.message;

        // Update context (previous choice)
        if (stepIndex > 0 && userChoices[stepIndex - 1]) {
            contextElement.textContent = userChoices[stepIndex - 1];
            contextElement.style.display = 'block';
        } else {
            contextElement.style.display = 'none';
        }

        leftBtn.textContent = step.buttons[0].text;
        rightBtn.textContent = step.buttons[1].text;

        // Update button classes - Buy Tickets and Get Tickets are always primary
        const leftIsPrimary = step.buttons[0].text === 'Buy Tickets' || step.buttons[0].text === 'Get Tickets';
        const rightIsPrimary = step.buttons[1].text === 'Buy Tickets' || step.buttons[1].text === 'Get Tickets';

        leftBtn.className = leftIsPrimary ? 'quiz-btn' : 'quiz-btn quiz-btn-secondary';
        rightBtn.className = rightIsPrimary ? 'quiz-btn' : 'quiz-btn quiz-btn-secondary';

        // Show/hide back button
        backBtn.style.display = step.showBack && stepIndex > 0 ? 'block' : 'none';

        // Special handling for step 1 - add timer with progress bar
        if (stepIndex === 1) {
            // Hide buttons initially
            leftBtn.style.opacity = '0';
            rightBtn.style.opacity = '0';
            leftBtn.style.pointerEvents = 'none';
            rightBtn.style.pointerEvents = 'none';

            // Insert progress bar into message
            messageElement.innerHTML = 'I\'ll tell you what it is, but think for a second.<br><br><div class="timer-progress-container"><div class="timer-progress-bar"></div></div><br>Wouldn\'t it be fun to go in blind?';

            startProgressTimer(leftBtn, rightBtn);
        }

        // Fade in
        stepContainer.classList.remove('fade-out');
        stepContainer.classList.add('active');
    }, 300);
}

// Progress bar timer for the "think for a second" step
function startProgressTimer(leftBtn, rightBtn) {
    const progressBar = document.querySelector('.timer-progress-bar');
    const duration = 8000; // 8 seconds
    const startTime = Date.now();

    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Update progress bar width (fills from both sides)
        progressBar.style.width = `${progress * 100}%`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            // Timer complete - reveal buttons sequentially
            setTimeout(() => {
                leftBtn.style.opacity = '1';
                leftBtn.style.pointerEvents = 'auto';
            }, 200);

            setTimeout(() => {
                rightBtn.style.opacity = '1';
                rightBtn.style.pointerEvents = 'auto';
            }, 600);
        }
    }

    requestAnimationFrame(updateProgress);
}

// Set up button event listeners (only called once)
function setupButtonListeners() {
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');

    leftBtn.addEventListener('click', () => handleButtonClick(0));
    rightBtn.addEventListener('click', () => handleButtonClick(1));
}

// Handle button clicks
function handleButtonClick(buttonIndex) {
    const step = steps[currentStep];
    const button = step.buttons[buttonIndex];

    // Store user choice before action
    userChoices[currentStep] = button.text;

    switch (button.action) {
        case 'next':
            goNext();
            break;
        case 'redirect':
            window.location.href = button.url;
            break;
        case 'link':
            window.open(button.url, '_blank');
            break;
        case 'email':
            window.location.href = button.url;
            break;
    }
}

// Navigate to next step
function goNext() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep(currentStep);
    }
}

// Navigate to previous step
function goBack() {
    if (currentStep > 0) {
        currentStep--;
        updateStep(currentStep);
    }
}

// Quiz state management
let currentStep = 0;
const userChoices = []; // Array to store user choices
const ticketLink = 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f';

// All quiz steps with messages and button options
const steps = [
    {
        // Step 0: Hook - More inviting opening
        title: 'PLOT SWAP',
        message: '',
        buttons: [
            { text: 'Show me', action: 'next' },
            { text: 'I\'ve been here before', action: 'redirect', url: 'index-main.html' }
        ],
        showBack: false
    },
    {
        // Step 1: Intrigue - Lead with mystery
        title: '',
        message: 'This isn\'t traditional theater.<br><br>You\'ll make choices. The story changes.<br><br>No two nights are the same.',
        buttons: [
            { text: 'I\'m listening', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 2: Social Proof - Build credibility
        title: '',
        message: 'Theater professionals. Original writing. Immersive environments.<br><br>We\'re building something that doesn\'t exist yet.',
        buttons: [
            { text: 'Tell me more', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 3: The Dream - Sell the vision
        title: '',
        message: 'Imagine being inside a bank heist. A murder mystery. A romance.<br><br>Not watching it. <em>Living it.</em><br><br>That\'s where we\'re going. But first, we need you to see where we are.',
        buttons: [
            { text: 'How does it work?', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 4: Mechanics - Brief and clear
        title: '',
        message: 'Fully scripted. Choose-your-adventure. Live performance.<br><br>Three choices throughout the night. You might make one. Or just watch.<br><br>Either way, you\'re part of it.',
        buttons: [
            { text: 'Sounds intense', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 5: Reassurance - Remove negative framing
        title: '',
        message: 'It\'s not scary. It\'s like chatting with a friend who happens to be a character in a story.<br><br>Trust us. (Or don\'t. Come find out.)',
        buttons: [
            { text: 'Okay, I\'m curious', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 6: Personal Touch - Start the personality
        title: '',
        message: 'Look, I made this show because I thought it sounded fun and I couldn\'t find it anywhere.<br><br>I really want to do a bank heist one day.',
        buttons: [
            { text: 'A... bank heist?', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 7: Bank Heist Dream - Keep the gold
        title: '',
        message: 'Not a real bank heist. A show!<br><br>Imagine the immersion of being in a Choose Your Adventure bank robbery!<br><br>But PLOT SWAP needs to be big and popular before we can get a bank to let us fake rob it.',
        buttons: [
            { text: 'That\'s... ambitious', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 8: Dream Big
        title: '',
        message: 'We can dream!<br><br>But right now, we have something awesome you can actually experience.<br><br>The show slaps. Come see it. Or tell your quirky friend and let them tell you how good it is.',
        buttons: [
            { text: 'Maybe I will', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 9: Instagram - Shorter, punchier
        title: '',
        message: '"Maybe?" You\'re killing me here.<br><br>Fine. Check out our Instagram. Follow us. Be an early adopter.<br><br>Then in 2027 you can say "PLOT SWAP? I\'ve known about them since 2026."',
        buttons: [
            { text: 'What about a discount?', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 10: Urgency instead of rejection
        title: '',
        message: 'You want a discount? I respect the hustle.<br><br>Here\'s the thing: early shows are already discounted. We\'re small, scrappy, and building something special.<br><br>The price goes up as we grow. So... now is the time.',
        buttons: [
            { text: 'Fair enough', action: 'next' },
            { text: 'Buy Tickets', action: 'link', url: ticketLink }
        ],
        showBack: true
    },
    {
        // Step 11: Final CTA - Strong close
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

        // Fade in
        stepContainer.classList.remove('fade-out');
        stepContainer.classList.add('active');
    }, 300);
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

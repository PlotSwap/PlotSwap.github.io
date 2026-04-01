// --- Screen Switching Elements ---
const initialScreen = document.getElementById('initialScreen');
const captainScreen = document.getElementById('captainScreen');
const crewScreen = document.getElementById('crewScreen');

const captainChoice = document.getElementById('captainChoice');
const crewChoice = document.getElementById('crewChoice');

const captainBack = document.getElementById('captainBack');
// If you have a back button for the crew screen, you'd reference it similarly:
// const crewBack = document.getElementById('crewBack');

// --- Elements for Price & Upgrade in Captain Screen ---
const upgradeCheckbox = document.getElementById('upgradeCheckbox');
const basePriceValueEl = document.getElementById('basePriceValue');
const addOnValueEl = document.getElementById('addOnValue');
const totalPriceEl = document.getElementById('captainTotalPrice');
const captainBuyNowButton = document.getElementById('captainBuyNow');

// "What's Included" lines
const friendsLine = document.getElementById('friendsLine');
const privatePerformanceLine = document.getElementById('privatePerformanceLine');
const choiceStylesLine = document.getElementById('choiceStylesLine');
const specialKeepsakeLine = document.getElementById('specialKeepsakeLine');

// --- Pricing Constants ---
const BASE_CAPTAIN_PRICE = 200;
const UPGRADE_COST = 100;

// On page load, set the base & add-on prices
basePriceValueEl.textContent = BASE_CAPTAIN_PRICE;
addOnValueEl.textContent = UPGRADE_COST;

// Function to update friend count, perks, and total price
function updateCaptainInfo() {
  let totalPrice = BASE_CAPTAIN_PRICE;
  
  if (upgradeCheckbox.checked) {
    // If the add-on is selected:
    friendsLine.textContent = '+ Up to 10 friends';
    addOnValueEl.textContent = UPGRADE_COST;
    totalPrice += UPGRADE_COST;

    // Remove the crossed-out class from perks
    privatePerformanceLine.classList.remove('crossed-out');
    choiceStylesLine.classList.remove('crossed-out');
    specialKeepsakeLine.classList.remove('crossed-out');
  } else {
    // If the add-on is NOT selected:
    friendsLine.textContent = '+ Up to 2 friends';
    addOnValueEl.textContent = '0';

    // Cross out the perks
    privatePerformanceLine.classList.add('crossed-out');
    choiceStylesLine.classList.add('crossed-out');
    specialKeepsakeLine.classList.add('crossed-out');
  }

  // Update the total
  totalPriceEl.textContent = totalPrice;
}

// Listen for changes on the upgrade checkbox
upgradeCheckbox.addEventListener('change', updateCaptainInfo);

// Initialize on page load
updateCaptainInfo();

// --- Screen Navigation ---
// Show Captain Screen
captainChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  captainScreen.classList.remove('hidden', 'fade');
  void captainScreen.offsetHeight; // Force reflow for fade effect
  captainScreen.classList.add('fade');
});

// Show Crew Screen
crewChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  crewScreen.classList.remove('hidden', 'fade');
  void crewScreen.offsetHeight;
  crewScreen.classList.add('fade');
});

// Back button from Captain Screen
captainBack.addEventListener('click', () => {
  captainScreen.classList.add('hidden');
  initialScreen.classList.remove('hidden', 'fade');
  void initialScreen.offsetHeight;
  initialScreen.classList.add('fade');
});

// Buy Now (Captain)
captainBuyNowButton.addEventListener('click', () => {
  alert('Captain ticket purchased!');
  // Integrate your checkout or next steps here
});

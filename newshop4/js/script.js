// --- Screen Switching Elements ---
const initialScreen = document.getElementById('initialScreen');
const captainScreen = document.getElementById('captainScreen');
const crewScreen = document.getElementById('crewScreen');

const captainChoice = document.getElementById('captainChoice');
const crewChoice = document.getElementById('crewChoice');

const captainBack = document.getElementById('captainBack');
// (Assuming a similar back button exists for the crew screen if needed)
// const crewBack = document.getElementById('crewBack');

// --- Elements for Price & Upgrade in Captain Screen ---
const upgradeCheckbox = document.getElementById('upgradeCheckbox');
const friendCountEl = document.getElementById('friendCount'); // In "What's Included" section
const basePriceValueEl = document.getElementById('basePriceValue'); // In Final Price section
const addOnValueEl = document.getElementById('addOnValue'); // In Final Price section
const totalPriceEl = document.getElementById('captainTotalPrice'); // In Final Price section
const captainBuyNowButton = document.getElementById('captainBuyNow');

// --- Pricing Constants ---
const BASE_CAPTAIN_PRICE = 200;
const UPGRADE_COST = 100;

// --- Update Pricing & Friend Count Function ---
function updatePrices() {
  let totalPrice = BASE_CAPTAIN_PRICE;
  
  if (upgradeCheckbox.checked) {
    // When the upgrade is selected, allow up to 10 friends.
    friendCountEl.textContent = '10';
    addOnValueEl.textContent = UPGRADE_COST;
    totalPrice += UPGRADE_COST;
  } else {
    // Without the upgrade, allow up to 2 friends.
    friendCountEl.textContent = '2';
    addOnValueEl.textContent = '0';
  }
  
  totalPriceEl.textContent = totalPrice;
}

// Listen for changes on the upgrade checkbox.
upgradeCheckbox.addEventListener('change', updatePrices);

// Initialize pricing on page load.
updatePrices();

// --- Screen Navigation ---
// Show Captain Screen
captainChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  captainScreen.classList.remove('hidden', 'fade');
  void captainScreen.offsetHeight; // Force reflow for fade effect.
  captainScreen.classList.add('fade');
});

// Show Crew Screen
crewChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  crewScreen.classList.remove('hidden', 'fade');
  void crewScreen.offsetHeight;
  crewScreen.classList.add('fade');
});

// Back Button from Captain Screen
captainBack.addEventListener('click', () => {
  captainScreen.classList.add('hidden');
  initialScreen.classList.remove('hidden', 'fade');
  void initialScreen.offsetHeight;
  initialScreen.classList.add('fade');
});

// --- Buy Now Button Action ---
captainBuyNowButton.addEventListener('click', () => {
  alert('Captain ticket purchased!');
  // Insert your checkout logic or additional steps here.
});

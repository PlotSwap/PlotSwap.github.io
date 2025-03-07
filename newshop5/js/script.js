// --- Screen Switching Elements ---
const initialScreen = document.getElementById('initialScreen');
const captainScreen = document.getElementById('captainScreen');
const crewScreen = document.getElementById('crewScreen');

const captainChoice = document.getElementById('captainChoice');
const crewChoice = document.getElementById('crewChoice');

const captainBack = document.getElementById('captainBack');
// If you have a back button on the crew screen, reference it similarly:
// const crewBack = document.getElementById('crewBack');

// --- Elements for Price & Upgrade in Captain Screen ---
const upgradeCheckbox = document.getElementById('upgradeCheckbox');
const friendCountItem = document.getElementById('friendCountItem');
const basePriceValueEl = document.getElementById('basePriceValue');
const addOnValueEl = document.getElementById('addOnValue');
const totalPriceEl = document.getElementById('captainTotalPrice');
const captainBuyNowButton = document.getElementById('captainBuyNow');

// --- Pricing Constants ---
const BASE_CAPTAIN_PRICE = 200;
const UPGRADE_COST = 100;

// Initialize the base and add-on values
basePriceValueEl.textContent = BASE_CAPTAIN_PRICE;
addOnValueEl.textContent = UPGRADE_COST;

// --- Update Pricing & Friend Count Function ---
function updatePrices() {
  let totalPrice = BASE_CAPTAIN_PRICE;

  if (upgradeCheckbox.checked) {
    // If upgrade is selected, set friend count to 10 and add cost
    friendCountItem.textContent = '1 Captain + up to 10 friends';
    addOnValueEl.textContent = UPGRADE_COST;
    totalPrice += UPGRADE_COST;
  } else {
    // Otherwise, 2 friends and 0 add-on
    friendCountItem.textContent = '1 Captain + up to 2 friends';
    addOnValueEl.textContent = '0';
  }

  totalPriceEl.textContent = totalPrice;
}

// Listen for changes on the upgrade checkbox
upgradeCheckbox.addEventListener('change', updatePrices);

// Initialize pricing on page load
updatePrices();

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

// (If you have a crewBack, do similarly for the crew screen)

// Buy Now (Captain)
captainBuyNowButton.addEventListener('click', () => {
  alert('Captain ticket purchased!');
  // Integrate your checkout or additional steps here
});

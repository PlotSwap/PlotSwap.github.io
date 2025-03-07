// References to screens
const initialScreen = document.getElementById('initialScreen');
const captainScreen = document.getElementById('captainScreen');
const crewScreen    = document.getElementById('crewScreen');

// References to buttons
const captainChoice = document.getElementById('captainChoice');
const crewChoice    = document.getElementById('crewChoice');
const captainBack   = document.getElementById('captainBack');
const crewBack      = document.getElementById('crewBack');

// Captain / Crew "Buy Now"
const captainBuyNow = document.getElementById('captainBuyNow');
const crewBuyNow    = document.getElementById('crewBuyNow');

// Price and guest info elements
const captainPriceEl  = document.getElementById('captainPrice');
const guestInfoEl     = document.getElementById('guestInfo');
const upgradeCheckbox = document.getElementById('upgradeCheckbox');

// Base prices
const baseCaptainPrice = 200;
const upgradeCost      = 100;

// Function to update price and guest info
function updateCaptainInfo() {
  // Calculate price
  let totalPrice = baseCaptainPrice;
  if (upgradeCheckbox.checked) {
    totalPrice += upgradeCost;
  }
  captainPriceEl.textContent = `$${totalPrice}`;

  // Update friend count
  if (upgradeCheckbox.checked) {
    guestInfoEl.textContent = '1 Captain + up to 10 friends';
  } else {
    guestInfoEl.textContent = '1 Captain + up to 2 friends';
  }
}

// Listen for changes on the upgrade checkbox
upgradeCheckbox.addEventListener('change', updateCaptainInfo);

// Initialize info on page load
updateCaptainInfo();

// Show Captain screen
captainChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  captainScreen.classList.remove('hidden', 'fade');
  // Force reflow for fade effect
  void captainScreen.offsetHeight;
  captainScreen.classList.add('fade');
});

// Show Crew screen
crewChoice.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  crewScreen.classList.remove('hidden', 'fade');
  void crewScreen.offsetHeight;
  crewScreen.classList.add('fade');
});

// Back button from Captain screen
captainBack.addEventListener('click', () => {
  captainScreen.classList.add('hidden');
  initialScreen.classList.remove('hidden', 'fade');
  void initialScreen.offsetHeight;
  initialScreen.classList.add('fade');
});

// Back button from Crew screen
crewBack.addEventListener('click', () => {
  crewScreen.classList.add('hidden');
  initialScreen.classList.remove('hidden', 'fade');
  void initialScreen.offsetHeight;
  initialScreen.classList.add('fade');
});

// Buy Now (Captain)
captainBuyNow.addEventListener('click', () => {
  alert('Captain ticket purchased!');
  // Integrate your checkout or additional steps here
});

// Buy Now (Crew)
crewBuyNow.addEventListener('click', () => {
  alert('Crew ticket purchased!');
  // Integrate your checkout or additional steps here
});

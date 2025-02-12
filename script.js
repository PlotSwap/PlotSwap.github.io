let checked = false; // Flag to track if check has occurred

function checkAnswer() {
  const input = document.getElementById("name-input");
  const userAnswer = input.value.trim();
  const logo = document.querySelector(".logo-container img");
  const button = document.querySelector(".prompt-container button");
  const label = document.querySelector(".prompt-container label");

  if (userAnswer.toLowerCase() === "russell") {
    input.value = "Correct";
    input.style.color = "green";

    // Sequential shrinking with slight overlap (1-second delay between starts)
    setTimeout(() => {
      button.classList.add("shrink"); // Start shrinking the submit button
      setTimeout(() => { button.style.display = "none"; }, 3000); // Hide button after shrink
    }, 0);

    setTimeout(() => {
      input.classList.add("shrink"); // Start shrinking the text box 1 second later
      setTimeout(() => { input.style.display = "none"; }, 3000); // Hide text box after shrink
    }, 1000);

    setTimeout(() => {
      label.classList.add("shrink"); // Start shrinking the label another second later
      setTimeout(() => { label.style.display = "none"; }, 3000); // Hide label after shrink
    }, 2000);

    // Brighten logo after all elements have fully shrunk
    setTimeout(() => {
      logo.style.opacity = "1.0"; // Set logo to full opacity
    }, 6000);

    // Display waitlist fields after the logo brightens with fade-in effect
    setTimeout(() => {
      const waitlistContainer = document.querySelector(".waitlist-container");
      waitlistContainer.classList.add("fade-in"); // Apply fade-in animation
      waitlistContainer.style.display = "flex"; // Show the waitlist container
    }, 7000); // Total delay after the shrink animations and logo transition

  } else {
    input.value = "Try again";
    input.style.color = "red";
    input.classList.add("shake"); // Add shake effect for wrong answer
    
    setTimeout(() => {
      input.classList.remove("shake"); // Remove shake effect after animation completes
    }, 500);
  }

  checked = true; // Set the flag to true after a check
}

function resetTextColor() {
  const input = document.getElementById("name-input");
  input.style.color = "white"; // Reset text color to white
}

function clearText() {
  const input = document.getElementById("name-input");

  if (checked) { // Only clear the text if a check has been done
    input.value = "";  // Clears the text in the input field
    input.style.color = "white";  // Resets the text color to white as well
    checked = false; // Reset the flag after clearing
  }
}

function validateWaitlistFields() {
  const ticketId = document.getElementById("ticket-id").value.trim();
  const fullName = document.getElementById("full-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();
  const submitButton = document.getElementById("waitlist-submit-button");

  // Check if all fields are filled and if the phone number contains exactly 10 digits
  const isPhoneNumberValid = /^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber);
  if (ticketId && fullName && isPhoneNumberValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function formatPhoneNumber() {
  const phoneNumberInput = document.getElementById("phone-number");
  let cleaned = phoneNumberInput.value.replace(/\D/g, ''); // Remove non-numeric characters

  if (cleaned.length > 3 && cleaned.length <= 6) {
    cleaned = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    cleaned = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  phoneNumberInput.value = cleaned;
  validateWaitlistFields();
}

function confirmWaitlist() {
  // Retrieve input values for reference (optional, could be used for validation here if needed)
  const ticketId = document.getElementById("ticket-id").value.trim();
  const fullName = document.getElementById("full-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();

  // Confirmation dialog
  const isConfirmed = confirm("Are you sure the information is correct? Ticket IDs can only be used once.");

  if (isConfirmed) {
    // Shrink away the waitlist container elements including labels, inputs, and buttons
    const waitlistContainer = document.querySelector(".waitlist-container");
    waitlistContainer.querySelectorAll("input, button, label, .form-label").forEach((element) => {
      element.classList.add("shrink");
    });

    // Fade out the logo
    const logo = document.querySelector(".logo-container");
    logo.classList.add("fade-out");

    // After shrinking completes, display "We'll be in touch" message
    setTimeout(() => {
      waitlistContainer.style.display = "none"; // Hide waitlist container
      const messageDiv = document.getElementById("we-will-be-in-touch");
      messageDiv.style.display = "block"; // Show "We'll be in touch" message

      // After 2 seconds, fade out the "We'll be in touch" message
      setTimeout(() => {
        messageDiv.classList.add("fade-out");
      }, 2000); // Wait for 2 seconds before fading out the message

    }, 2000); // Wait for shrinking animation to complete before displaying the message
  } else {
    // If declined, allow the user to continue editing
    alert("Please review your information before submitting.");
  }
}

function attemptWaitlistSubmit() {
  const submitButton = document.getElementById("waitlist-submit-button");
  
  if (submitButton.disabled) {
    showInvalidFields(); // Flash the invalid fields in red if validation fails
  } else {
    confirmWaitlist(); // If valid, proceed with the existing submission process
  }
}

function showInvalidFields() {
  const ticketId = document.getElementById("ticket-id").value.trim();
  const fullName = document.getElementById("full-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();

  if (!ticketId) {
    document.querySelector("#ticket-id").previousElementSibling.classList.add("flash-red");
  }
  if (!fullName) {
    document.querySelector("#full-name").previousElementSibling.classList.add("flash-red");
  }
  if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
    document.querySelector("#phone-number").previousElementSibling.classList.add("flash-red");
  }

  // Remove the red flash after a short delay
  setTimeout(() => {
    document.querySelectorAll(".flash-red").forEach((label) => {
      label.classList.remove("flash-red");
    });
  }, 500);
}

// Event listener for phone number formatting
document.getElementById("phone-number").addEventListener("input", formatPhoneNumber);
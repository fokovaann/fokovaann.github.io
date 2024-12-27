let clickCount = 0;
const button = document.getElementById('rainbowButton');
const counterText = document.getElementById('counter');
const clickSound = document.getElementById('clickSound');

// Function to handle the button click
button.addEventListener('click', () => {
    // Increment click count
    clickCount++;

    // Attempt to play the sound (with error handling for certain browsers)
    clickSound.currentTime = 0;  // Reset sound to start from the beginning each time
    clickSound.play().catch((error) => {
        console.log("Error playing sound:", error);
    });

    // Update the counter text
    counterText.innerHTML = `You have clicked <span class="rainbow">${clickCount}</span> times.`;
});

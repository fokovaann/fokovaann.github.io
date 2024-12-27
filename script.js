let clickCount = 0;
const button = document.getElementById('rainbowButton');
const counterText = document.getElementById('counter');
const clickSound = document.getElementById('clickSound');

// Function to handle the button click
button.addEventListener('click', () => {
    // Increment click count
    clickCount++;

    // Play the sound
    clickSound.play();

    // Update the counter text
    counterText.innerHTML = `You have clicked <span class="rainbow">${clickCount}</span> times.`;
});

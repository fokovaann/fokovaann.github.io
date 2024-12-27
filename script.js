const button = document.querySelector('.rainbow-button');
const counter = document.querySelector('.counter');
const clickSound = document.getElementById('clickSound');
const debugMessage = document.getElementById('debug-message');
let count = 0;

const colors = [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#9400D3'  // Violet
];

// Function to show debug message
const showDebugMessage = (message) => {
    debugMessage.textContent = message;
};

// Function to play sound with error handling
const playSound = async () => {
    try {
        // Check if the audio file was loaded
        if (clickSound.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
            showDebugMessage("Error: Sound file not found. Check if assets/click-sound.mp3 exists.");
            return;
        }

        // Reset sound to start
        clickSound.currentTime = 0;
        
        // Create a new promise for playing the sound
        const playPromise = clickSound.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name === 'NotAllowedError') {
                    showDebugMessage("Error: Browser blocked autoplay. Try clicking again.");
                } else {
                    showDebugMessage(`Error playing sound: ${error.message}`);
                }
            });
        }
    } catch (error) {
        showDebugMessage(`Error: ${error.message}`);
    }
};

// Initialize sound with user interaction
button.addEventListener('click', () => {
    // Play sound
    playSound();
    
    count++;
    
    // Create rainbow text
    const rainbowText = count.toString().split('').map((digit, index) => {
        const colorIndex = index % colors.length;
        return `<span style="color: ${colors[colorIndex]}">${digit}</span>`;
    }).join('');
    
    counter.innerHTML = rainbowText;
    
    // Create new rainbow circle
    const circle = document.createElement('div');
    circle.className = 'rainbow-circle';
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random position within the button
    const angle = Math.random() * 360;
    const distance = Math.random() * 20;
    circle.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
    circle.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
    
    button.querySelector('.rainbow-circles').appendChild(circle);
    
    // Remove circle after animation
    setTimeout(() => {
        circle.remove();
    }, 2000);
});

// Check if audio loaded successfully
clickSound.addEventListener('error', (e) => {
    showDebugMessage("Error loading sound file. Check if the path is correct: assets/click-sound.mp3");
});

// Initial check for audio file
window.addEventListener('load', () => {
    if (clickSound.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        showDebugMessage("Sound file not found. Check if assets/click-sound.mp3 exists.");
    }
});
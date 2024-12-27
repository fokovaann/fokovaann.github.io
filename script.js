const button = document.querySelector('.rainbow-button');
const counter = document.querySelector('.counter');
const clickSound = document.getElementById('clickSound');
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

// Function to play sound
const playSound = () => {
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play();
};

button.addEventListener('click', () => {
    // Play sound immediately
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
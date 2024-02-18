let speechRate = 1; // Default rate
let isPaused = false; // Track whether speech is paused

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "performTTS" && message.text) {
        // Your text-to-speech code here
        let speech = new SpeechSynthesisUtterance(message.text);
        speech.rate = speechRate; // Assuming speechRate is defined globally or within this context
        window.speechSynthesis.speak(speech);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('speakButton').addEventListener('click', () => {
        let msg = document.getElementById('textInput').value;
        if (msg.length > 0) {
            let speech = new SpeechSynthesisUtterance(msg);
            speech.rate = speechRate; // Set the speech rate
            window.speechSynthesis.speak(speech);
        }
    });
    document.getElementById('speedControl').addEventListener('input', () => {
        speechRate = document.getElementById('speedControl').value;
        document.getElementById('speedValue').textContent = `${speechRate}x`;
    });

    document.getElementById('stopButton').addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            if (!isPaused) {
                window.speechSynthesis.pause();
                isPaused = true;
                document.getElementById('stopButton').textContent = "Resume";
            } else {
                window.speechSynthesis.resume();
                isPaused = false;
                document.getElementById('stopButton').textContent = "Pause";
            }
        }
    });

    // Update speed value display
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');

    speedControl.addEventListener('input', () => {
        speedValue.textContent = `${speedControl.value}x`;
        console.log(`Speed set to ${speedControl.value}`);
        // Future implementation: Adjust TTS speed...
    });
});
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Change the icon or style if needed when toggling dark mode
    if(document.body.classList.contains('dark-mode')){
        darkModeToggle.textContent = '☀️'; // Change to sun icon for light mode
    } else {
        darkModeToggle.textContent = '🌙'; // Change back to moon icon for dark mode
    }
});
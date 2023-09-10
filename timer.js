document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const timerDisplay = document.getElementById('timer');
    const pauseButton = document.getElementById('pauseButton');
    const endButton = document.getElementById('endButton');

    const port = chrome.runtime.connect({name: 'popup' });

    let isPaused = false;

    startButton.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value, 10);
        const minutes = parseInt(minutesInput.value, 10);

        port.postMessage({ action: 'startCountdown', hours, minutes });
    });

    pauseButton.addEventListener('click', () => {
        let resultText = isPaused ? pauseButton.innerHTML = 'Pause' : pauseButton.innerHTML = 'Resume';
        port.postMessage({ action: 'pauseCountdown' });
        isPaused = !isPaused;
    });

    endButton.addEventListener('click', () => {
        port.postMessage({ action: 'endCountdown' });
    });

    port.onMessage.addListener(function(message) {
        if (message.action === 'updateTimerDisplay') {
            const formattedTime = message.time;
            timerDisplay.innerHTML = formattedTime;
        }
    });
});
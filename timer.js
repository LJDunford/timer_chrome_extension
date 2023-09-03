document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const timerDisplay = document.getElementById('timer');
    const pauseButton = document.getElementById('pauseButton');
    const endButton = document.getElementById('endButton');

    startButton.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value, 10);
        const minutes = parseInt(minutesInput.value, 10);

        chrome.runtime.sendMessage({ action: 'startCountdown', hours, minutes }, function(response) {
            console.log(response);
        });
    });

    pauseButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'pauseCountdown' }, function(response) {
            console.log(response);
        });
    });

    endButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'endCountdown' }, function(response) {
            console.log(response);
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'updateTimerDisplay') {
            const formattedTime = request.time;
            timerDisplay.innerHTML = formattedTime;
            sendResponse("Timer display updated");
        }
    });
});
let interval;
let totalSeconds;
let isPaused = false;
let popupPort;

chrome.runtime.onConnect.addListener(function(port) {
    popupPort = port;
        
    port.onMessage.addListener(function(message) {
        if (message.action === 'startCountdown') {
            startCountdown(message.hours, message.minutes);
        } else if (message.action === 'pauseCountdown') {
            pauseCountdown();
        } else if (message.action === 'endCountdown') {
            endCountdown();
        } else if (message.action === 'closePopup') {
            closePopup();
        }
    });
    
    port.onDisconnect.addListener( () => {
        popupPort = null;
    });
});

function startCountdown(hours, minutes) {
    totalSeconds = (hours * 3600) + (minutes * 60);
    clearInterval(interval);
    isPaused = false;

    interval = setInterval(() => {
        if (!isPaused && totalSeconds <= 0) {
            clearInterval(interval);
            tempDisplay = "Time's up!";
            popupPort.postMessage({action: 'updateTimerDisplay', time: tempDisplay})
            openPopup();
            return;
        }

        if (!isPaused) {
            // Call updateTimerDisplay function
            if (popupPort) {
                updateTimerDisplay();
            }
            totalSeconds--;
        }
    }, 1000);
}

function pauseCountdown() {
    isPaused = !isPaused;
}

function endCountdown() {
    resetCountdownVariables();
}

function resetCountdownVariables() {
    clearInterval(interval);
    totalSeconds = 0;
    isPaused = false;
    popupPort.postMessage({action: 'updateTimerDisplay', time: "Countdown Ended"})
}

function updateTimerDisplay() {
    
    // Calculate the hours, minutes, and seconds from totalSeconds
    const hoursRemaining = Math.floor(totalSeconds / 3600);
    const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
    const secondsRemaining = totalSeconds % 60;
  
    // Format the time as a string
    const formattedTime = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
            
    // Send the formatted time to the popup script for display
    popupPort.postMessage({action: 'updateTimerDisplay', time: formattedTime});
}

function openPopup() {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400, // Set the width and height according to your design
        height: 200,
        left: 300, // Position the popup as desired
        top: 300,
    });
}
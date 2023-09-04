
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startCountdown') {
        startCountdown(request.hours, request.minutes);
        sendResponse("Countdown Started")
    } else if (request.action === 'pauseCountdown') {
        pauseCountdown();
        sendResponse("Countdown Paused")
    } else if (request.action === 'endCountdown') {
        endCountdown();
        sendResponse("Countdown Ended")
    } else if (request.action === 'closePopup') {
        closePopup();
        sendResponse('Popup Closed')
    }
}); 

let interval;
let totalSeconds;
let isPaused = false;

function startCountdown(hours, minutes) {
    totalSeconds = (hours * 3600) + (minutes * 60);
    clearInterval(interval);
    isPaused = false;

    interval = setInterval(() => {
        if (!isPaused && totalSeconds <= 0) {
            clearInterval(interval);
            tempDisplay = "Time's up!";
            chrome.runtime.sendMessage({action: 'updateTimerDisplay', time: tempDisplay})
            openPopup();
            return;
        }

        if (!isPaused) {
            // Call updateTimerDisplay function
            updateTimerDisplay();
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
    chrome.runtime.sendMessage({action: 'updateTimerDisplay', time: "Countdown Ended"})
}

function updateTimerDisplay() {
    
    // Calculate the hours, minutes, and seconds from totalSeconds
    const hoursRemaining = Math.floor(totalSeconds / 3600);
    const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
    const secondsRemaining = totalSeconds % 60;
  
    // Format the time as a string
    const formattedTime = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
            
    // Send the formatted time to the popup script for display
    chrome.runtime.sendMessage({action: 'updateTimerDisplay', time: formattedTime}, function(response) {
        console.log(response);
    })
}

function openPopup() {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400, // Set the width and height according to your design
        height: 200,
        left: 100, // Position the popup as desired
        top: 100,
    });
}

function closePopup() {
    chrome.windows.getCurrent(function(window) {
        chrome.windows.remove(window.id);
    });
}
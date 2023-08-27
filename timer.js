window.addEventListener("DOMContentLoaded", (event) => {

    const startButton = document.getElementById('startButton');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const timerDisplay = document.getElementById('timer');
    const pauseButton = document.getElementById('pauseButton');
    const endButton = document.getElementById('endButton');

    let interval;

    startButton.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value, 10);
        const minutes = parseInt(minutesInput.value, 10);
      
        startCountdown(hours, minutes);
    })
     
    pauseButton.addEventListener('click', pauseCountdown());
    
    endButton.addEventListener('click', endCountdown());

    // ***** FUNCTIONS *****
    function startCountdown(hours, minutes) {
        let totalSeconds = (hours * 3600) + (minutes * 60);
  
        const interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                timerDisplay.innerHTML = "Time's up! Go take a well deserved break!";
                return;
            }
  
            const hoursRemaining = Math.floor(totalSeconds / 3600);
            const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
            const secondsRemaining = totalSeconds % 60;
  
            const formattedTime = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
            timerDisplay.innerHTML = formattedTime;
  
            totalSeconds--;
        }, 1000);
    }

    function pauseCountdown() {
        clearInterval(interval);
    }
  
    function endCountdown() {
        clearInterval(interval);
        timerDisplay.innerHTML = "Countdown ended.";
    }
});
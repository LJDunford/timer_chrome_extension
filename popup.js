document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'closePopup'}, function(response) {
            console.log(response);
        })
    });
});
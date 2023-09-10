document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', () => {
        closePopup();
    });

    function closePopup() {
        chrome.windows.getCurrent(function(window) {
            chrome.windows.remove(window.id);
        });
    }
});
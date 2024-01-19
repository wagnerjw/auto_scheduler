//Link to ChatGPT convo about this project: https://chat.openai.com/share/bccea043-e50b-4493-b006-fae598eee81e

//In summary, this code adds a click event listener to a button in a Chrome extension's popup.html - 
//When the button is clicked, the selected status is retrieved from a dropdown menu and a script 
//is injected into the currently active tab that changes the status on the page to the user selected status.


// This code adds a click event listener to a button in a Chrome extension's popup. When the 
// button is clicked in popup.html, the selected status is retrieved from a dropdown menu and a script is 
// injected into the currently active tab that changes the status on the page to the selected status.
document.getElementById('changeStatusButton').addEventListener('click', function () {
    let selectedStatus = document.getElementById('statusSelect').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: changeStatus,
            args: [selectedStatus]
        });
    });
});

// start of Ivan's function, newStatus gets passed from popup.html to changeStatus function which is then
// injected into the page. 
function changeStatus(newStatus) {
    var statusChanged = false;
    var statusElements = document.querySelectorAll('.slds-truncate');
    statusElements.forEach(function (element) {
        if (element.textContent.trim() === newStatus) {
            element.closest('a').click();
            statusChanged = true;
        }
    });
    if (statusChanged) {
        var omniChannelElements = document.querySelectorAll('span.itemTitle.slds-truncate');
        omniChannelElements.forEach(function (element) {
            if (element.textContent.includes('Omni-Channel')) {
                element.textContent = 'Omni-Channel (' + newStatus + ')';
            }
        });
        alert('Successfully changed to ' + newStatus + '.');
    } else {
        alert('The status change was not successful. Open the Status menu once to enable');
    }
}
// git commit message prefixes:
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

//Link to ChatGPT convo about this project: https://chat.openai.com/share/bccea043-e50b-4493-b006-fae598eee81e

// In summary, this code adds a click event listener to a button in a Chrome extension's popup.html - 
// When the button is clicked, the selected status is retrieved from a dropdown menu and a script 
// is injected into the currently active tab that changes the status on the page to the user selected status.


// This code adds a click event listener to the changeStatusButton in the extension's popup.html. When the 
// button is clicked in popup.html, the user selected status is retrieved from a dropdown menu and the 
// changeStatus function is injected into the currently active tab that changes the omni status on the page 
// to the user selected status from the drop down in popup.html.
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

// start of Ivan's status change function - 
// selectedStatus gets passed from popup.html to the changeStatus function via the newStatus argument below.
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
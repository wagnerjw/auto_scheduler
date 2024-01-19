// below is the code for the bookmarklets from Ivan

//ERP - Available Status
javascript:function changeStatusToERP() {
    var newStatus = 'ERP - Available';
    var statusChanged = false;
    var statusElements = document.querySelectorAll('.slds-truncate');
    statusElements.forEach(function(element) {
        if (element.textContent.trim() === newStatus) {
            element.closest('a').click();
            statusChanged = true;
        }
    });
    if (statusChanged) {
        var omniChannelElements = document.querySelectorAll('span.itemTitle.slds-truncate');
        omniChannelElements.forEach(function(element) {
            if (element.textContent.includes('Omni-Channel')) {
                element.textContent = 'Omni-Channel (' + newStatus + ')';
            }
        });
        alert('Successfully changed to ' + newStatus + '.');
    } else {
        alert('The status change was not successful. Open the Status menu once to enable');
    }
}

//Break Status
javascript:(function() {
    var newStatus = 'Break';
    var statusChanged = false;
    var statusElements = document.querySelectorAll('.slds-truncate');
    statusElements.forEach(function(element) {
        if (element.textContent.trim() === newStatus) {
            element.closest('a').click();
            statusChanged = true;
        }
    });
    if (statusChanged) {
        var omniChannelElements = document.querySelectorAll('span.itemTitle.slds-truncate');
        omniChannelElements.forEach(function(element) {
            if (element.textContent.includes('Omni-Channel')) {
                element.textContent = 'Omni-Channel (' + newStatus + ')';
            }
        });
        alert('Successfully changed to ' + newStatus + '.');
    } else {
        alert('The status change was not successful. Open the Status menu once to enable');
    }
})();

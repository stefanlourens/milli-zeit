var numReg = new RegExp('^[0-9]+$');
var aWeek = 1000 * 60 * 60 * 24 * 7;
var dialogId = 'time-ext-hover-div';

function msToTime(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var secondsLeft = Math.floor(((seconds % 86400) % 3600) % 60);

    var timeString = '';

    if (days > 0) {
        timeString += (days > 1) ? (days + " days ") : (days + " day ");
    }

    if (hours > 0) {
        timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    }

    if (minutes > 0) {
        timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
    }

    if (secondsLeft > 0) {
        timeString += (secondsLeft > 1) ? (secondsLeft + " seconds ") : (secondsLeft + " second ");
    }

    if (days <= 0 && hours <= 0 && minutes <= 0 && secondsLeft <= 0) {
        timeString = "less than a second";
    }

    return timeString;
}


function getSelected() {
    var selection = {};
    if (window.getSelection()) {
        selection = {
            selected: window.getSelection(),
            selectedText: window.getSelection().toString()
        };
    } else if (document.selection()) {
        selection = {
            selected: document.getSelection(),
            selectedText: document.selection.createRange().text
        };
    }

    return selection;
}

function showDialog(content) {
    var dialog = document.getElementById(dialogId);

    if (!dialog) {
        dialog = document.createElement('div');
        dialog.id = dialogId;
        dialog.style.cssText = 'color-black; font-weight: bold; background-color: #EEE;'
                + 'position:fixed; border:1px solid dark-grey; border-radius: 5px; padding:5px;'
                + 'bottom:0; right:0; font-family:Helvetica,Arial,sans-serif; font-size: 10pt;';
        document.body.appendChild(dialog);
    }

    dialog.innerText = content;
}

function showTime(selection, duration) {
    var durationText = null;

    if (duration > 0) {
        if (duration > aWeek) {
            durationText = (new Date(duration)).toString();
        } else {
            durationText = msToTime(duration);
        }

        var content = duration + 'ms = ' + durationText;
        console.log(content);
        showDialog(content);
    }


}


window.addEventListener('load', function () {
    document.addEventListener("mouseup", function (e) {
        var selection = getSelected();
        if (selection && numReg.test(selection.selectedText)) {
            var duration = parseInt(selection.selectedText);

            if (!isNaN(duration)) {
                showTime(selection.selected, duration);
            }
        }
    });
});

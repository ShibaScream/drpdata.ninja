// global array as fallback, but won't be persistent like localStorage
var answers = [];

// question/answer object
var qa = {
    // whole div that holds question block
    qDiv: document.getElementById('questions'),
    // questions class
    q: document.getElementsByClassName('chkbx'),
    // answers class
    a: document.getElementsByClassName('answers'),
    // submit button
    submit: document.getElementById('submitbtn'),
    // clear button
    clear: document.getElementById('clearbtn')
};
    

// from MDN
function storageAvailable(type) {
    'use strict';
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
        return false;
	}
}

function showAnswers(qa) {
    'use strict';
    
    qa.qDiv.style.display = 'none';
    
    qa.clear.style.display = 'block';
    
    if (storageAvailable('localStorage')) {
        for (var i = 0, n = qa.q.length; i < n; i++) {
            // if localstorage contains index of answer, then show answer div
            if (localStorage[i.toString()]) {
                qa.a[i].style.display = 'block';
            }
        }
    } else {
        for (var i = 0, n = qa.q.length; i < n; i++) {
            if (answers.indexOf(i) > -1) {
                qa.a[i].style.display = 'block';
            }
        }
    }
}

function clearAnswers(qa) {
    'use strict';
    
    qa.qDiv.style.display = 'block';
    
    qa.clear.style.display = 'none';
    
    localStorage.removeItem('showAnswers');
    
    for (var i = 0, n = qa.q.length; i < n; i++) {
        if (localStorage[i.toString()]) {
            localStorage.removeItem(i.toString());
            qa.a[i].style.display = 'none';
        }
    }
}

function storeData(qa) {
    'use strict';
    
    /*  
    *   The class 'chkbx' could really be put in the <input> instead of the <li>
    *   to save a step. I intend to expand the UI functionality
    *   around this to allow clicking any part of the <li> to
    *   check the box, hence why I have set up 2 variables in this function
    */
    
    var cb = undefined;
    
    if (storageAvailable('localStorage')) {
        for (var i = 0, n = qa.q.length; i < n; i++) {
            // get the checkbox
            cb = qa.q[i].childNodes[0];
            if (cb.checked) {
                localStorage.setItem('showAnswers', 'true');
                localStorage.setItem(i.toString(), cb.checked.toString());
            }
        }
    // fallback method if localStorage is not available
    } else {
        for (var i = 0, n = qa.q.length; i < n; i++) {
            // get the checkbox inside the question class item
            cb = qa.q[i].childNodes[0];
            if (cb.checked) {
                // push to global array
                answers.push(i);
            }
        }
    }
    // check that the submit button wasn't hit on accident and no answers to show!
    if (localStorage['showAnswers'] || answers.length > 0) {
        showAnswers(qa);
    }
};

window.onload = function () {
    
    'use strict';

    // this is a carryover from the scripts.js file to start the loop on the homepage
    if (isHomePage()) {
        // function is in string due to bug with Safari
        setInterval("loopWords(words)", 3000);
    }

    // check which view should be shown (questions or answers)
    if ((storageAvailable('localStorage') && localStorage['showAnswers']) || answers.length > 0) {
        showAnswers(qa);
    }
    
    // submit button listener
    qa.submit.addEventListener('click', function() { 
        storeData(qa);
    },false);

    // clear button listener
    qa.clear.addEventListener('click', function() {
        clearAnswers(qa);
    }, false);
};
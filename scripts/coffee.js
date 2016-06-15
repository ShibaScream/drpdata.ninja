function isCoffeePage() {
    'use strict';
    var home = "coffee.html",
        page = document.URL;
    if (page.indexOf(home) > -1) {
        return true;
    } else {
        return false;
    }
}

function hideOrShowCoffee() {
    'use strict';
    var centered, note;
    if (isCoffeePage()) {
        centered = document.getElementsByClassName('centered');
        note = document.getElementsByClassName('note');
        if (document.documentElement.clientHeight < 950) {
            centered[0].style.visibility = 'hidden';
            note[0].style.visibility = 'hidden';
        } else {
            centered[0].style.visibility = 'visible';
            note[0].style.visibility = 'visible';
        }
    }
}

window.onload = function () {
    'use strict';

    if (isCoffeePage()) {
        hideOrShowCoffee();
        window.addEventListener('resize', hideOrShowCoffee, false);
    }
};
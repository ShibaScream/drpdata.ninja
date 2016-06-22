/*jslint browser:true */

function isHomePage() {
    'use strict';
    var home = 'http://drpdata.ninja/',
        index = 'index.html',
        page = document.URL;
    if (page === home || page.indexOf(index) > -1) {
        return true;
    } else {
        return false;
    }
}

//looping words on homepage
var words = {
    adjectives: ['coder', 'data analyst', 'problem solver', 'coffee drinker', 'piano player', 'data geek', 'shiba owner'],
    iam: document.getElementById('iam'),
    i: 0
};

function loopWords() {
    'use strict';
    if (words.i === words.adjectives.length) {
        words.i = 0;
    }
    words.iam.textContent = words.adjectives[words.i];
    words.i += 1;
}

var menu = {
    navicon: document.getElementById('navicon'),
    nav: document.getElementsByClassName('nav')
};

function hideMobileMenu() {
    'use strict';
    menu.nav[0].style.height = '0';
    menu.nav[0].style.visibility = 'collapse';
}

function showMobileMenu() {
    'use strict';
    var visibility = menu.nav[0].style.visibility;
    if (visibility === 'collapse' || visibility === "") {
        menu.nav[0].style.height = '100%';
        menu.nav[0].style.visibility = 'visible';
    } else {
        hideMobileMenu();
    }
}

menu.navicon.addEventListener('click', showMobileMenu, false);

window.onload = function () {
    'use strict';

    if (isHomePage()) {
        // function is in string due to bug with Safari
        setInterval("loopWords(words)", 3000);
    }

};
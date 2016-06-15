function clear() {
    'use strict';
    var allSquares = document.getElementsByClassName('square'),
        info = document.getElementById('info');
    [].forEach.call(allSquares, function (square, index) {
        if (square.innerHTML.length !== 0) {
            square.innerHTML = "";
        }
    });
    info.innerHTML = '';
}

function Square() {
    'use strict';
    this.num = null;
    this.squareDiv = undefined;
}

Square.prototype.init = function (size) {
    'use strict';
    // create a new div
    this.squareDiv = document.createElement('div');
    var div = this.squareDiv;
    // "name" the square
    this.num += 1;
    // create the HTML square
    this.squareDiv.className = ('square');
    this.squareDiv.style.width = size + '%';
    this.squareDiv.style.height = size + '%';
};

function Board() {
    'use strict';
    this.boardSize = 3;
    this.pixelSize = undefined;
    this.numSquares = undefined;
    this.board = document.getElementById('board');
    this.startButton = document.getElementById('start');
    this.clearButton = document.getElementById('clear');
}
    
Board.prototype.init = function (gameobj) {
    'use strict';
    // define values for object
    this.pixelSize = this.boardSize * 100;
    this.numSquares = this.boardSize * this.boardSize;
    this.squareSize = (100 - this.boardSize) / this.boardSize;
    // set size of board div
    this.board.style.width = this.pixelSize + 'px';
    this.board.style.height = this.pixelSize + 'px';
    // create the squares
    while (this.numSquares--) {
        var newSquare = new Square();
        newSquare.init(((100 - this.boardSize) / this.boardSize));
        this.board.appendChild(newSquare.squareDiv);
    }
    // start button event
    this.startButton.addEventListener('click', function () {
        gameobj.init();
    });
    // clear button event
    this.clearButton.addEventListener('click', function () {
        clear();
    });
};

function Player(n) {
    'use strict';
    this.num = n;
    this.name = "Player " + this.num;
    this.score = 0;
}

function Game() {
    'use strict';
    this.allSquares = document.getElementsByClassName('square');
    this.player1Turn = true;
    this.round = 1;
    this.numFilledSquares = 0;
    this.p1Squares = [];
    this.p2Squares = [];
    this.info = document.getElementById('info');
}

Game.prototype.whoStarts = function () {
    'use strict';
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * 2) + 1;
};

Game.prototype.addSymbol = function (square, index) {
    'use strict';
    if (square.innerHTML.length !== 0) {
        this.info.innerHTML = '<h2>The square has already been played. Try again</h2>';
    } else {
        if (this.player1turn) {
            square.innerHTML = 'X';
            this.player1turn = false;
            this.numFilledSquares += 1;
            this.p1Squares.push(index);
            this.info.innerHTML = '<h2>Player 2\'s Turn!</h2>';
        } else {
            square.innerHTML = 'O';
            this.player1turn = true;
            this.numFilledSquares += 1;
            this.p2Squares.push(index);
            this.info.innerHTML = '<h2>Player 1\'s Turn!</h2>';
        }
        this.checkWinOrDraw();
    }
};

Game.prototype.checkWinOrDraw = function () {
    'use strict';
    this.win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    var winner = false,
        draw = false;
    if (this.numFilledSquares >= 3) {
        var p1 = this.p1Squares.sort().toString(),
            p2 = this.p2Squares.sort().toString(),
            check;
        for (var i = 0, n = this.win.length; i < n; i++) {
            check = this.win[i].toString();
            if (p1.indexOf(check) > -1) {
                this.info.innerHTML = '<h2>Player 1 Wins!</h2>';
                winner = true;
                break;
            } else if (p2.indexOf(check) > -1) {
                this.info.innerHTML = '<h2>Player 2 Wins!</h2>';
                winner = true;
                break;
            }
        }
    }
    if (this.numFilledSquares >= 9) {
        this.info.innerHTML = '<h2>It\'s a Draw</h2>';
        draw = true;
    }
    if (winner || draw) {
        setTimeout(clear, 3000);
        this.round += 1;
        this.numFilledSquares = 0;
        this.p1Squares = [];
        this.p2Squares = [];
    }

};
    
Game.prototype.init = function () {
    'use strict';
    var p1 = new Player(1),
        p2 = new Player(2),
        firstPlayer = this.whoStarts();
    this.info.innerHTML = '<h2>Let the Game Begin!</h2>';
    // http://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
    // using a forEach loop that passes "this" into function, which is then passed
    // through again to addEventListener, which makes it possible to affect the Game object and advance the game
    [].forEach.call(this.allSquares, function (square, index, array) {
        square.addEventListener('click', this.addSymbol.bind(this, square, index), false);
    }, this);
    console.log('first player is: ' + firstPlayer);
    if (p1.num === firstPlayer) {
        this.info.innerHTML += '<h2>Player 1 Goes First</h2>';
        this.player1Turn = true;
    } else {
        this.info.innerHTML += '<h2>Player 2 Goes First</h2>';
        this.player1Turn = false;
    }
};

var board = new Board();
var game = new Game();
board.init(game);


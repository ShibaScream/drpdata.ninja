/*
* Checks for all possible win combos
* Returns a string with 'X' or 'O' or 'tie' or 'none'
* This function has been generalized to fit any size of board
* admittedly it's a bit of an expensive operation
*/
function checkWinner(board) {
    'use strict';
    
    var result = 'none',
        // for loop variables declared now instead of in loop
        n = 0,
        i = 0,
        squares = board.numSquares,
        columns = board.boardSize,
        empty = 0;
    
    // count number of empty/null spaces
    board.spaces.forEach(function (space) {
        if (space === null) {
            empty += 1;
        }
    });
    
    // return none if there aren't enough pieces to make a win
    if (empty > (squares - columns)) {
        return result;
    }
    
    // check horizontal
    for (i = 0; i < squares; i += columns) {
        if ((board.spaces[i] !== null) && (result === 'none')) {
            for (n = 0; n < columns; n += 1) {
                if (board.spaces[i] === board.spaces[(i + n)]) {
                    result = board.spaces[i];
                } else {
                    result = 'none';
                    break;
                }
            }
        } else if (result !== 'none') {
            return result;
        }
    }
    
    // check vertical
    for (i = 0; i < columns; i += 1) {
        if ((board.spaces[i] !== null) && (result === 'none')) {
            for (n = i + columns; n < squares; n += columns) {
                if (board.spaces[i] === board.spaces[n]) {
                    result = board.spaces[i];
                } else {
                    result = 'none';
                    break;
                }
            }
        } else if (result !== 'none') {
            return result;
        }
    }
    
    // check diagonal
    for (i = 0; i < columns; i += (columns - 1)) {
        if ((board.spaces[i] !== null) && (result === 'none') && (i === 0)) {
            // add 1 to boardSize to step from index (0) diagonally
            for (n = 0; n <= squares; n += (columns + 1)) {
                if (board.spaces[i] === board.spaces[i + n]) {
                    result = board.spaces[i];
                } else {
                    result = 'none';
                    break;
                }
            }
        }
        
        if ((board.spaces[i] !== null) && (result === 'none') && (i === (columns - 1))) {
            // subtract 1 from boardSize to step from index (boardSize) diagonally
            for (n = (columns - 1); n < (squares - 1); n += (columns - 1)) {
                if (board.spaces[i] === board.spaces[n]) {
                    result = board.spaces[i];
                } else {
                    result = 'none';
                    break;
                }
            }
        }
        
        if (result !== 'none') {
            return result;
        }
    }
    
    if (result === 'none' && empty === 0) {
        result = 'tie';
    }
    
    return result;
}

function AIPlayer(board) {
    'use strict';
    
    this.symbol = '0';
    
    this.move = function () {
        /*
        *   This 'AI' is dumb and has no
        *   awareness of the board, other
        *   than to check whether a randomly
        *   picked position is not already taken
        */
        var squares = document.getElementsByClassName('square'),
            n;
        
        while (true) {
            n = Math.floor(Math.random() * board.numSquares);
            if (board.spaces[n] === null) {
                squares[n].innerHTML = this.symbol;
                board.spaces[n] = this.symbol;
                break;
            }
        }
    };
}

/*
*   Human Player object is not really necessary
*   considering that it is only holding symbol.
*   I'm leaving it in place just for future expansion
*   of the game
*/
function HUMANPlayer() {
    'use strict';
    this.symbol = 'X';
}

function Game(board) {
    'use strict';
    
    this.board = board;
    
    // Public: this is the human player
    this.player1 = new HUMANPlayer();
    
    // Public: this is the AI
    this.player2 = new AIPlayer(board);
    
    this.clear = function () {
        // get the squares
        var squares = document.getElementsByClassName('square'),
        i = 0,
        n = 0;
        
        for (i = 0, n = squares.length; i < n; i += 1) {
            squares[i].innerHTML = '';
            this.board.spaces[i] = null;
        }
    };
    
}

function init(game) {
    'use strict';
    
    console.log("init game");
    
    // get the squares
    var squares = document.getElementsByClassName('square'),
        // declare i and n for loops
        i = 0,
        n = 0;

    game.clear();

    // add event listeners to squares
    for (i = 0, n = squares.length; i < n; i += 1) {
        squares[i].addEventListener('click', function () {
            if (this.innerHTML === '') {
                this.innerHTML = 'X';
                game.board.spaces[this.dataset.indexNumber] = 'X';
                var win = checkWinner(game.board);
                if (win === 'none') {
                    game.player2.move();
                    win = checkWinner(game.board);
                }
                if (win !== 'none') {
                    game.clear();
                }
            }
        }, false);
    }
}

var game = new Game(board);

var startButton = document.getElementById('start'),
    clearButton = document.getElementById('clear');

// start button event
startButton.addEventListener('click', function () {
    init(game);
}, false);

// clear button event
clearButton.addEventListener('click', function () {
    game.clear();
}, false);
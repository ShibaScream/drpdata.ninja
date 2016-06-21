/*
*   This handles the UI for the board
*
*   The square function separates the creation of each
*   square from the rest of the board functions
*/

function Square() {
    'use strict';
    
    // Public: create a new div
    this.squareDiv = document.createElement('div');
    
    // define the HTML square
    this.init = function (indx, size) {
        
        this.squareDiv.className = ('square');
        
        // this is to "name" the square
        this.squareDiv.dataset.indexNumber = indx;
        
        this.squareDiv.style.width = size + '%';
        this.squareDiv.style.height = size + '%';
    };
}

function Board(num) {
    'use strict';
    
    // Private: dimension variables and board DOM object
    var pixelSize = 0,
        squareSize = 0,
        board = document.getElementById('board');
    
    /*
    *   Public: keep track of which squares are filled in a 1d array
    *   init function fills array with null to indicate empty spaces 
    */
    this.spaces = [];
    
    //  Public: make announcements in the info section
    this.info = document.getElementById('info');
    
    /* 
    *   Public: boardsize allows for this to become a more 
    *   dynamic game that goes beyond standard 3x3 tic tac toe board
    *   but defaults to 3x3 board if num is undefined
    *   probably adds more complication than I need right now
    */
    this.boardSize = num ? num : 3;
    
    this.numSquares = this.boardSize * this.boardSize;
    
    // draw the board
    this.init = function () {
        
        // define values for dimension variables
        pixelSize = this.boardSize * 100;
        squareSize = (100 - this.boardSize) / this.boardSize;
        
        // set size of board div
        board.style.width = pixelSize + 'px';
        board.style.height = pixelSize + 'px';
        
        // create each square
        for (var i = 0; i < this.numSquares; i++) {
            var square = new Square();
            square.init(i, squareSize);
            board.appendChild(square.squareDiv);
            this.spaces.push(null);
        };
    }
}

var board = new Board();
board.init();
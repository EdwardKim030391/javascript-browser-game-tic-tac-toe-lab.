/*-------------------------------- Constants --------------------------------*/
//select all squares, message, reset button
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetEl = document.getElementById('reset')


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //columns
    [0, 4, 8],
    [2, 4, 6], //diagonals
]


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;


/*------------------------ Cached Element References ------------------------*/


/*-------------------------------- Functions --------------------------------*/
//init the game state
function init() {
    board = Array(9).fill(''); //create board 9 empty strings
    turn = 'X'; //set starting player as 'X'
    winner = false; //no winner at the start
    tie = false; // no tie at the start
    render(); // update the UI
}

//update board array
function updateBoard() {
    squareEls.forEach((square, index) => {
        square.textContent = board[index];
    });
}

//update message display
function updateMessage() {
    if (!winner && !tie) {
      if (turn === 'X') {
        messageEl.textContent = "It's X's turn";
      } else {
        messageEl.textContent = "It's O's turn";
      }
    } else if (!winner && tie) {
      messageEl.textContent = 'Tie game!';
    } else {
      if (turn === 'X') {
        messageEl.textContent = 'X wins!';
      } else {
        messageEl.textContent = 'O wins!';
      }
    }
  };

//handle the click event
function handleClick(event) {
    const squareIndex = parseInt(event.target.id); //get index click
    if (board[squareIndex] !== '' || winner || tie) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

//place the player piece('X', 'O')
function placePiece(index) {
    board[index] = turn; //update the board array
    console.log(board);
}

//check if player win
function checkForWinner() {
    for (let combo of winningCombos) { //loop through all winning combo
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true; //set winner to win combo found
            return;
        }
    }
}

//check if game tie
function checkForTie() {
    if (winner) return;
    if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
   }
}

//switch palyer turn form 'X' to 'O' to 'X'
function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
}

//render the update board and message
function render(){
    updateBoard(); //update board
    updateMessage(); //update message
}




/*----------------------------- Event Listeners -----------------------------*/
//add event listeners to all square for handling click
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

//add event listeners to reset button
resetEl.addEventListener('click', init);

//start the game
init();

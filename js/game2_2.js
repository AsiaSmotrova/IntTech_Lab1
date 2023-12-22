let origBoard;
const huPlayer = '0';
const huPlayer2 = 'X';
let turnHu = true;
const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('.cell');
startGame();


function startGame(){
    document.querySelector(".endGame").style.display = "none"
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);
    for(let i = 0; i<cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background_color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(e){
    
    if(typeof origBoard[e.target.id] == 'number'){
        if(turnHu){
            turn(e.target.id, huPlayer);
            turnHu =  false;
        }else if(!turnHu){
            turn(e.target.id, huPlayer2);
            turnHu =  true;
        }
    }
    
}

function turn(eId, player){

    origBoard[eId] = player;
    document.getElementById(eId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    
    if (gameWon || checkTie()) {gameOver(gameWon)}
}

function checkWin(board, player){
    let plays = board.reduce((a, e, i) => 
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of winCombo.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player}
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    
    for (let index of winCombo[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer ? "#5befd9" : "red";

    }
    for (let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);

    }
    declareWinner(gameWon.player == huPlayer ? "0 WIN!" : "X WIN!")
}

function declareWinner(who){
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}


function checkTie(){
    let gameWon = checkWin(origBoard, huPlayer2);
    let gameWonHu = checkWin(origBoard, huPlayer);
    if (!gameWon && !gameWonHu){
    if(emptySquares().length == 0){
       
    for(let i= 0; i< cells.length; i++){
        cells[i].style.backgroundColor = "#a2f194";
        cells[i].removeEventListener('click', turnClick, false);
    }
        declareWinner("Tie Game!");
        return true;
    }}
    return false;
}
checkWin(origBoard, huPlayer);
    checkWin(origBoard, huPlayer2);





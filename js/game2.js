let origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
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
        
        turn(e.target.id, huPlayer);
        if (!checkTie()) turn( bestSpot(), aiPlayer); 
        
    }
    
}

function turn(eId, player){

    origBoard[eId] = player;
    
    document.getElementById(eId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    
   
    if (gameWon) {gameOver(gameWon)}
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
    declareWinner(gameWon.player == huPlayer ? "You Win!" : "You lose!")
}

function declareWinner(who){
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return minimax(origBoard, aiPlayer).index;

}

function checkTie(){
    let gameWon = checkWin(origBoard, aiPlayer);
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
checkWin(origBoard, aiPlayer);

function minimax(newBoard, player){
    let availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, player)){
        return {score: -10};
    }   else if (checkWin(newBoard, aiPlayer)){
        return {score:20};
    }   else if (availSpots.length === 0){
        return {score: 0};
    }
    let moves = [];

    for(let i = 0; i < availSpots.length; i++){
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if(player == aiPlayer){
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;

        }else{
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }
    let bestMove;
    if(player === aiPlayer){
        let bestScore = -10000;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
       
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
    }
const gamesBoardCont = document.querySelector('#gameboard-cont');

const optionCont = document.querySelector('.option-cont');
const flipBtn = document.querySelector('#flip-btn');
const startBtn = document.querySelector('#start-btn');
const infoDisp = document.querySelector('#info');
const turnDisp = document.querySelector('#turn-display');

let angle = 0;

function flip(){
const optionShips = Array.from(optionCont.children);

angle = angle === 0 ? 90 : 0
optionShips.forEach(optionShip => optionShip.style.transform=`rotate(${angle}deg)`);
};

flipBtn.addEventListener('click', flip);
//Creating boards

const width = 10;


function createBoard(color,user ){
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoard.style.backgroundColor = color;
    gameBoard.id = user;

    for (let i = 0; i < width * width; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoard.append(block);
    }
    gamesBoardCont.append(gameBoard);
}

createBoard('#E499B9', 'player');
createBoard('#FFE27F','computer');

//Creating Ships

class Ship{
    constructor(name, length){
        this.name = name;
        this.length = length;
    }
}

const destroyer = new Ship('destroyer', 1);
const destroyer1 = new Ship('destroyer1', 1);
const destroyer2 = new Ship('destroyer2', 1);
const destroyer3 = new Ship('destroyer3', 1);
const destroyer4 = new Ship('destroyer4', 1);

const submarine = new Ship('submarine', 3);
const submarine1 = new Ship('submarine1', 3);
const cruiser = new Ship('cruiser', 3);

const battleship = new Ship('battleship', 4);
const battleship1 = new Ship('battleship1', 4);

const carrier = new Ship('carrier', 5);

const ships = [destroyer,destroyer1,destroyer2,destroyer3,destroyer4, submarine, submarine1, cruiser, battleship,battleship1, carrier];
let notDropped

function getValidity(allBoardBlocks, isHorizontal, startIndex, ship){
    let validStart = isHorizontal ? startIndex <= width * width - ship.length ? startIndex :
    width * width - ship.length : 
    startIndex <= width * width - width * ship.length ? startIndex : 
    startIndex - ship.length * width + width

    let shipBlocks = [];

for (let i = 0; i < ship.length; i++){
    if (isHorizontal){
        shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    }else{
        shipBlocks.push(allBoardBlocks[Number(validStart) + i * width ]);
    }
}

let valid;

if(isHorizontal){
shipBlocks.every((_shipBlock, index) => 
valid = shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1)) )
} else {
    shipBlocks.every((_shipBlock, index) => 
    valid = shipBlocks[0].id < 90 + (width * index + 1) )
}

const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));


return {shipBlocks, valid, notTaken}
}


function addShipPiece(user, ship, startId){
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);
    let randomBoolean = Math.random() < 0.5;
    let isHorizontal = user === 'player' ? angle === 0 : randomBoolean;
    let randomStartIndex = Math.floor(Math.random() * width * width);
    
    let startIndex = startId ? startId : randomStartIndex;
    
    const {shipBlocks, valid, notTaken}  = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

if(valid && notTaken){
    shipBlocks.forEach(shipBlock => {
        shipBlock.classList.add(ship.name);
        shipBlock.classList.add('taken')
    })
    
}else {
    if(user ==='computer') addShipPiece('computer',ship);
    if(user === 'player') notDropped = true;
}


}

ships.forEach(ship => addShipPiece('computer', ship));



//Drag player ships
let draggedShip
const optionShips = Array.from(optionCont.children);
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

const allPlayerBlocks = document.querySelectorAll('#player div')
allPlayerBlocks.forEach(PlayerBlock => {
    PlayerBlock.addEventListener('dragover', dragOver);
    PlayerBlock.addEventListener('drop', dropShip);
})
function dragStart(e){
    notDropped = false;
    draggedShip = e.target;
}

function dragOver(e){
    e.preventDefault();
    const ship = ships[draggedShip.id]
    highlightArea(e.target.id, ship)
}

function dropShip(e){
    const startId = e.target.id;
    const ship = ships[draggedShip.id];
    addShipPiece('player',ship, startId);
    if(!notDropped){
        draggedShip.remove();
    }
}


//add hidhlight
function highlightArea(startIndex, ship){
    const allBoardBlocks = document.querySelectorAll('#player div');
    let isHorizontal = angle === 0;


    const {shipBlocks, valid, notTaken} = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

    if(valid && notTaken){
        shipBlocks.forEach(shipBlock =>{
            shipBlock.classList.add('hover')
            setTimeout(() => shipBlock.classList.remove('hover'), 200)
        })
    }
}


let gameOver = false;
let playerTurn 


//Start of the game
function startGame(){

    if(playerTurn === undefined){
        if(optionCont.children.length != 0){
            infoDisp.textContent = 'Please put all your ships to the board!';
        }else{
            const allBoardBlocks = document.querySelectorAll('#computer div');
                allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
                playerTurn = true;
        turnDisp.textContent = 'You go!'
        infoDisp.textContent = 'The game has started'
        }
        
    }
   
}

startBtn.addEventListener('click', startGame);

let playerHit = []
let compHit = []
const playerSunkShips = []
const computerSunkShips = []

function handleClick(e){
    if(!gameOver){
        if(e.target.classList.contains('taken')){
            e.target.classList.add('boom')
            infoDisp.textContent = 'You hit the comp ship!'
            let classes = Array.from(e.target.classList)
            classes = classes.filter(className => className !== 'block')
            classes = classes.filter(className => className !== 'boom')
            classes = classes.filter(className => className !== 'taken')
            playerHit.push(...classes)
            checkScore('player', playerHit, playerSunkShips)
        }
        if(!e.target.classList.contains('taken')){
            infoDisp.textContent = 'Nothing was hit this time.'
            e.target.classList.add('empty')
        }
        playerTurn = false;

        const allBoardBlocks = document.querySelectorAll('#computer div')
        allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
        setTimeout(computerGo, 3000)

    }
}

//Comp go
function computerGo(){
if(!gameOver){
    turnDisp.textContent = 'Computer'
    infoDisp.textContent = 'Computer is choosing ...'

    setTimeout(() => 
    {
        let randomGo = Math.floor(Math.random() * width * width)
        const allBoardBlocks = document.querySelectorAll('#player div')


        if(allBoardBlocks[randomGo].classList.contains('taken') && allBoardBlocks[randomGo].classList.contains('boom')){
            computerGo()
            return
        }else if(allBoardBlocks[randomGo].classList.contains('taken') && !allBoardBlocks[randomGo].classList.contains('boom'))
        {
            allBoardBlocks[randomGo].classList.add('boom')
            infoDisp.textContent = 'The computer hit your ship!'
            let classes = Array.from(allBoardBlocks[randomGo].classList)
            classes = classes.filter(className => className !== 'block')
            classes = classes.filter(className => className !== 'boom')
            classes = classes.filter(className => className !== 'taken')
            compHit.push(...classes)
            checkScore('computer', compHit, computerSunkShips)
        } else{
            infoDisp.textContent = 'Nothing was hit this time!'
            allBoardBlocks[randomGo].classList.add('empty')
        }
    }, 3000)

    setTimeout(() => {
        playerTurn = true;
        turnDisp.textContent = 'Player'
        infoDisp.textContent = 'Take your go'
        const allBoardBlocks = document.querySelectorAll('#computer div')
        allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
    }, 6000)
}
}



function checkScore(user, userHits, userSunkShips){
    function checkShip(shipName, shipLength){
        if(userHits.filter(scoredShipName => scoredShipName === shipName).length === shipLength){
            
            if(user === 'player'){
                infoDisp.textContent = `You sunk the computers's ${shipName}`
                playerHit = userHits.filter(scoredShipName => scoredShipName !== shipName)
            }
            if(user === 'computer'){
                infoDisp.textContent = `Computer sunk your ${shipName}`
                compHit = userHits.filter(scoredShipName => scoredShipName !== shipName)
            }
            userSunkShips.push(shipName);


        }
    }
    checkShip('destroyer', 1);
    checkShip('destroyer1', 1);
    checkShip('destroyer2', 1);
    checkShip('destroyer3', 1);
    checkShip('destroyer4', 1);

    checkShip('submarine', 3);
    checkShip('submarine1', 3);
    checkShip('cruiser', 3);

    checkShip('battleship', 4);
    checkShip('battleship1', 4);

    checkShip('carrier', 5);

    console.log('playerHits', playerHit)
    console.log('playerSunkShips', playerSunkShips)


        if(playerSunkShips.length === 11){
            infoDisp.textContent = 'You sunk all ships!'
            gameOver = true;

        }
        if(computerSunkShips.length === 11){
            infoDisp.textContent = 'Computer win!'
            gameOver = true;

        }
}




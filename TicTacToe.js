const cells =document.querySelectorAll(".cell");
const statusText =document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winCons=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];
 
let options=["","","","","","","","",""] ;
let currentPlayer ="X";
let running =false;

initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked))
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent=`It is ${currentPlayer}'s turn`;
    running=true;
}

function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex]!=""||!running){
        return;
    }
    updateCell(this,cellIndex);
    swapPlayer();
    checkWinner();

}

function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;

}

function swapPlayer(){
    currentPlayer=(currentPlayer=="X")?"O":"X";
    statusText.textContent=`It is ${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon=false;
    for (let i=0;i<winCons.length;i++){
        const condition=winCons[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];
        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break;
        }
    }
    if(roundWon==true){
        swapPlayer();
        statusText.textContent=`${currentPlayer} won!!!`
        running=false;
    }
    else if (!options.includes("")){
        statusText.textContent=`It's a draw`;
        running =false;
    }
}

function restartGame(){
    options=["","","","","","","","",""] ;
    cells.forEach(cell =>cell .textContent="");
    initializeGame()
}

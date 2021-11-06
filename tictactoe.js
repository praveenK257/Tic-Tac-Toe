const playButton = document.getElementById("play");
const resetButton = document.getElementById("reset");
const turn = document.getElementById("turn-disp");

const player1Role = document.getElementById('Player1-role');
const player2Role = document.getElementById('Player2-role');
const boxes = document.querySelectorAll('.box');
boxes.forEach(function(box){
    box.innerHTML = ' ';
});

player1Role.innerHTML = player2Role.innerHTML = "O";

let currPlayer = 'X',movesDone = 0;
let randomize = Math.floor((Math.random())*100 +1); 

turn.innerHTML = (randomize%2==0)?"PLAYER2":"PLAYER1";
if(turn.innerHTML=="PLAYER2"){
    player2Role.innerHTML = 'X'; 
} 
else{
    player1Role.innerHTML = 'X';
}

function changePlayer(){
    turn.innerHTML = (turn.innerHTML=="PLAYER2")?"PLAYER1":"PLAYER2";
    ++movesDone;
}

function checkVictory(){
    let victoryPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; 
    
    for(var i=0; i<victoryPositions.length ; i++){
        var position = victoryPositions[i];
        if(boxes[position[0]].innerHTML==currPlayer && boxes[position[1]].innerHTML==currPlayer && boxes[position[2]].innerHTML==currPlayer){
            return true;    
        }
    }
    return false;
}

function play(){ 
    boxes.forEach(function(box){
        box.addEventListener("click",function(){
            if(box.innerHTML==' '){
                box.innerHTML = currPlayer;
                var won = checkVictory();
                if(won){ 
                    alert("Player "+currPlayer+" (" + turn.innerHTML + " ) has won!!");
                    resetButton.click();
                }
                changePlayer();
                if(!won && movesDone>7){
                    alert("Draw!!");
                    resetButton.click();
                }
                currPlayer = (currPlayer=='X')?'O':'X';
            }
            else{
                alert("Invalid move!!");
            }
        });
    });    
}

playButton.addEventListener("click", function(){
    alert("Ready to play!!");
    play();    
});

resetButton.addEventListener("click",function(){ 
    location.reload();
});

/* Superposition plays fair, with the opponent generating a random choice out of the three. 
Collapsing the wave-function when you initiate your choice. This is the default mode until 
the player generates enough entanglement points. */

/* Entanglement points are spent on the entanglement ability, this ability will enable you 
to split the opponent's wave-function and entangle their response with yours, thus showing 
you their choice before you make one. */

let roundsPlayed = 0;
let scorePlayer = 0;
let scoreComputer = 0;
let playerSelection = "";
let computerSelection = "";
let announceResults = ``;

const rockChoice = document.getElementById("rock");
const paperChoice = document.getElementById("paper");
const scissorsChoice = document.getElementById("scissors");
const choices = [rockChoice, paperChoice, scissorsChoice];
const confirmChoice = document.getElementById("submit");
const resultBox = document.getElementById("results");

let pointCount = 0;

 const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf; 




let h = 217 //134 - 134 * (Math.sqrt(3)/2); //The triangle's height 




function triangle () {
    ctx.fillStyle = "hsl(128, 36%, 62%)";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(125, 223);
    ctx.lineTo(375, 223);
    ctx.lineTo(250, 6);
    ctx.closePath();
    
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 6);
    ctx.lineTo(250, 223/3*2);
    ctx.lineTo(125, 223);
    ctx.lineTo(375, 223);
    ctx.closePath();
    
    ctx.fill()

    
    ctx.beginPath();
    ctx.moveTo(250, 6);
    ctx.lineTo(250, 223/3*2);
    ctx.lineTo(125, 223);
    ctx.fillStyle = "hsl(229, 36%, 62%)";
    ctx.closePath();
    ctx.fill();
    ctx.stroke

    ctx.beginPath();
    ctx.moveTo(250, 6);
    ctx.lineTo(250, 223/3*2);
    ctx.lineTo(375, 223);
    ctx.fillStyle = "hsl(357, 36%, 62%)";
    ctx.closePath();
    ctx.fill();
}



function draw() {
    


    triangle();




    
    //window.requestAnimationFrame(draw);
}

let redArea = {
    x: 250,
    y: 223/3*2,
    vy: 15,
    vx: 15,
draw() {
    
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(250, 6);
    ctx.lineTo(375, 223);
    ctx.fillStyle = "hsl(357, 36%, 62%)";
    ctx.closePath();
    ctx.fill();

}
}

 
function paperRed () {
   

    redArea.draw();
    redArea.y += 5.6;
    redArea.x -= 9.4;
    if (redArea.y > 223 && redArea.x < 125) {
        redArea.x = 125;
        redArea.y = 223;
    } 
    window.requestAnimationFrame(paperRed);
}

let greenArea = {
    x: 250,
    y: 223/3*2,
    vy: 15,
draw() {
    
    ctx.beginPath();
    ctx.moveTo(250, this.y);
    ctx.lineTo(375, 223);
    ctx.lineTo(125, 223);
    ctx.fillStyle = "hsl(128, 36%, 62%)";
    ctx.closePath();
    ctx.fill();

}
}


function scissorsGreen () {
   

greenArea.draw();
greenArea.y -= greenArea.vy;
if (greenArea.y < 6) {
    greenArea.vy = 0;
    greenArea.y = 6;
}

window.requestAnimationFrame(scissorsGreen);
}

    window.requestAnimationFrame(draw);
 


// Generate the opponent's choice. 
function getComputerChoice () {
let randChoice = Math.floor(Math.random() * 3) + 1;
switch (randChoice) {
    case 1: 
        return "rock";
    case 2: 
        return "paper";
    case 3:
        return "scissors";
}
}

rockChoice.addEventListener("click", () => {
playerSelection = "rock";
rockChoice.classList.add("clicked");
paperChoice.classList.remove("clicked");
scissorsChoice.classList.remove("clicked");
confirmChoice.style.pointerEvents = "all";
});
paperChoice.addEventListener("click", () => {

paperRed();


playerSelection = "paper";
rockChoice.classList.remove("clicked");
paperChoice.classList.add("clicked");
scissorsChoice.classList.remove("clicked");
confirmChoice.style.pointerEvents = "all";
});
scissorsChoice.addEventListener("click", () => {


scissorsGreen();


playerSelection = "scissors";
rockChoice.classList.remove("clicked");
paperChoice.classList.remove("clicked");
scissorsChoice.classList.add("clicked");
confirmChoice.style.pointerEvents = "all";
});
confirmChoice.addEventListener("click", () => {
computerSelection = getComputerChoice();
playRound(playerSelection, computerSelection);
});

function playRound (playerSelection, computerSelection) {
    
  if (playerSelection == "rock" && computerSelection == "rock") {
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "rock" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "rock" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        pointCount++;
        scoreComputer++;
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }

    else if (playerSelection == "paper" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "rock") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        scoreComputer++;
        pointCount++;
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        displayScore();

        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "rock") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        pointCount++;
        scoreComputer++;
        displayScore();
        checkEnd();
        checkEntang();
        return;
    }   
}  

function checkEntang () {
    if (pointCount == 2) {
        if (playerSelection == "rock") {
            computerSelection = "scissors";
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0;
        }
        else if (playerSelection == "paper") {
            computerSelection = "rock";
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0;
        }
        else if (playerSelection == "scissors") {
            computerSelection = "paper"
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0; 
        }
    }
}

function displayScore () {
    resultBox.innerHTML = scorePlayer + " / " + scoreComputer;
}

function checkEnd () {
    if (roundsPlayed == 10) {
        announceResults += `Your score is ${scorePlayer}. The computer's score is ${scoreComputer}.`;
    
        if (scoreComputer > scorePlayer) {
            announceResults += `- 
            ${"This means the computer won"}`;
            resultBox.innerHTML = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        else if (scoreComputer < scorePlayer) {
            announceResults += `-
            ${"This means you won"}`;
            resultBox.innerHTML = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        else if (scoreComputer == scorePlayer) {
            announceResults += `-
            ${"This means it was a draw"}`;
            resultBox.innerHTML = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        return;
    }   
}
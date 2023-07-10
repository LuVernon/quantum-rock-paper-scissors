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

const rockChoice = document.getElementById("rock");
const paperChoice = document.getElementById("paper");
const scissorsChoice = document.getElementById("scissors");
const choices = [rockChoice, paperChoice, scissorsChoice];

const confirmChoice = document.getElementById("submit");

const resultBox = document.getElementById("results");

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
let raf; 

ctx1.fillStyle = "blue";
ctx1.strokeStyle = "white";
ctx1.lineWidth = 5;

ctx1.beginPath()
ctx1.moveTo(50, 0);
ctx1.lineTo(-75, 217);
ctx1.lineTo(175, 217);
ctx1.closePath();
ctx1.fill();
ctx1.stroke();



let h = 217 //134 - 134 * (Math.sqrt(3)/2); //The triangle's height 
console.log(h);

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

const ball = {
    x: 178+12.5,
    y: 108.5+12.5,
    vx: 7, 
    vy: 6.75,
    radius: 12.5, 
    color: "yellow",
    draw() {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
    },

};

ctx2.fillStyle = "blue";
ctx2.strokeStyle = "white";
ctx2.lineWidth = 5;

function triangle () {
    ctx2.fillStyle = "blue";
    ctx2.strokeStyle = "white";

    ctx2.beginPath();
    ctx2.moveTo(125, 134);
    ctx2.lineTo(375, 134);
    ctx2.lineTo(250, -83);
    ctx2.closePath();
    ctx2.fill();
    ctx2.stroke();
}

function draw() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    triangle();
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y + ball.vy + 12.5 > canvas2.height || ball.y + ball.vy - 12.5 < 26) {
        ball.vy = -ball.vy;
    }
    else if (ball.x + ball.vx + 12.5 > 322 || ball.x + ball.vx - 12.5 < 178) {
        ball.vx = -ball.vx; 
    }
    raf = window.requestAnimationFrame(draw);
}

raf = window.requestAnimationFrame(draw);
    

let announceResults = ``;

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
playerSelection = "paper";
rockChoice.classList.remove("clicked");
paperChoice.classList.add("clicked");
scissorsChoice.classList.remove("clicked");
confirmChoice.style.pointerEvents = "all";
});
scissorsChoice.addEventListener("click", () => {
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
        checkEnd();
        return;
    }
    else if (playerSelection == "rock" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        checkEnd();
    return;
    }
    else if (playerSelection == "rock" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        
        scoreComputer++;
        checkEnd();
        return;
    }

    else if (playerSelection == "paper" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        checkEnd();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "rock") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        checkEnd();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        scoreComputer++;
        checkEnd();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "scissors") {
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        checkEnd();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "paper") {
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        checkEnd();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "rock") {
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        scoreComputer++;
        checkEnd();
        return;
    }   
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
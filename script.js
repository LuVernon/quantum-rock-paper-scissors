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

function triangle () {
    ctx.fillStyle = "hsl(128, 36%, 62%)";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(125, 223);
    ctx.lineTo(375, 223);
    ctx.lineTo(250, 6);
    ctx.closePath();
    //ctx.stroke();

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

let blueArea = {
    x: 250,
    y: 223/3*2,
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(250, 6);
        ctx.lineTo(125, 223);
        ctx.fillStyle = "hsl(229, 36%, 62%)";
        ctx.closePath();
        ctx.fill();
    }
}

let redArea = {
    x: 250,
    y: 223/3*2,
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

let greenArea = {
    x: 250,
    y: 223/3*2,
    vy: 10.5,
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

function rockBlue () {
    blueArea.draw();
    blueArea.y += 5.6;
    blueArea.x += 9.4;
    if (blueArea.y > 223 && blueArea.x > 375) {
        blueArea.x = 375;
        blueArea.y = 223;
        blueArea.draw();
        return;
    } 
    console.log("hi");

    window.requestAnimationFrame(rockBlue);  
}

function rockBlueReverse () {
    triangle();
    blueArea.draw();
    blueArea.y -= 5.6;
    blueArea.x -= 9.4;
    if (blueArea.y < 223/3*2 && blueArea.x < 250) {
        triangle();
        blueArea.x = 250;
        blueArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(rockBlueReverse);  
}

function paperRed () {
    redArea.draw();
    redArea.y += 5.6;
    redArea.x -= 9.4;
    if (redArea.y > 223 && redArea.x < 125) {
        redArea.x = 125;
        redArea.y = 223;
        redArea.draw();
        return;
    } 
    console.log("hi");
    window.requestAnimationFrame(paperRed);
}

function paperRedReverse () {
    triangle();
    redArea.draw();
    redArea.y -= 5.6;
    redArea.x += 9.4;
    if (redArea.y < 223/3*2 && redArea.x > 250) {
        triangle();
        redArea.x = 250;
        redArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(paperRedReverse);  
}

function scissorsGreen () {
    greenArea.draw();
    greenArea.y -= greenArea.vy;
    if (greenArea.y < 6) {
        greenArea.y = 6;
        greenArea.draw();
        return;
    }
    console.log("hi");
    window.requestAnimationFrame(scissorsGreen);
}

function scissorsGreenReverse () {
    triangle();
    greenArea.draw();
    greenArea.y += greenArea.vy;
    if (greenArea.y > 223/3*2) {
        triangle();
        greenArea.x = 250;
        greenArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(scissorsGreenReverse);  
}

triangle();
 
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
    if (playerSelection == "paper") {
        paperRedReverse();
        setTimeout(rockBlue, 400);
        paperChoice.classList.toggle("clicked");
        playerSelection = "rock";
        rockChoice.classList.add("clicked");
    }
    else if (playerSelection == "scissors") {
        scissorsGreenReverse();
        setTimeout(rockBlue, 400);
        scissorsChoice.classList.toggle("clicked");
        playerSelection = "rock";
        rockChoice.classList.add("clicked");

    }
    else if (playerSelection == "rock") { 
        rockBlueReverse();
        playerSelection = "";
        rockChoice.classList.toggle("clicked");
    }
    else {
        rockBlue();
        playerSelection = "rock";
        rockChoice.classList.toggle("clicked");
        paperChoice.classList.remove("clicked");
        scissorsChoice.classList.remove("clicked");
        confirmChoice.style.pointerEvents = "all";
    }
});

paperChoice.addEventListener("click", () => {
    if (playerSelection == "rock") {
        rockBlueReverse();
        setTimeout(paperRed, 400);
        rockChoice.classList.toggle("clicked");
        playerSelection = "paper";
        paperChoice.classList.add("clicked");
    }
    else if (playerSelection == "scissors") {
        scissorsGreenReverse();
        setTimeout(paperRed, 400);
        scissorsChoice.classList.toggle("clicked");
        playerSelection = "paper";
        paperChoice.classList.add("clicked");

    }
    else if (playerSelection == "paper") {
        paperRedReverse();
        playerSelection = "";
    }
    else {
    paperRed();
        
    playerSelection = "paper";
    rockChoice.classList.remove("clicked");
    paperChoice.classList.toggle("clicked");
    scissorsChoice.classList.remove("clicked");
    confirmChoice.style.pointerEvents = "all";

    }

});

scissorsChoice.addEventListener("click", () => {
    if (playerSelection == "rock") {
        rockBlueReverse();
        setTimeout(scissorsGreen, 400);
        rockChoice.classList.toggle("clicked");
        playerSelection = "scissors";
        scissorsChoice.classList.add("clicked");
    }
    else if (playerSelection == "paper") {
        paperRedReverse();
        setTimeout(scissorsGreen, 400);
        paperChoice.classList.toggle("clicked");
        playerSelection = "scissors";
        scissorsChoice.classList.add("clicked");

    }
    else if (playerSelection == "scissors") {
        scissorsGreenReverse();
        playerSelection = "";
    }
    else {
        scissorsGreen();
    playerSelection = "scissors";
    rockChoice.classList.remove("clicked");
    paperChoice.classList.remove("clicked");
    scissorsChoice.classList.toggle("clicked");
    confirmChoice.style.pointerEvents = "all";
    }
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
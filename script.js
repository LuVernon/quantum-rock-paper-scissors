/* Superposition plays fair, with the opponent generating a random choice out of the three. 
Collapsing the wave-function when you initiate your choice. This is the default mode until 
the player generates enough entanglement points. */

/* Entanglement will automatically proc after 2 losses in a row. This is a guaranteed round
win for the player. */



let roundsPlayed = 0;
let pointCount = 0;
let scorePlayer = 0;
let scoreComputer = 0;
let playerSelection = "";
let computerSelection = "";
let compRecord = [];
let announceResults = ``;

const rockChoice = document.getElementById("rock");
const paperChoice = document.getElementById("paper");
const scissorsChoice = document.getElementById("scissors");
const choices = [rockChoice, paperChoice, scissorsChoice];
const confirmChoice = document.getElementById("submit");
const resultBox = document.getElementById("results");
let buttonMenu = document.querySelector("#top");


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const compCanvas = document.getElementById("computerCanvas");
const compCtx = compCanvas.getContext("2d");

function compTriangle () {
    compCtx.fillStyle = "hsl(128, 70%, 62%)";
    compCtx.strokeStyle = "white";
    compCtx.lineWidth = 6;

    compCtx.clearRect(0, 0, compCanvas.width, compCanvas.height);

    compCtx.beginPath();
    compCtx.moveTo(125, 223);
    compCtx.lineTo(375, 223);
    compCtx.lineTo(250, 6);
    compCtx.closePath();
    compCtx.stroke();

    compCtx.beginPath();
    compCtx.moveTo(250, 6);
    compCtx.lineTo(250, 223/3*2);
    compCtx.lineTo(125, 223);
    compCtx.lineTo(375, 223);
    compCtx.closePath();
    compCtx.fill()

    compCtx.beginPath();
    compCtx.moveTo(250, 6);
    compCtx.lineTo(250, 223/3*2);
    compCtx.lineTo(125, 223);
    compCtx.fillStyle = "hsl(229, 70%, 62%)";
    compCtx.closePath();
    compCtx.fill();
    compCtx.stroke

    compCtx.beginPath();
    compCtx.moveTo(250, 6);
    compCtx.lineTo(250, 223/3*2);
    compCtx.lineTo(375, 223);
    compCtx.fillStyle = "hsl(357, 70%, 62%)";
    compCtx.closePath();
    compCtx.fill();
}

// Draws out the computer's choice triangle 
compTriangle();

function triangle () {
    ctx.fillStyle = "hsl(128, 70%, 62%)";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    ctx.fillStyle = "hsl(229, 70%, 62%)";
    ctx.closePath();
    ctx.fill();
    ctx.stroke

    ctx.beginPath();
    ctx.moveTo(250, 6);
    ctx.lineTo(250, 223/3*2);
    ctx.lineTo(375, 223);
    ctx.fillStyle = "hsl(357, 70%, 62%)";
    ctx.closePath();
    ctx.fill();
    }
    

let compBlueArea = {
    x: 250,
    y: 223/3*2,
    draw() {
        compCtx.beginPath();
        compCtx.moveTo(this.x, this.y);
        compCtx.lineTo(250, 6);
        compCtx.lineTo(125, 223);
        compCtx.fillStyle = "hsl(229, 70%, 62%)";
        compCtx.closePath();
        compCtx.fill();
    }
}
 
let compRedArea = {
    x: 250,
    y: 223/3*2,
    draw() {
        compCtx.beginPath();
        compCtx.moveTo(this.x, this.y);
        compCtx.lineTo(250, 6);
        compCtx.lineTo(375, 223);
        compCtx.fillStyle = "hsl(357, 70%, 62%)";
        compCtx.closePath();
        compCtx.fill();
    }
}
 
let compGreenArea = {
    x: 250,
    y: 223/3*2,
    vy: 10.5,
    draw() {
        compCtx.beginPath();
        compCtx.moveTo(250, this.y);
        compCtx.lineTo(375, 223);
        compCtx.lineTo(125, 223);
        compCtx.fillStyle = "hsl(128, 70%, 62%)";
        compCtx.closePath();
        compCtx.fill();
    }
}

let blueArea = {
    x: 250,
    y: 223/3*2,
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(250, 6);
        ctx.lineTo(125, 223);
        ctx.fillStyle = "hsl(229, 70%, 62%)";
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
        ctx.fillStyle = "hsl(357, 70%, 62%)";
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
        ctx.fillStyle = "hsl(128, 70%, 62%)";
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

function compRockBlue () {
    compBlueArea.draw();
    compBlueArea.y += 5.6;
    compBlueArea.x += 9.4;
    if (compBlueArea.y > 223 && compBlueArea.x > 375) {
        compBlueArea.x = 375;
        compBlueArea.y = 223;
        compBlueArea.draw();
        return;
    } 
    console.log("hi");

    window.requestAnimationFrame(compRockBlue);  
}

function compRockBlueReverse () {
    compTriangle();
    compBlueArea.draw();
    compBlueArea.y -= 5.6;
    compBlueArea.x -= 9.4;
    if (compBlueArea.y < 223/3*2 && compBlueArea.x < 250) {
        compTriangle();
        compBlueArea.x = 250;
        compBlueArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(compRockBlueReverse);  
}

function compPaperRed () {
    compRedArea.draw();
    compRedArea.y += 5.6;
    compRedArea.x -= 9.4;
    if (compRedArea.y > 223 && compRedArea.x < 125) {
        compRedArea.x = 125;
        compRedArea.y = 223;
        compRedArea.draw();
        return;
    } 
    console.log("hi");
    window.requestAnimationFrame(compPaperRed);
}

function compPaperRedReverse () {
    compTriangle();
    compRedArea.draw();
    compRedArea.y -= 5.6;
    compRedArea.x += 9.4;
    if (compRedArea.y < 223/3*2 && compRedArea.x > 250) {
        compTriangle();
        compRedArea.x = 250;
        compRedArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(compPaperRedReverse);  
}

function compScissorsGreen () {
    compGreenArea.draw();
    compGreenArea.y -= compGreenArea.vy;
    if (compGreenArea.y < 6) {
        compGreenArea.y = 6;
        compGreenArea.draw();
        return;
    }
    console.log("hi");
    window.requestAnimationFrame(compScissorsGreen);
}

function compScissorsGreenReverse () {
    compTriangle();
    compGreenArea.draw();
    compGreenArea.y += compGreenArea.vy;
    if (compGreenArea.y > 223/3*2) {
        compTriangle();
        compGreenArea.x = 250;
        compGreenArea.y = 223/3*2;
        return;
    } 
    window.requestAnimationFrame(compScissorsGreenReverse);  
}

triangle();
 
// Generate the opponent's choice. 
function getComputerChoice () {
let randChoice = Math.floor(Math.random() * 3) + 1;
switch (randChoice) {
    case 1: 
        compRecord.push("rock");
        return "rock";
    case 2: 
        compRecord.push("paper");
        return "paper";
    case 3:
        compRecord.push("scissors");
        return "scissors";
}
}

buttonMenu.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.id) {
        case "rock":
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
                
                //dont know why i have this below 
                confirmChoice.style.pointerEvents = "all";


                //consistant pattern for below should be: reverse, timeout, toggle, selection, classlist add 
            }
            break;
        case "paper": 
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
            
            paperChoice.classList.toggle("clicked");
            confirmChoice.style.pointerEvents = "all";
            }
            break;
        case "scissors":
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
            
            scissorsChoice.classList.toggle("clicked");
            confirmChoice.style.pointerEvents = "all";
            }
            break;
    }
});

confirmChoice.addEventListener("click", () => {
    confirmChoice.style.pointerEvents = "none";
    setTimeout(() => {confirmChoice.style.pointerEvents = "all"}, 1500);
    computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
});

function playRound (playerSelection, computerSelection) {
    if (playerSelection == "rock" && computerSelection == "scissors") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compScissorsGreen, 400);
        roundsPlayed++;
        scorePlayer++;
        displayScore();
        pointCount = 0;
        checkEnd();
        return;
    }
    else if (playerSelection == "rock" && computerSelection == "paper") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compPaperRed, 400);
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        pointCount++;
        scoreComputer++;
        displayScore();
        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "rock") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compRockBlue, 400);        
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        displayScore();
        pointCount = 0;
        checkEnd();
        return;
    }
    else if (playerSelection == "paper" && computerSelection == "scissors") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compScissorsGreen, 400);
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        scoreComputer++;
        pointCount++;
        displayScore();
        checkEnd();
        checkEntang();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "paper") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compPaperRed, 400);
        roundsPlayed++;
        console.log(`You've won round ${roundsPlayed}!`);
        scorePlayer++;
        displayScore();
        pointCount = 0;
        checkEnd();
        return;
    }
    else if (playerSelection == "scissors" && computerSelection == "rock") {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        setTimeout(compRockBlue, 400); 
        roundsPlayed++;
        console.log(`You've lost round ${roundsPlayed}!`);
        pointCount++;
        scoreComputer++;
        displayScore();
        checkEnd();
        checkEntang();
        return;
    }       
    else if (playerSelection == computerSelection) {
        switch (compRecord[compRecord.length-2]) {
            case "rock": 
                compRockBlueReverse();
                break;
            case "paper":
                compPaperRedReverse(); 
                break;
            case "scissors":
                compScissorsGreenReverse();
                break;
        }
        switch (playerSelection) {
            case "rock": 
            setTimeout(compRockBlue, 400); 
                break;
            case "paper": 
            setTimeout(compPaperRed, 400);
                break;
            case "scissors": 
            setTimeout(compScissorsGreen, 400);
                break;
        }
        roundsPlayed++;
        console.log(`You've tied round ${roundsPlayed}!`);
        displayScore();
        pointCount = 0;
        checkEnd();
        return;
    }
}  

function checkEntang () {
//dont really need to specify what computer selection needs to be set to 
//just give the round to the player and call the computer animation, no need 
//for a computerSelection assignment 

    if (pointCount == 2 && roundsPlayed != 10) {
        if (playerSelection == "rock") {
            computerSelection = "scissors";
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0;
            checkEnd();
        }
        else if (playerSelection == "paper") {
            computerSelection = "rock";
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0;
            checkEnd();
        }
        else if (playerSelection == "scissors") {
            computerSelection = "paper"
            roundsPlayed++;
            scorePlayer++;
            console.log(computerSelection, playerSelection, `You've won round ${roundsPlayed}!`);
            displayScore();
            pointCount = 0; 
            checkEnd();
        }
    }
}

function displayScore () {
    resultBox.textContent = scorePlayer + " / " + scoreComputer;
}

function checkEnd () {
    if (roundsPlayed == 10) {
        announceResults += `Your score is ${scorePlayer}. The computer's score is ${scoreComputer}. \r\n`;
    
        if (scoreComputer > scorePlayer) {
            announceResults += `- ${"This means the computer won"}`;
            resultBox.textContent = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        else if (scoreComputer < scorePlayer) {
            announceResults += `- ${"This means you won"}`;
            resultBox.textContent = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        else if (scoreComputer == scorePlayer) {
            announceResults += `- ${"This means it was a draw"}`;
            resultBox.textContent = announceResults;
            confirmChoice.style.pointerEvents = "none"
            choices.forEach((item)=>{item.style.pointerEvents = "none";
            item.classList.remove("clicked")});
        }
        return;
    }   
}
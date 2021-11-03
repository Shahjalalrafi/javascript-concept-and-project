'use strict';

let randomNumber = Math.trunc(Math.random() * 20) + 1
let score = 20
let highScore = 0
console.log(randomNumber, score)

function displayMessage(message) {
    document.querySelector(".message").textContent = message
}

document.querySelector(".check").addEventListener("click", function () {
    let guess = Number(document.querySelector(".guess").value)

    if (!guess) {
        displayMessage("please fill the input field")

    // win Match 
    } else if (guess === randomNumber) {
        document.querySelector(".number").textContent = randomNumber;
        displayMessage("You Win");
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector('.number').style.width = '30rem';

        if(score > highScore) {
            highScore = score
            document.querySelector(".highscore").textContent = highScore
        }
    
    // higher guessing Number
    } else if (guess !== randomNumber) {
        if(score > 1) {
            displayMessage(guess > randomNumber ? '📈 Too high!' : '📉 Too low!');
            score--
            document.querySelector(".score").textContent = score
        }else {
            // document.querySelector('.message').textContent = '💥 You lost the game!';
            displayMessage('💥 You lost the game!');
            document.querySelector('.score').textContent = 0;
          }
    }
      
})


document.querySelector(".again").addEventListener("click", function() {
    score = 20;
    randomNumber = Math.trunc(Math.random() * 20) + 1
    console.log(randomNumber, score)

    displayMessage("start Guessing...");
    document.querySelector(".number").textContent = "?"
    document.querySelector(".score").textContent = score;

    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector('.number').style.width = '15rem';
})
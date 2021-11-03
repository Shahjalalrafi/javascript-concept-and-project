'use strict';

let randomNumber = Math.trunc(Math.random() * 20) + 1
let score = 20
let highScore = 0
console.log(randomNumber, score)

document.querySelector(".check").addEventListener("click", function () {
    let guess = Number(document.querySelector(".guess").value)

    if (!guess) {
        document.querySelector(".message").textContent = "please fill the input field"

    // win Match 
    } else if (guess === randomNumber) {
        document.querySelector(".number").textContent = randomNumber;
        document.querySelector(".message").textContent = "You Win";
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector('.number').style.width = '30rem';

        if(score > highScore) {
            highScore = score
            document.querySelector(".highscore").textContent = highScore
        }
    
    // higher guessing Number
    } else if (guess > randomNumber) {
        document.querySelector(".message").textContent = "number is High"
        score--
        document.querySelector(".score").textContent = score

    // lower guessing Number
    } else if (guess < randomNumber) {
        document.querySelector(".message").textContent = "number is Low"
        score--
        document.querySelector(".score").textContent = score
    }else {
        // document.querySelector('.message').textContent = '💥 You lost the game!';
        document.querySelector(".message").textContent = '💥 You lost the game!'
        document.querySelector('.score').textContent = 0;
      }
})


document.querySelector(".again").addEventListener("click", function() {
    score = 20;
    randomNumber = Math.trunc(Math.random() * 20) + 1
    console.log(randomNumber, score)

    document.querySelector(".message").textContent = "start Guessing...";
    document.querySelector(".score").textContent = score;

    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector('.number').style.width = '15rem';
})
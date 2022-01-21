// Game values
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check for win
    if(guess === winningNumber){
        gameOver(true, `${winningNumber} is correct! Game Over. YOU WON!`);
        // // Disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set Message
        // setMessage(`${winningNumber} is correct! Game Over. YOU WON!`, 'green');
    }else{
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // lost

            gameOver(false, `The correct guess is ${winningNumber}, you lost!`);

            // // Disable input
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set Message
            // setMessage(`The correct guess is ${winningNumber}, you lost!`, 'red');
        }else{
            // continue

             // Change border color
             guessInput.style.borderColor = 'red';

             // Set Message
            setMessage(`${guess} is incorrect, ${guessesLeft} guesses left!`, 'red');
        }
    }
});

// Game Over
function gameOver(won, msg){
    let color;

    won === true ? color = 'green': color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Message
    setMessage(msg, color);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get random number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
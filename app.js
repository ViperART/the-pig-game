/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0],
    roundScore = 0,
    activePlayer = 0,
    counterFail = 0,
    winCondition = 100,
    gamePlaying;

function resetScores() {
    gamePlaying = true;
    roundScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    winCondition = 100;
    document.querySelector('#score-goal').innerHTML = `Current score goal: ${winCondition}`;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

resetScores();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;

        if (dice === 6 && dice1 === 6) {
            counterFail++;
        } else {
            counterFail = 0;
        }

        if (counterFail === 2) {
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).innerHTML = 0;
            counterFail = 0;
            changePlayer();
        }

        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        let diceDOM1 = document.querySelector('.dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = `dice-${dice1}.png`;
    
        if (dice !== 1 && dice1 !== 1) {
            roundScore += dice;
            roundScore += dice1;
            document.querySelector(`#current-${activePlayer}`).innerHTML = roundScore;
        } else {
            changePlayer();
        }
    }
});

document.querySelector(`.btn-hold`).addEventListener('click', () => {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer];
        counterFail = 0;
        if (scores[activePlayer] >= winCondition) {
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            gamePlaying = false;
        } else {
            changePlayer();
        }
    } 
});

document.querySelector('.btn-set').addEventListener('click', () => {
    let goalValue = +document.querySelector('input').value;
    if (gamePlaying) {
        if (typeof goalValue === 'number' && goalValue >= 10 && goalValue < 500) {
            winCondition = goalValue;
            document.querySelector('#score-goal').innerHTML = `Current score goal: ${winCondition}`;
            document.querySelector('input').value = '';
        }
    }
});


function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').innerHTML = 0;
        document.getElementById('current-1').innerHTML = 0;
        document.querySelector(`.player-0-panel`).classList.toggle('active');
        document.querySelector(`.player-1-panel`).classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', resetScores);






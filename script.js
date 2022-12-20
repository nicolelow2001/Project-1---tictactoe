const players = {
    player1: {
        image: "images/x.png"
    },
    player2: {
        image: "images/o.png"
    }
}

const tiles = document.querySelectorAll('.tile')

// PLAYER GUIDE PROMPT
const newH2 = document.createElement('h2')
newH2.textContent = "Player 1's Turn"
document.querySelector('.player-prompt').append(newH2)
const winnerPrompt = document.querySelector('.player-prompt')

let player1Score = 0
let player2Score = 0
let currentPlayer = players.player1

// MAIN GAME LOGIC
const runGame = function() {

    for (let tile of tiles) {
    
        tile.addEventListener('click', function() {
            if (!tile.classList.contains('clicked')) {
                tile.classList.add('clicked')
                const newImg = document.createElement('img')
        
                if (currentPlayer === players.player1) {
                    newImg.classList.add('x-piece')
                    newImg.src = currentPlayer.image
                    newImg.alt = 'X piece'
                    tile.setAttribute('data-piece', 'x')
                } else if (currentPlayer === players.player2) {
                    newImg.classList.add('o-piece')
                    newImg.src = currentPlayer.image
                    newImg.alt = 'O piece'
                    tile.setAttribute('data-piece', 'o')
                }
                tile.append(newImg)   
        
                // ALTERNATING BETWEEN PIECES
                if (currentPlayer === players.player1) {
                    currentPlayer = players.player2
                } else if (currentPlayer === players.player2) {
                    currentPlayer = players.player1
                }
        
                // PLAYER GUIDE PROMPT
                if (currentPlayer === players.player1) {
                    setTimeout(function() {
                        newH2.textContent = "Player 1's Turn"
                    }, 80)
        
                } else if (currentPlayer === players.player2) {
                    setTimeout(function() {
                        newH2.textContent = "Player 2's Turn"
                    }, 80)
                }

                // CHECK WINNING CONDITION
                const topLeft = document.querySelector('.top-left')
                const topMiddle = document.querySelector('.top-middle')
                const topRight = document.querySelector('.top-right')
                const middleLeft = document.querySelector('.middle-left')
                const middleMiddle = document.querySelector('.middle-middle')
                const middleRight = document.querySelector('.middle-right')
                const bottomLeft = document.querySelector('.bottom-left')
                const bottomMiddle = document.querySelector('.bottom-middle')
                const bottomRight = document.querySelector('.bottom-right')

                const scorePlayer1 = document.querySelector('.player1-score span')
                const scorePlayer2 = document.querySelector('.player2-score span')


                if ((topLeft.dataset.piece === "x" && topMiddle.dataset.piece === "x" && topRight.dataset.piece === "x")||             
                    (middleLeft.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && middleRight.dataset.piece === "x")||               
                    (bottomLeft.dataset.piece === "x" && bottomMiddle.dataset.piece === "x" && bottomRight.dataset.piece === "x")||                
                    (topLeft.dataset.piece === "x" && middleLeft.dataset.piece === "x" && bottomLeft.dataset.piece === "x")||                
                    (topMiddle.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomMiddle.dataset.piece === "x")||                   
                    (topRight.dataset.piece === "x" && middleRight.dataset.piece === "x" && bottomRight.dataset.piece === "x")||                
                    (topLeft.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomRight.dataset.piece === "x")||
                    (topRight.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomLeft.dataset.piece === "x")) {
                    setTimeout(function() {
                        newH2.textContent = "Player 1 Wins!"
                        player1Score += 1
                        scorePlayer1.textContent = player1Score
                        winnerPrompt.classList.add('winner')
                    }, 80)
                    for (let tile of tiles) {
                        tile.classList.add('clicked')
                    }
                    
                } else if ((topLeft.dataset.piece === "o" && topMiddle.dataset.piece === "o" && topRight.dataset.piece === "o")||
                            (middleLeft.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && middleRight.dataset.piece === "o")||
                            (bottomLeft.dataset.piece === "o" && bottomMiddle.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topLeft.dataset.piece === "o" && middleLeft.dataset.piece === "o" && bottomLeft.dataset.piece === "o")||
                            (topMiddle.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomMiddle.dataset.piece === "o")||
                            (topRight.dataset.piece === "o" && middleRight.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topLeft.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topRight.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomLeft.dataset.piece === "o")) {
                            
                            setTimeout(function() {
                                newH2.textContent = "Player 2 Wins!"
                                player2Score += 1
                                scorePlayer2.textContent = player2Score
                                winnerPrompt.classList.add('winner')
                            }, 80)

                            for (let tile of tiles) {
                                tile.classList.add('clicked')
                            }
                        }
            }
        })
    }
}
runGame()


// RESTART BUTTON
const restart = function() {
    const restartBtn = document.querySelector('.restart-button')
    console.log(document.querySelector('#game-board'))
    restartBtn.addEventListener('click', function() {

        winnerPrompt.classList.remove('winner')

        for (let tile of tiles) {
            if (tile.hasChildNodes()) {
                const image = document.querySelector('.tile img')
                tile.removeChild(image)
            }

            tile.removeAttribute('data-piece')
            tile.classList.remove('clicked')
        }
        newH2.textContent = "Player 1's Turn"
        currentPlayer = players.player1
 
        runGame()
    })
}

restart()
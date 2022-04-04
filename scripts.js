const X_CLASS = 'x'
const O_CLASS = 'o'
const COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const gridElements = document.querySelectorAll('[data-grid]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let oTurn

start()

restartButton.addEventListener('click', start)

function start() {
  oTurn = false
  gridElements.forEach(grid => {
    grid.classList.remove(X_CLASS)
    grid.classList.remove(O_CLASS)
    grid.removeEventListener('click', handleClick)
    grid.addEventListener('click', handleClick, { once: true })
  })
  winnersHoverMessage()
  winningMessage.classList.remove('show')
}

function handleClick(e) {
  const grid = e.target
  const currentClass = oTurn ? O_CLASS : X_CLASS
  placeMarker(grid, currentClass)
  if (checkWin(currentClass)) {
    endOfGame(false)
  } else if (shape()) {
    endOfGame(true)
  } else {
    swapTurns()
    winnersHoverMessage()
  }
}

function endOfGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'its a draw!'
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  winningMessage.classList.add('show')
}

function shape() {
  return [...gridElements].every(grid => {
    return grid.classList.contains(X_CLASS) || grid.classList.contains(O_CLASS)
  })
}

function placeMarker(grid, currentClass) {
  grid.classList.add(currentClass)
}

function swapTurns() {
  oTurn = !oTurn
}

function winnersHoverMessage() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (oTurn) {
    board.classList.add(O_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return COMBINATIONS.some(combination => {
    return combination.every(index => {
      return gridElements[index].classList.contains(currentClass)
    })
  })
}
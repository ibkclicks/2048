//Primary function
document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let squares = []
  const width = 4
  let score = 0

  //create the game board
function createBoard() {
  for (let i=0; i < width*width; i++) {
    square = document.createElement('div')
    square.innerHTML = 0
    gridDisplay.appendChild(square)
    squares.push(square)
  }
  generate()
  generate()
}
createBoard()

  // generate a new number (either 2 or 4)
function generate() {
  randomNumber = Math.floor(Math.random() * squares.length);
  const randomValue = Math.random() < 0.6 ? 2 : 4; // 60% chance for 2, 40% chance for 4
  if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = randomValue;
      checkForGameOver();
  } else {
      generate();
  }
}


//movement functions
function moveRight() {
  for (let i=0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+1].innerHTML
      let totalThree = squares[i+2].innerHTML
      let totalFour = squares[i+3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = zeros.concat(filteredRow)

      squares[i].innerHTML = newRow[0]
      squares[i +1].innerHTML = newRow[1]
      squares[i +2].innerHTML = newRow[2]
      squares[i +3].innerHTML = newRow[3]
    }
  }
}

function moveLeft() {
  for (let i=0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+1].innerHTML
      let totalThree = squares[i+2].innerHTML
      let totalFour = squares[i+3].innerHTML
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = filteredRow.concat(zeros)

      squares[i].innerHTML = newRow[0]
      squares[i +1].innerHTML = newRow[1]
      squares[i +2].innerHTML = newRow[2]
      squares[i +3].innerHTML = newRow[3]
    }
  }
}

function moveUp() {
  for (let i=0; i < 4; i++) {
    let totalOne = squares[i].innerHTML
    let totalTwo = squares[i+width].innerHTML
    let totalThree = squares[i+(width*2)].innerHTML
    let totalFour = squares[i+(width*3)].innerHTML
    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeros = Array(missing).fill(0)
    let newColumn = filteredColumn.concat(zeros)

    squares[i].innerHTML = newColumn[0]
    squares[i +width].innerHTML = newColumn[1]
    squares[i+(width*2)].innerHTML = newColumn[2]
    squares[i+(width*3)].innerHTML = newColumn[3]
  }
}

function moveDown() {
  for (let i=0; i < 4; i++) {
    let totalOne = squares[i].innerHTML
    let totalTwo = squares[i+width].innerHTML
    let totalThree = squares[i+(width*2)].innerHTML
    let totalFour = squares[i+(width*3)].innerHTML
    let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeros = Array(missing).fill(0)
    let newColumn = zeros.concat(filteredColumn)

    squares[i].innerHTML = newColumn[0]
    squares[i +width].innerHTML = newColumn[1]
    squares[i+(width*2)].innerHTML = newColumn[2]
    squares[i+(width*3)].innerHTML = newColumn[3]
  }
}

//addition function
function combineRow() {
  for (let i =0; i < 15; i++) {
    if (squares[i].innerHTML === squares[i +1].innerHTML) {
      let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)
      squares[i].innerHTML = combinedTotal
      squares[i +1].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score
    }
  }
  checkForWin()
}

function combineColumn() {
  for (let i =0; i < 12; i++) {
    if (squares[i].innerHTML === squares[i +width].innerHTML) {
      let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
      squares[i].innerHTML = combinedTotal
      squares[i +width].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score
    }
  }
  checkForWin()
}

//assign functions to keyCodes
function handleKeyPress(e) {
  if(e.keyCode === 37) {
    keyLeft()
  } else if (e.keyCode === 38) {
    keyUp()
  } else if (e.keyCode === 39) {
    keyRight()
  } else if (e.keyCode === 40) {
    keyDown()
  }
}
// Handle keyboard presses
function handleKeyPress(e) {
  if (e.keyCode === 37) {
      keyLeft();
  } else if (e.keyCode === 38) {
      keyUp();
  } else if (e.keyCode === 39) {
      keyRight();
  } else if (e.keyCode === 40) {
      keyDown();
  }
}
document.addEventListener('keyup', handleKeyPress);

let startX, startY;
let swipeInProgress = false;

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    swipeInProgress = true;
}

function handleTouchMove(event) {
    if (!swipeInProgress) {
        return;
    }

    event.preventDefault();
    const endX = event.touches[0].clientX;
    const endY = event.touches[0].clientY;

    const deltaX = startX - endX;
    const deltaY = startY - endY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe left
            keyLeft();
        } else {
            // Swipe right
            keyRight();
        }
    } else {
        if (deltaY > 0) {
            // Swipe up
            keyUp();
        } else {
            // Swipe down
            keyDown();
        }
    }

    // Reset the swipe in progress flag
    swipeInProgress = false;
}

document.querySelector('.grid').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.grid').addEventListener('touchmove', handleTouchMove, false);

document.addEventListener('keyup', handleKeyPress)

function keyRight() {
  moveRight()
  combineRow()
  moveRight()
  generate()
}

function keyLeft() {
  moveLeft()
  combineRow()
  moveLeft()
  generate()
}

function keyUp() {
  moveUp()
  combineColumn()
  moveUp()
  generate()
}

function keyDown() {
  moveDown()
  combineColumn()
  moveDown()
  generate()
}

//check if 2048 is in the squares to win
function checkForWin() {
  for (let i=0; i < squares.length; i++) {
    if (squares[i].innerHTML == 2048) {
      resultDisplay.innerHTML = ' CONGRATULATIONS!! YOU WIN'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }
}

// check if there are no zeros on the board and no possible moves to lose
function checkForGameOver() {
  let zeros = 0;
  for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
          zeros++;
      }
  }

  // Check for possible moves (horizontally or vertically)
let canMove = false;
  for (let i = 0; i < squares.length; i++) {
      if (
          i % width < width - 1 &&
          squares[i].innerHTML == squares[i + 1].innerHTML
      ) {
          canMove = true;
          break;
      }
      if (
          i + width < squares.length &&
          squares[i].innerHTML == squares[i + width].innerHTML
      ) {
          canMove = true;
          break;
      }
  }

  if (zeros === 0 && !canMove) {
      resultDisplay.innerHTML = 'You LOSE';
      document.removeEventListener('keyup', handleKeyPress);
      setTimeout(() => clear(), 3000);
  }
}


  //clear timer
  function clear() {
    clearInterval(myTimer)
  }


  //add colours
function addColours() {
  for (let i=0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#7f7c77'
    else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#ece0c8'
    else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#B2924A' 
    else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b077' 
    else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#f79462' 
    else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
    else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#f65d3b' 
    else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
    else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
    else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
    else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
    else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
  }
}
addColours()

var myTimer = setInterval(addColours, 50)

})

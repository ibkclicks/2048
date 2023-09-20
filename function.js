// Define constants
const GRID_SIZE = 4;
const WINNING_TILE = 2048;

// Initialize game variables
let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
let score = 0;
let isGameOver = false;

// Function to start a new game
function startGame() {
  grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  score = 0;
  isGameOver = false;

  // Generate two random tiles
  generateRandomTile();
  generateRandomTile();

  // Update the game grid
  updateGrid();
}

// Function to generate a random tile (2 or 4)
function generateRandomTile() {
  // Get a random empty cell on the game board
  const emptyCell = getEmptyCells()[Math.floor(Math.random() * getEmptyCells().length)];

  // Generate a random tile value (2 or 4)
  const tileValue = Math.random() < 0.5 ? 2 : 4;

  // Place the tile on the game board
  grid[emptyCell.row][emptyCell.column] = tileValue;
}

// Function to get all empty cells on the game board
function getEmptyCells() {
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, column });
      }
    }
  }
  return emptyCells;
}

// Function to move the tiles up
function moveUp() {
  for (let col = 0; col < GRID_SIZE; col++) {
    // Iterate over the rows in reverse order
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      // Move the tile up one row
      const tileValue = grid[row][col];
      if (tileValue > 0) {
        for (let upperRow = row - 1; upperRow >= 0; upperRow--) {
          if (grid[upperRow][col] === 0) {
            // Move the tile to the upper row
            grid[upperRow][col] = tileValue;
            grid[row][col] = 0;
            break;
          } else if (grid[upperRow][col] === tileValue) {
            // Merge the two tiles
            grid[upperRow][col] *= 2;
            score += grid[upperRow][col];
            grid[row][col] = 0;
            break;
          }
        }
      }
    }
  }
}

// Function to move the tiles down
function moveDown() {
  for (let col = 0; col < GRID_SIZE; col++) {
    // Iterate over the rows in order
    for (let row = 0; row < GRID_SIZE; row++) {
      // Move the tile down one row
      const tileValue = grid[row][col];
      if (tileValue > 0) {
        for (let lowerRow = row + 1; lowerRow < GRID_SIZE; lowerRow++) {
          if (grid[lowerRow][col] === 0) {
            // Move the tile to the lower row
            grid[lowerRow][col] = tileValue;
            grid[row][col] = 0;
            break;
          } else if (grid[lowerRow][col] === tileValue) {
            // Merge the two tiles
            grid[lowerRow][col] *= 2;
            score += grid[lowerRow][col];
            grid[row][col] = 0;
            break;
          }
        }
      }
    }
  }
}

// Function to move the tiles left
// Function to move the tiles left
function moveLeft() {
  for (let row = 0; row < GRID_SIZE; row++) {
    // Iterate over the columns in order
    for (let col = 0; col < GRID_SIZE; col++) {
      // Move the tile left one column
      const tileValue = grid[row][col];
      if (tileValue > 0) {
        for (let leftCol = col - 1; leftCol >= 0; leftCol--) {
          if (grid[row][leftCol] === 0) {
            // Move the tile to the left column
            grid[row][leftCol] = tileValue;
            grid[row][col] = 0;
            break;
          } else if (grid[row][leftCol] === tileValue) {
            // Merge the two tiles
            grid[row][leftCol] *= 2;
            score += grid[row][leftCol];
            grid[row][col] = 0;
            break;
          }
        }
      }
    }
  }
}

// Function to move the tiles right
function moveRight() {
  for (let row = 0; row < GRID_SIZE; row++) {
    // Iterate over the columns in reverse order
    for (let col = GRID_SIZE - 1; col >= 0; col--) {
      // Move the tile right one column
      const tileValue = grid[row][col];
      if (tileValue > 0) {
        for (let rightCol = col + 1; rightCol < GRID_SIZE; rightCol++) {
          if (grid[row][rightCol] === 0) {
            // Move the tile to the right column
            grid[row][rightCol] = tileValue;
            grid[row][col] = 0;
            break;
          } else if (grid[row][rightCol] === tileValue) {
            // Merge the two tiles
            grid[row][rightCol] *= 2;
            score += grid[row][rightCol];
            grid[row][col] = 0;
            break;
          }
        }
      }
    }
  }
}
// Function to check for a win
function checkWin() {
  // Check if any tile has reached the winning value (WINNING_TILE)
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === WINNING_TILE) {
        return true;
      }
    }
  }

  return false;
}

// Function to check for a loss
function checkLoss() {
  // Check if there are any valid moves left (no empty cells or mergable tiles)
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        return false;
      }

      if (row > 0 && grid[row][col] === grid[row - 1][col]) {
        return false;
      }

      if (col > 0 && grid[row][col] === grid[row][col - 1]) {
        return false;
      }
    }
  }

  return true;
}

// Function to handle key presses
function handleKeyPress(event) {
  if (!isGameOver) {
    if (event.key === 'ArrowLeft') {
      moveLeft();
    } else if (event.key === 'ArrowRight') {
      moveRight();
    } else if (event.key === 'ArrowUp') {
      moveUp();
    } else if (event.key === 'ArrowDown') {
      moveDown();
    }

    checkWin();
    checkLoss();
    updateGrid();
  }
}

// Function to update the game grid
function updateGrid() {
  const gridElement = document.querySelector('.grid');
  gridElement.innerHTML = ''; // Clear the grid

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
[O      const tileValue = grid[row][col];
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = tileValue > 0 ? tileValue : '';
      tile.style.backgroundColor = getTileColor(tileValue);
      gridElement.appendChild(tile);
    }
  }

  // Update the score in the HTML
  document.querySelector('.score').textContent = `Score: ${score}`;
}

// Function to get tile background color based on value
function getTileColor(value) {
  // Assign colors to different tile values
  switch (value) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc62';
    case 512:
      return '#edc852';
    case 1024:
      return '#edc542';
    case 2048:
      return '#edc232';
    default:
      return '#ffffff';
  }
}

// Add event listeners
document.addEventListener('keydown', handleKeyPress);

// Start a new game when the page loads
startGame();


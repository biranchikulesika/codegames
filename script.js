const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize game
function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;

  if (checkWin()) {
    endGame(`Player ${currentPlayer} wins!`);
  } else if (isDraw()) {
    endGame("Draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for win
function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentPlayer.toLowerCase());
    });
  });
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

// End game
function endGame(message) {
  gameActive = false;
  status.textContent = message;
}

// Reset game
resetBtn.addEventListener('click', startGame);

// Start the game
startGame();

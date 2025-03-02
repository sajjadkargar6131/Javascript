const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');
const singlePlayerBtn = document.getElementById('single-player-btn');
const twoPlayerBtn = document.getElementById('two-player-btn');
const board = document.getElementById('board');

let currentPlayer = 'X'; // بازیکن انسانی (X)
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let isSinglePlayer = false; // حالت تک نفره (بازی با کامپیوتر)
let gameMode = ''; // حالت بازی (تک نفره یا دو نفره)

// انتخاب حالت بازی
singlePlayerBtn.addEventListener('click', () => {
    gameMode = 'single';
    isSinglePlayer = true;
    startGame();
});

twoPlayerBtn.addEventListener('click', () => {
    gameMode = 'two';
    isSinglePlayer = false;
    startGame();
});

// بررسی وضعیت برنده
const checkWinner = (board) => {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // ردیف‌ها
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستون‌ها
        [0, 4, 8], [2, 4, 6] // قطرها
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // برنده: X یا O
        }
    }

    // اگر تمام خانه‌ها پر شوند و هیچ‌کس برنده نشد
    return board.includes('') ? null : 'T'; // T برای تساوی
};

// الگوریتم Minimax
const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === 'X') return -10;
    if (winner === 'O') return 10;
    if (winner === 'T') return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // کامپیوتر حرکت می‌کند
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = ''; // ریست کردن خانه
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // بازیکن انسانی حرکت می‌کند
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = ''; // ریست کردن خانه
            }
        }
        return best;
    }
};

// انتخاب بهترین حرکت کامپیوتر
const bestMove = () => {
    let bestVal = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O'; // کامپیوتر حرکت می‌کند
            let moveVal = minimax(gameBoard, 0, false);
            gameBoard[i] = ''; // ریست کردن خانه
            if (moveVal > bestVal) {
                move = i;
                bestVal = moveVal;
            }
        }
    }
    return move;
};

// حرکت کامپیوتر
const computerMove = () => {
    const move = bestMove();
    gameBoard[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('taken');

    const winner = checkWinner(gameBoard);
    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            statusDisplay.textContent = 'بازی مساوی شد';
        } else {
            statusDisplay.textContent = `کامپیوتر برنده شد!`;
        }
    } else {
        currentPlayer = 'X';
        statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
    }
};

// مدیریت کلیک روی خانه‌ها
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive || (currentPlayer !== 'X' && gameMode === 'single')) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    const winner = checkWinner(gameBoard);
    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            statusDisplay.textContent = 'بازی مساوی شد';
        } else {
            statusDisplay.textContent = `بازیکن ${winner} برنده شد!`;
        }
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // نوبت به بازیکن دیگر می‌رسد
        statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;

        if (isSinglePlayer && currentPlayer === 'O') {
            setTimeout(computerMove, 500); // به کامپیوتر زمان می‌دهیم تا حرکت کند
        }
    }
};

// ریست کردن بازی
const restartGame = () => {
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
};

// شروع بازی
const startGame = () => {
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });

    board.style.display = 'grid';
    restartButton.style.display = 'inline-block';

    // تغییر استایل دکمه‌ها
    singlePlayerBtn.classList.remove('active');
    twoPlayerBtn.classList.remove('active');
    if (gameMode === 'single') {
        singlePlayerBtn.classList.add('active');
    } else {
        twoPlayerBtn.classList.add('active');
    }
};

// افزودن رویداد کلیک به خانه‌ها
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// افزودن رویداد به دکمه شروع مجدد
restartButton.addEventListener('click', restartGame);

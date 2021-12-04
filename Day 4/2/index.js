const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n');

const numbers = input.shift().split(',');

let boards = input
    .join('\n')
    .split('\n\n')
    .map(
        board => board
            .trim()
            .split('\n')
            .map(
                line => line
                .replace(/ +/g, ' ')
                .trim()
                .split(' ')
                .map(num => [ Number(num), false ])
            )
    );

let winnerBoards = [];
let lastNumPerBoard = {};

for (const num of numbers) {
    for (let boardIndex in boards) {
        let board = boards[boardIndex];
        for (let line of board) {
            for (let item of line) {
                if (winnerBoards.includes(boardIndex)) continue;
                if (item[0] == num) item[1] = true;
                
                if (isWinnerBoard(board)) {
                    winnerBoards.push(boardIndex);
                    lastNumPerBoard[boardIndex] = num;
                }
            }
        }
    }
}

let num = winnerBoards.length - 1,
    boardIndex = winnerBoards[num],
    lastBoard = boards[boardIndex],
    sumUnmarked = lastBoard.reduce(
    (prevLine, line) => line.reduce(
        (prevItem, item) => (item[1] ? 0 : item[0]) + prevItem, 0
    ) + prevLine, 0
);

console.log(`Last board found! Board: ${boardIndex}, Number: ${lastNumPerBoard[boardIndex]}, ` +
            `Sum of unmarked: ${sumUnmarked}, Result: ${sumUnmarked * lastNumPerBoard[boardIndex]}`);

/**
 * 
 * @param {[number, boolean][][]} board
 * @returns {boolean}
 */
function isWinnerBoard(board) {
    // Horizontal check
    for (const line of board) {
        if (line.filter(i => !i[1]).length == 0) return true;
    }

    // Vertical check
    for (const row in board[0]) {
        let falseFound = false;
        for (let i = 0; i < board.length; i++) {
            if (!board[i][row][1]) falseFound = true;
        }

        if (!falseFound) return true;
    }

    return false;
}

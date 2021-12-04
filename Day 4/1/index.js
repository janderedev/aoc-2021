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

for (const num of numbers) {
    for (let board of boards) {
        for (let line of board) {
            for (let item of line) {
                if (item[0] == num) item[1] = true;
                
                if (isWinnerBoard(board)) {
                    let sumUnmarked = board.reduce(
                        (prevLine, line) => line.reduce(
                            (prevItem, item) => (item[1] ? 0 : item[0]) + prevItem, 0
                        ) + prevLine, 0
                    );

                    console.log(`Winner found! Number: ${num}, Sum of unmarked: ${sumUnmarked}, Result: ${sumUnmarked * num}`);

                    return;
                }
            }
        }
    }
}

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

    // missed the "Diagonals don't count." lol
    /*
    // Diagonal
        // Top-left to bottom-right
        let falseFound = false;
        for (let i = 0; i < board.length; i++) {
            if (!board[i][i][1]) falseFound = true;
        }

        if (!falseFound) return true;

    // Bottom-left to top-right
    falseFound = false;
    for (let i = 0; i < board.length; i++) {
        if (!board[board.length - 1 - i][i][1]) falseFound = true;
    }

    if (!falseFound) return true;
    */

    return false;
}

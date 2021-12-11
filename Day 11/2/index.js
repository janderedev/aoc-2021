const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split('').map(char => Number(char)));

let i = 0;
while (true) {
    if (areAllEqual()) break; else i++;

    let flashedThisStep = [];

    for (const row in input) {
        for (const line in input[row]) {
            tickFlash(Number(line), Number(row));
        }
    }

    /*
    console.log('Iter', i);
    console.log(input.map(l => l.join('')).join('\n').replace(/0/g, '\u001b[37;1m0\u001b[0m'), '\n');
    */

    function incSurrounding(x, y) {
        [
            [-1, -1], [ -1, 0 ], [ -1, 1 ],
            [0, -1 ],             [ 0, 1 ],
            [1, -1 ], [  1, 0  ], [ 1, 1 ],
        ].forEach(offset => {
            if (input[y + offset[1]]?.[x + offset[0]] != undefined) tickFlash(x + offset[0], y + offset[1]);
        });
    }

    function tickFlash(x, y) {
        if (!flashedThisStep.includes(`${x} ${y}`)) {
            input[y][x]++;
            if (input[y][x] >= 10) {
                input[y][x] = 0;
                flashedThisStep.push(`${x} ${y}`);
                incSurrounding(x, y);
            }
        }
    }

    function areAllEqual() {
        let firstChar = input[0][0];
        for (const row in input) {
            for (const line in input[row]) {
                if (input[line][row] != firstChar) return false;
            }
        }

        return true;
    }
}

console.log('Result:', i);

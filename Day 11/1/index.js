const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split('').map(char => Number(char)));

let flashes = 0;

for (let i = 0; i < 100; i++) {
    let flashedThisStep = [];

    for (const row in input) {
        for (const line in input[row]) {
            tickFlash(Number(line), Number(row));
        }
    }

    // Fancy debug output
    /*
    console.log('Iter', i, 'flashes', flashes);
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
                flashes++;
                incSurrounding(x, y);
            }
        }
    }
}

console.log('Result:', flashes);

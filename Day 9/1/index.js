const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split('').map(char => Number(char)));

let res = 0;

for (let row in input) {
    for (let line in input[row]) {
        row = Number(row);
        line = Number(line);
        let curNum = input[row][line];
        let cmp = (y, x) => {
            return ((input[y]?.[x] ?? 10) > curNum);
        }

        let yes = true;

        if (row > 0 && !cmp(row-1, (line))) yes = false;
        if (line > 0 && !cmp(row, line-1)) yes = false;
        if (row < input.length && !cmp(row+1, line)) yes = false;
        if (line < input[row].length && !cmp(row, line+1)) yes = false;

        if (yes) res += curNum+1;
    }
}

console.log('Result:', res);

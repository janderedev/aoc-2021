const fs = require('fs');
let input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split('').map(char => Number(char)));

let lowPoints = [];
let basins = [];

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

        if (yes) lowPoints.push({ x: line, y: row });
    }
}

for (const points of lowPoints) {
    basins.push(checkPoint(points.x, points.y));
}

function checkPoint(x, y) {
    if (input[y]?.[x] != null && input[y][x] != 9) {
        input[y][x] = null;
        return checkPoint(x, y-1) + checkPoint(x, y+1) + checkPoint(x-1, y) + checkPoint(x+1, y) + 1;
    } else return 0;
}

basins = basins.sort((a, b) => b - a);
console.log('Result: ' + (basins[0] * basins[1] * basins[2]));

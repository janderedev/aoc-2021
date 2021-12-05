const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8').split('\n');

const points = input.map(
    i => i
        .split(' -> ')
        .map(j => ({ x: Number(j.split(',')[0]), y: Number(j.split(',')[1]) }))
);

let xMax = 0,
    yMax = 0;

points.forEach(set => {
    if (set[0].x > xMax) xMax = set[0].x;
    if (set[1].x > xMax) xMax = set[1].x;
    if (set[0].y > yMax) yMax = set[0].y;
    if (set[1].y > yMax) yMax = set[1].y;
});

const field = new Array(yMax+1);
for (let i = 0; i < field.length; i++) field[i] = new Array(xMax+1).fill(0);

for (const set of points) {
    // Only include horizontal and vertical lines
    if (set[0].x != set[1].x && set[0].y != set[1].y) continue;

    if (set[0].x == set[1].x) {
        if (set[0].y > set[1].y) [set[0], set[1]] = [set[1], set[0]];

        for (let y = set[0].y; y <= set[1].y; y++) {
            field[y][set[0].x]++;
        }
    } else {
        if (set[0].x > set[1].x) [set[0], set[1]] = [set[1], set[0]];

        for (let x = set[0].x; x <= set[1].x; x++) {
            field[set[0].y][x]++;
        }
    }
}

let res = field
    .reduce((prev, cur) => cur.filter(i => i >= 2).length + prev, 0);

console.log('Result: ' + res);

// Writes the entire board to a file, looks cool imo
/*
fs.writeFileSync('/tmp/bruh.txt', field.map(
    line => line.join('')
).join('\n').replace(/0/g, '.'))
*/

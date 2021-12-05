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
    if (set[0].x == set[1].x || set[0].y == set[1].y) {
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
    } else if (delta(set[0].x, set[1].x) == delta(set[0].y, set[1].y)) {
        if (set[0].x > set[1].x) [set[0], set[1]] = [set[1], set[0]];

        let h = set[0].y < set[1].y;

        for (let i = 0; i <= delta(set[0].x, set[1].x); i++) {
            let x = set[0].x + i,
                y = set[0].y > set[1].y ? set[0].y - i : set[0].y + i;
            
            field[y][x]++;
        }
    }
}

let res = field
    .reduce((prev, cur) => cur.filter(i => i >= 2).length + prev, 0);

console.log('Result: ' + res);

/*
fs.writeFileSync('/tmp/bruh.txt', field.map(
    line => line.join('')
).join('\n').replace(/0/g, '.'))
*/

/**
 * @param {number} a 
 * @param {number} b 
 */
function delta(a, b) {
    if (a < b) [a, b] = [b, a];
    return a - b;
}

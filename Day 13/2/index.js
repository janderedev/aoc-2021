const fs = require('fs');
let [ pointsArr, instructions ] = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n\n')
    .map(x => x.split('\n'));

let points = new Set(pointsArr);
instructions = instructions
    .filter(line => line.length > 0)
    .map(i => i.replace('fold along ', ''));


for (const inst of instructions) {
    const [ axis, value ] = inst.split('=');

    for (const point of points) {
        let [ x, y ] = point.split(',').map(Number);
        let folded = false;

        if (axis == 'x' && x > value) {
            folded = true;
            x = value - (x - value);
        }

        if (axis == 'y' && y > value) {
            folded = true;
            y = value - (y - value);
        }

        if (folded) {
            points.delete(point);
            points.add(x + ',' + y);
        }
    }
}

let highestX = 0;
let highestY = 0;

for (const point of points) {
    let [ x, y ] = point.split(',').map(Number);
    if (x > highestX) highestX = x;
    if (y > highestY) highestY = y;
}

let field = new Array(highestY + 1)
    .fill()
    .map(() => new Array(highestX + 1).fill(false));

for (const point of points) {
    let [ x, y ] = point.split(',').map(Number);
    field[y][x] = true;
}

console.log(fieldToString());

function fieldToString() {
    return field.map(line => line.map(i => i ? '█' : ' ').join('').trimRight()).join('\n');
}

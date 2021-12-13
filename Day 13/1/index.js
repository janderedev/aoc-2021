const fs = require('fs');
let [ points, instructions ] = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n\n')
    .map(x => x.split('\n'));

points = points.map(x => x.split(',').map(y => Number(y)));
instructions = instructions
    .filter(line => line.length > 0)
    .map(i => i.replace('fold along ', ''))
    .map(i => i.split('='))
    .map(i => ({ coord: i[0], number: Number(i[1]) }));

const highestX = points.sort((a, b) => b[0] - a[0])[0][0] + 1;
const highestY = points.sort((a, b) => b[1] - a[1])[0][1] + 1;

let field = new Array(highestY)
    .fill()
    .map(() => new Array(highestX).fill(false));

for (const point of points) {
    field[point[1]][point[0]] = true;
}

// Didn't notice that I only need to run the first instruction for part 1
// also the code doesn't really work but it's fine for this part lol
instructions = [ instructions[0] ];

for (const inst of instructions) {
    let arr1, arr2;
    if (inst.coord == 'x') {
        arr1 = field.map(line => line.slice(0, inst.number));
        arr2 = field.map(line => line.slice(inst.number).reverse());
    } else if (inst.coord == 'y') {
        arr1 = field.slice(0, inst.number);
        arr2 = field.slice(inst.number);
        arr2.reverse();
    }

    for (const i in arr2) {
        let line = arr2[i];
        for (const j in line) {
            let item = arr2[i][j];
            if (item) {
                arr1[i][j] = true;
            }
        }
    }

    field = arr1;
}

//console.log(fieldToString());
console.log('Result:', field.map(line => line.filter(i => i).length).reduce((prev, cur) => prev + cur, 0));

function fieldToString() {
    return field.map(line => line.map(i => i ? '#' : '.').join('')).join('\n');
}

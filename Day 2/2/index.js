const fs = require('fs');
const input = fs.readFileSync('../input.txt')
    .toString('utf-8')
    .split('\n')
    .filter(l => l.length > 0)
    .map(l => l.split(' '));

let x = 0, y = 0, aim = 0;

for (const line of input) {
    let count = Number(line[1]);

    switch(line[0]) {
        case 'forward':
            x += count;
            y += aim * count;
        break;
        case 'down':
            aim += count;
        break;
        case 'up':
            aim -= count;
        break;
    }
}

console.log('Result: ' + (x * y));

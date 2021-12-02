const fs = require('fs');
const input = fs.readFileSync('../input.txt')
    .toString('utf-8')
    .split('\n')
    .filter(line => line.length > 0)
    .map(i => i.split(' '));

let x = 0, y = 0;

for (const line of input) {
    let count = Number(line[1]);
    switch(line[0]) {
        case 'forward': x += count; break;
        case 'down': y += count; break;
        case 'up': y -= count; break;
    }
}

console.log(`X: ${x}, Y: ${y}, Result: ${x*y}`);

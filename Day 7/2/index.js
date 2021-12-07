const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8').split(',').map(i => Number(i));

let highestNum = input.sort((a, b) => b - a)[0],
    lowestNum  = input.sort((a, b) => a - b)[0];

let bestPos, bestPosFuel;

for (let i = lowestNum; i <= highestNum; i++) {
    let fuelRequired = 0;
    for (let pos of input) {
        let fuelInc = 1;
        while (pos != i) {
            if (pos > i) pos--; else pos++;
            fuelRequired += fuelInc;
            fuelInc++;
        }
    }

    if (!bestPos || bestPosFuel > fuelRequired) {
        bestPos = i;
        bestPosFuel = fuelRequired;
    }
}

console.log(`Result: Position ${bestPos} with ${bestPosFuel} fuel`);

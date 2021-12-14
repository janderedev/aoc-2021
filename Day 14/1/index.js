const fs = require('fs');
let [ input, insts ] = fs.readFileSync('../input.txt', 'utf-8').split('\n\n');

let instructions = {};
insts.split('\n').forEach(inst => {
    let [ combo, newChar ] = inst.split(' -> ');
    instructions[combo] = newChar;
});

for (let i = 0; i < 10; i++) {
    let newInput = input.split('');

    for (let j = 0; j < newInput.length-1; j++) {
        let combo = `${newInput[j]}${newInput[j+1]}`;
        if (instructions[combo]) {
            newInput.splice(j+1, 0, instructions[combo]);
            j++;
        }
    }

    input = newInput.join('');
}

let chars = {};
input.split('').forEach(char => {
    if (!chars[char]) chars[char] = 0;
    chars[char]++;
});

let sorted = Object.entries(chars).sort((a, b) => b[1] - a[1]);
console.log(sorted)
console.log('Result:', sorted[0][1] - sorted[sorted.length-1][1]);

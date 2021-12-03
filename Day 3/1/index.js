const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split(''));
const lineLength = input[0].length;


let gamma = '';

for (let i = 0; i < lineLength; i++) {
    let counter = 0;
    for (let j = 0; j < input.length; j++) {
        input[j][i] == '1' && counter++;
    }
    gamma += (counter > input.length/2) ? '1' : '0';
}

let epsilon = gamma
    .split('')
    .map(i => i == 1 ? '0' : '1')
    .join('');

console.log(`Gamma: ${gamma}, Epsilon: ${epsilon}`);

gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);

console.log(`Result: ${gamma} * ${epsilon} = ${gamma*epsilon}`);

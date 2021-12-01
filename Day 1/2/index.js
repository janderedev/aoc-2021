const fs = require('fs');
const input = fs.readFileSync('../input.txt')
    .toString('utf-8')
    .split("\n")
    .map(i => Number(i));

let prevSum = 0, counter = 0;
for (let i = 0; i < input.length - 2; i++) {
    let sum = input[i] + input[i+1] + input[i+2];
    if (prevSum > 0 && sum > prevSum) counter++;
    prevSum = sum;
}

console.log(`Result: ${counter}`);

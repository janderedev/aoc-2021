const fs = require('fs');
const input = fs.readFileSync('../input.txt').toString('utf-8').split("\n");

let counter = 0;

for (const i in input) {
    // Since number > undefined is false, we can safely compare the first number in the array
    if (Number(input[i]) > Number(input[i - 1])) counter++;
}

console.log(`Result: ${counter}`);

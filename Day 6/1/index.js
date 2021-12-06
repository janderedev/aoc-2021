const fs = require('fs');
let input = fs.readFileSync('../input.txt', 'utf-8').split(',');

for (let i = 0; i < 80; i++) {
    for (const i in input) {
        if (input[i] == 0) {
            input[i] = 6;
            input.push(8);
        } else input[i]--;
        
    }
}

console.log(input.length);

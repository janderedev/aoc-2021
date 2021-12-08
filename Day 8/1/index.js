const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8');

const vals = input
    .split('\n')
    .map(l => l.split(' | ').map(v => v.split(' ')));

let res = 0;

for (const val of vals) {
    let outVal = val[1];
    res += outVal.filter(v => v.length <= 4 || v.length == 7).length;
}

console.log(`Result: ${res}`);

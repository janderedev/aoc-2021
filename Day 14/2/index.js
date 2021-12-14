const fs = require('fs');
let [ input, insts ] = fs.readFileSync('../input.txt', 'utf-8').split('\n\n');

let rules = {};
insts.split('\n').forEach(inst => {
    let [ combo, newChar ] = inst.split(' -> ');
    rules[combo] = newChar;
});

function objInsert(obj, key, val) {
    if (!val) val = 1;
    if (key in obj) {
        obj[key] += val;
    } else obj[key] = val;
}

function tick(value) {
    let result = {}
    for (const val in value) {
        const newChar = rules[val];
        objInsert(result, val[0] + newChar, value[val]);
        objInsert(result, newChar + val[1], value[val]);
    }

    return result;
}

let vals = [];
for (let i = 0; i < input.length-1; i++) {
    objInsert(vals, input.charAt(i) + input.charAt(i+1), 1);
}

let corners = [ input.charAt(0), input.charAt(input.length-1) ];

for (let i = 0; i < 40; i++) vals = tick(vals);

let resVals = {}

for (const pair of Object.entries(vals)) {
    objInsert(resVals, pair[0].charAt(0), pair[1]);
    objInsert(resVals, pair[0].charAt(1), pair[1]);
}

resVals[corners[0]]++;
resVals[corners[1]]++;

let sorted = Object.entries(resVals).sort((a, b) => b[1] - a[1]);

console.log((sorted[0][1] / 2) - (sorted[sorted.length-1][1] / 2));

const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(row => row.split(''));
const lineLength = input[0].length;

let oxygen = input, co2 = input;

for (let i = 0; i < lineLength; i++) {
    let counter = 0;
    for (let j = 0; j < oxygen.length; j++) {
        oxygen[j][i] == '1' && counter++;
    }

    let filter = (counter >= oxygen.length/2) ? '1' : '0';

    if (oxygen.length == 1) break;
    oxygen = oxygen.filter(row => row[i] == filter);
}

for (let i = 0; i < lineLength; i++) {
    let counter = 0;
    for (let j = 0; j < co2.length; j++) {
        co2[j][i] == '1' && counter++;
    }

    let filter = (counter >= co2.length/2) ? '0' : '1';

    if (co2.length == 1) break;
    co2 = co2.filter(row => row[i] == filter);
}

oxygen = parseInt(oxygen[0].join(''), 2);
co2 = parseInt(co2[0].join(''), 2);

console.log(`Result: ${oxygen} * ${co2} = ${oxygen * co2}`);

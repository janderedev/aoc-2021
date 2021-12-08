const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8');

// i didnt like this one lol

const vals = input
    .split('\n')
    .map(l => l.split(' | ').map(v => v.split(' ')));

let output = 0;

for (const val of vals) {
    //  0000
    // 1    2
    // 1    2
    //  3333
    // 4    5
    // 4    5
    //  6666

    let known = {}
    let possible = {
        0: [], 1: [], 2: [], 3: [],
        4: [], 5: [], 6: [],
    }

    let sorted = val[0].sort((a, b) => a.length - b.length);

    // Segment part 0 and possible values for 2 and 5
    let one = sorted.find(s => s.length == 2);
    let seven = sorted.find(s => s.length == 3);
    known[0] = seven.split('').find(h => !one.includes(h));
    possible[2] = one.split('');
    possible[5] = one.split('');

    // Figure out possible values for 1 and 3
    let four = sorted.find(s => s.length == 4);
    [1, 3].forEach(i => possible[i] = four.split('').filter(v => !one.includes(v)));

    let fives = sorted.filter(s => s.length == 5);
    let three = fives.find(
        s => s.includes(possible[2][0]) && s.includes(possible[2][1])
    );

    let two_and_five = fives.filter(v => v != three);

    // Find middle segment and segment 1
    let middleSeg = possible[3].find(v => three.includes(v));

    known[3] = middleSeg;
    known[1] = possible[1].find(v => v != middleSeg);

    let two = two_and_five.find(v => !v.includes(known[1]));
    let five = two_and_five.find(v => v != two);

    // Segment 2 and 5
    known[2] = possible[2].find(v => two.includes(v));
    known[5] = possible[5].find(v => v != known[2]);

    // Segment 6
    known[6] = five.split('').find(
        v => known[0] != v &&
             known[1] != v &&
             known[3] != v &&
             known[5] != v
    );

    known[4] = "abcdefg".split('').find(v => !Object.values(known).includes(v));


    // We match our output value to the numbers we just calculated
    let nums = val[1].map(letters => letters.split('').map(letter => Object.entries(known).find(v => v[1] == letter)[0]));

    let res = "";
    nums.forEach(n => {
        let numStr = n.sort().join('');
        switch(numStr) {
            case '012456':  res += '0'; break; // Kind of useless lol
            case '25':      res += '1'; break;
            case '02346':   res += '2'; break;
            case '02356':   res += '3'; break;
            case '1235':    res += '4'; break;
            case '01356':   res += '5'; break;
            case '013456':  res += '6'; break;
            case '025':     res += '7'; break;
            case '0123456': res += '8'; break;
            case '012356':  res += '9'; break;
            default: console.log(`Cannot figure out value of ${numStr}`);
        }
    });

    output += Number(res);
}

console.log('Result:', output);

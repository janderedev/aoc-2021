const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(line => line.split(''));

let scores = [];

for (const line of input) {
    let open = [];
    let corrupt = false;

    for (const char of line) {
        if (corrupt) break;

        switch(char) {
            case '(':
            case '[':
            case '{':
            case '<':
                open.push(char);
                break;
            
            case ')':
                if (open.pop() != '(') corrupt = true;
                break;
            case ']':
                if (open.pop() != '[') corrupt = true;
                break;
            case '}':
                if (open.pop() != '{') corrupt = true;
                break;
            case '>':
                if (open.pop() != '<') corrupt = true;
                break;
        }
    }

    if (!corrupt) {
        let score = 0;
        for (const char of open.reverse()) {
            switch(char) {
                case '(': score = (score * 5) + 1; break;
                case '[': score = (score * 5) + 2; break;
                case '{': score = (score * 5) + 3; break;
                case '<': score = (score * 5) + 4; break;
            }
        }
        
        scores.push(score);
    }
}

let sorted = scores.sort((a, b) => a - b);
console.log('Result:', sorted[(sorted.length-1) / 2]);

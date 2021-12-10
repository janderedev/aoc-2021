const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(line => line.split(''));

let result = 0;

for (const line of input) {
    let open = [];
    let score = 0;

    for (const char of line) {
        switch(char) {
            case '(':
            case '[':
            case '{':
            case '<':
                open.push(char);
                break;
            
            case ')':
                if (open.pop() != '(') score = 3;
                break;
            case ']':
                if (open.pop() != '[') score = 57;
                break;
            case '}':
                if (open.pop() != '{') score = 1197;
                break;
            case '>':
                if (open.pop() != '<') score = 25137;
                break;
        }

        result += score;
        if (score > 0) break;
    }
}

console.log('Result:', result);

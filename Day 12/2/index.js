const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8')
    .split('\n')
    .map(i => i.split('-'));
const foundRoutes = [];

for (const cave of findConnected('start')) traverse(cave, ['start'], false);

/**
 * @param {string} cave
 * @param {string[]} visited
 * @param {boolean} doubleVisited
 */
function traverse(cave, visited, doubleVisited) {
    let connected = findConnected(cave);
    for (const nextCave of connected) {
        if (nextCave == 'end')
            foundRoutes.push([...visited, cave, 'end']);
        else if (!visited.includes(nextCave) || !isSmall(nextCave))
            traverse(nextCave, [ ...visited, cave ], doubleVisited);
        else if (!doubleVisited && nextCave != 'start') {
            traverse(nextCave, [ ...visited, cave ], true);
        }
    }
}

/**
 * @param {string} cave
 */
function findConnected(cave) {
    let related = input.filter(i => i.includes(cave));
    let connected = related.map(i => i.find(r => r != cave));
    return connected;
}

/**
 * @param {string} cave
 */
function isSmall(cave) {
    return /[a-z]+/.test(cave);
}

console.log('Result:', foundRoutes.length);

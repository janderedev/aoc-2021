const fs = require('fs');
const input = fs.readFileSync('../input.txt', 'utf-8').split(',');

const nums = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }

input.forEach(i => nums[i]++);

for (let i = 0; i < 256; i++) {
    const newNums = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }

    for (const j in nums) {
        if (j == 0) {
            newNums[6] += nums[j];
            newNums[8] += nums[j];
        } else newNums[j-1] += nums[j];
    }

    for (const val of Object.entries(newNums)) nums[val[0]] = val[1];
}

console.log(Object.values(nums).reduce((prev, cur) => prev + cur, 0));

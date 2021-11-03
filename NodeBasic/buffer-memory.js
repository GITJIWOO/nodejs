const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const data1= fs.readFileSync('./big.txt', 'utf8');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer:', process.memoryUsage().rss);
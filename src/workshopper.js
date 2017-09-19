/*
Write a program that prints the text "HELLO WORLD" to the console (stdout).
*/

// console.log("HELLO WORLD");

/*
Write a program that accepts one or more numbers as command-line arguments  
  and prints the sum of those numbers to the console (stdout).
*/

// let output = 0;
// for (let i = 2; i < process.argv.length; i++) {
//   output += Number(process.argv[i]);
// }
// console.log(output);

/*
Write a program that uses a single synchronous filesystem operation to
  read a file and print the number of newlines (\n) it contains to the console 
*/

const fs = require('fs');

console.log(fs.readFileSync(process.argv[2]).toString().split('\n').length - 1);


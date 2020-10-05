var fs = require('fs');
const { decode } = require('punycode');
const { error } = require('console');
let string1;
string1 = fs.readFileSync('input.txt');
string1 = string1.toString();
alph = new Array();
for (let i = 0; i < string1.Length; i++) {
    let b = string1.charAt(i);
    alph [b] = 0;
}
for (let i = 0; i < string1.Length; i++) {
    let b = string1.charAt(i);
    alph [b]++;
}
let h = 0;
let n = 0;
for (let i in alph) {
    alph[i] = alph[i] / string1.Length;
    n++
}
for (let i in alph) {
    h += alph[i] * Math.log2(alph[i]) / Math.log2(n);
}
h = h * (-1);
console.log(h);
decode
error

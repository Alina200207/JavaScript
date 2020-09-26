var fs = require('fs');
var string1 = fs.readFileSync('input.txt');
alph = new Array();
for (let i = 0; i < string1.length; i++) {
    let b = string1.charAt(i);
    alph [b] = 0;
}
for (let i = 0; i < string1.length; i++) {
    let b = string1.charAt(i);
    alph [b]++;
}
let h = 0;
let n = 0;
for (let i in alph) {
    alph[i] = alph[i] / string1.length;
    n++
}
for (let i in alph) {
    h += alph[i] * Math.log2(alph[i]) / Math.log2(n);
}
h = h * (-1);
console.log(h);

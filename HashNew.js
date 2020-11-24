let fs = require ('fs');
let string = fs.readFileSync('input.txt');
let substring = fs.readFileSync('inputStr.txt');
string = string.toString();
substring = substring.toString();

//хэш-функция сумма кодов символов
function startSumOfCodes(str) {
	let hs = 0;
	for (let i = 0; i<substring.length; i++){
		hs+=str.charCodeAt(i);
	}
	return hs;
}
function sumOfCodes(i, hsstr){
	return (hsstr - string.charCodeAt(i-1) + string.charCodeAt(i+substring.length-1));
}
//хэш-функция сумма квадратов кодов символов
function startSumSquaresOfCodes(str) {
	let hs = 0;
	for (let i = 0; i<substring.length; i++){
		hs+=str.charCodeAt(i)*str.charCodeAt(i);
	}
	return hs;
}
function sumSquaresOfCodes(i, hsstr){
	return (hsstr - string.charCodeAt(i-1)*string.charCodeAt(i-1) + string.charCodeAt(i+substring.length-1)*string.charCodeAt(i+substring.length-1));
}
//хэш-функция Рабина–Карпа
function RabinKarpHashStart(str){
	let hs = 0;
	for (let i = 0; i<substring.length; i++){
		hs+=(str.charCodeAt(i))*(Math.pow(2, substring.length-i));
	}
	return hs;
}
function RabinKarpHash(i, hsstr){
	hsstr = (hsstr-string.charCodeAt(i-1)*(Math.pow(2, substring.length)))*2 + 2*string.charCodeAt(i+substring.length-1);
	return hsstr;
}
//программа для хэшей
let entries = new Array();
let hssub = RabinKarpHashStart(substring);
let hsstr = RabinKarpHashStart(string);

for (let i = 1; i < string.length-substring.length+1; i++){
	if (hssub==hsstr){
		let j = 0;
	    for (j; j < substring.length; j++)
	    {
		   if (string[i+j-1]!=substring[j]){
			   break;
		   }
	    }
	    if (j == substring.length)
		  entries.push(i-1);
	}
	hsstr = RabinKarpHash(i, hsstr);
}
console.log (entries);
//алгоритм Brute Force
let entries1 = new Array();

for (let i = 0; i < string.length-substring.length; i++)
{
	let j = 0;
	for (j; j < substring.length; j++)
	{
		if (string[i+j]!=substring[j]){			
			break;
		}
	}
	if (j == substring.length)
		entries1.push(i);
}
console.log (entries1);


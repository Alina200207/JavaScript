let fs = require ('fs');
let string = fs.readFileSync('input.txt');//строка
let substring = fs.readFileSync('inputsub.txt');//подстрока
string = string.toString();
substring = substring.toString();
let entries = new Array();
let alph = new Array();
let lettersAlph = new Array();
//алфавит подстроки
for (let i =0; i<=substring.length; i++)
{
	alph[substring.charAt(i)]=0;
	if (!lettersAlph.includes(substring[i]))
		lettersAlph.push(substring[i]);
}
//двумерный массив для хранения таблицы переходов
let go = new Array();
for (let i =0; i<=substring.length;i++)
	go[i]=new Array();
for (let i in alph)
	go[0][i]=0;
//формируем таблицу переходов
for (let i = 0; i<substring.length; i++)
{
	let prev = go[i][substring.charAt(i)];
	go[i][substring.charAt(i)]=i+1;
	for (let j in alph)
		go[i+1][j]=go[prev][j];
}
//ищем подстроку в строке
let transition=0;
for (let i = 0; i < string.length; i++)
{
	if (lettersAlph.includes(string[i]))
	{
		transition=go[transition][string[i]];
	}
	else transition = go[transition][''];
	if (transition==substring.length)
		entries.push(i-substring.length+1);
}
console.log(entries);

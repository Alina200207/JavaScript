let fs = require ('fs');
let readline = require ('readline-sync');
let alphabet = fs.readFileSync ('alphabet.txt');//алфавит
let freqAlphabet = fs.readFileSync ('freqalphabet.txt');//частоты алфавита в процентах
alphabet = alphabet.toString();
let alphabetArray = alphabet.split(/\s/);
freqAlphabet = freqAlphabet.toString();
freqAlphabet = freqAlphabet.split(/\s/);
for (let i = 0; i < freqAlphabet.length; i++)
	freqAlphabet[i]=parseFloat(freqAlphabet[i])/100;
//читаем шифрованный текст из файла
let newText = fs.readFileSync ('output.txt');
newText = newText.toString();
//считаем частоты встречаемости букв в шифрованном тексте
let factFreqAlphabet = new Array();
let countLetters = 0;
for (let i = 0; i<alphabetArray.length;i++)
	factFreqAlphabet[i]=0;
for (let i = 0; i < newText.length; i++)
{
	for (let j =0; j < alphabetArray.length; j++)
	{
		if (newText[i]==alphabetArray[j])
		{
			factFreqAlphabet[j]+=1;
			countLetters+=1;
			break;
		}
		if (newText[i]==alphabetArray[j].toUpperCase())
		{
			factFreqAlphabet[j]+=1;
			countLetters+=1;
			break;
		}
	}
}
for (let i = 0; i<factFreqAlphabet.length; i++)
	factFreqAlphabet[i]=factFreqAlphabet[i]/countLetters;
//ищем сдвиг
let minDifference = 33;
let minDifferenceArg = -1;
for (let i = 0; i < alphabetArray.length; i++)
{
	let difference = 0;
	for (let j = 0; j < factFreqAlphabet.length; j++)
	{
		difference=difference+(freqAlphabet[j]-factFreqAlphabet[(j+i)%factFreqAlphabet.length])*(freqAlphabet[j]-factFreqAlphabet[(j+i)%factFreqAlphabet.length]);
	}
	if (difference<=minDifference)
	{
		minDifference=difference;
		minDifferenceArg=i;
	}
}
console.log(minDifferenceArg);
//расшифровываем текст и записываем в файл
let nextText = "";
let c = 0;
for (let i = 0; i < newText.length;i++)
{
	for (let j=0; j<alphabetArray.length; j++)
	{
		if (newText[i]==alphabetArray[j])
		{
			nextText+=alphabetArray[(j-minDifferenceArg+alphabetArray.length)%(alphabetArray.length)];
			c=1;
			break;
		}
		if (newText[i]==alphabetArray[j].toUpperCase())
		{
			nextText+=alphabetArray[(j-minDifferenceArg+alphabetArray.length)%(alphabetArray.length)].toUpperCase();
			c=1;
			break;
		}
	}
	if (c==0)
		nextText+=newText[i];
	c=0;
}
fs.writeFileSync('outputNew.txt', nextText);



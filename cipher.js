let fs = require ('fs');
let readline = require ('readline-sync');
let someText = fs.readFileSync ('input.txt');//текст
let alphabet = fs.readFileSync ('alphabet.txt');//алфавит
alphabet = alphabet.toString();
let alphabetArray = alphabet.split(/\s/);
someText=someText.toString();
let newText = "";
let shiftValue = parseInt (readline.question("Enter a shift value:"));//значение сдвига

//шифруем текст
let c = 0;
for (let i = 0; i < someText.length;i++)
{
	for (let j=0; j<alphabetArray.length; j++)
	{
		if (someText[i]==alphabetArray[j])
		{
			newText+=alphabetArray[(j+shiftValue)%(alphabetArray.length)];
			c=1;
			break;
		}
		if (someText[i]==alphabetArray[j].toUpperCase())
		{
			newText+=alphabetArray[(j+shiftValue)%(alphabetArray.length)].toUpperCase();
			c=1;
			break;
		}
	}
	if (c==0)
		newText+=someText[i];
	c=0;
}
fs.writeFileSync('output.txt', newText);




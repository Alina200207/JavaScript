let fs = require ('fs');
let string = fs.readFileSync('input.txt');
let substring = fs.readFileSync('inputStr.txt');
string = string.toString();
substring = substring.toString();
//алгоритм BrootForse
let entries2 = new Array();
let count2  = 0;
for (let i = 0; i < string.length-substring.length; i++)
{
	count2 = 0;
	for (let j = 0; j < substring.length; j++)
	{
		if (string[i+j]==substring[j])
			count2+=1;
		else break;
	}
	if (count2 == substring.length)
		entries2.push(i);
}
console.log (entries2);
//хэш-функция сумма кодов символов
let entries = new Array();
let hssub = 0;
let hsstr = 0;
for (let i = 0; i<substring.length; i++){
	hssub+=substring.charCodeAt(i);
}
for (let i = 0; i<substring.length; i++){
	hsstr+=string.charCodeAt(i);
}

let count=0;
for (let i = 1; i < string.length-substring.length+1; i++){
	if (hssub==hsstr){
	    count = 0;
	    for (let j = 0; j < substring.length; j++)
	    {
		   if (string[i+j-1]==substring[j])
			   count+=1;
		   else break;
	    }
	    if (count == substring.length)
		  entries.push(i-1);
	}
	hsstr = hsstr - string.charCodeAt(i-1) + string.charCodeAt(i+substring.length-1);
}
console.log (entries);

//хэш-функция сумма квадратов кодов символов
let entries3 = new Array();
let hssub3 = 0;
let hsstr3 = 0;
for (let i = 0; i<substring.length; i++){
	hssub3+=substring.charCodeAt(i)*substring.charCodeAt(i);
}
for (let i = 0; i<substring.length; i++){
	hsstr3+=string.charCodeAt(i)*string.charCodeAt(i);
}

let count3=0;
for (let i = 1; i < string.length-substring.length+1; i++){
	if (hssub3==hsstr3){
	    count3 = 0;
	    for (let j = 0; j < substring.length; j++)
	    {
		   if (string[i+j-1]==substring[j])
			   count3+=1;
		   else break;
	    }
	    if (count3 == substring.length)
		  entries3.push(i-1);
	}
	hsstr3 = hsstr3 - string.charCodeAt(i-1)*string.charCodeAt(i-1) + string.charCodeAt(i+substring.length-1)*string.charCodeAt(i+substring.length-1);
}
console.log (entries3);

//хэш-функция Рабина–Карпа
let entries1 = new Array();
let hssub1 = 0;
let hsstr1 = 0;
for (let i = 0; i<substring.length; i++){
	hssub1+=(substring.charCodeAt(i))*(Math.pow(2, substring.length-i));
}
for (let i = 0; i<substring.length; i++){
	hsstr1+=(string.charCodeAt(i))*(Math.pow(2, substring.length-i));
}
let previous =0;
let count1=0;
for (let i = 1; i < string.length-substring.length+1; i++){
	if (hssub1==hsstr1){
	    count1 = 0;
	    for (let j = 0; j < substring.length; j++)
	    {
		   if (string[i+j-1]==substring[j])
			   count1+=1;
		   else break;
	    }
	    if (count1 == substring.length)
		  entries1.push(i-1);
	}
	previous=(string.charCodeAt(i-1))*(Math.pow(2, substring.length));
	hsstr1 = (hsstr1-previous)*2 + 2*string.charCodeAt(i+substring.length-1);
}
console.log (entries1);
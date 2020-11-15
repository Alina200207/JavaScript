let fs = require('fs');
let inText;
let alph = new Array();
let tree = new Array();
inText = fs.readFileSync ('inputStr.txt');
inText = inText.toString();
for (let i = 0; i<inText.length; i++) {
    alph[inText.charAt(i)]=0;
}
//количество использования каждой буквы
for (let i =0; i<inText.length; i++) {
    alph[inText.charAt(i)]++;
}
function Node (letter, freq, used, link, code) {
     this.letter = letter;
	 this.freq = freq;
	 this.used = used;
	 this.link = link;
	 this.code = code;
}
let countLetter=0;
//забиваем дерево имеющимися буквами и их свойствами
for (let i in alph){
	let newNode = new Node (i, alph[i], 0, null, '');
	tree.push (newNode);
	countLetter+=1;
}
//создаем дополнительные узлы
for (let i=0; i < countLetter - 1; i++){
	for (let j=i+1; j < countLetter; j++){
		if (tree[i].freq<tree[j].freq){
			let c = tree[i];
			tree[i]=tree[j];
			tree[j]=c;
		}
	}
}
console.log(tree);
if (countLetter>2){
  for (let i = 0; i < countLetter-1; i++){
	let minInd3 = 0;
	let minFreq3 = inText.length;
	let minLetter3 = '';
	for (let j = 0; j < countLetter - 1; j++){
		if ((tree[j].freq <= minFreq3)&&(tree[j].used==0)){
			minInd3 = j;
			minFreq3 = tree[j].freq;
			minLetter3 = tree[j].letter;
		}
	}
	let newNode = new Node (minLetter3+tree[tree.length-1].letter, minFreq3+tree[tree.length-1].freq, 0, null, '');
	tree[minInd3].link = tree.length;
	tree[tree.length-1].link = tree.length;
	tree[minInd3].used = 1;
	tree[tree.length-1].used = 1;	
	tree.push (newNode);
  }
}
//забиваем коды узлов
if (countLetter>1){
for (let i = tree.length-2; i > countLetter-1;i--){
		tree[i].code=tree[i+1].code+'1';
	}
}
//кодируем буквы
let theLongestCode=0;
//если алфавит состоит из одной буквы
if (countLetter == 1){
	tree[0].code = '0';
	console.log(tree[0].letter, '-', tree[0].code);
	theLongestCode = 1;
}
//если алфавит состоит из двух букв
if (countLetter==2){
	if (tree[0].freq>=tree[1].freq){
		tree[0].code = '0';
		tree[1].code ='10';
		console.log(tree[0].letter, '-', tree[0].code);
	    console.log(tree[1].letter, '-', tree[1].code);
	}
	else {
		tree[1].code = '0';
		tree[0].code = '10';
		console.log(tree[1].letter, '-', tree[1].code);
	    console.log(tree[0].letter, '-', tree[0].code);
	}
	
	theLongestCode=2;
}
if (countLetter>2){
for (let j=0; j <tree[tree.length-1].letter.length;j++){
	symbol=tree[tree.length-1].letter[j];
	let trueLetter=0;
    for (let i = 0; i < tree.length;i++){
      if (symbol==tree[i].letter){
    	 trueLetter=i;
	}
  }
	if (tree[tree[trueLetter].link].used <= 1)
	{
		   tree[trueLetter].code = tree[tree[trueLetter].link].code + '0';
		   tree[tree[trueLetter].link].used+=1;
		   console.log(tree[trueLetter].letter, '-', tree[trueLetter].code);
		   theLongestCode = tree[trueLetter].code.length;
	}
	else
	{
		tree[trueLetter].code = tree[tree[trueLetter].link].code + '1';
		tree[tree[trueLetter].link].used+=1;
		console.log(tree[trueLetter].letter, '-', tree[trueLetter].code);
		theLongestCode = tree[trueLetter].code.length;
	}
}
}
console.log(tree);
//кодируем строку
let stringEncoded = '';		
for (let i = 0; i < inText.length;i++){
	for (j = 0; j < countLetter; j++){
		if (inText.charAt(i)==tree[j].letter)
			stringEncoded += tree[j].code;
	}
}
console.log('stringEncoded - ', stringEncoded);
//создаем и выводим раскодированную строку
let lengthCode = 0;
let checkString = '';
let stringDecoded = '';
let i = 0;
while (i<stringEncoded.length){
    while ((stringEncoded[i]!='0')&&(lengthCode < theLongestCode-1)&&(i<stringEncoded.length)){
		checkString+=stringEncoded[i];
		lengthCode+=1;
		i+=1;
	}
	checkString+=stringEncoded[i];
	for (let j = 0; j < countLetter;j++){
		if (checkString == tree[j].code){
			stringDecoded+=tree[j].letter;
		    
		}
	}
	lengthCode = 0;
    checkString = '';
	i+=1;
	
}
console.log('stringDecoded - ', stringDecoded);

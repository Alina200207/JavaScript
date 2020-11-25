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
console.log(tree);
//создаем дополнительные узлы
if (countLetter>2){
  for (let i = 0; i < countLetter-1; i++){
	let minInd1 = 0;
	let minInd2 = 0;
	let minFreq1 = inText.length;
	let minFreq2 = inText.length;
	let minLetter1 = '';
	let minLetter2 = '';
	for (let j = 0; j < tree.length; j++){
		if ((tree[j].freq <= minFreq1)&&(tree[j].used==0)){
			minInd1 = j;
			minFreq1 = tree[j].freq;
			minLetter1 = tree[j].letter;
		}
	}
	for (let j = 0; j<tree.length; j++){
		if ((tree[j].freq <= minFreq2)&&(tree[j].letter!=minLetter1)&&(tree[j].used==0)){
			minInd2 = j;
			minFreq2 = tree[j].freq;
			minLetter2 = tree[j].letter;
		}
	}
	let newNode = new Node (minLetter1+minLetter2, minFreq1+minFreq2, 0, null, '');
	tree[minInd1].link = tree.length;
	tree[minInd2].link = tree.length;
	tree[minInd1].used = 1;
	tree[minInd2].used = 1;	
	tree.push (newNode);
  }
}
//кодируем буквы
//если алфавит состоит из одной буквы
if (countLetter == 1){
	tree[0].code = '0';
	console.log(tree[0].letter, '-', tree[0].code);
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
}
//в алфавите букв больше,чем две
if (countLetter>2){
let numberBig = inText.length;
let numberSmall = inText.length;
for (let i = tree.length-1; i > countLetter-1; i--){
	for (let j = 0; j < tree.length; j++){
		if ((tree[j].link == i)&&(numberBig==inText.length))
		   numberBig=j;
		else if ((tree[j].link==i)&&(numberBig!=inText.length))
		   numberSmall=j;
	}
	if (tree[numberBig].freq<tree[numberSmall].freq){
		let c =numberBig;
        numberBig = numberSmall;
		numberSmall = c;
	}
	tree[numberBig].code=tree[numberBig].code+tree[i].code+'1';
	tree[numberSmall].code=tree[numberSmall].code+tree[i].code+'0';
	numberBig=inText.length;
	numberSmall=inText.length;
	
}
//выводим коды букв
for (let i = 0; i < countLetter;i++)
    console.log(tree[i].letter, '-', tree[i].code);	
}
console.log (tree);
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
let stringDecoded = '';
let i = 0;
while (i<stringEncoded.length){
    for (let j = 0; j < countLetter; j++){
		let k = 0;
		let helpCode = tree[j].code;
		for (k; k<helpCode.length;k++){
			if (stringEncoded[i]==helpCode[k]){
				i++;
			}
			else{
				i=i-k;
				break;
			}
		}
		if (k==tree[j].code.length){
			stringDecoded+=tree[j].letter;
			break;
		}
	}
}
console.log('stringDecoded - ', stringDecoded);

let fs = require('fs');
let inText;
let alph = new Array();
let tree = new Array();
inText = fs.readFileSync ('inputStr.txt');
inText = inText.toString();
for (let i = 0; i<inText.length; i++) {
    alph[inText.charAt(i)]=0;
}
//количесвто использования каждой буквы
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
let count=0;
//забиваем дерево имеющимися буквами и их свойствами
for (let i in alph){
	let newNode = new Node (i, alph[i], 0, null, '');
	tree.push (newNode);
	count+=1;
}
console.log(tree);
//создаем дополнительные узлы
treeLength = tree.length;
let minInd1 = -1;
let minInd2 = -1;
let minFreq1 = inText.length;
let minFreq2 = inText.length;
let minLetter1 = '';
let minLetter2 = '';
if (count > 1){	
	for (let j = 0; j < tree.length; j++){
		if ((tree[j].freq <= minFreq1)&&(tree[j].used==0)){
			minInd1 = j;
			minFreq1 = tree[j].freq;
			minLetter1 = tree[j].letter;
		}
	}
    for (let j = 0; j < tree.length; j++){
		if ((tree[j].freq >= minFreq1)&&(tree[j].freq <= minFreq2)&&(tree[j].used==0)&&(tree[j].letter!=minLetter1)){
			minInd2 = j;
			minFreq2 = tree[j].freq;
			minLetter2 = tree[j].letter;			
		}
	}
	if (tree[minInd1].freq==tree[minInd2].freq){
		let c = minLetter1;
		minLetter1=minLetter2;
		minLetter2=c;
	}
	let newNode = new Node (minLetter1+minLetter2, minFreq1+minFreq2, 0, null, '');
	tree[minInd1].link = tree.length;
	tree[minInd2].link = tree.length;
	tree[minInd1].used = 1;
	tree[minInd2].used = 1;	
	tree.push (newNode);	
}
console.log(tree);

if (count>2){
  for (let i = 0; i < count-2; i++){
	let minInd3 = 0;
	let minFreq3 = inText.length;
	let minLetter3 = '';
	for (let j = 0; j < count; j++){
		if ((tree[j].freq <= minFreq3)&&(tree[j].used==0)&&(tree[j].letter!=minLetter1)&&(tree[j].letter!=minLetter2)){
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
if (count>1){
for (let i = tree.length-2; i > count-1;i--){
		tree[i].code=tree[i+1].code+'1';
	}
}
//кодируем буквы
let longCode=0;
if (count>2){
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
		   longCode = tree[trueLetter].code.length;
	}
	else
	{
		tree[trueLetter].code = tree[tree[trueLetter].link].code + '1';
		tree[tree[trueLetter].link].used+=1;
		console.log(tree[trueLetter].letter, '-', tree[trueLetter].code);
		longCode = tree[trueLetter].code.length;
	}
}
}
if (count == 1){
	tree[0].code = '0';
	console.log(tree[0].letter, '-', tree[0].code);
	longcode = 1;
}
if (count==2){
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
	
	longCode=2;
}
console.log(tree);
//кодируем строку
let stringEncoded = '';		
for (let i = 0; i < inText.length;i++){
	for (j = 0; j < count; j++){
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
    while ((stringEncoded[i]!='0')&&(lengthCode < longCode-1)&&(i<stringEncoded.length)){
		checkString+=stringEncoded[i];
		lengthCode+=1;
		i+=1;
	}
	checkString+=stringEncoded[i];
	for (let j = 0; j < count;j++){
		if (checkString == tree[j].code){
			stringDecoded+=tree[j].letter;
		    
		}
	}
	lengthCode = 0;
    checkString = '';
	i+=1;
	
}
console.log('stringDecoded - ', stringDecoded);

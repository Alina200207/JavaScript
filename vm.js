let fs = require('fs');
let arg = process.argv;
let mem = new Array();
let readLine = require('readline-sync');
let text = fs.readFileSync('fact.jss');
text = text.toString();
let countip = 0;
let countfor = 1;

mem = text.split(/\s/);

for(let i=0; i<mem.length;i++)
	console.log(i, mem[i]);

let ip = 0;

let flag = true;

while(flag)
	switch(mem[ip]){
	case 'set': 
		mem[mem[ip+1]]=parseFloat(mem[ip+2]);
		ip+=3;
		break;
    case 'input':
        mem[mem[ip+1]]=parseInt(readLine.question("Enter a number"));
        ip+=2;
        break;		
	case 'output':
		console.log(mem[mem[ip+1]]);
		ip+=2;
	    break;
	case 'add':
		mem[mem[ip+3]]=mem[mem[ip+1]]+mem[mem[ip+2]];
		ip+=4;
		countip+=4;
	    break;
	case 'multip':
        mem[mem[ip+3]]=mem[mem[ip+1]]*mem[mem[ip+2]];
        ip+=4;
		countip+=4;
		break;
	case 'for':
	    if (countfor < mem[mem[ip+1]]){
		   ip=ip-countip;
           countfor+=1;
		   countip = 0;
		}
		else{
		   ip+=2;
		}
		break;
	case 'copy':
	    mem[mem[ip+2]]=mem[mem[ip+1]];
		ip+=3;
		countip+=3;
		break;    
	case 'exit':
		flag = false;
}


for (let i=0; i<mem.length;i++)
	console.log(i, mem[i]);
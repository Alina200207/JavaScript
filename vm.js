let fs = require('fs');
let arg = process.argv;
let mem = new Array();
let readLine = require('readline-sync');
let text = fs.readFileSync('sum.jss');
text = text.toString();

mem = text.split(/\s/);

for(let i=0; i<mem.length;i++)
	console.log(i, mem[i]);

ip = 0;
var arg1 = 0;
var arg2 = 0;
flag = true;
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
	    break;
	case 'multip':
        mem[mem[ip+3]]=mem[mem[ip+1]]*mem[mem[ip+2]];
        ip+=4;
		break;
    case 'fact':
	    arg1 = mem[mem[ip+1]];
	    let count = 1;
        for (let i = 2; i<mem[mem[ip+1]]+1;i++)
			count*=i;
		mem[mem[ip+2]]=count;
        ip+=3;
		break;
	case 'cubeOfNumber':
	    arg2 = mem[mem[ip+1]];
	    mem[mem[ip+2]]=mem[mem[ip+1]]*mem[mem[ip+1]]*mem[mem[ip+1]];
		ip+=3;
		break;
	case 'compare':
	    if (parseInt(mem[mem[ip+1]]) < parseInt(mem[mem[ip+2]])) 
			mem[mem[ip+3]]=`cube ${arg2} of a number more than factorial ${arg1}`;
		else mem[mem[ip+3]]=`factorial ${arg1} more than cube of a number ${arg2}`;
		ip+=4;
		break;
	case 'exit':
		flag = false;
}


for (let i=0; i<mem.length;i++)
	console.log(i, mem[i]);
let expression = new Array();
expression = [1, "*", "(", "(", 2, "+", 3, ")", "/", "(", 4, "+", 5, ")", ")", "^", 6, "^", 7];
function postinfix (expression){
	let stack = new Array();
	let operations = new Array();
	let opera = "+-*/^";
	let outputstr = [];
	function Znach(operation, prior) {
		this.operation = operation;
		this.prior = prior;
	}
	//операции и их приоритеты
	operations.push(new Znach('(', 0));
	operations.push(new Znach(')', 0));
	operations.push(new Znach('+', 1));
	operations.push(new Znach('-', 1));
	operations.push(new Znach('*', 2));
	operations.push(new Znach('/', 2));
	operations.push(new Znach('^', 3));
	stack.push(new Znach ('.', 0));
	//переводим выражение в польскую запись
	let znak = '';
	let newopera;
	for (let i = 0; i < expression.length; i++) {
		if (parseInt(expression[i])) {
			outputstr.push(expression[i]);
		}
		else if (expression[i] == '(')
			stack.push(new Znach(expression[i], 0));
		else if (expression[i] == ')') {
			let l = stack.length - 1;
			while (stack[l].operation != '(') {
				outputstr.push(stack[l].operation);
				stack.pop();
				l--;
			}
			stack.pop();
		}
		else if (opera.includes(expression[i])) {
			if ((expression[i] == '^') && (stack[stack.length - 1].operation == '^'))
				stack.push(new Znach(expression[i], 3));
			else {
				for (let j = 0; j < operations.length; j++)
					if (operations[j].operation == expression[i])
						newopera = new Znach(expression[i], operations[j].prior);
				let maxpriorindex = stack.length;
				for (let k = stack.length - 1; k >= 0; k--) {
					if (stack[k].operation == '(')
						break;
					if (stack[k].prior >= newopera.prior)
						maxpriorindex = k;
				}
				let j = stack.length-1;
				if (maxpriorindex != stack.length) {
					while (j >= maxpriorindex) {
						outputstr.push(stack[j].operation);
						stack.pop();
						j--;
					}
				}
				stack.push(newopera);
			}
		}
	}
	stack.shift();
	for (let i = stack.length-1; i>=0;i--)
		outputstr.push(stack[i].operation);
	return outputstr;
}
console.log("post infix expression = ", postinfix(expression));


// тесты для отладки
let tests = new Array(
[], // => empty
[1,"+",2], // => 1 2 +
[1,"*",3], // => 1 3 *
[2,"+","(",3,"*",4,")"], // => 2 3 4 * +
["(",2,"+",3,")","*",4], // => 2 3 + 4 *
[3,"+",4,"*",2,"/","(", 1,"-",5,")","^",2], // => 3 4 2 * 1 5 - 2 ^ / +
["(",1,"+",2,")","*",4,"+",3] // => 1 2 + 4 * 3 +
);
let testsres = new Array(
[],
[1,2,"+"],
[1,3,"*"],
[2,3,4,"*","+"],
[2,3,"+",4,"*"],
[3,4,2,"*",1,5,"-",2,"^","/","+"],
[1,2,"+",4,"*",3,"+"]
);

for (let i = 0; i < tests.length; i++) {
	console.log(tests[i], "=", postinfix(tests[i]).toString())
	console.log(postinfix(tests[i]).toString()==testsres[i].toString());
}



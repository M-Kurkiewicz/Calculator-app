// // strip anything other than digits, (), -+/* and .
// let equation = calculationScreen.innerHTML.replace(/[^-()\d/*+.]/g, '');
// calculationScreen.innerHTML = eval(equation);
// could just use it if not for Odin ---^ :D

function calculate(equation){
    for(let number of equation){
        if(number == '*'){
            let indexOfOperator = equation.indexOf(number);
            let miniEquation = parseFloat(equation[indexOfOperator-1]) * parseFloat(equation[indexOfOperator+1]);
            equation.splice(indexOfOperator-1,1);
            equation.splice(indexOfOperator,1);
            equation[indexOfOperator-1] = miniEquation;
            calculate(equation)
        }
        // console.log(equation)
        if(number == '/'){
            let indexOfOperator = equation.indexOf(number)
            let miniEquation = parseFloat(equation[indexOfOperator-1]) / parseFloat(equation[indexOfOperator+1]);
            equation[indexOfOperator] = miniEquation;
            equation.splice(indexOfOperator-1,1);
            equation.splice(indexOfOperator,1);
            calculate(equation)
        }
        // console.log(equation)
    }
    
    for(let number of equation){
        if(number == '+'){
            let indexOfOperator = equation.indexOf(number)
            let miniEquation = parseFloat(equation[indexOfOperator-1]) + parseFloat(equation[indexOfOperator+1]);
            equation[indexOfOperator] = miniEquation;
            equation.splice(indexOfOperator-1,1);
            equation.splice(indexOfOperator,1);
            calculate(equation)
        }
        // console.log(equation)
        if(number == '-'){
            console.log(equation)
            if (equation.indexOf(number) == '0'){
                let miniEquation = 0 - parseFloat(equation[1]);
                equation[0] = miniEquation;
                equation.splice(1,1);
                console.log(equation)
                calculate(equation)
            }
            else {
                console.log(equation)
                let indexOfOperator = equation.indexOf(number)
                let miniEquation = parseFloat(equation[indexOfOperator-1]) - parseFloat(equation[indexOfOperator+1]);
                equation[indexOfOperator] = miniEquation;
                equation.splice(indexOfOperator-1,1);
                equation.splice(indexOfOperator,1);
                calculate(equation)
            }

        }
        // console.log(equation)
    }
//    console.log(equation)
   return equation;
}

let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
var calculationScreen = document.getElementById('calculation-screen');
var outcomeScreen = document.getElementById('outcome-screen');
calculationScreen.innerHTML = '';
let operatorList = [];
for(let operator of operators){
    operatorList.push(operator.innerHTML)
}
let lastSymbol = '';
let dotButton = document.getElementById('dot-button')

// DISPLAY FOR NUMBERS
for(let number of numbers) {
    number.addEventListener('click',function(){
        calculationScreen.innerHTML += number.innerHTML;
        lastSymbol = number.innerHTML;
    })
}
// DISPLAY FOR OPERATORS()
for(let operator of operators) {
    operator.addEventListener('click',function(){
        if(!(operatorList.includes(lastSymbol))){
            if(operator.innerHTML == '-') {
                calculationScreen.innerHTML += " "+ operator.innerHTML + " ";
                lastSymbol = operator.innerHTML;
             }
            else {
                if(calculationScreen.innerHTML != ''){
                    calculationScreen.innerHTML += " " + operator.innerHTML + " ";
                    lastSymbol = operator.innerHTML;
                }
            }
        }
    })     
}
// CLEAR BUTTON FUNCTION
let clearButton = document.getElementById('clear-button')
clearButton.addEventListener('click',function(){
    calculationScreen.innerHTML = '';
    outcomeScreen.innerHTML = '';
})

let backButton = document.getElementById('back-button')
backButton.addEventListener('click',function(){
    if(calculationScreen.innerHTML.slice(-1) == " "){
        calculationScreen.innerHTML = calculationScreen.innerHTML.slice(0,-3)
        lastSymbol = calculationScreen.innerHTML.slice(-1)
        outcomeScreen.innerHTML = '';
    }
    else {
        calculationScreen.innerHTML = calculationScreen.innerHTML.slice(0,-1)
        outcomeScreen.innerHTML = '';
    }
})

// EQUALS BUTTON BUTTON FUNCTION
let equalsButton = document.getElementById('equals-button')
equalsButton.addEventListener('click',function(){
    if(!(operatorList.includes(lastSymbol))){
        equation = calculationScreen.innerHTML.split(" ");
        outcomeScreen.innerHTML = calculate(equation);
    }

})
// DOT BUTTON BUTTON FUNCTION
dotButton.addEventListener('click',function(){
    if(!(operatorList.includes(lastSymbol))){
        calculationScreen.innerHTML += ".";
        lastSymbol = '.';
        operatorList.push('.');
    }
})

let negateButton = document.getElementById('negate-button');
negateButton.addEventListener('click',function(){
    if(!(operatorList.includes(lastSymbol))){
        let screenOutcome = calculationScreen.innerHTML.split(" ");
        let lastNumber = screenOutcome.pop();
        let negatedNumber = lastNumber - lastNumber*2;
        screenOutcome.push(negatedNumber);
        calculationScreen.innerHTML = screenOutcome.join(" ");

    }
})
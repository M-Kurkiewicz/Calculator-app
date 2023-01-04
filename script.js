// // strip anything other than digits, (), -+/* and .
// let equation = screen.innerHTML.replace(/[^-()\d/*+.]/g, '');
// screen.innerHTML = eval(equation);
// could just use it if not for Odin ---^ :D

function calculate(equation){
    for(let number of equation) {
        if(number != '*' || '/' || '+' || '-'){
            continue;
        }
        else {
            number = parseInt(number);
        }
    }
    for(let number of equation){
        if(number == '*'){
            let indexOfOperator = equation.indexOf(number);
            let miniEquation = parseInt(equation[indexOfOperator-1]) * parseInt(equation[indexOfOperator+1]);
            equation.splice(indexOfOperator-1,1);
            equation.splice(indexOfOperator,1);
            equation[indexOfOperator-1] = miniEquation;
            calculate(equation)
        }
        // console.log(equation)
        if(number == '/'){
            let indexOfOperator = equation.indexOf(number)
            let miniEquation = parseInt(equation[indexOfOperator-1]) / parseInt(equation[indexOfOperator+1]);
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
            let miniEquation = parseInt(equation[indexOfOperator-1]) + parseInt(equation[indexOfOperator+1]);
            equation[indexOfOperator] = miniEquation;
            equation.splice(indexOfOperator-1,1);
            equation.splice(indexOfOperator,1);
            calculate(equation)
        }
        // console.log(equation)
        if(number == '-'){
            console.log(equation)
            if (equation.indexOf(number) == '0'){
                let miniEquation = 0 - parseInt(equation[1]);
                equation[0] = miniEquation;
                equation.splice(1,1);
                console.log(equation)
                calculate(equation)
            }
            else {
                console.log(equation)
                let indexOfOperator = equation.indexOf(number)
                let miniEquation = parseInt(equation[indexOfOperator-1]) - parseInt(equation[indexOfOperator+1]);
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
var screen = document.getElementById('screen');
screen.innerHTML = null;

// DISPLAY FOR NUMBERS
for(let number of numbers) {
    number.addEventListener('click',function(){
        screen.innerHTML += number.innerHTML;
    })
}
// DISPLAY FOR OPERATORS()
for(let operator of operators) {
    operator.addEventListener('click',function(){
        if(operator.innerHTML == '-') {
            screen.innerHTML += operator.innerHTML + " ";
        }
        else {
            if(screen.innerHTML != ''){
                screen.innerHTML += " " + operator.innerHTML + " ";
            }
        }
    })
}
// CLEAR BUTTON FUNCTION
let clearButton = document.getElementById('clear-button')
clearButton.addEventListener('click',function(){
    screen.innerHTML = '';
})
// EQUALS BUTTON BUTTON FUNCTION
let equalsButton = document.getElementById('equals-button')
equalsButton.addEventListener('click',function(){
    equation = screen.innerHTML.split(" ");
    screen.innerHTML = calculate(equation);

})

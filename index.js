
var calculatorform = document.querySelector('.calculator');
var controls = document.querySelector('.controls');
var output = document.querySelector('.current-calculation-display');
var digits = document.querySelectorAll('.digit');
var operators = document.querySelectorAll('.operator');
var equals = document.querySelector('.equals');
var options = document.querySelectorAll('.option');


//Model
var model = {
    tempResult: 0,
    wholeEquation: [],
    firstOperand: 0,
    secondOperand: 0,
    currentInput: 0,
    operator: '',
    executed: false,
    addition() {
        model.tempResult = parseFloat(model.firstOperand) + parseFloat(model.secondOperand);
    },
    subtraction() {
        model.tempResult = parseFloat(model.firstOperand) - parseFloat(model.secondOperand);
    },
    multiplication() {
        model.tempResult = parseFloat(model.firstOperand) * parseFloat(model.secondOperand);
    },
    division() {
        model.tempResult = parseFloat(model.firstOperand) / parseFloat(model.secondOperand);
    },
    updateWholeEquation() {
        model.wholeEquation.push([model.firstOperand, model.operator, model.secondOperand, model.tempResult]);
        /*if ( Math.round(model.tempResult) == model.tempResult ) {
            model.decimals = false;
        }*/
        //console.log(model.wholeEquation);
        //console.log(model.firstOperand,model.operator,model.secondOperand,model.tempResult);

        document.getElementById("former-equation").value = model.firstOperand + model.operator + model.secondOperand + "=" + model.tempResult
        //console.log(model.currentInput)
    }

}

var view = {
    updateDisplay() {
        output.textContent = model.currentInput;
    },
    showResult() {
        if (model.tempResult.length > 10 && model.tempResult.includes('.')) {
            output.textContent = parseFloat(model.tempResult.toFixed(4));
        } else {
            output.textContent = model.tempResult;
        }
    }
}

var controller = {
    setUpHandlers() {

        document.addEventListener('keypress', controller.handleKeyboardInput);
        output.textContent = "0";

    },

    handleKeyboardInput(event) {

        let key = event.key;
        if (parseInt(key) >= 0 && parseInt(key) <= 9) {
            console.log(parseInt(key) >= 0 && parseInt(key) <= 9)
            controller.triggerDigit(key)
        }

        let operatorsChars = [
            '+',
            '-',
            '*',
            '/'
        ];

        // switch may be slow in comparison to if/else, so we use faster method
        if (operatorsChars.includes(key)) {
            controller.triggerOperator(key)
        } else if (key == "." || key == ",") {
            controller.triggerOption(".")
        }

        // however we have very limited set, so let's play with switch :)
        switch (key) {
            case 'c':
                controller.triggerOption("AC")
                break;
            case '=':
                controller.execute();
                break;
        }

    },
    handleClickDupe(event) {
        event.preventDefault(); //prevent default behavior
        if (event.type == "touchstart") {
            // Handle touchstart event.
        } else if (event.type == "click") {
            // Handle click event.
        }
    },
    triggerDigit(digit) {
        if (model.currentInput) {
            if (model.executed == false) {
                model.currentInput += digit;
                view.updateDisplay();
            }
            model.executed = false;
        }
        else {
            if (digit !== '0') {
                model.currentInput += digit;
                view.updateDisplay();
            }
        }
    },
    triggerOperator(operator) {
        if (!model.executed) {
            controller.execute();
        }
        model.executed = false;
        model.operator = operator;
        model.currentInput = output.textContent;
        model.firstOperand = model.currentInput;
        model.currentInput = '';
        console.log(model)
    },
    execute() {
        console.log(model)
        if (model.currentInput == "") { model.currentInput = model.secondOperand }
        switch (model.operator) {
            case '+':
                model.secondOperand = model.currentInput;
                model.addition();
                model.updateWholeEquation();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
            case '-':
                model.secondOperand = model.currentInput;
                model.subtraction();
                model.updateWholeEquation();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
            case '*':
                model.secondOperand = model.currentInput;
                model.multiplication();
                model.updateWholeEquation();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
            case '/':
                model.secondOperand = model.currentInput;
                model.division();
                model.updateWholeEquation();
                view.showResult();
                model.firstOperand = model.tempResult;
                break;
        }
    },
    triggerOption(value) {
        let optionTriggered = value;
        switch (optionTriggered) {
            case 'AC':
                controller.allClear();
                break;
            case '.':
                if (isInt(model.currentInput) && !output.textContent.includes(".")) {
                    model.currentInput += '.';
                    output.decimals = true;
                    view.updateDisplay();
                }

                break;

        }
    },
    allClear() {
        model.executed = false;
        model.tempResult = 0;
        model.firstOperand = 0;
        model.secondOperand = 0;
        model.currentInput = 0;
        model.operator = '';
        model.decimals = false;
        view.updateDisplay();
        console.log("allclear");
    }
}

controller.setUpHandlers();



function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}


// Check if a support for Class exists
function checkEsSupport() {
    if (typeof Symbol == "undefined") return console.log("aaaaaaaaaaaaaa");
    try { calculationFunction(); }
    catch (e) { return false; }

    return true;
}

if (checkEsSupport()) {
    // Use SpecialObject and specialFunction
} else {
    // You cannot use them :(
}

var calculationFunction = function (x, y, operand) {

}


class Calculate {

    varructor(x, y, operator) {
        this.x = x;
        this.y = y;
        this.operator = operator;
    }

    get prop() {
        return 'getter';
    }

    set prop(value) {
        console.log('setter: ' + value);
    }

    get calculation() {
        return this.calculate();
    }

    calculate() {
        if (this.operator = "+") {
            return this.x + this.y;
        } else if (this.operator = "-") {
            return this.x + this.y;
        } else if (this.operator = "*") {
            return this.x + this.y;
        } else if (this.operator = "/") {
            return this.x + this.y;
        }

    }



}

var calculate = new Calculate(10, 10, "+");

console.log(calculate.calculation);

window.onload = () => {
    document.getElementById("widget-calculator").addEventListener("input", function (event) {
        console.log(event);
    });
};
var WidgetCalculator = function () {
    var calculatorform = document.querySelector('.calculator');
    var controls = document.querySelector('.control-buttons');
    var preview = document.getElementById("former-equation");
    var output = document.querySelector('.current-calculation-display');

    //Model
    var model = {
        result: 0,
        wholeEquation: [],
        firstOperand: 0,
        secondOperand: 0,
        lastInput: 0,
        currentInput: '',
        operator: '',
        performedCalculation: false,
        addition: function () {
            model.result = parseFloat(model.firstOperand) + parseFloat(model.secondOperand);
        },
        subtraction: function () {
            model.result = parseFloat(model.firstOperand) - parseFloat(model.secondOperand);
        },
        multiplication: function () {
            model.result = parseFloat(model.firstOperand) * parseFloat(model.secondOperand);
        },
        division: function () {
            model.result = parseFloat(model.firstOperand) / parseFloat(model.secondOperand);
        }

    }

    var view = {
        updateDisplay: function (reset) {
            if (reset) {
                output.textContent = '0';
                preview.value = "";
            } else {
                output.textContent = model.currentInput;
            }
        },
        showResult: function () {
            document.getElementById("former-equation").value = model.firstOperand + model.operator + model.secondOperand + "=" + model.result;
            if (model.result.length > 10 && model.result.indexOf('.') !== -1) {
                output.textContent = parseFloat(model.result.toFixed(4));
            } else {
                output.textContent = model.result;
            }
        }
    }

    var controller = {


        operatorsKeys: [
            '+',
            '-',
            '*',
            '/'
        ],

        setUpHandlers: function () {



            document.addEventListener('keypress', controller.handleKeyboardInput);
            calculatorform.addEventListener('input', function (event) {
                console.log(this.event + "!!!");
            });
            controls.addEventListener('click', controller.handlePointerInput);
            //controls.addEventListener('touchend', controller.handlePointerInput);

        },
        updateWholeEquation: function (reset) {
            if (!reset) {
                model.wholeEquation.push([model.firstOperand.toString() + model.operator.toString() + model.secondOperand.toString() + "=" + model.result]);
            } else {
                model.wholeEquation = [];
            }
        },
        handlePointerInput: function (event) {
            if (event.type == "touchend") {
                //event.preventDefault()
                //document.activeElement.blur();
            } else if (event.type == "click") {

            }
            var key = event.target.value;
            if (parseInt(key) >= 0 && parseInt(key) <= 9) {
                controller.triggerDigit(key)
                navigator.vibrate([50]);
            }

            // switch may be slow in comparison to if/else, so we use faster method
            if (controller.operatorsKeys.indexOf(key) !== -1) {
                controller.triggerOperator(key)
                navigator.vibrate([50]);
            } else if (key == ".") {
                controller.triggerOption(".")
                navigator.vibrate([50]);
            }

            // however we have very limited set, so let's play with switch :)
            switch (key) {
                case 'AC':
                    controller.triggerOption("AC")
                    navigator.vibrate([50]);
                    break;
                case 'Save':
                    controller.save();
                    navigator.vibrate([50]);
                    break;
                case '=':
                    controller.performCalculation();
                    navigator.vibrate([50]);
                    break;
            }
        },
        handleKeyboardInput: function (event) {

            var key = event.key;
            if (parseInt(key) >= 0 && parseInt(key) <= 9) {
                controller.triggerDigit(key)
            }

            // switch may be slow in comparison to if/else, so we use faster method

            if (controller.operatorsKeys.indexOf(key) !== -1) {
                controller.triggerOperator(key)
            } else if (key == "." || key == ",") {
                controller.triggerOption(".")
            }

            // however we have very limited set, so let's play with switch :)
            switch (key) {
                case 'c':
                    controller.triggerOption("AC")
                    break;
                case 's':
                    controller.save();
                    break;
                case '=':
                    controller.performCalculation();
                    break;
            }

        },
        handleClickDupe: function (event) {
            event.preventDefault(); //prevent default behavior
            if (event.type == "touchstart") {
                // Handle touchstart event.
            } else if (event.type == "click") {
                // Handle click event.
            }
        },
        triggerDigit: function (digit) {
            if (model.currentInput !== "" || model.currentInput === "0.") {
                //if (model.performedCalculation == false) {
                model.currentInput += digit;
                view.updateDisplay();
                //} 
                model.performedCalculation = false;
            } else {
                console.log()
                if (digit === '0') {
                    if (!model.currentInput.length) {
                        model.currentInput = digit;
                        view.updateDisplay();
                    }
                } else {
                    model.currentInput == "" ? model.currentInput = digit : model.currentInput += digit;
                    view.updateDisplay();

                };


            }
        },
        triggerOperator: function (operator) {
            if (!model.performedCalculation) {
                controller.performCalculation();
            }
            model.performedCalculation = false;
            model.operator = operator;
            model.currentInput = output.textContent;
            model.firstOperand = model.currentInput;
            model.currentInput = '';
        },
        performCalculation: function () {
            console.log("model exec")
            model.performedCalculation = true;
            model.decimals = false;

            if (model.currentInput != "" && model.firstOperand) {
                model.lastInput = model.currentInput
                model.currentInput = "";
            }

            switch (model.operator) {
                case '+':
                    model.secondOperand = model.lastInput;
                    model.addition();
                    controller.updateWholeEquation();
                    view.showResult();
                    model.firstOperand = model.result;
                    break;
                case '-':
                    model.secondOperand = model.lastInput;
                    model.subtraction();
                    controller.updateWholeEquation();
                    view.showResult();
                    model.firstOperand = model.calcuationResult;
                    break;
                case '*':
                    model.secondOperand = model.lastInput;
                    model.multiplication();
                    controller.updateWholeEquation();
                    view.showResult();
                    model.firstOperand = model.result;
                    break;
                case '/':
                    model.secondOperand = model.lastInput;
                    model.division();
                    controller.updateWholeEquation();
                    view.showResult();
                    model.firstOperand = model.result;
                    break;
            }
        },
        save: function () {

            // Same as below, but in arrow func
            //var csvContentArrow = "data:text/csv;charset=utf-8," + rows.map(e=>e.join(",")).join("\n");

            var csvContent = "data:text/csv;charset=utf-8,";
            var wholeEquation = model.wholeEquation;
            wholeEquation.forEach(function (wholeEquation) {
                var wholeEquationRow = wholeEquation.join(",");
                console.log(wholeEquationRow)
                csvContent += wholeEquationRow + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "calculations.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
            /*fetch("create_csv.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "payload": model.wholeEquation
                })
            });*/
        },
        triggerOption: function (optionTriggered) {

            switch (optionTriggered) {
                case 'AC':
                    controller.allClear();
                    break;
                case '.':

                    if (model.currentInput == '') {
                        model.currentInput = '0.';
                    } else if (model.currentInput.indexOf('.') == -1) {
                        model.currentInput += '.';
                    }

                    model.decimals = true;
                    view.updateDisplay();

                    break;

            }
        },
        allClear: function () {
            model.performedCalculation = false;
            model.result = 0;
            model.firstOperand = 0;
            model.secondOperand = 0;
            model.lastInput = 0;
            model.currentInput = '';
            model.operator = '';
            model.decimals = false;
            view.updateDisplay(reset = true);
            controller.updateWholeEquation(reset = true);
        }
    }

    return {
        model: model,
        view: view,
        controller: controller
    }

}(); // call the WidgetCalculator.controller.setUpHandlers()

WidgetCalculator.controller.setUpHandlers();

/*
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

*/
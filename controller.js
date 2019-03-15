/*                                 
  _      ___    __         __  _____     __         __     __          
 | | /| / (_)__/ /__ ____ / /_/ ___/__ _/ /_____ __/ /__ _/ /____  ____
 | |/ |/ / / _  / _ `/ -_) __/ /__/ _ `/ / __/ // / / _ `/ __/ _ \/ __/
 |__/|__/_/\_,_/\_, /\__/\__/\___/\_,_/_/\__/\_,_/_/\_,_/\__/\___/_/   
               /___/                                                   
       
                __           ____       
 _______  ___  / /________  / / /__ ____
/ __/ _ \/ _ \/ __/ __/ _ \/ / / -_) __/
\__/\___/_//_/\__/_/  \___/_/_/\__/_/   

                         
Widget calculator controller - handles widget actions
                                                 
*/

WidgetCalculator.controller = function () {

    var model = WidgetCalculator.model;
    var view  = WidgetCalculator.view;

    // Hidden input elem used as a source of data for the create_csv.php
    var calcdata = WidgetCalculator.widgetElements.calcdata;

    // Key values which should trigger operation actions
    var operatorsKeys = [
        '+',
        '-',
        '*',
        '/'
    ];

    // Handling user input of digit characters
    var triggerDigit = function (digit) {
        if (model.currentInput !== "" || model.currentInput === "0.") {
            // if no previous input is empty made or if user has put decimal separator, append the digit
            model.currentInput += digit;
            // update the main screen
            view.updateDisplay();
            model.performedCalculation = false;
        } else {
            if (digit === '0') {
                // if input is '0', replace it with 0 in view and model
                console.log(model.currentInput === '0')
                if (!model.currentInput.length) {
                    model.currentInput = digit;
                    view.updateDisplay();
                }
            } else {
                // if input is empty f.ex. after calculation has been executed, replace the digit
                if (!model.currentInput.length) {
                    model.currentInput = digit;
                    view.updateDisplay();
                } else {
                // otherwise append the digit
                    model.currentInput += digit;
                    view.updateDisplay();
                }
            }


        }
    };
    var triggerOperator = function (operator) {
        // if calculation of operands was not done, operator input triggers its execution
        if (!model.performedCalculation) {
            performCalculation();
        }
        model.performedCalculation = false;
        model.operator = operator;

        // get current input from screen and replace comma to dot
        model.currentInput = WidgetCalculator.widgetElements.output.textContent.replace(',', '.');

        // set first operand value
        model.firstOperand = model.currentInput;
        
        // clear current input as it it should be cleared after performing calculation
        model.currentInput = '';

        // set the operator used on screen display to more human one
        view.operator = operator;
        if (operator === '*') {
            view.operator = '×';
        } else if (operator === '/') {
            view.operator = '÷';
        }
    };

    var updateWholeEquation = function (reset) {
        if (!reset) {
            // build the equation string used for sending former equations to server
            model.wholeEquation.push([model.firstOperand.toString() + " " + view.operator + " " + model.secondOperand.toString() + " = " + model.result]);
            // store these equations in hidden input elem
            calcdata.value = JSON.stringify(model.wholeEquation);
        } else {
            // if AC is triggered, clear the former equations and disable Save btn
            model.wholeEquation = [];
            calcdata.value = "";
            view.disableSaveBtn();
        }
    };
    // vibration on mobile devices
    var vibrate = function () {
        if ("vibrate" in navigator) {
            navigator.vibrate([50]);
        } else {
            // no vibration detected
        }
    };
    
    // handling user interaction with calculator buttons
    var handlePointerInput = function (event) {
        var key = event.target.value;
        if (parseInt(key) >= 0 && parseInt(key) <= 9) {
            triggerDigit(key)
            vibrate()
        };

        // switch may be slow in comparison to if/else, so we use faster method
        if (operatorsKeys.indexOf(key) !== -1) {
            triggerOperator(key)
            vibrate();
        } else if (key == ".") {
            triggerOption(".")
            vibrate();
        } else if (key == "history") {
            vibrate()
            window.open("Calculations.php", '_blank');
        }

        // however we have very limited set, so let's play with switch :)
        switch (key) {
            case 'AC':
                triggerOption("AC")
                vibrate()
                break;
            case 'Save':
                save();
                vibrate()
                break;
            case '=':
                performCalculation();
                vibrate()
                break;
        }
    };
    // handling keyboard input
    var handleKeyboardInput = function (event) {

        var key = event.key;
        if (parseInt(key) >= 0 && parseInt(key) <= 9) {
            triggerDigit(key)
        }

        if (operatorsKeys.indexOf(key) !== -1) {
            triggerOperator(key)
        } else if (key == "." || key == ",") {
            triggerOption(".")
        }
        switch (key) {
            case 'c':
                triggerOption("AC")
                break;
            case 's':
                save();
                break;
            case '=':
                performCalculation();
                break;
            case 'Enter':
                performCalculation();
                break;
        }

    };
    // handling execution of the calculation
    var performCalculation = function () {
        model.performedCalculation = true;
        model.decimals = false;

        if (model.currentInput != "" && model.firstOperand) {
            model.lastInput = model.currentInput;
            model.currentInput = "";
        }
        switch (model.operator) {
            case '+':
                model.secondOperand = model.lastInput;
                model.addition(model.firstOperand,model.secondOperand);
                updateWholeEquation();
                view.showResult()
                model.firstOperand = model.result;
                break;
            case '-':
                model.secondOperand = model.lastInput;
                model.subtraction(model.firstOperand,model.secondOperand);
                updateWholeEquation();
                view.showResult();
                model.firstOperand = model.result;
                break;
            case '*':
                model.secondOperand = model.lastInput;
                model.multiplication(model.firstOperand,model.secondOperand);
                updateWholeEquation();
                view.showResult();
                model.firstOperand = model.result;
                break;
            case '/':
                model.secondOperand = model.lastInput;
                model.division(model.firstOperand,model.secondOperand);
                updateWholeEquation();
                view.showResult();
                model.firstOperand = model.result;
                break;
        }
        view.enableSaveBtn();
    };

    // handling saving former equations
    var save = function () {

        if (calcdata.value != "") {

            var csvContent = "data:text/csv;charset=utf-8,";
            WidgetCalculator.model.wholeEquation.forEach(function (wholeEquation) {
                var wholeEquationRow = wholeEquation.join(",");
                csvContent += wholeEquationRow + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "calculations.csv");
            document.body.appendChild(link);

            link.click(); // this will trigger download the data file

            var send = function () {
                var request = new XMLHttpRequest();
                request.open('POST', 'create_csv.php', false);

                var formData = new FormData();
                formData.append("calcdata", calcdata.value);

                request.send(formData);
                model.wholeEquation = [];
                calcdata.value = '';
            };
            send()
        }
    };
    // handle decimal character input and AC
    var triggerOption = function (optionTriggered) {

        switch (optionTriggered) {
            case 'AC':
                allClear();
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
    };

    // handle execution of AC
    var allClear = function () {
        model.performedCalculation = false;
        model.result = 0;
        model.firstOperand = 0;
        model.secondOperand = 0;
        model.lastInput = 0;
        model.currentInput = '';
        model.operator = '';
        model.decimals = false;
        view.updateDisplay(reset = true);
        updateWholeEquation(reset = true);
    };

    // initialization of the widget handlers
    var setUpHandlers = function () {
        WidgetCalculator.widgetElements.calculatorform.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        document.addEventListener('keypress', handleKeyboardInput);
        WidgetCalculator.widgetElements.controls.addEventListener('click', handlePointerInput);

    }

    return {
        setUpHandlers: setUpHandlers
    }

}();

// Execute init of the controller
WidgetCalculator.controller.setUpHandlers();
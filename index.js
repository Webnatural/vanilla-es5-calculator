/*                                    _   _           _ ___  _ 
| |                                  | | | |    _    ( )__ \( )
| |__   _____      __      _ __      | | | |  _| |_  |/   ) |/ 
| '_ \ / _ \ \ /\ / /     | '__|     | | | | |_   _|     / /   
| | | | (_) \ V  V /   _  | |     _  | |_| |   |_|      |_|    
|_| |_|\___/ \_/\_/   (_) |_|    (_)  \___/             (_)    
                                                               
  __                     _           ___  
 / _|                   | |         |__ \ 
| |_ ___ _ __ _ __ ___  | |_   ___  __ ) |
|  _/ _ \ '__| '__/ _ \ | | | | \ \/ // / 
| ||  __/ |  | | |  __/_| | |_| |>  <|_|  
|_| \___|_|  |_|  \___(_)_|\__,_/_/\_(_)  
                                          
                                                 
*/  var WidgetCalculator = function () {
    var calculatorform = document.querySelector('.calculator');
    var controls = document.querySelector('.control-buttons');
    var preview = document.getElementById("former-equation");;
    var output = document.querySelector('.current-calculation-display');
    var calcdata = document.getElementById("calculations-data");
    var savebtn = document.querySelector('button.save');

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
            if (model.secondOperand !== 0) {
                model.result = parseFloat(model.firstOperand) / parseFloat(model.secondOperand);
            } else {
                model.result = "cannot divide by 0";
            }
        }

    }

    var view = {
        updateDisplay: function (reset) {
            if (reset) {
                output.textContent = '0';
                preview.value = "";
                view.result = "";
                view.operator = "";
            } else {
                output.textContent = model.currentInput.replace(".", ",");
                if (view.result && view.operator) {
                    preview.value = view.result.replace(".", ",") + " " + view.operator;
                }
            }
        },
        showResult: function () {
            preview.value = model.firstOperand.toString().replace(".", ",") + " " + view.operator + " " + model.secondOperand.toString().replace(".", ",") + " =";
            if (model.result.toString().indexOf('.') !== -1) {
                view.result = model.result.toString().replace(".", ",");
                output.textContent = view.result;
            } else if (isNaN(model.result)) {
                model.result = 0;
            } else {
                view.result = model.result.toString().replace(".", ",")
                output.textContent = view.result;
            }
        },
        enableSaveBtn: function () {
            savebtn.disabled = false;
        },
        disableSaveBtn: function () {
            savebtn.disabled = true;
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

            calculatorform.addEventListener('submit', function (event) {
                event.preventDefault();
            });
            document.addEventListener('keypress', controller.handleKeyboardInput);
            controls.addEventListener('click', controller.handlePointerInput);

        },
        updateWholeEquation: function (reset) {
            if (!reset) {
                model.wholeEquation.push([model.firstOperand.toString() + " " + view.operator + " " + model.secondOperand.toString() + " = " + model.result]);
                calcdata.value = JSON.stringify(model.wholeEquation);
            } else {
                model.wholeEquation = [];
                calcdata.value = "";
                view.disableSaveBtn();
            }
        },
        vibrate: function () {
            if ("vibrate" in navigator) {
                navigator.vibrate([50]);
            } else {
                // no vibration detected
            }
        },
        handlePointerInput: function (event) {
            var key = event.target.value;
            if (parseInt(key) >= 0 && parseInt(key) <= 9) {
                controller.triggerDigit(key)
                controller.vibrate()
            }

            // switch may be slow in comparison to if/else, so we use faster method
            if (controller.operatorsKeys.indexOf(key) !== -1) {
                controller.triggerOperator(key)
                controller.vibrate()
            } else if (key == ".") {
                controller.triggerOption(".")
                controller.vibrate()
            } else if (key == "history") {
                controller.vibrate()
                window.open("Calculations.php", '_blank');
            }

            // however we have very limited set, so let's play with switch :)
            switch (key) {
                case 'AC':
                    controller.triggerOption("AC")
                    controller.vibrate()
                    break;
                case 'Save':
                    controller.save();
                    controller.vibrate()
                    break;
                case '=':
                    controller.performCalculation();
                    controller.vibrate()
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
                case 'Enter':
                    controller.performCalculation();
                    break;
            }

        },
        triggerDigit: function (digit) {
            if (model.currentInput !== "" || model.currentInput === "0.") {
                model.currentInput += digit;
                view.updateDisplay();
                model.performedCalculation = false;
            } else {
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
            model.currentInput = output.textContent.replace(",", '.');
            if (model.firstOperand) {
                model.firstOperand = model.currentInput;
            } else {
                model.firstOperand = model.currentInput;
            }
            model.currentInput = '';
            view.operator = operator;
            if (operator === "*") {
                view.operator = "×";
            } else if (operator === "/") {
                view.operator = "÷";
            }
        },
        performCalculation: function () {
            model.performedCalculation = true;
            model.decimals = false;

            if (model.currentInput != "" && model.firstOperand) {
                model.lastInput = model.currentInput;
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
            view.enableSaveBtn();
        },
        save: function () {

            if (calcdata.value != "") {

                var csvContent = "data:text/csv;charset=utf-8,";
                var wholeEquation = model.wholeEquation;
                wholeEquation.forEach(function (wholeEquation) {
                    var wholeEquationRow = wholeEquation.join(",");
                    csvContent += wholeEquationRow + "\r\n";
                });

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "calculations.csv");
                document.body.appendChild(link);

                link.click(); // this will trigger download the data file".

                var send = function () {
                    var request = new XMLHttpRequest();
                    request.open('POST', 'create_csv.php', false);

                    var formData = new FormData();
                    formData.append("calcdata", calcdata.value);

                    request.send(formData);
                    model.wholeEquation = [];
                    calcdata.value = "";
                    console.log(request.response);
                };
                send();
            }
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

}();

WidgetCalculator.controller.setUpHandlers();
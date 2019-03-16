/*                                 
  _      ___    __         __  _____     __         __     __          
 | | /| / (_)__/ /__ ____ / /_/ ___/__ _/ /_____ __/ /__ _/ /____  ____
 | |/ |/ / / _  / _ `/ -_) __/ /__/ _ `/ / __/ // / / _ `/ __/ _ \/ __/
 |__/|__/_/\_,_/\_, /\__/\__/\___/\_,_/_/\__/\_,_/_/\_,_/\__/\___/_/   
               /___/                                                   

                 __    __
  __ _  ___  ___/ /__ / /
 /  ' \/ _ \/ _  / -_) / 
/_/_/_/\___/\_,_/\__/_/  
                         

Widget calculator model - handles operations triggered by widget               
                                                 
*/

WidgetCalculator.model = function() {
    // Declare properties and defaults values
    var firstOperand  = 0;
    var secondOperand = 0;
    var lastInput     = 0;
    var operator      = '';
    var result        = 0;
    var currentInput  = '';
    var wholeEquation = [];
    var performedCalculation = false;

    // Defining operation functions
    addition = function (firstOperand, secondOperand) {
        WidgetCalculator.model.result = parseFloat(firstOperand) + parseFloat(secondOperand);
      };
    subtraction = function (firstOperand, secondOperand) {
        WidgetCalculator.model.result = parseFloat(firstOperand) - parseFloat(secondOperand);
    };
    multiplication = function (firstOperand, secondOperand) {
        WidgetCalculator.model.result = parseFloat(firstOperand) * parseFloat(secondOperand);
    };
    division = function (firstOperand, secondOperand) {
        if (secondOperand !== 0) {
            WidgetCalculator.model.result = parseFloat(firstOperand) / parseFloat(secondOperand);
        } else {
            WidgetCalculator.model.result = "cannot divide by 0";
        }
    };

    return {
        addition : addition,
        subtraction : subtraction,
        multiplication : multiplication,
        division : division,
        wholeEquation : wholeEquation,
        result : result,
        firstOperand : firstOperand,
        secondOperand : secondOperand,
        lastInput : lastInput,
        currentInput : currentInput,
        operator : operator,
        performedCalculation : performedCalculation
    };
}();
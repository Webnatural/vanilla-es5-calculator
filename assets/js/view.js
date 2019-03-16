/*                                 
  _      ___    __         __  _____     __         __     __          
 | | /| / (_)__/ /__ ____ / /_/ ___/__ _/ /_____ __/ /__ _/ /____  ____
 | |/ |/ / / _  / _ `/ -_) __/ /__/ _ `/ / __/ // / / _ `/ __/ _ \/ __/
 |__/|__/_/\_,_/\_, /\__/\__/\___/\_,_/_/\__/\_,_/_/\_,_/\__/\___/_/   
               /___/                                                   

                 __    __      _           
 _  __(_)__ _    __
| |/ / / -_) |/|/ /
|___/_/\__/|__,__/ 
                   
                         
Widget calculator view - handles display of the widget               
                                                 
*/

WidgetCalculator.view = function () {

    // Declare DOM elems used for managing the view
    var preview = WidgetCalculator.widgetElements.preview;
    var output  = WidgetCalculator.widgetElements.output;
    var savebtn = WidgetCalculator.widgetElements.savebtn;

    // Updating the main calculator's display
    var updateDisplay = function (reset) {
        // If AC is triggered, clear screen values
        if (reset) {
            // If AC was triggered, clear the screen
            output.textContent = '0';
            preview.value = "";
            WidgetCalculator.view.result = "";
            WidgetCalculator.view.operator = "";
        } else {
            // Update calculator main screen basing on model and replace dot with comma
            output.textContent = WidgetCalculator.model.currentInput.replace(".", ",");
            if (WidgetCalculator.model.result && WidgetCalculator.model.operator) {
                // Update calculator equation preview screen basing on model and replace dot with comma
                preview.value = WidgetCalculator.model.result.toString().replace(".", ",") + " " + WidgetCalculator.view.operator;
            }
        }
    };
    var showResult = function (operator) {
        // Update calculator screen display basing on model and replace dot with comma
        preview.value = WidgetCalculator.model.firstOperand.toString().replace(".", ",") + " " + WidgetCalculator.view.operator + " " + WidgetCalculator.model.secondOperand.toString().replace(".", ",") + " =";
        if (WidgetCalculator.model.result.toString().indexOf('.') !== -1) {
            WidgetCalculator.view.result = WidgetCalculator.model.result.toString().replace(".", ",");
            output.textContent = WidgetCalculator.view.result;
        } else {
            WidgetCalculator.view.result = WidgetCalculator.model.result.toString().replace(".", ",")
            output.textContent = WidgetCalculator.view.result;
        }
    };
    // Set properties of the Save button (handled by controller)
    var enableSaveBtn = function () {
        savebtn.disabled = false;
    };
    var disableSaveBtn = function () {
        savebtn.disabled = true;
    };
    return {
        updateDisplay: updateDisplay,
        showResult: showResult,
        enableSaveBtn: enableSaveBtn,
        disableSaveBtn: disableSaveBtn
    };
}();
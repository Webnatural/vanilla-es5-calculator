/*                                 
  _      ___    __         __  _____     __         __     __          
 | | /| / (_)__/ /__ ____ / /_/ ___/__ _/ /_____ __/ /__ _/ /____  ____
 | |/ |/ / / _  / _ `/ -_) __/ /__/ _ `/ / __/ // / / _ `/ __/ _ \/ __/
 |__/|__/_/\_,_/\_, /\__/\__/\___/\_,_/_/\__/\_,_/_/\_,_/\__/\___/_/   
               /___/                                                   

   _      _ __ 
  (_)__  (_) /_
 / / _ \/ / __/
/_/_//_/_/\__/ 

Widget calculator init               
                                                 
*/

var WidgetCalculator = function () {

    // DOM elems of the widget
    var widgetElements = {
        calculatorform: document.querySelector('.calculator'),
        controls: document.querySelector('.control-buttons'),
        preview: document.getElementById("former-equation"),
        output: document.querySelector('.current-calculation-display'),
        calcdata: document.getElementById("calculations-data"),
        savebtn: document.querySelector('button.save')
    }

    // Declare MVC
    var model, view, controller;

    return {
        model: model,
        view: view,
        controller: controller,
        widgetElements: widgetElements
    }

}();

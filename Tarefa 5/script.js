var display = document.getElementById("display");

let currentInput = "";
let currentOperator = "";

function appendNumber(value){
    currentInput += value;
    display.value = currentInput;
}

function appendOperator(operator){
    if(currentInput === "" && operator !== ".") return
    currentInput += operator;
    display.value = currentInput;
}

function calculate(){
    try{
        let result = eval(currentInput); 
        let expression = currentInput.replace(/%/g, "/100");
        if(!Number.isInteger(result)){
            result = result.toFixed(4);
        }
        currentInput = result;
        display.value = currentInput;
    }catch(error){
        display.value="Erro";
        currentInput = "";
    }
}

function clearDisplay(){
    currentInput = "";
    display.value = currentInput;
}

function deleteNumber(){
    if(display.value.length > 0){
        display.value = display.value.slice(0,-1);
        currentInput = display.value;
    }
}

function percentage() {
    if (currentInput === "") return;

    try {
        let result = eval(currentInput) / 100;

        currentInput = result.toString();
        display.value = currentInput;

    } catch {
        display.value = "Erro";
        currentInput = "";
    }
}
//VARIABLES

let displayValue = "0"; //stored number that is being displayed
let storedValue = "" //number stored in backround, defaults as blank
let storedOperator = "" //operator stored in background, defaults as blank
let equals = false; //when to give a final result


//MATHS FUNCTIONS

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};


//OPERATE
//takes 2 numbers and an operator and generates result

function operate(operator, num1, num2) {

    let result = 0;

    if (operator == "+") //add
    {
        result = add(num1, num2);
    }
    else if (operator == "-") //subtract
    {
        result = subtract(num1, num2);
    }
    else if (operator == "*") //multiply
    {
        result = multiply(num1, num2);
    }
    else if (operator == "/") //divide
    {   
        //snarky error message for diving by 0
        {
            if (num1 == 0 || num2 == 0)
            {
                clearScreen();
                display.innerHTML = "( ͡° ͜ʖ ͡°)";

                return;
            }
        }

        result = divide(num1, num2);
    }
    
    //if result is too big, round it down
    storedValue = result.toString();
    if (storedValue.length >= 15){
       result = Number(storedValue).toExponential(7);
       storedValue = result.toString();
    }

    display.innerHTML = storedValue;
    console.log(storedValue);
    

    if (equals != true)
    {
        formula.innerHTML = storedValue + " " + operator;
        displayValue = "0";
    }
    else 
    {
        formula.innerHTML = num1 + " " + storedOperator + " " + num2 + " = ";
        storedOperator = "";
        equals = false;
        displayValue = storedValue;
    }
}




//INPUT
function inputNumber(num)
{
    if (displayValue.length >= 13)
    {
        return;
    }

    //if everything's empty clear the formula holder
    if (storedOperator == "")
    {
        formula.innerHTML = "";
    }

    if ((displayValue == "0") && (num != "."))
    {
        displayValue = num;
    }
    else 
    {
        displayValue = (displayValue + num); //allows adding more than 1 digit numbers
    }

    display.innerHTML = displayValue; //shows new display value on the screen
}

function storeValues(operator)
{
    //bug if you enter here for the second time
    if ((storedValue != "") && (storedOperator != ""))
    {
        operate(storedOperator, Number(storedValue), Number(displayValue));
        storedOperator = operator;
    }
    else
    {
        storedOperator = operator;

        //puts display value into storage
        //clears display value ready for a new number
        storedValue = displayValue; //passing display value of 0 into storedvalue
        displayValue = "";

        formula.innerHTML = storedValue + " " + storedOperator;
    }
   
}


//CLEAR SCREEN AND BACKSPACE
function clearScreen()
{
    displayValue = "0";
    display.innerHTML = displayValue;
    formula.innerHTML = "";
    storedValue = ""; 
    storedOperator = "";

    //start the calc by running clear?
}

function back()
{
    displayValue = displayValue.slice(0, displayValue.length - 1);
    display.innerHTML = displayValue;

    //maybe add so if string is 1 char long it becomes 0?
}



//GET SCREEN NUMBER DISPLAY
let display = document.getElementById("display");
let formula = document.getElementById("formula");

//BUTTON EVENTS
document.getElementById("one").addEventListener("click", () => {
    inputNumber("1");
});
document.getElementById("two").addEventListener("click", () => {
    inputNumber("2");
});
document.getElementById("three").addEventListener("click", () => {
    inputNumber("3");
});
document.getElementById("four").addEventListener("click", () => {
    inputNumber("4");
});
document.getElementById("five").addEventListener("click", () => {
    inputNumber("5");
});
document.getElementById("six").addEventListener("click", () => {
    inputNumber("6");
});
document.getElementById("seven").addEventListener("click", () => {
    inputNumber("7");
});
document.getElementById("eight").addEventListener("click", () => {
    inputNumber("8");
});
document.getElementById("nine").addEventListener("click", () => {
    inputNumber("9");
});
document.getElementById("zero").addEventListener("click", () => {
    if ((displayValue != "") || (displayValue != "0"))
    {
        inputNumber("0");
    }  
});
document.getElementById("dot").addEventListener("click", () => {
    if ((displayValue.length >= 1) && (displayValue.includes(".") == false)) 
    {
        inputNumber(".");
    } 
});


document.getElementById("divide").addEventListener("click", () => {
    storeValues("/");
});
document.getElementById("multiply").addEventListener("click", () => {
    storeValues("*");
});
document.getElementById("minus").addEventListener("click", () => {
    storeValues("-");
});
document.getElementById("plus").addEventListener("click", () => {
    storeValues("+");
});
document.getElementById("equals").addEventListener("click", () => {
    if ((storedOperator != "") && (displayValue != "") && (storedValue != ""))
    {
        equals = true;
        operate(storedOperator, storedValue, displayValue);
    }
});



document.getElementById("clear").addEventListener("click", clearScreen);
document.getElementById("back").addEventListener("click", back);





// KEYBOARD SUPPORT

document.addEventListener("keypress", (event) => {
    console.log(event);

    //Number keys
    if (event.key == "1") { inputNumber("1"); }
    if (event.key == "2") { inputNumber("2"); }
    if (event.key == "3") { inputNumber("3"); }
    if (event.key == "4") { inputNumber("4"); }
    if (event.key == "5") { inputNumber("5"); }
    if (event.key == "6") { inputNumber("6"); }
    if (event.key == "7") { inputNumber("7"); }
    if (event.key == "8") { inputNumber("8"); }
    if (event.key == "9") { inputNumber("9"); }
    if (event.key == "0") 
    { 
        if ((displayValue != "") || (displayValue != "0"))
        {
            inputNumber("0");
        }  
     }
    if (event.key == ".") 
    {
        if ((displayValue.length >= 1) && (displayValue.includes(".") == false)) 
        {
            inputNumber(".");
        }      
    }

    //Operator keys
    if (event.key == "/") { storeValues("/"); }
    if (event.key == "x" || event.key == "*") { storeValues("*"); }
    if (event.key == "-") { storeValues("-"); }
    if (event.key == "+") { storeValues("+"); }
    if (event.key == "=" || event.key == "Enter") 
    { 
        if ((storedOperator != "") && (displayValue != "") && (storedValue != ""))
        {
            equals = true;
            operate(storedOperator, storedValue, displayValue);
        }
    }

    //Other  
    if (event.key == "c" || event.key == "C") { clearScreen(); }
    if (event.key == "Backspace") { back(); }
});
/*
SUPPORTING NEGATIVE NUMBERS
MADE BY EDAH - AT HOME
*/
const operators = ["+", "-", "*", "/"]


let displayZone = document.getElementById("display-result");
displayZone.innerText = "";
// parsing  buttons
let keypad_buttons = document.querySelectorAll(".keypad-btn");
let AC = document.getElementById("AC");
let exeBtn = document.getElementById("exec");
let del = document.getElementById("DEL"); // delete button

// delete last typed character
del.addEventListener("click", function () {
    if (displayZone.innerText === "" ) {
        return;
    }
    if (displayZone.innerText === "Infinity") {
        alert("huh ?")
        return;
        
    }
    displayZone.innerText = displayZone.innerText.split("").slice(0, -1).join("")
})

// RESET CALCULATOR
AC.addEventListener("click", function () {
    displayZone.innerText = "";
})

// TYPING WITH MOUSE (CLICK)
keypad_buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        console.log("button clicked", btn.id)
        // avoid add an operator at the start
        if (btn.classList.contains("operator") && displayZone.innerHTML.length === 0) {
            if (btn.id === "-") {
                displayZone.innerText += btn.id;

            }
            return;
        }

        // avoiding ++ or *+
        if (btn.classList.contains("operator") && operators.includes(displayZone.innerHTML.charAt(displayZone.innerHTML.length - 1))) {
            return;
        }

        displayZone.innerText += btn.id;

    })
})





// spilit the given string into an array of TOKENS
// supporting negative numbers
function tokenize(expression) {
    const tokens = [];
    let i = 0;

    while (i < expression.length) {
        if (expression[i] === ' ') {
            i++;
            continue;
        }

        if (/[+\-*/]/.test(expression[i])) {
            // Check if it's a negative sign for a number
            if (expression[i] === '-' && (i === 0 || /[+\-*/]/.test(expression[i - 1]))) {
                // It's a negative number
                let num = '-';
                i++;
                while (i < expression.length && /[\d.]/.test(expression[i])) {
                    num += expression[i++];
                }
                tokens.push(num);
            } else {
                tokens.push(expression[i++]);
            }
        } else {
            // Parse number
            let num = '';
            while (i < expression.length && /[\d.]/.test(expression[i])) {
                num += expression[i++];
            }
            tokens.push(num);
        }
    }

    return tokens;
}


// execution script
exeBtn.addEventListener("click", function () {
    let result;
    console.log("exeBTN clicked, wait until we set up operations defs")
    let currentExpression = tokenize(displayZone.innerText);
    console.log("current expressio is:", currentExpression)
    const shouldProceed = operators.some(item => currentExpression.includes(item))
    console.log(shouldProceed); // process flag 
    if (!shouldProceed) {
        return;
    }

    for (let i = 0; i < currentExpression.length; i++) {
        // operating in arithmetic order

        // handling * and /
        if (currentExpression[i] === "*" || currentExpression[i] === "/") {

            const left = parseFloat(currentExpression[i - 1]);
            const right = parseFloat(currentExpression[i + 1]);

            if (right === 0 && currentExpression[i] === "/") {
                alert("NO DIVISION BY ZERO - calling the division by zero police..")
            }
            result = currentExpression[i] === '*' ? left * right : left / right;

            // converting operation items into result + rest of the array
            currentExpression.splice(i - 1, 3, result.toString())

            i -= 1; // step back for further calculations to evaluate
        }
    }

    // handling + and -


    result = parseFloat(currentExpression[0]);

    for (let i = 1; i < currentExpression.length; i += 2) {
        const operator = currentExpression[i];
        const next = parseFloat(currentExpression[i + 1]);

        if (operator === '+') result += next;
        else if (operator === '-') result -= next;
    }



    displayZone.innerText = result.toString();



})



/*global console, alert, prompt*/

var calculations = document.getElementById('calculations'),
    operator = document.getElementById('operator'),
    input = document.querySelector('input'),
    itemsList = document.querySelector('ul'),
    listItems = itemsList.children,
    calcArray = [],
    equalBoolean = false;

itemsList.onclick = function (e) {
  'use strict';

  switch (e.target) {

    // Type from one to nine
    case listItems[8]:
    case listItems[9]:
    case listItems[10]:
    case listItems[12]:
    case listItems[13]:
    case listItems[14]:
    case listItems[16]:
    case listItems[17]:
    case listItems[18]:
      if (isNaN(input.value) || input.value === "Infinity") {input.value = "";}
      if (equalBoolean === true) {input.value = "";equalBoolean = false;}
      if (input.value === "0") {input.value = "";}
      input.value += e.target.innerText;
      break;

    // Type zero
    case listItems[21]:
      if (isNaN(input.value) || input.value === "Infinity") {input.value = "";}
      if (equalBoolean === true) {input.value = "";equalBoolean = false;}
      if (input.value !== "0") {
        input.value += "0";
      }
      break;

    // Change sign
    case listItems[20]:
    case listItems[20].children[0]:
    case listItems[20].children[1]:
      if (input.value !== "0") {
        if (input.value.indexOf(".") === input.value.length - 1) {
          input.value = - input.value;
          input.value += ".";
        } else {
          input.value = - input.value;
        }
      }
      equalBoolean = false;
      break;

    // Type dot
    case listItems[22]:
      if (isNaN(input.value) || input.value === "Infinity") {input.value = "0";}
      if (equalBoolean === true) {input.value = "0";equalBoolean = false;}
      if (input.value.indexOf(".") === -1) {
        input.value += ".";
      }
      break;

    // =========================================================================

    // ⟵
    case listItems[3]:
      var removeArray = input.value.split("");
      if ((input.value.slice(0, 3) === "-0." && input.value.length === 4) || removeArray.length === 1 || (input.value[0] === "-" && input.value.length === 2)) {
        removeArray = ["0"];
      } else if (removeArray[removeArray.length - 2] === ".") {
        removeArray.splice(removeArray.length - 2, 2);
      } else if (removeArray.indexOf("e") > -1) {
        if (removeArray[removeArray.indexOf("e") + 1] === "-") {
          removeArray = removeArray.slice(0, removeArray.indexOf("e"));
        } else {
          removeArray = (removeArray.slice(0, removeArray.indexOf("e") + 1)).push((parseInt(input.value.slice(input.value.indexOf("e") + 1, input.value.length)) - 1).toString());
        }
      } else if (isNaN(input.value) || input.value === "Infinity" || input.value === "-Infinity") {
        removeArray = ["0"];
      } else {
        removeArray.pop();
      }
      input.value = removeArray.join("");
      equalBoolean = false;
      break;

    // ↞
    case listItems[2]:
      input.value = "0";
      equalBoolean = false;
      break;

    // ⇤
    case listItems[1]:
      calculations.textContent = "0";
      operator.textContent = "";
      input.value = "0";
      equalBoolean = false;
      break;

    // =========================================================================

    // Percent
    case listItems[0]:
      input.value = parseFloat(input.value) / 100;
      equalBoolean = false;
      break;

    // One over a number
    case listItems[4]:
      input.value = 1 / parseFloat(input.value);
      equalBoolean = false;
      break;

    // Power 2
    case listItems[5]:
    case listItems[5].children[0]:
      input.value = parseFloat(input.value) ** 2     // Math.pow(parseFloat(input.value), 2);
      equalBoolean = false;
      break;

    // Square root
    case listItems[6]:
      input.value = Math.sqrt(parseFloat(input.value));
      equalBoolean = false;
      break;

    // =========================================================================

    // Division & Multiplication & Addition & Subtraction
    case listItems[7]:
    case listItems[11]:
    case listItems[15]:
    case listItems[19]:
      if (isNaN(input.value) === false) {
        if (operator.innerText === "" || operator.innerText === "=") {
          calculations.textContent = input.value;
          operator.textContent = e.target.innerText;
        } else if (operator.innerText !== "" && operator.innerText !== "=") {
          calculations.textContent += " " + operator.innerText + " " + input.value;
          operator.textContent = e.target.innerText;
        }
        input.value = "0";
        equalBoolean = false;
      }
      break;

    // --- Equal ---
    case listItems[23]:
      if (operator.innerText === "" || (operator.innerText === "=" && (input.value === "Infinity" || input.value === "-Infinity"))) {
        calculations.textContent = input.value;
        calcArray = calculations.innerText.split(" ");
        operator.textContent = "=";
        input.value = calcArray.toString();
      } else if (operator.innerText !== "=" && operator.innerText !== "") {
        calculations.textContent += " " + operator.innerText + " " + input.value;
        operator.textContent = "=";
        calcArray = calculations.innerText.split(" ");

        // Operating to reach final result
        var leftHS = 0,
            rightHS = 0;
        // Divide operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "÷") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS / rightHS).toString());
            i -= 2;
          }
        }
        // Times operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "×") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS * rightHS).toString());
            i -= 2;
          }
        }
        // Minus operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "−") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS - rightHS).toString());
            i -= 2;
          }
        }
        // Plus operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "+") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS + rightHS).toString());
            i -= 2;
          }
        }
        // Final result
        input.value = calcArray.toString();
      } else if (operator.innerText === "=" && isNaN(input.value)) {
        calcArray = calculations.innerText.split(" ");

        // Operating to reach final result
        var leftHS = 0,
            rightHS = 0;
        // Divide operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "÷") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS / rightHS).toString());
            i -= 2;
          }
        }
        // Times operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "×") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS * rightHS).toString());
            i -= 2;
          }
        }
        // Minus operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "−") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS - rightHS).toString());
            i -= 2;
          }
        }
        // Plus operations
        for (var i = 1; i <= (calcArray.length - 1); i += 2) {
          if (calcArray[i] === "+") {
            leftHS = parseFloat(calcArray[i - 1]);
            rightHS = parseFloat(calcArray[i + 1]);
            calcArray.splice(i - 1, 3, (leftHS + rightHS).toString());
            i -= 2;
          }
        }
        // Final result
        input.value = calcArray.toString();
      }
      equalBoolean = true;
      break;



  // End of switch
  }

   
// End of click event
}

rubbish: {

  // var divOperation = [],
  //     multiOperation = [],
  //     addOperation = [],
  //     subtractOperation = [],
  //     transferArray = [];

  // Result of the operations ÷, ×, −, +
  // for (var i = 1; i <= (calcArray.length - 1) / 2; i++) {
  //   // Building (×) multiOperation array
  //   if (calcArray[calcArray.indexOf("×") - 2] === "÷" && calcArray[calcArray.indexOf("×") + 2] !== "÷") {
  //     transferArray =
  //   }
  //
  //   // Building (÷) divOperation array
  //   transferArray = calcArray.slice(calcArray.indexOf("÷") - 1, calcArray.indexOf("÷") + 2);
  //   calcArray.splice(calcArray.indexOf("÷") - 1, 3);
  //   divOperation = divOperation.concat(transferArray);
  // }

  // --------------------------------------------


  // calcArray = calculations.innerText.split(" ");
  // console.log(calcArray);
  // console.log(calcArray.join(""));
}

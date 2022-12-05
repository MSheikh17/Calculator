"use strict";

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const periodButton = document.querySelector("[data-period]");
const currentOperandText = document.querySelector("[data-current-operand]");
const prevOperandText = document.querySelector("[data-previous-operand]");
const equalButton = document.querySelector("[data-equal");
const allClearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete");

allClearButton.addEventListener("click", () => {
    currentOperandText.innerText = "";
    prevOperandText.innerText = "";
});

deleteButton.addEventListener("click", () => {
    currentOperandText.innerText = currentOperandText.innerText.slice(0, -1);
});

numberButtons.forEach((button) => {
    button.addEventListener("click", (number) => {
        if (!prevOperandText.innerText.endsWith("+")) {
            prevOperandText.innerText = "";
        }
        currentOperandText.innerText += `${number.target.innerText}`;
    });
});

periodButton.addEventListener("click", (period) => {
    if (currentOperandText.innerText.includes(".")) return;
    currentOperandText.innerText += `${period.target.innerText}`;
});

operatorButtons.forEach((operand) =>
    operand.addEventListener("click", (operator) => {
        if (currentOperandText.innerText === "" && prevOperandText.innerText === "")
            return;
        if (
            currentOperandText.innerText.includes("+") ||
            currentOperandText.innerText.includes("-") ||
            currentOperandText.innerText.includes("*") ||
            currentOperandText.innerText.includes("÷")
        )
            return;

        if (
            currentOperandText.innerText.endsWith("-") ||
            currentOperandText.innerText.endsWith("+") ||
            currentOperandText.innerText.endsWith("*") ||
            currentOperandText.innerText.endsWith("÷")
        )
            return;

        if (currentOperandText.innerText !== "") {
            currentOperandText.innerText += `${operator.target.innerText}`;
        }
        if (
            prevOperandText.innerText !== "" &&
            !prevOperandText.innerText.endsWith("+") &&
            !prevOperandText.innerText.endsWith("-") &&
            !prevOperandText.innerText.endsWith("*") &&
            !prevOperandText.innerText.endsWith("÷")
        ) {
            prevOperandText.innerText += operator.target.innerText;
        }
    })
);

equalButton.addEventListener("click", () => {
    let computation;
    let displayedNums = currentOperandText.innerText;
    console.log(displayedNums);
    let array = displayedNums.split(/[-|+|*|÷]/);
    console.log(array);
    let number1 = Number(array[0]);
    let number2 = Number(array[1]);
    let operand = displayedNums[array[0].length];

    if (
        prevOperandText.innerText.endsWith("+") ||
        prevOperandText.innerText.endsWith("-") ||
        prevOperandText.innerText.endsWith("*") ||
        prevOperandText.innerText.endsWith("÷")
    ) {
        number1 = Number(prevOperandText.innerText.slice(0, -1));
        number2 = Number(currentOperandText.innerText);
        operand = prevOperandText.innerText[prevOperandText.innerText.length - 1];
    }

    switch (operand) {
        case "+":
            computation = number1 + number2;
            break;
        case "-":
            computation = number1 - number2;
            break;
        case "*":
            computation = number1 * number2;
            break;
        case "÷":
            computation = number1 / number2;
            break;
        default:
            return;
    }
    currentOperandText.innerText = "";
    prevOperandText.innerText = computation;
});
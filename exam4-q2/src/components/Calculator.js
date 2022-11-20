import React from "react";
import Operator from "./Operator";
import Value from "./Value";

function Calculator() {
    const [calc, setCalc] = React.useState({
        display: "0",
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    });

    function inputDigit(digit) {
        if (calc.waitingForSecondOperand === true) {
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    display: digit,
                    waitingForSecondOperand: false,
                };
            });
        } else {
            const newDisplay = calc.display === "0" ? digit : calc.display + digit;
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    display: newDisplay,
                };
            });
        }

        // for debugging
        console.log(calc);
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(calc.display);

        if (calc.operator && calc.waitingForSecondOperand) {
            console.log("first if");
            console.log(calc);
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    operator: nextOperator,
                };
            });
            return;
        }

        // if firstOperand is null and input is valid update the key:value pair
        if (calc.firstOperand === null && !isNaN(inputValue)) {
            console.log("iif");
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    firstOperand: inputValue,
                };
            });
        } else if (calc.operator) {
            console.log("else");
            const result = calculate(calc.firstOperand, inputValue, calc.operator);
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    display: `${result}`,
                    firstOperand: result,
                };
            });
        }

        setCalc((prevCalc) => {
            return {
                ...prevCalc,
                waitingForSecondOperand: true,
                operator: nextOperator,
            };
        });
        console.log(calc);
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case "+":
                return firstOperand + secondOperand;
            case "-":
                return firstOperand - secondOperand;
            case "*":
                return firstOperand * secondOperand;
            case "/":
                return firstOperand / secondOperand;
            default:
                console.log("incorrect operator !!");
                return secondOperand;
        }
    }

    /*function buttonClick(e) {
        const { value } = e.target;
        if (!e.target.matches("button")) {
            return;
        }

        switch (value) {
            case "+":
            case "-":
            case "*":
            case "/":
            case "=":
                handleOperator(value);
                break;
            case ".":
                inputDecimal(value);
                break;
            case "all-clear":
                resetCalculator();
                break;
            default:
                // check if the key is an integer
                if (Number.isInteger(parseFloat(value))) {
                    inputDigit(value);
                }
        }
    }*/

    return (
        <div className="calculator">
            <input type="text" class="calculator-screen" value={calc.display} disabled />
            <div class="calculator-keys">
                <Operator value="+" display="+" click={handleOperator} />
                <Operator value="-" display="-" click={handleOperator} />
                <Operator value="*" display="&times;" click={handleOperator} />
                <Operator value="/" display="&divide;" click={handleOperator} />

                <Value value="7" display="7" click={inputDigit} />
                <Value value="8" display="8" click={inputDigit} />
                <Value value="9" display="9" click={inputDigit} />

                <Value value="4" display="4" click={inputDigit} />
                <Value value="5" display="5" click={inputDigit} />
                <Value value="6" display="6" click={inputDigit} />

                <Value value="1" display="1" click={inputDigit} />
                <Value value="2" display="2" click={inputDigit} />
                <Value value="3" display="3" click={inputDigit} />

                <Value value="0" display="0" click={inputDigit} />
                <button type="button" class="decimal" value=".">
                    .
                </button>
                <button type="button" class="all-clear" value="all-clear">
                    AC
                </button>
                <button type="button" class="operator" id="equal-sign" value="=">
                    =
                </button>
            </div>
        </div>
    );
}

export default Calculator;

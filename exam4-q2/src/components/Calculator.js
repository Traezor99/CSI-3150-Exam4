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
    }

    function inputDecimal(dot) {
        if (!calc.display.includes(dot)) {
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    display: calc.display + dot,
                };
            });
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(calc.display);

        if (calc.operator && calc.waitingForSecondOperand) {
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
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    firstOperand: inputValue,
                };
            });
        } else if (calc.operator) {
            const result = calculate(calc.firstOperand, inputValue, calc.operator);
            setCalc((prevCalc) => {
                return {
                    ...prevCalc,
                    display: `${parseFloat(result.toFixed(7))}`,
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

    function resetCalc() {
        setCalc(() => {
            return {
                display: "0",
                firstOperand: null,
                operator: null,
                waitingForSecondOperand: false,
            };
        });
    }

    return (
        <div className="calculator">
            <input type="text" className="calculator-screen" value={calc.display} disabled />
            <div className="calculator-keys">
                <Operator value="+" display="+" click={handleOperator} />
                <Operator value="-" display="-" click={handleOperator} />
                <Operator value="*" display="&times;" click={handleOperator} />
                <Operator value="/" display="&divide;" click={handleOperator} />

                <Value class="" value="7" display="7" click={inputDigit} />
                <Value class="" value="8" display="8" click={inputDigit} />
                <Value class="" value="9" display="9" click={inputDigit} />

                <Value class="" value="4" display="4" click={inputDigit} />
                <Value class="" value="5" display="5" click={inputDigit} />
                <Value class="" value="6" display="6" click={inputDigit} />

                <Value class="" value="1" display="1" click={inputDigit} />
                <Value class="" value="2" display="2" click={inputDigit} />
                <Value class="" value="3" display="3" click={inputDigit} />

                <Value class="" value="0" display="0" click={inputDigit} />
                <Value class="decimal" value="." display="." click={inputDecimal} />
                <Value class="all-clear" value="all-clear" display="AC" click={resetCalc} />
                <button type="button" className="operator" id="equal-sign" value="=" onClick={() => handleOperator("=")}>
                    =
                </button>
            </div>
        </div>
    );
}

export default Calculator;

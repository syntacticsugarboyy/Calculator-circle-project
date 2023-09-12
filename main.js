const numberBtns = document.querySelectorAll('.number-btn');
const operationBtns = document.querySelectorAll(".operation-btn");
const clearBtn = document.querySelector(".clr-btn");
const deleteBtn = document.querySelector(".delete-btn");
const equalsBtn = document.querySelector(".equals-btn");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");


const simpleCalculator = (previousOperandTextElement, currentOperandTextElement) => {

  let previousOperand = "";
  let currentOperand = "";
  let operation = null;

  //clear screen function
  const clearScreen = () => {
    previousOperand = "";
    currentOperand = "";
    operation = null;
  };
  const singleDelete = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
  };
const appendNumber = (number) => {
  if (number === '.' && currentOperand.includes('.')) {
    return
  }
  currentOperand = currentOperand.toString() + number.toString();
}
  numberBtns.forEach(button => (
    button.addEventListener('click', () => {
      appendNumber(button.textContent);
      console.log('clicked');
      updateDisplay()
    })
  ));
  const operationToPerform = (selectedOperation) => {
    if (currentOperand === '') {
      return;
    }
    if (previousOperand !== '') {
      compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
  }
  operationBtns.forEach(button => (
    button.addEventListener('click', () => {
      operationToPerform(button.textContent);
      console.log('check')
    })
  ));

  const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return
    }
    switch (operation) {
      case '+':
      computation = prev + current;
      break;
      case '-':
        computation = prev - current;
        break;
        case '*':
          computation = prev * current;
          break;
          case '/':
            computation = prev / current;
            break;
            default: //if none of these signs (+, -, *, /) match our operation, we want to return, to avoid invalid response
              return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';

  };

  equalsBtn.addEventListener('click', () => {
    compute();
    updateDisplay();
  });

//button to clear the whole screen
  clearBtn.addEventListener('click', () => {
    clearScreen()
    updateDisplay()
  });

  deleteBtn.addEventListener('click', () => {
    singleDelete();
    updateDisplay();
  });

  const updateDisplay = () => {
    currentOperandTextElement.textContent = currentOperand;
    if (operation !== null) {
      previousOperandTextElement.textContent = `${previousOperand} ${operation}`;
    } else {
      previousOperandTextElement.textContent = '';
    }
  };

  return {
    clearScreen,
    appendNumber,
    operationToPerform,
    compute,
    updateDisplay,
  };
};
simpleCalculator(previousOperandTextElement, currentOperandTextElement); //passing args into the the simpleCalculator function
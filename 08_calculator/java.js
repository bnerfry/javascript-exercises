const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
	return arr.reduce((total,current) => total + current, 0);
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
  if (b === 0) {
    return 'You know better!'
  }
  return a / b;
};

const power = function(a, b) {
	return Math.pow(a, b);
};

const factorial = function(n) {
	if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = n; i > 1; i--) {
    result *= i;
  }
  return result;
};

const heartButton = document.querySelector('button:nth-child(19)');

heartButton.addEventListener('click', () => {
  display.value = "💖";
});

const operate = function (operator, a, b) {
  switch (operator) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    case 'power':
      return power(a, b);
    case 'factorial':
      return factorial(a);
    default:
      return null;
  }
};

let displayValue = '';                          // current value in display
let firstOperand = null;                        // 1st number in the operation
let secondOperand = null;                       // 2nd number in operation
let currentOperator = null;                     // operator selected by the user
let awaitingSecondOperand = false;              // indication - expecting 2nd operand


const display = document.querySelector('#display');

// function to update display with current value
function updateDisplay() {
  display.value = displayValue;
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', handleButtonPress);
});

function handleButtonPress(e) {
  const buttonValue = e.target.textContent;
  processInput(buttonValue);
}

function processInput(input) {
  if (!isNaN(input)) {
    if (awaitingSecondOperand) {
      displayValue = input;
      awaitingSecondOperand = false;
    } else {
      displayValue += input;
    }
    updateDisplay();
  } else if (input === '.') {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
  } else if (input === 'Clear') {
    clearDisplay();
  } else if (input === '⌫') {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
  } else if (input === '=') {
    calculateResult();
  } else {
    handleOperator(input);
  }
}

function handleOperator(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(displayValue);
  } else if (currentOperator) {
    secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = result.toString();
    updateDisplay();
    firstOperand = parseFloat(displayValue);
  }
  currentOperator = getOperator(operator);
  awaitingSecondOperand = true;
}

function calculateResult() {
  if (firstOperand !== null && currentOperator !== null) {
    secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = result.toString();
    updateDisplay();
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    awaitingSecondOperand = false;
  }
}

function clearDisplay() {
  displayValue = '';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  awaitingSecondOperand = false;
  updateDisplay();
}

function getOperator(operatorSymbol) {
  switch (operatorSymbol) {
    case '+':
      return 'add';
    case '-':
      return 'subtract';
    case '*':
      return 'multiply';
    case '/':
      return 'divide';
    default:
      return null;
  }
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key)) {
    processInput(key);
  } else if (key === '.') {
    processInput('.');
  } else if (key === 'Backspace') {
    processInput('⌫');
  } else if (key === 'Enter' || key === '=') {
    processInput('=');
  } else if (key === 'Escape') {
    processInput('C');
  } else if (['+', '-', '*', '/'].includes(key)) {
    processInput(key);
  }
});

const characters = document.getElementById('characters');
const charactersMusic = document.getElementById('characters-music');

characters.addEventListener('click', function () {
  if (!charactersMusic.paused) {
    charactersMusic.pause();
    charactersMusic.currentTime = 0;
  } else {
    charactersMusic.currentTime = 0;
    charactersMusic.play();
  }
});

const gifSrc = 'img/img-gif.gif';

characters.addEventListener('mouseleave', () => {
  characters.src = gifSrc;
});

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};

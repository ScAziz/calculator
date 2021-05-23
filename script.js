class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
      this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '/':
                current === 0 
                calculation = prev / current
                break
            default:
              return
        }

        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerNumbers = parseFloat(stringNumber.split('.')[0])
        const decimalNumbers = stringNumber.split('.')[1]
        let integerDisplay

        if(isNaN(integerNumbers) && integerNumbers !== Infinity) {
            integerDisplay = ''
        } else if(integerNumbers === Infinity) {
                integerDisplay = `no dividing by zero!`
        } else {
            integerDisplay = integerNumbers.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalNumbers != null) {
            return `${integerDisplay}.${decimalNumbers}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = 
          this.getDisplayNumber(this.currentOperand)

        if(this.operation != null) {
            this.previousOperandText.innerText = 
              `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9 || event.key === '.') {
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '/' || event.key === '*' || event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '=') {
        calculator.calculate()
        calculator.updateDisplay()
    }
    if (event.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    }
    if (event.key === 'Escape') {
        calculator.clear()
        calculator.updateDisplay()
    }
})
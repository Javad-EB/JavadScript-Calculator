class Calculator {
    constructor(oldOperandTextElement, newOperandTextElement) {
        this.oldOperandTextElement = oldOperandTextElement
        this.newOperandTextElement = newOperandTextElement
        this.clear()
    }
    clear(){
        this.newOperand = ''
        this.oldOperand = ''
        this.operation = undefined
    }

    sign(){
        this.newOperand = this.newOperand.toString() * -1
    }

    delete(){
        this.newOperand = this.newOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.newOperand.includes('.')) return
        this.newOperand = this.newOperand.toString() + number.toString()
    }

    selectOperation(operation){
        if(this.newOperand === '') return
        if(this.oldOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.oldOperand = this.newOperand
        this.newOperand = '' 
    }

    compute(){
        let computation
        const oldOp = parseFloat(this.newOperand)
        const newOp = parseFloat(this.oldOperand)
        if (isNaN(oldOp) || isNaN(newOp)) return
        switch(this.operation){
            case '+':
                computation =  newOp + oldOp
                break
            case '-':
                computation = newOp - oldOp 
                break
            case '*':
                computation = newOp * oldOp
                break
            case '÷':
                computation = newOp / oldOp
                break
            default:
                return
        }
        if(computation % 1 !== 0){
            this.newOperand = computation.toFixed(2)
        }else{
            this.newOperand = computation
        }
        this.operation = undefined
        this.oldOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    
    updateDisplay(){
        this.newOperandTextElement.innerText = this.getDisplayNumber(this.newOperand)
        if(this.operation != null){
            this.oldOperandTextElement.innerText = `${this.getDisplayNumber(this.oldOperand)} ${this.operation}`
        } else{
            this.oldOperandTextElement.innerText = ''
        }
        

    }
} 

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const signButton = document.querySelector('[data-sign]')
const oldOperandTextElement = document.querySelector ('[data-old-operand]')
const newOperandTextElement = document.querySelector ('[data-new-operand]')
const calculator = new Calculator(oldOperandTextElement, newOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

signButton.addEventListener('click', button => {
    calculator.sign()
    calculator.updateDisplay()
})
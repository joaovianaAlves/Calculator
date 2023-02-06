class Calculator {
    constructor(pOperand, cOperand) {
        this.cOperand = cOperand
        this.pOperand = pOperand
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand =this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr))return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
            break
          default:
            return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

    getDisplayNum(number) {
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

    updateOutput(){
        this.cOperand.innerText = 
            this.getDisplayNum(this.currentOperand)
        if(this.operation != null){
            this.pOperand.innerText = 
                `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }else{
            this.pOperand.innerText = ''
        }
    }
}

const numBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const delBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const equalsBtn = document.querySelector('[data-equals]');
const pOperand = document.querySelector('[data-previous]');
const cOperand = document.querySelector('[data-current]');

const calculator = new Calculator(pOperand, cOperand)

numBtn.forEach(button => {
    button.addEventListener('click', () => { 
        calculator.appendNumber(button.innerText)
        calculator.updateOutput()
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput()
    })
})

equalsBtn.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateOutput()
})

allClearBtn.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateOutput()
})

delBtn.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateOutput()
})
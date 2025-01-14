const template = document.createElement('template')
template.innerHTML = `
<style>
    button {
    font-size: 50px;
    width: 100px;
    height: 100px;
}
#container {
    display: flex;
}
#calculator {
    display: flex;
    width: 300px;
    flex-wrap: wrap;
}
#operators {
    display: flex;
    flex-direction: column;
}
</style>
<div id="container">
        <div id="calculator">
            <button id="number9">9</button>
            <button id="number8">8</button>
            <button id="number7">7</button>
            <button id="number6">6</button>
            <button id="number5">5</button>
            <button id="number4">4</button>
            <button id="number3">3</button>
            <button id="number2">2</button>
            <button id="number1">1</button>
            <button id="number0">0</button>
        </div>
        <div id="operators">
            <button id="addition">+</button>
            <button id="subtraction">-</button>
            <button id="multiplication">*</button>
            <button id="division">½</button>
            <button id="equals">=</button>
        </div>
    </div>
`
customElements.define('my-calculator',
    class Calculator extends HTMLElement {
        constructor () {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.additionButton = this.shadowRoot.querySelector('#addition')
            this.subtractionButton = this.shadowRoot.querySelector('#subtraction')
            this.multiplicationButton = this.shadowRoot.querySelector('#multiplication')
            this.divisionButton = this.shadowRoot.querySelector('#division')
            this.equals = this.shadowRoot.querySelector('#equals')
            this.numbers = []
        }
        connectedCallback () {
            for (let i = 0; i <= 9; i++) {
                let numberButton = this.shadowRoot.querySelector(`#number${i}`)
                numberButton.addEventListener('click', event => {
                    if (!this.numbers[0]) {
                        this.numbers[0] = i
                    } else if (!this.numbers[1]) {
                        this.numbers[0] += `${i}`
                    } else if (!this.numbers[2]) {
                        this.numbers[2] = i
                    } else if (this.numbers[2]) {
                        this.numbers[2] += `${i}`
                    }
                    console.log(this.numbers)
                })
            }
            this.additionButton.addEventListener('click', () => {
                this.firstNumber = this.numbers[0]
                this.secondNumber = this.numbers[2]
                this.operator = this.numbers[1]

                if (this.firstNumber && !this.secondNumber) {
                    this.numbers[1] = '+'
                } else if (this.secondNumber) {
                    this.numbers[1] = '+'
                    this.operate(this.firstNumber, this.operator, this.secondNumber)
                }
                console.log(this.numbers)
            })
            this.subtractionButton.addEventListener('click', () => {
                this.firstNumber = this.numbers[0]
                this.secondNumber = this.numbers[2]
                this.operator = this.numbers[1]

                if (this.firstNumber && !this.secondNumber) {
                    this.operator = '-'
                } else if (this.secondNumber) {
                    this.operator = '-'
                    this.operate(this.firstNumber, this.operator, this.secondNumber)
                }
                console.log(this.numbers)
            })
            this.multiplicationButton.addEventListener('click', () => {
                this.firstNumber = this.numbers[0]
                this.secondNumber = this.numbers[2]
                this.operator = this.numbers[1]

                if (this.firstNumber && !this.secondNumber) {
                    this.operator = '*'
                    console.log(this.numbers)
                } else if (this.secondNumber) {
                    this.operator = '*'
                    this.operate(this.firstNumber, this.operator, this.secondNumber)
                }
            })
            this.divisionButton.addEventListener('click', () => {
                this.firstNumber = this.numbers[0]
                this.secondNumber = this.numbers[2]
                this.operator = this.numbers[1]

                if (this.firstNumber && !this.secondNumber) {
                    this.operator = '/'
                } else if (this.secondNumber) {
                    this.operator = '/'
                    this.operate(this.firstNumber, this.operator, this.secondNumber)
                }
                console.log(this.numbers)
            })
            this.equals.addEventListener('click', event => {
                this.firstNumber = this.numbers[0]
                this.secondNumber = this.numbers[2]
                this.operator = this.numbers[1]

                this.operate(this.numbers[0], this.numbers[1], this.numbers)
            })

        }
        operate (firstNumber, operator, secondNumber) {
            if (operator === '+') {
                this.addition(firstNumber, secondNumber)
            } else if (operator === '-') {
                this.subtraction(firstNumber, secondNumber)
            } else if (operator === '*') {
                this.multiplication(firstNumber, secondNumber)
            } else if (operator === '½') {
                this.division(firstNumber, secondNumber)
            }
        }
        addition (a, b) {
            this.numbers[0] = Number(a) + Number(b)
            console.log(this.numbers)
        }
        subtraction (a, b) {
            this.numbers[0] = Number(a) - Number(b)
            console.log(this.numbers)
        }
        multiplication (a, b) {
            this.numbers[0] = Number(a) * Number(b)
            console.log(this.numbers)
        }
        division (a, b) {
            this.numbers[0] = Number(a) / Number(b)
            console.log(this.numbers)
        }
    })
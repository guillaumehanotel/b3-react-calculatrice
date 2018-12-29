import React, { Component } from 'react'
import './Calculator.css'


class Calculator extends Component{
    constructor() {
        super()
        this.state = {
            result: 0,
            currentInput: '',
            operator: ''
        }
    }

    handleClick(character, type) {

        // si le result est vide
        if (this.state.result === '') {
            // et que le 1er char n'est pas un opérateur, on peut l'ajouter
            if (type !== "operator") {
                this.appendToCurrentInput(character)
            }

        } else {

            // si on entre un operator
            if (type === "operator" && !this.isLastCharAnOperande()) {

                // si c'est le 1er calcul, on met d'abord l'opérateur, puis sauvegarde de l'input dans result
                if(this.state.operator === ''){
                    this.setState({operator: character}, () => {
                        this.initResult()
                    })
                } else {
                    // si c'en est un autre, on calcule puis met le nouvel opérateur
                    this.calculateResult()
                    this.setState({operator: character})
                }

            } else if (type === "number") {
                this.appendToCurrentInput(character)
            }

        }
    }


    isLastCharAnOperande() {
        const expression = this.state.result.toString()
        let lastChar = expression.charAt(expression.length - 1)
        const operandes = "+-*/"
        return operandes.includes(lastChar)
    }

    appendToCurrentInput(operande) {
        this.setState((prevState, props) => {
            return {currentInput: prevState.currentInput + operande}
        })
    }

    clear() {this.setState({result: 0, operator: '', currentInput: ''})}

    initResult() {
        this.setState((prevState, props) => {
            return {
                result: prevState.result + parseInt(this.state.currentInput)
            }
        })
        this.setState({currentInput: ''})
    }

    calculateResult() {

        let result

        if(this.state.currentInput !== '') {

            switch (this.state.operator) {
                case "+" :
                    result = this.state.result + parseInt(this.state.currentInput)
                    break;
                case "-" :
                    result = this.state.result - parseInt(this.state.currentInput)
                    break;
                case "*" :
                    result = this.state.result * parseInt(this.state.currentInput)
                    break;
                case "/" :
                    result = this.state.result / parseInt(this.state.currentInput)
                    break;
                default :
                    result = this.state.result
            }

            this.setState({result: result})
        }
        this.setState({currentInput: ''})
    }

    renderResult(){
        return this.state.currentInput === '' ? this.state.result : this.state.currentInput
    }

    render() {

        let result  = this.renderResult()

        return (
            <div className="App">
                <form name="calculator">

                    <table>
                        <tbody>
                        <tr>
                            <td colSpan="4">
                                <input type="text" name="display" id="display" disabled value={result}/>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="button" value="1" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="2" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="3" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" className="operator" value="+"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                        </tr>
                        <tr>
                            <td><input type="button" value="4" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="5" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="6" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" className="operator" value="-"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                        </tr>
                        <tr>
                            <td><input type="button" value="7" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="8" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" value="9" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" className="operator" value="*"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                        </tr>
                        <tr>
                            <td><input type="button" id="clear" name="clear" value="c"
                                       onClick={(e) => this.clear()}/></td>
                            <td><input type="button" name="zero" value="0" className="number"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                            <td><input type="button" name="doit" value="="
                                       onClick={(e) => this.calculateResult()}/></td>
                            <td><input type="button" className="operator" name="div" value="/"
                                       onClick={(e) => this.handleClick(e.target.value, e.target.className)}/></td>
                        </tr>
                        </tbody>
                    </table>


                </form>
            </div>
        )
    }
}

export default Calculator
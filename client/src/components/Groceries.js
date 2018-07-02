import React, { Component } from 'react';
import '../css/Groceries.css';

class Groceries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit: [
                { id: 1, name: "apple", taste: "delicious" },
                { id: 2, name: "grape", taste: "good" },
                { id: 3, name: "banana", taste: "okay" }
            ]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        const fruitMap = this.state.fruit.map((fruit) => (
            fruit.name + ' ' + fruit.taste + '\n'
        ))

        console.log('click ' + fruitMap);
    }

    render() {

        const fruitMap = this.state.fruit.map((fruit) => (
            <h1 key={fruit.id}>This {fruit.name} tastes {fruit.taste}.</h1>
        ))

        const HandleNames = (props) => {
            return <h1>Hello, {props.name}</h1>
        }

        return (
            <div className="grocery-layer">
                <HandleNames name="Ellen" />
                <div className="list-block" onClick={this.handleClick}>{fruitMap}</div>
            </div>
        )
    }

}

export default Groceries;
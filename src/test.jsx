import React from 'react';
import ReactDOM from 'react-dom';
import index from './index.css';
import './style.css';
import pic2 from './assets/img/test/pic2.jpg';
import svg1 from './assets/img/折扣.svg';

const name = 'Webpack'
const element = <div><i className="icon icon-discount"></i><h1>Hello, {name}!</h1></div>;

// let test = `${index.app} title`;

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            count: 0
        }
	}
	add() {
        this.setState((preState) => {
            return{
                count: preState.count + 1
            }
        })
    }

    sub() {
        this.setState((preState) => {
            return{
                count: preState.count - 1
            }
        })
    }
	render() {
		return (
			<div className={`${index.app} title`}>
                <img src={svg1} width="50px" height="50px" />
				<i className="icon icon-vm"></i>App
				<h3>{this.state.count}</h3>
                <button onClick={() => this.add()}>add 1</button>
                <button onClick={() => this.sub()}>sub 1</button>
				<img src={pic2} />
			</div>
		);
	}
}

export default App;
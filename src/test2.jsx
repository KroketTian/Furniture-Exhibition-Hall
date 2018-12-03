import React from 'react';
import ReactDOM from 'react-dom';
import index from './index2.css';
import style from './style.css';

const name = 'Webpack'
const element = <div><i className="icon icon-discount"></i><h1>Hello, {name}!</h1></div>;

class App2 extends React.Component{
	render() {
		return (
			<div className={`${index.app} ${index.pic}`}>App2</div>
		);
	}
}

export default App2;
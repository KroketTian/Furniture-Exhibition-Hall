import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './test.jsx';
import App2 from './test2.jsx';
// import './assets/iconfont/iconfont.css'

if (module.hot) {
	module.hot.accept();
}

ReactDOM.render(
	<AppContainer>
		<div>
			<App></App>
			<App2></App2>
		</div>
	</AppContainer>,
	document.getElementById('app')
);
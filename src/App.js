import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import CategoryPage from './components/pages/CategoryPage';
import DashboardPage from './components/pages/DashboardPage';
import Navbar from './components/ui/Navbar';

import { Provider } from 'react-redux';
import store from './store';
import { Fragment } from 'react';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<div className='wrapper'>
						<Switch>
							<Route exact path='/' component={LandingPage} />
							<Route exact path='/dashboard' component={DashboardPage} />
							<Route exact path='/category' component={CategoryPage} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;

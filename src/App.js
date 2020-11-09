import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CategoryPage from './components/pages/CategoryPage';
import DashboardPage from './components/pages/DashboardPage';

import Navbar from './components/ui/Navbar';

const App = () => {
	return (
		<div className='wrapper'>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/dashboard' component={DashboardPage} />
					<Route exact path='/category' component={CategoryPage} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;

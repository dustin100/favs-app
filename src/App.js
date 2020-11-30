import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import theme from './components/ui/Theme';

import Navbar from './components/ui/Navbar';
import Alert from './components/ui/SimpleAlert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/pages/Landing';
import Category from './components/pages/Category';
import Dashboard from './components/pages/Dashboard';

import { Provider } from 'react-redux';
import store from './store';
import { Fragment } from 'react';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Fragment>
						<Navbar />
						<Container>
							<Alert />
							<Switch>
								<Route exact path='/' component={Landing} />
								<Route exact path='/dashboard' component={Dashboard} />
								<Route exact path='/category' component={Category} />
								<Route exact path='/login' component={Login} />
								<Route exact path='/register' component={Register} />
							</Switch>
						</Container>
					</Fragment>
				</Router>
			</ThemeProvider>
		</Provider>
	);
};

export default App;

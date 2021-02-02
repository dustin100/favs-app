import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import theme from './components/ui/Theme';

import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/ui/Navbar';
import Alert from './components/ui/SimpleAlert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/pages/Landing';
import Category from './components/pages/Category';
import ItemForm from './components/forms/ItemForm';
import EditItemForm from './components/forms/EditItemForm';
import Dashboard from './components/pages/Dashboard';
import Public from './components/pages/Public';
import CategoryForm from './components/forms/CategoryForm';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import { Fragment, useEffect } from 'react';

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
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
								<Route exact path='/public' component={Public} />
								<PrivateRoute exact path='/dashboard' component={Dashboard} />
								<PrivateRoute
									exact
									path='/categoryform'
									component={CategoryForm}
								/>
								<PrivateRoute exact path='/category' component={Category} />
								<PrivateRoute exact path='/item-form' component={ItemForm} />
								<PrivateRoute
									exact
									path='/edit-item-form'
									component={EditItemForm}
								/>

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

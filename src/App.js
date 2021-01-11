import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import * as userActions from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthRoute from './utils/AuthRoute';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

function App() {
  let dispatch = useDispatch();
  const token = localStorage.FBIdToken;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(userActions.logoutUser());
      window.location.href = '/login';
    } else {
      dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(userActions.getUserData());
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  UI: uiReducer
});
const middleware = [ReduxThunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 3000 });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

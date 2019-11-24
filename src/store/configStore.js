import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/** Import REDUCERS */
import tasksReducer from './reducers/tasksReducer';

const rootReducers = combineReducers({
    tasks: tasksReducer,
});

/** Use the extension redux dev tools only in development */
const composeEnhancers = process.env.NODE_ENV === "development" ? composeWithDevTools : null || compose;

const initializeStore = (initialState = {}) => {
    return createStore(rootReducers, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)))
}

export default initializeStore;
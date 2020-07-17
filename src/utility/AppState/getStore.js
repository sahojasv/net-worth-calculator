import { createStore, compose, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import { getDefaultState } from './getDefaultState';
import thunk from 'redux-thunk';
import { reducer } from '../../reducers';
import { requestCalculator } from '../../actions/NetWorth';

const defaultState = getDefaultState();
const loggerMiddleware = createLogger();

console.log(defaultState);

const enhancer = compose(
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
);

const store = createStore(
  reducer,
  defaultState,
  enhancer
);

store.dispatch(requestCalculator());

export const getStore = () => store;

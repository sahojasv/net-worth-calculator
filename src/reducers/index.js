
import { combineReducers } from '../utility/Redux/combineReducers';
import { netWorthReducer } from './NetWorth';

export const reducer = combineReducers({
  netWorth: netWorthReducer
});
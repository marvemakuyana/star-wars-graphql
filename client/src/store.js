import { combineReducers, createStore } from "redux";
import loadReducer from './reducers/reducer';

export const reducer = combineReducers({
    loading: loadReducer
})

const store = createStore(
    reducer

);

export default store;
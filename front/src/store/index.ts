import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import { profileReducer } from "./profile/profileReducer";
import { RootState } from "../domain/entity/rootState"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers<RootState>({ profile: profileReducer }),
    compose(
        applyMiddleware(sagaMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);
export default store;
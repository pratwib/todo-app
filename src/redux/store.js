import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import todoSaga from "./sagas/todoSaga.js";
import todoReducer from "./reducers/todoReducer.js";

const rootReducer = combineReducers({
    todos: todoReducer,
});

function* rootSaga() {
    yield all([todoSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
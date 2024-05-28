import {takeEvery, call, put} from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {FETCH_TODOS, setTodos} from '../actions';

function* fetchTodosSaga() {
    try {
        const response = yield call(axiosInstance.get, '/todos');
        yield put(setTodos(response.data.reverse()));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

export default function* todoSaga() {
    yield takeEvery(FETCH_TODOS, fetchTodosSaga);
}

import {ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_TODO, SET_TODOS, REORDER_TODOS} from '../actions';

const initialState = [];

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [action.todo, ...state];
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case EDIT_TODO:
            return state.map(todo => todo.id === action.id ? {...todo, ...action.updates} : todo);
        case TOGGLE_TODO:
            return state.map(todo => todo.id === action.id ? {...todo, completed: !todo.completed} : todo);
        case SET_TODOS:
            return action.todos;
        case REORDER_TODOS:
            const reorderedTodos = Array.from(state);
            const [removed] = reorderedTodos.splice(action.startIndex, 1);
            reorderedTodos.splice(action.endIndex, 0, removed);
            return reorderedTodos;
        default:
            return state;
    }
};

export default todoReducer;

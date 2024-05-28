export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_TODOS = 'SET_TODOS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const REORDER_TODOS = 'REORDER_TODOS';

export const addTodo = (todo) => ({type: ADD_TODO, todo});
export const removeTodo = (id) => ({type: REMOVE_TODO, id});
export const editTodo = (id, updates) => ({type: EDIT_TODO, id, updates});
export const toggleTodo = (id) => ({type: TOGGLE_TODO, id});
export const setTodos = (todos) => ({type: SET_TODOS, todos});
export const fetchTodos = () => ({type: FETCH_TODOS});
export const reorderTodos = (startIndex, endIndex) => ({
    type: REORDER_TODOS,
    startIndex,
    endIndex,
});
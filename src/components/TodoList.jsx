import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTodos, addTodo, reorderTodos} from '../redux/actions';
import TodoItem from './TodoItem';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchTodos())

        setTimeout(() => setLoading(false), 1000);
    }, [dispatch]);

    const handleAddTodo = () => {
        setLoading(true)

        const newTodo = {id: Date.now(), title: 'New Task', completed: false};
        dispatch(addTodo(newTodo))

        setTimeout(() => setLoading(false), 500);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const {source, destination} = result;
        dispatch(reorderTodos(source.index, destination.index));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') {
            return todo.completed;
        } else if (filter === 'active') {
            return !todo.completed;
        } else {
            return true;
        }
    }).filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="d-flex flex-column align-items-center" style={{width: '100vw', marginTop: '10vw'}}>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-row mb-4 gap-5 w-100">
                    <div className="d-flex flex-column">
                        <label>Status Filter:</label>
                        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                    <div className="d-flex flex-column">
                        <label>Search:</label>
                        <input
                            type="text" className="form-control" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
                </div>

                {loading ? (
                    <div className="d-flex flex-column justify-content-start spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="todo-list">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="list-group w-100">
                                    {filteredTodos.map((todo, index) => (
                                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="list-group-item"
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        marginBottom: '8px',
                                                        backgroundColor: '#fff',
                                                        color: '#333',
                                                    }}>
                                                    <TodoItem todo={todo}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
};

export default TodoList;

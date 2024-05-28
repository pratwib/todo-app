import {useDispatch} from "react-redux";
import {editTodo, removeTodo, toggleTodo} from "../redux/actions.js";

const TodoItem = ({todo}) => {
    const dispatch = useDispatch();

    const handleToggle = () => dispatch(toggleTodo(todo.id));
    const handleRemove = () => dispatch(removeTodo(todo.id));
    const handleEdit = (e) => dispatch(editTodo(todo.id, {title: e.target.value}));

    return (
        <div className="row align-items-center mb-3">
            <div className="col-auto">
                <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={handleToggle}/>
            </div>
            <div className="col">
                <input className="form-control" type="text" value={todo.title} onChange={handleEdit}/>
            </div>
            <div className="col-auto">
                <button className="btn btn-danger" onClick={handleRemove}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;

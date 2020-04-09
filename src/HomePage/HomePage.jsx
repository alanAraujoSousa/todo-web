import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../_actions';

function HomePage() {

    const [todo, setTodo] = useState({
        content: ''
    });

    const todos = useSelector(state => state.todos);
    const user = useSelector(state => state.authentication.user);
    
    const [submitted, setSubmitted] = useState(false);
    
    const dispatch = useDispatch();

    // fetch all Todos
    useEffect(() => { 
        dispatch(todoActions.getAll());
    }, []);

    function handleDeleteTodo(id) {
        dispatch(todoActions.delete(id));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setTodo(todo => ({ ...todo, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (todo.content) {
            dispatch(todoActions.create(todo));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.name}!</h1>
            <p>You're logged on the TODO list!!</p>
            <h3>All registered TODOs:</h3>
            {todos.loading && <em>Loading todos...</em>}
            {todos.error && <span className="text-danger">ERROR: {todos.error}</span>}
            
            {/* todo input */}
            <form name="form" onSubmit={handleSubmit} className="form-inline">
                <div className="form-group">
                    <input type="text" name="content" value={todo.content} onChange={handleChange} placeholder="put the task here" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">OK!</button>
            </form>
            
            {/* todo list */}
            {todos.items &&
                <ul>
                    {todos.items.map(
                        (todo, index) =>
                        <li key={todo.id}>
                            {todo.content}
                            {
                                todo.deleting ? <em> - Deleting...</em>
                                : todo.deleteError ? <span className="text-danger"> - ERROR: {todo.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteTodo(todo.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };
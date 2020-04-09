import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../_actions';

function Todos() {

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
            setTodo(todo => ({ ...todo, content: "" }));
        }
    }

    return (
        <div>
            <div className="col-lg-8 offset-lg-2">
                <h1>Hi {user.name}!</h1>
                
                {todos.loading && <em>Loading todos...</em>}
                {todos.error && <span className="text-danger">ERROR: {todos.error}</span>}
                
                {/* todo input */}
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="content" value={todo.content} onChange={handleChange} 
                            placeholder="Put task, press enter to create and click to delete!" className="form-control" />
                    </div>
                </form>
                
                {/* todo list */}
                {todos.items &&
                    <ul className="list-group">
                        {todos.items.map(
                            (todo, index) =>
                            <a data-toggle="tooltip" title="Click to delete" onClick={() => handleDeleteTodo(todo.id)} className="list-group-item" key={todo.id}>
                                {todo.content}
                                {
                                    todo.deleting ? <em> - Deleting...</em>
                                    : todo.deleteError ? 
                                        <span className="text-danger"> - ERROR: {todo.deleteError}</span>
                                        : <span> </span>
                                }
                            </a>
                        )}
                    </ul>
                }
            </div>
            <div className="fixed-top text-right m-3">
                <Link to="/login">Logout</Link>
            </div>
        </div>
    );
}

export { Todos };
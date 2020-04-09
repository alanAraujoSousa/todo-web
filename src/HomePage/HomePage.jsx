import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../_actions';

function HomePage() {

    const todos = useSelector(state => state.todos);
    const user = useSelector(state => state.authentication.user);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoActions.getAll());
    }, []);

    function handleDeleteTodo(id) {
        dispatch(todoActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.name}!</h1>
            <p>You're logged on the TODO list!!</p>
            <h3>All registered TODOs:</h3>
            {todos.loading && <em>Loading todos...</em>}
            {todos.error && <span className="text-danger">ERROR: {todos.error}</span>}
            {todos.items &&
                <ul>
                    {todos.items.map((todo, index) =>
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
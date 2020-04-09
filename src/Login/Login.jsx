import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { email, password } = inputs;
    
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    useEffect(() => { // reset login status
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange} 
                    className={'form-control' + (submitted && !email ? 'is-invalid' : '')} />

                    {submitted && !email && 
                        <div className="invalid-feedback">The email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}
                    className={'form-control' + (submitted && !password ? 'is-invalid' : '')} />

                    {submitted && !password &&
                        <div className="invalid-feedback">The email is required</div>
                    }
                </div>
                <div className="form-group">
                    <button disabled={ !email || !password } className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
} 

export { Login };
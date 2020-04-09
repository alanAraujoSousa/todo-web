import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_helpers';
import { Todos } from '../Todos';
import { Login } from '../Login';
import { Register } from '../Register';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);

    var logo = {
        margin: '50px',
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        display: 'inline-block',
      };

    return (
        <div className="container">
            <div className="col-md-8 offset-md-2"> 

                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                
                <div className="col-md-4 offset-md-4">
                    <div style={logo}/>
                </div>

                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={Todos} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
                
            </div>
        </div>
    );
}

export { App };
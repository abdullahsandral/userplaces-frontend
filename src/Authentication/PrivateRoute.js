import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const { U_ID, U_Token } = useSelector( state => state?.users?.loggedin_user) || {}
    const authenticated = !!U_ID && !!U_Token;
    const location = useLocation();
    return <Route
        {...rest}
        render={ props => authenticated ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/login', state: { to: location } }} />}
        />
}

export default PrivateRoute;
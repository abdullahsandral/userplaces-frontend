import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {NavLink, useHistory} from 'react-router-dom';
import { SIGNOUT_USER } from '../../../Actions/TYPES';
import classes from './NavLinks.module.css';

const NavLinks = props =>
{
    const history = useHistory(), dispatch = useDispatch();
    const { U_ID, U_Token } = useSelector( state => state?.users?.loggedin_user) || {}
    const authenticated = !!U_ID && !!U_Token;
    const signOUT = () =>
    {
        localStorage.clear('userData');
        dispatch({ type: SIGNOUT_USER })
        history.push('/login')
    }

    return  <ul className={classes.navLinks}>
                <li className={classes.navLink}>
                    <NavLink to='/'>ALL USERS</NavLink>
                </li>
                {authenticated &&  (
                <React.Fragment>
                <li className={classes.navLink}>
                    <NavLink replace to={{pathname: `/${U_ID}/places`, }}>MY PLACES</NavLink>
                </li>
                <li className={classes.navLink}>
                    <NavLink to='/places/new'>ADD PLACE</NavLink>
                </li>
                <li className={classes.navLink}>
                    <button id='signout' onClick={signOUT}>SIGN OUT</button>
                </li> 
                </React.Fragment>
                 )}
                {!authenticated &&  (
                <React.Fragment>
                <li className={classes.navLink}>
                    <NavLink to='/login'>SIGN IN</NavLink>
                </li>
                <li className={classes.navLink}>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                </li> 
                </React.Fragment>
                 )}
            </ul>
}

export default NavLinks;
import React , {useEffect, useRef} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../Actions/UsersActions';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import UserList from '../Components/UserList';
import classes from './Users.module.css'

const Users = props =>
{
    const didMount = useRef(false);
    const { users, loading_users } = useSelector( state => state.users);
    const dispatch = useDispatch();

    useEffect(()=>
    {
        dispatch(getAllUsers());
        didMount.current = true;
    },
    [dispatch])

    return(
        <>
            {(loading_users || !didMount?.current) ?
                <div className = {classes.center}>
                    <Spinner />
                    <h2>Loading...</h2>
                </div> :
                 <div>
                    <UserList users = {users} />
                 </div>
            }
        </>
    )
}



export default Users;
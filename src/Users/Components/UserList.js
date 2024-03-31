import React from 'react';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

import UserItem from './UserItem'
import classes from './UserList.module.css';

const UserList = ({ users }) =>
{
    if(isEmpty(users))
    {
        return(
            <div className = {classes.center}>
                <h2 style={{color: 'white'}}>No User Found.</h2>
            </div>
        )
    }
    else 
    { 
        return(
            <div className = {classes.oneUser}>
                <ul>
                {users.map( (user) =>
                <UserItem  
                    key = {user.U_ID}
                    id = {user.U_ID}
                    name = { user.U_Name}
                    image = {user.U_Image}
                    totalPlaces = {user.U_Places}
                />
                )}
                </ul>
            </div>
        )
    }
}

export default UserList;
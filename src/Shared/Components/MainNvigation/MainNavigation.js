import React , {useState} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import classes from './MainNavigation.module.css';

const MainNavigation = () =>
{
    const { U_ID, U_Image, U_Token } = useSelector( state => state?.users?.loggedin_user) || {}
    const authenticated = !!U_ID && !!U_Token && !!U_Image;
    const [drawerState , setDrawerState] = useState(false)
    const DrawerHandler = () =>
    {
        setDrawerState(!drawerState);
    }
    var S_Drawer = (<div className={classes.sideDrawer}>
                        <SideDrawer drawerClicked = {DrawerHandler}/>
                        <Backdrop backdropClicked = {DrawerHandler}/>
                    </div>)
    var imgORtext = authenticated ? <img src={U_Image} alt='' /> : <b>USER PLACES</b>;
    return(
        <MainHeader>
            {drawerState ? S_Drawer : null}
                <button className={classes.menuBtn} onClick = {DrawerHandler}>
                <span></span>
                <span></span>
                <span></span>
                </button>
                <div className={classes.mainNavTitle}>
                    <Link to=''>
                        {imgORtext}
                    </Link>
                </div>
            <div className={classes.navLinks}>
                <NavLinks/>
            </div>
        </MainHeader>
    )
}

export default MainNavigation;
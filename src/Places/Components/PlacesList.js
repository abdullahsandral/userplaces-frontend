import React from 'react';

import Card from '../../Shared/Components/Card/Card';
import PlaceItem from './PlaceItem'; 

 import classes from './PlacesList.module.css';


const PlacesList = props =>
{
    if(props.userPlaces.length === 0)
    {
        return <Card> 
                    <h4>No Place Found... </h4>
                </Card>
    }
    else 
    return(
        <ul className={classes.placesList}>
            {props.userPlaces.map( onePlace => <PlaceItem key = {onePlace.P_ID} { ...onePlace } onDelete= {props.onDeletePlace}/> )}
        </ul>
    )
}

export default PlacesList;
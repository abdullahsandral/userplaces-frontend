import axios from "axios"
import { LOADING_PLACES, GET_ALL_PLACES, GET_SINGLE_PLACE } from "./TYPES";

export const getUserPlaces =  userId => async dispatch => {
    dispatch(setPlacesLoading());
    try {
        const { data } = await axios?.get(`/places/user/${userId}`) || {};
        dispatch({
            type: GET_ALL_PLACES,
            payload: data?.Places
        });
    }
    catch (error) {
        console.log('ERROR IN GETTING USER PLACES')
    }
}

export const getSinglePlace =  placeId => async dispatch => {console.log('Getting Single Place')

    dispatch(setPlacesLoading());
    try {
            const { data } = await axios?.get(`/places/${placeId}`) || {};
            dispatch({
                type: GET_SINGLE_PLACE,
                payload: data
            });
        }
    catch (error) {
        console.log('ERROR IN GETTING USER PLACES')
    }
}

export const createPlace =  (placeData, uID) => async dispatch => {console.log('Creating Place')

    dispatch(setPlacesLoading());
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(user?.U_Token);
    try {
            const { data } = await axios?.post(`/places`, placeData, {
                headers: { Authorization: "Bearer " + user?.U_Token },
              }) || {};
            getUserPlaces(uID);
        }
    catch (error) {
        console.log('ERROR IN GETTING USER PLACES')
    }
}

const setPlacesLoading = () => {
    return {
        type: LOADING_PLACES,
    }
}
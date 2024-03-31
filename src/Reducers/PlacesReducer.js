import { GET_ALL_PLACES, GET_SINGLE_PLACE, LOADING_PLACES } from '../Actions/TYPES';
const initialState = {
    loading_places: false,
    places: null,
    single_place: null,    
}

const placesReducers = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_PLACES:
            return {
                ...state,
                loading_places: true
            }
        case GET_ALL_PLACES:
            return {
                ...state,
                places: action?.payload,
                loading_places: false
            }
        case GET_SINGLE_PLACE:
            return {
                ...state,
                single_place: action?.payload,
                loading_places: false
            }
        default:
            return {
                ...state
            }
    }
}

export default placesReducers;
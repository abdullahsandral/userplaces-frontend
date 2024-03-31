import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";

import Input from '../../Shared/Components/UI Element/Input';
import ImageInput from '../../Shared/Components/UI Element/ImageInput';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '../../Shared/Util/Validators/Validator';
import classes from './NewPlaces.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPlace, getSinglePlace } from '../../Actions/PlacesActions';
import isEmpty from '../../Shared/Util/Validators/isEmpty';

const NewPlaces = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { U_ID } = JSON.parse(localStorage.getItem('userData'));
    const { pID } = useParams() || {};
    const { single_place: place, loading_places } = useSelector( state => state.places);
    const [adding, setAdding] = useState(false);
    const [description, setDescription] = useState('');
    const [formState, inputChangeHandler, dataSetter] = useForm({
        title: {
            inputValue: '',
            inputisValid: false
        },
        address: {
            inputValue: '',
            inputisValid: false
        },
        newPlaceImage: {
            inputValue: '',
            inputisValid: false
        },
    }, false)

    const addPlace = async e => {
        e.preventDefault();
        if (formState.inputs.newPlaceImage.inputValue.size > 5242880) { alert("Please Select An Image With Size Less than 5MB"); return }
        setAdding(true);
        try {
            const newPlaceData = new FormData();
            const { title, address, newPlaceImage } = formState.inputs || {}
            newPlaceData.append('title', title.inputValue);
            newPlaceData.append('address', address.inputValue);
            newPlaceData.append('description', description);
            newPlaceData.append('creator', U_ID);
            newPlaceData.append('newPlaceImage', newPlaceImage.inputValue);
            dispatch(createPlace(newPlaceData, U_ID));
            // const response = await fetch(process.env.REACT_APP_BACKEND_URL.split(';')[0] + '/places',
            //     {
            //         method: 'POST',
            //         headers: { Authorization: "Bearer " + Authenticated.userToken },
            //         body: newPlaceData
            //     });
            // const responseData = await response.json();

            // if (!response.ok) {
            //     setAdding(false);
            //     history.push(`/`);
            //     alert(responseData.errorCode + "\n" + responseData.errorMsg)
            // }
            // else {
            //     setAdding(false);
            //     dispatchPlaceAdded({ type: 'NEW_PLACE_ADDED' })
            //     history.push(`/${uid}/places`)
            // }

        }
        catch (error) { setAdding(false); alert(error) }
    }

    useEffect(() => {
        if(!place) return
        const { P_Title, P_Address, P_Image, P_Description } = place;
        dataSetter({
            title: {
                inputValue: P_Title,
                inputisValid: true
            },
            address: {
                inputValue: P_Address,
                inputisValid: true
            },
            newPlaceImage: {
                inputValue: P_Image,
                inputisValid: true
            },
        }, true);
        console.log({ P_Title, P_Address, P_Image, P_Description }, dataSetter)
    },[place, dataSetter])
    useEffect(() => {
        if(pID && pID !== 'new') {
            dispatch(getSinglePlace(pID))
        }
    },[])
    return (

        <div className={classes.center} >
            {adding &&
                <Backdrop>
                    <Spinner />
                    <h2 style={{ color: 'gold' }}>Adding New Place...</h2>
                </Backdrop>
            }
            <form className={classes.addPlaceFORM} onSubmit={addPlace}>

                <ImageInput
                    id='newPlaceImage' Error="Please Pick an Image" height='300px'
                    onInputChange={inputChangeHandler}
                />
                <Input
                    id="title" type="Input" Label="Title"
                    pHolder="Enter The Name of Place"
                    Error="Please Enter a Valid Title with MINIMUM LENGTH of 5 and MAXIMUM LENGTH of 50 Words" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(5), MAX_LENGTH_VALIDATOR(50)]}
                />

                <Input
                    id="address" type="Input" Label="Address"
                    pHolder="Enter The Address of Place"
                    Error="Please Enter a Valid Address with MINIMUM LENGTH of 5 and MAXIMUM LENGTH of 80 Words" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(5), MAX_LENGTH_VALIDATOR(80)]}
                />

                {/* <Input  
                    id = "description" type = "textArea" Label = "Description" 
                    pHolder = "Enter Description for Selected Place"  
                    Error = "Please Enter a Valid Description with MINIMUM LENGTH of 5" onInputChange = {inputChangeHandler}
                    validators = {[MIN_LENGTH_VALIDATOR(5)]} 
                /> */}
                <div className='mb-3'>
                    <label style={{color: '#6d6868'}}><b>Description</b></label>
                    <JoditEditor
                        value={description}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => { setDescription(newContent) }}
                    />
                </div>

                <button disabled={!formState.formIsValid || isEmpty(description)} className={`btn ${formState.formIsValid ? 'btn-outline-success' : 'btn-danger'}`}>
                    ADD PLACE
                </button>
            </form>
        </div>
    )
}

export default NewPlaces;
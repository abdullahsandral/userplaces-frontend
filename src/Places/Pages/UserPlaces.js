import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPlaces } from "../../Actions/PlacesActions";

import Spinner from "../../Shared/Components/UI Element/Spinner";
import PlacesList from "../Components/PlacesList";
import classes from "./UserPlaces.module.css";

const UserPlaces = (props) => {
  const userId = useParams().uid;
  const didMount = useRef(false);
  const dispatch = useDispatch();
  const { places, loading_places } = useSelector((state) => state.places);

  // const getPlaceByUserId = useCallback(async () =>
  // {
  //     try
  //     {
  //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL.split(';')[0]}/places`);
  //         const places = await response.json();

  //         setPlacesLoadingState(false);
  //         if(response.ok)
  //         dispatchUsersPlaces({   type : 'PLACES_FETCHED',   value : places    })
  //         // else    throw new Error(places.errorMsg)

  //     } catch (error) { setErrorMessage(error.message); setPlacesLoadingState(false);  }
  // },[dispatchUsersPlaces])
  const deletePlaceHandler = () => {
    dispatch(getUserPlaces(userId));
  };

  useEffect(() => {
    dispatch(getUserPlaces(userId));
    didMount.current = true;
  }, [dispatch, userId]);

  return (
    <>
      {loading_places || !didMount?.current ? (
        <div className={classes.spinnerCenter}>
          <Spinner />
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className={classes.center}>
          <PlacesList userPlaces={places} onDeletePlace={deletePlaceHandler} />
        </div>
      )}
    </>
  );
};

export default UserPlaces;

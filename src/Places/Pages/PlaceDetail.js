import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../Shared/Components/UI Element/Spinner";
import classes from "./PlaceDetail.module.css";
import { getSinglePlace } from "../../Actions/PlacesActions";

const DetailPlace = (props) => {
  const { pID } = useParams();
  const didMount = useRef(false);
  const dispatch = useDispatch();
  const { single_place: place, loading_places } = useSelector(
    (state) => state.places
  );
  const { U_ID } = useSelector((state) => state?.users?.loggedin_user) || {};
  // const getPlaces = async () =>
  // {
  //     try
  //     {
  //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL.split(';')[0]}/places`);
  //         const places = await response.json();

  //         if(response.ok)
  //         dispatchUsersPlaces({   type : 'PLACES_FETCHED',   value : places    })

  //     } catch (error) {   alert(error) }
  // }

  useEffect(() => {
    pID && dispatch(getSinglePlace(pID));
    didMount.current = true;
  }, [dispatch, pID]);

  if (!didMount?.current || loading_places)
    return (
      <div className={classes.spinnerCenter}>
        <Spinner />
        <h2>Loading...</h2>
      </div>
    );
  else
    return (
      <React.Fragment>
        <div className={classes.center}>
          <div className={`row  ${classes.placeDetail}`}>
            {place.P_Image && (
              <div className="col-12 p-0">
                <img src={place.P_Image} alt="" />
                {/* <img src={`${process.env.REACT_APP_ASSET_URL.split(';')[0]}/${place.P_Image}`} alt='' /> */}
              </div>
            )}
            <div className="col-12 text-center pt-3">
              <h4>{place.P_Title}</h4>
            </div>
            <div className="col-12 text-center pt-3">
              <h5>{place.P_Address}</h5>
            </div>
            <div className="col-12 text-center pt-3">
              <p style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
                {place.P_Description}
              </p>
            </div>
            <div className="row w-100 m-0 justify-content-center">
              {U_ID === place.userUID && (
                <div className="col-12 col-md-6 pl-md-1 order-md-1">
                  <Link to={`/places/${place.P_ID}/update`}>
                    <button className="btn btn-success w-100 mb-2">EDIT</button>
                  </Link>
                </div>
              )}

              <div className="col-12 col-md-6 pr-md-1  ">
                <Link to={`/${place.userUID}/places`}>
                  <button className="btn btn-outline-dark w-100 mb-2">
                    GO BACK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
};

export default DetailPlace;

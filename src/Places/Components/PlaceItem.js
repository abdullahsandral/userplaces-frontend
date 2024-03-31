import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Modal from '../../Shared/Components/Modal/Modal';
import classes from './PlaceItem.module.css';

const PlaceItem = ({ P_Address, P_ID, P_Image, P_Title, userUID, onDelete }) =>
{
    const dispatchPlaceDeleted = useDispatch();
    const user = JSON.parse(localStorage.getItem('userData'));
    const [deleting , setDeleting] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);

    const showDeleteModalhandler = () =>
    {
        setShowDeleteModal(!showDeleteModal);        
    }
    const deletePlaceHandler = async () =>
    {
        setDeleting(true);
        try 
        {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${P_ID}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type'   :   'application/json',
                            Authorization   :   "Bearer " + user.userToken},
            });
            const responseData = await response.json();
            if(!response.ok)
            {   
                setDeleting(false);
                showDeleteModalhandler();
                alert(responseData.errorCode +"\n" + responseData.errorMsg)
            }
            else
            {
                setDeleting(false);
                dispatchPlaceDeleted({  type : 'PLACE_DELETED' })
                onDelete();
            }
        } catch (error) { setDeleting(false); alert(error)  }
    }

    const deleteModalHeader   = <h4>Are You Sure</h4>;
    const deleteModalMain     = <React.Fragment>
                                    <p>Do You Want to proceed For Deleting The Specified Place </p> 
                                    <p style={{border : '3px solid #c20e0e4c '}}><b>Caution : </b>Once a Place is Deleted It cannot be Undone</p>
                                </React.Fragment>
    return(
        <React.Fragment>
            {showDeleteModal && <Modal
                modalHeader = {deleteModalHeader}
                modalMain   = {deleteModalMain}
                deleteModal = {true}
                changeModalState = {showDeleteModalhandler}
                deletePlace      = {deletePlaceHandler}
            />}
            {deleting && 
            <Backdrop>
                <Spinner />
                <h2 style={{color:'gold'}}>Deleting Place...</h2>
            </Backdrop>
            }
            <li>
                <div className = {classes.onePlace}>
                    <div>
                        <img src = {P_Image} alt=''/>
                    {/* <img src={`${process.env.REACT_APP_ASSET_URL.split(';')[0]}/${props.image}`} alt='' /> */}
                    </div>
                    <div className = {classes.description}>
                        <h4>{P_Title}</h4>
                        <h5>{P_Address}</h5>
                    </div>
                    <hr/>
                    <div className = {classes.onePlaceBtns}>
                    <Link to={`/places/${P_ID}/detail`}>
                        <button className='btn btn-dark m-1' >VIEW DETAIL</button>
                    </Link> 
                {user.U_ID === userUID && (
                    <button className='btn btn-danger m-1' onClick = {showDeleteModalhandler}>DELETE</button>  
                )}
                    </div>
                </div>
                
            </li>
            
        </React.Fragment>
        
    )
}

export default PlaceItem;
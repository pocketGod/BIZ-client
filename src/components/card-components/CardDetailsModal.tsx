import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../interfaces/Card";
import { deleteCard, getIsCardOwner } from "../../services/cardService";
import { infoMessage } from "../../services/toastService";
import { getOtherUserDetails } from "../../services/userService";

interface CardDetailsModalProps {
    card:Card,
    closeModal:Function,
    updateCardData:Function
}
 
const CardDetailsModal: FunctionComponent<CardDetailsModalProps> = ({card, closeModal, updateCardData}) => {

    const [cardOwner, setCardOwner] = useState<any>({})


    useEffect(() => {
        getOtherUserDetails(card.user_id as string).then((result)=>{  
            setCardOwner(result.data)      
        }).catch((err)=> console.log(err))
    }, []);

    const handleDeleteCard = ()=>{
       if(window.confirm(`Are you Sure You Want To Delete Card "${card.name}"?`)){
        deleteCard(card).then((result)=>{
            infoMessage(result.data)
            updateCardData()
            closeModal(false)
        }).catch((err)=>console.log(err))
       }
    }


    return ( <>
        <div className="card-modal">
            <div className="row">
            <div className="col-lg-3 col-4">
                    <img src={card.img} alt="Basa" className="w-100 rounded-circle modal-round-img"/>
                </div>
                <div className="col-lg-5 col-8">
                    <div className="modal-head-section">
                        <h1 className="display-6 fw-bolder">{card.name}</h1>
                        <h2 className="display-6 fs-4 fw-bolder">{card.description}</h2>
                    </div>
                    <div className="modal-body-section">
                        <h4 className="display-6 fs-4">
                            <i className="fa-solid fa-mobile-screen-button me-2"></i>
                            {card.phone}
                        </h4>
                        <h4 className="display-6 fs-4">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {card.address}
                        </h4>
                        <h4 className="display-6 fs-5">in: {card.category}</h4>
                    </div>
                    {getIsCardOwner(card.user_id as string) ? (<>
                        <button className="mt-3 btn btn-danger delete-btn" onClick={handleDeleteCard}>
                            <i className="me-2 fa-solid fa-trash-can"></i>
                            Delete Card
                        </button>
                        <Link className="ms-3 mt-3 btn btn-danger edit-btn" to={`/edit-biz/${card.card_id}`}>
                            <i className="me-2 fa-solid fa-pencil"></i>
                              Edit Card
                        </Link>
                    </>):(<></>)}
                
                </div>
                <div className="col-lg-4 col-12">
                    <div className="modal-footer-section">
                        <h2 className="display-2 fs-2">
                            Owner is: 
                            {getIsCardOwner(card.user_id as string) ? (
                                <small className="ms-2 text-muted fs-6">(You are the Owner)</small>
                            ):(<p className="mb-3"></p>)}
                            <br/>
                            {cardOwner.name}
                            <br/>
                            at: {cardOwner.email}</h2>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default CardDetailsModal;
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../interfaces/Card";
import { getMyCards } from "../../services/cardService";
import Footer from "../general-components/Footer";
import Navbar from "../general-components/Navbar";
import BizCard from "./BizCard";
import CardDetailsModal from "./CardDetailsModal";

interface MyBizProps {
    
}
 
const MyBiz: FunctionComponent<MyBizProps> = () => {

    const [mycardsData, setMyCardsData] = useState<Card[]>([])

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const [specificCard, setSpecificCard] = useState<Card>({name:'',card_id:'',description:'',address:'',phone:'',img:'', category:''})

    const handleModalOpen = (card:Card)=>{
        setSpecificCard(card)
        setModalIsOpen(true)
    }

    useEffect(() => {
        updateCardData()
    }, []);

    const updateCardData = ()=>{
        getMyCards().then((result)=>{
            setMyCardsData(result.data)
        })
    }

    const navigate = useNavigate()
    
    return ( <>
        <Navbar/>
        <h1 className="display-1 page-title text-center my-4">My Cards</h1>

        <div className="container section-container">
            {mycardsData.length ? (
                <>
                    <div className="row mb-4">
                        <div className="text-muted text-center col-sm-6 col-12">
                            <p className="my-top-section w-100">
                                You Have {mycardsData.length} Biz Cards in Total
                            </p>
                        </div>
                        <div onClick={()=>navigate('/new-biz')}  className="text-muted text-center col-sm-6 col-12">
                            <p className="my-top-section my-top-section-action w-100 display-6 fs-5">Add a New Biz Card
                                <i className="ms-3 fa-solid fa-plus"></i>
                            </p>
                        </div>
                    </div>
                    <div className="row px-5">
                        { mycardsData.map((card)=>(
                            <div key={card.card_id} className='col-12 col-sm-6 col-md-4 col-lg-2' onClick={()=>handleModalOpen(card)}>
                                <BizCard card={card} page={'my-biz'}/>
                            </div>
                        ))}
                    </div>
                </>
            ):(
                <>
                    <div className="row">
                        <div className="col-sm-6 col-12 text-center pt-2">
                            <h6 className="display-6 fs-4">You Dont Have Any Biz Cards Yet...</h6>
                        </div>
                        <div onClick={()=>navigate('/new-biz')}  className="text-muted text-center col-sm-6 col-12">
                            <p className="my-top-section my-top-section-action w-100 display-6 fs-5">Add Your First Biz Card!
                                <i className="ms-3 fa-solid fa-plus"></i>
                            </p>
                        </div>
                    </div>
                </>
            )}

            {modalIsOpen ? (<>
                <button className="modal-close-btn" onClick={()=>setModalIsOpen(false)}>
                    <i className="fa-solid fa-xmark fs-2"></i>
                </button>
                <CardDetailsModal card={specificCard} closeModal={setModalIsOpen} updateCardData={updateCardData}/>
            </>):(<></>)}
        </div>
        <Footer/>
    </> );
}
 
export default MyBiz;
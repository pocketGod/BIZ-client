import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../../interfaces/Card";
import { getAllCards, getAllCategories } from "../../services/cardService";
import Footer from "../general-components/Footer";
import Navbar from "../general-components/Navbar";
import BizCard from "./BizCard";
import CardDetailsModal from "./CardDetailsModal";

interface CardsProps {
    
}
 
const Cards: FunctionComponent<CardsProps> = () => {

    const [cardsData, setCardsData] = useState<Card[]>([])

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const [specificCard, setSpecificCard] = useState<Card>({name:'',card_id:'',description:'',address:'',phone:'',img:'', category:''})

    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [categoryArr, setCategoryArr] = useState<string[]>([])
    const [inputSearch, setInputSearch] = useState<string>('')


    const handleModalOpen = (card:Card)=>{
        setSpecificCard(card)
        setModalIsOpen(true)
    }


    useEffect(() => {
        updateCardData()
        getAllCategories().then((result)=>{
            setCategoryArr(result.data)
        }).catch((err)=>console.log(err))
    }, []);

    const updateCardData = ()=>{
        getAllCards().then((result)=>{
            setCardsData(result.data)
        })
    }

    const checkIfCardMatchesCategory = (cardCat:string):boolean=>{
        if(cardCat == selectedCategory || selectedCategory == 'All') return true
        return false
    }

    const checkIfCardTitleMatchesSearch = (cardName:string):boolean=>{
        if(cardName.toLowerCase().includes(inputSearch.toLowerCase()) || inputSearch=='') return true
        return false
    }

    
    return ( <>
        <Navbar/>
        <h1 className="display-1 text-center my-4 page-title">Cards</h1>

        <div className="container section-container">

            {cardsData.length ? (
                <>
                    <div className="row mb-2">
                        <div className="text-muted text-center col-12">
                            <p className="my-top-section w-100">
                                {cardsData.length} Biz Cards in Total
                            </p>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-sm-7 col-12 form-floating">
                                <input type="text" className="form-control" id="searchInput" name='search' placeholder="c" onChange={(e)=>setInputSearch(e.target.value)}/>
                                <label htmlFor="searchInput" className="form-label ps-4">Search</label>
                            </div>
                            <div className="col-sm-5 col-12 form-floating">
                                <select className="form-select display-6 fs-6"   id="cardCategory" name='category' onChange={(e)=>setSelectedCategory(e.target.value)}>
                                <option key={'All'} value='All'>All</option>
                                    {categoryArr.map((cat)=>(
                                        <option className="text-capitalize" key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <label htmlFor="cardCategory" className="form-label ps-4">Category</label>
                            </div>
                        </div>
                    </div>
                    <div className="row px-5">
                        { cardsData.map((card)=>(
                            checkIfCardMatchesCategory(card.category) ? (
                                checkIfCardTitleMatchesSearch(card.name) ? (
                                    <div key={card.card_id} className='col-12 col-md-6 col-lg-4 col-xxl-3 mb-3' onClick={()=>handleModalOpen(card)}>
                                        <BizCard card={card} page={'all-cards'}/>
                                    </div>
                                ):(<></>)
                            ):(<></>)
                        ))}
                    </div>
                </>
            ):(
                <p>No Cards in DB...</p>
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
 
export default Cards;
import { FunctionComponent } from "react";
import { Card } from "../../interfaces/Card";


interface BizCardProps {
    card:Card,
    page:string
}
 
const BizCard: FunctionComponent<BizCardProps> = ({card, page}) => {
    return ( <>
        <div className="card biz-card">
            <img src={card.img} className="card-img card-img-bg" alt="Basa"/>
            <div className="card-img-overlay card-img">
                {page=='all-cards' ? (<>
                    <h5 className="card-title display-5 fs-1">
                        {card.name.length >= 15 ? (
                            card.name.substring(0, 15) + '...')
                            :(card.name)}
                    </h5>
                    <h5 className="card-title display-5 fs-6">
                        in: {card.category}
                    </h5>
                    <p className="card-text display-5 fs-4">
                        {card.description.length >= 30 ? (
                            card.description.substring(0, 30) + '...')
                            :(card.description)}
                    </p>
                    <p className="card-text display-5 fs-5">
                        <i className="fa-solid fa-mobile-screen-button me-3"></i>{card.phone}
                    </p>
                    <p className="card-text display-5 fs-5">
                        <i className="fa-solid fa-location-dot me-3"></i>{card.address}
                    </p>
                </>):(<>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <h6 className="text-center card-title display-5">{card.name.length >= 15 ? (
                            card.name.substring(0, 15) + '...')
                            :(card.name)}</h6>
                        <h6 className="text-center card-title fs-5 display-5"><small>in:</small>{card.category}</h6>
                    </div>
                </>)}
            </div>
        </div>
    </> );
}
 
export default BizCard;
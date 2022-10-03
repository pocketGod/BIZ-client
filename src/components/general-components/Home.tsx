import { FunctionComponent, useEffect, useState } from "react";
import {  changeBizStatus, getIsBiz, getMyUserDetails } from "../../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { User } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";
import { errorMessage, infoMessage } from "../../services/toastService";

interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {

    // console.log(getIsBiz())
    // sessionStorage.setItem('token', result.data.token)

    const [user, setUser] = useState<User>({_id:'',name:'',email:'',biz:false})

    const navigate = useNavigate()

    useEffect(() => {
        getMyUserDetails().then((result)=>{
            setUser(result.data)
        }).catch((err)=>console.log(err))
    }, []);

    const handleBizStatusChange = ()=>{
        changeBizStatus(user._id as string).then((result)=>{
            sessionStorage.setItem('token', result.data.newToken)
            setUser(result.data.user)
            navigate(0)
            infoMessage(`${user.name}'s Biz status was changed succssesfully`)
        }).catch((err)=>{
            console.log(err)
            errorMessage(`Error in changing user ${user.name} Biz status`)
        })
    }

    return ( <>
        <Navbar/>
        <h1 className="display-1 page-title text-center my-4">Welcome {user.name}</h1>
        <div className="container section-container">
            <div className="row">
                <div className="col-md-5 col-12">
                    <img src="home.jpg" className="home-img" alt="basa"/>
                </div>
                <div className="col-md-7 col-12 display-6 fs-2">
                    <p className="">
                        Biz Mikonos is a platform for you to:
                    </p>
                    {getIsBiz() ? (<>
                        <ul className="list-group fs-4">
                            <li className="list-group-item">Showcase your business</li>
                            <li className="list-group-item">Get in touch with other providers</li>
                            <li className="list-group-item">Recieve direct exposure to end customers</li>
                            <li className="list-group-item">Manage multiple business cards under a single account</li>
                            <li className="list-group-item">Create your own BIZ CARDS</li>
                        </ul>
                    </>):(<>
                        <p className="display-4">
                            Find the right provider for your any need
                        </p>
                        <p>Or:</p>
                        <p>Change your user status to <button className="convert-user-btn" onClick={handleBizStatusChange}>BIZ USER</button> to unlock more services and options</p>
                    </>)}
                </div>
            </div>
        </div>
        <Footer/>
    </> );
}
 
export default Home;
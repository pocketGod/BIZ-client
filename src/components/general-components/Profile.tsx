import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { errorMessage, infoMessage } from "../../services/toastService";
import { changeBizStatus, getMyUserDetails } from "../../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {

    const [user, setUser] = useState<User>({_id:'',name:'',email:'',biz:false})

    const navigate = useNavigate()

    useEffect(() => {
        getMyUserDetails().then((result)=>{
            setUser(result.data)
            console.log(result.data);
            
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

        <h1 className="display-1 page-title text-center my-4">Profile</h1>

        <div className="container">
            <div className="section-container display-6 fs-4">
                <div className="text-center py-4">
                    <div className="card-body">
                        <h5 className="mb-4">Youre logged in as:</h5>
                        <h5 className="card-title display-4 fs-1">{user.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted display-4 fs-1">{user.email}</h6>
                        <img src="general_user_pic.png" className="card-user-pic" />
                    </div>
                    <div className="card-footer bg-transparent">
                        <p className="card-text mt-4">{user.biz ? (<>
                            <i className="fa-regular fa-circle-check"></i> You are a BIZ User
                        </>):(<>
                            <i className="fa-regular fa-circle-xmark mb-5"></i> You are not a BIZ User
                            <br/>
                            Change your user status to <button className="convert-user-btn" onClick={handleBizStatusChange}>BIZ USER</button> to unlock more services and options
                        </>)}</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </> );
}
 
export default Profile;
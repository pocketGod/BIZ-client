import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { infoMessage } from "../../services/toastService";
import { getIsBiz } from "../../services/userService";

interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
    
    const [bizUser, setBizUser] = useState<boolean>(false)

    const navigate = useNavigate()
    const handleLogout = ()=>{
        sessionStorage.removeItem('token')
        navigate('/')
        infoMessage('User logged out successfully')
    }

    useEffect(() => {
        setBizUser(getIsBiz())
        // console.log(bizUser);
    }, [])

    return ( <>
        <nav className="navbar navbar-expand-lg main-nav">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/home'>
                            <img className="nav-img" src="logo-with-text.png" alt="" />
                        </NavLink>
                    </li>
                </ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" aria-current="page" to="/cards">Biz Cards</NavLink>
                        </li>
                        {bizUser ? (<>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/my-biz">My Biz Cards</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/new-biz">New Biz Card</NavLink>
                            </li>
                        </>):(<></>)}
                        <li className="nav-item">
                                <NavLink className="nav-link fs-5 mx-3" to="/profile">Profile</NavLink>
                            </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" to="/about">About</NavLink>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className="btn btn-outline-dark">Logout</button>
                </div>
            </div>
        </nav>
    </> );
}
 
export default Navbar;
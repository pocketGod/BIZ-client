import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return ( <>
        <Navbar/>
            <h1 className="display-1 text-center my-4 page-title">
                About the BIZ
            </h1>
            <div className="container">
                <div className="section-container row text-center">
                    <div className="col-12 col-md-6">
                        <h1 className="display-5">Biz Mikonos</h1>
                        <p className="display-6 fs-5">System used for managing and exploring BIZ CARDS - a minified web version of a business card that contains all the vital information to contact a certain business</p>
                        <p className="mb-4 display-6 fs-5">This system was made as a React + Node.JS summary project</p>
                        <div className="row display-6 fs-5 text-center">
                            <div className="col-lg-6 col-12">
                                <div className="table-container">
                                    <table className="about-table">
                                        <thead>
                                            <tr><th colSpan={2}>Stack</th></tr>
                                            <tr><th>Back</th><th>Front</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Node.JS</td><td>React</td>
                                            </tr>
                                            <tr>
                                                <td>Javascript</td><td>Typescript</td>
                                            </tr>
                                            <tr>
                                                <td>Express</td><td>JWT</td>
                                            </tr>
                                            <tr>
                                                <td>MongoDB</td><td>Bootstrap</td>
                                            </tr>
                                            <tr>
                                            <td>Bcrypt</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="table-container mb-3">
                                    <table className="about-table">
                                        <thead>
                                            <tr><th>Features</th></tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>CRUD Operations</td></tr>
                                            <tr><td>User Authentication</td></tr>
                                            <tr><td>Custom API Service</td></tr>
                                            <tr><td>Custom Interfaces</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h1 className="display-5 text-center">Aviv Shleyfman</h1>
                        <p className="display-4 fs-3">I'm a full stack web developer, located in Israel.
                        Actively looking for collaborations, Please dont hesitate to reach out!</p>
                        <div className="row display-4 fs-3">
                            <div className="col-12 col-md-6 about-link-container">
                                <a className="about-link" href="https://aviv-shleyfman-portfolio.netlify.app/" target={'_blank'}>Portfolio</a>
                                
                                <a className="about-link" href="https://www.linkedin.com/in/aviv-shleyfman/" target={'_blank'}>LinkedIn</a>
                                
                                <a className="about-link" href="https://github.com/pocketGod" target={'_blank'}>GitHub</a>
                                
                            </div>
                            <div className="col-12 col-md-6">
                                <img src="me.png" alt="" className="my-pic"/>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        <Footer/>
    
    </> );
}
 
export default About;
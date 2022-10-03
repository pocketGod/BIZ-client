import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { User } from "../../interfaces/User";
import { errorMessage, infoMessage } from "../../services/toastService";
import { userRegister } from "../../services/userService";

interface RegisterProps {
    
}
 

const Register: FunctionComponent<RegisterProps> = () => {

    const [biz, setBiz] = useState<boolean>(false)
    
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {name:'', email:'', password:''},
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().email().required(),
            password: yup.string().required().min(8),
            biz: yup.boolean()
        }),
        onSubmit: (values)=>{
            let user:User = {...values, biz:biz}
            // console.log(user)
            userRegister(user).then((result)=>{
                // console.log(result.data)
                sessionStorage.setItem('token', result.data.token)
                infoMessage(`${user.name} Has Registered Successfully`)
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                errorMessage('Something Went Wrong With The Registration Process')
            })
        }
    })


    return ( <>
        <div className="display-1 page-title mt-4 text-center">
            <img src="logo-with-text.png" alt="" />
        </div>
        <div className="w-100 h-100 d-flex justify-content-center pt-5">
            <div className="row section-container w-75">
                <div className="col-12 col-md-6">
                    <div>
                        <form onSubmit={formik.handleSubmit} className='text-center container w-75 pt-4'>
                        <h1 className="display-1 page-title my-4">Register</h1>
                            <div className="mb-3 form-floating">
                                <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="c"
                                />
                                <label htmlFor="inputName">Name</label>
                                {formik.touched.name && formik.errors.name ? (<p className="text-danger">{formik.errors.name}</p>):null}
                            </div>
                            <div className="mb-3 form-floating">
                                <input type="email" className="form-control" id="inputEmail" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                                <label htmlFor="inputEmail" className="form-label">Email address</label>
                                {formik.touched.email && formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>):null}
                            </div>
                            <div className="mb-3 form-floating">
                                <input type="password" className="form-control" id="inputPassword" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                {formik.touched.password && formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>):null}
                            </div>
                            <div className="form-switch row mb-2">
                                <div className="col-3 d-flex justify-content-end">
                                    <input className="form-check-input" type="checkbox" role="switch" id="bizCheck" onChange={()=>setBiz(!biz)}/>
                                </div>
                                <div className="col-9 text-start">
                                    <label htmlFor="bizCheck" className="display-5 fs-5">{biz ? (<span>I'm a Business owner</span>):(<span>I'm looking for a Business </span>)}</label>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="w-100 btn submit-btn mb-3" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
                                <Link className="w-100 text-link mt-4" to="/">Already Have a User? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center p-0">
                    <img src="starter.jpg" className="starter-img" alt="basa"/>
                </div>
            </div>
        </div>
    </> );
}
 
export default Register;
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from 'yup'
import { User } from "../../interfaces/User";
import { errorMessage, infoMessage } from "../../services/toastService";
import { userLogin } from "../../services/userService";


interface LoginProps {
    
}
 
const Login: FunctionComponent<LoginProps> = () => {

    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues: {email:'', password:''},
        validationSchema: yup.object({
            email: yup.string().email().required(),
            password: yup.string().required().min(6)
        }),
        onSubmit: (values:User)=>{
            userLogin(values).then((result)=>{
                // console.log(result.data)
                sessionStorage.setItem('token', result.data.token)
                infoMessage('You Have Logged In Successfully')
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                errorMessage('Wrong email or password')
            })
        }
    })

    return ( <>
        <div className="display-1 page-title mt-4 text-center">
            <img src="logo-with-text.png" alt="" />
        </div>
        <div className="w-100 h-100 d-flex justify-content-center pt-5">
            <div className="row section-container w-75 pt-5 pb-5">
                <div className="col-12 col-md-6">
                    <form onSubmit={formik.handleSubmit} className='text-center container w-75 mt-5 pt-5'>
                        <h1 className="page-title display-1 my-4">Login</h1>
                        <div className="mb-3 form-floating">
                            <input type="email" className="form-control" id="loginInputEmail" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                            <label htmlFor="loginInputEmail" className="form-label">Email address</label>
                            {formik.touched.email && formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>):null}
                        </div>
                        <div className="mb-3 form-floating">
                            <input type="password" className="form-control" id="loginInputPassword" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                            <label htmlFor="loginInputPassword" className="form-label">Password</label>
                            {formik.touched.password && formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>):null}
                        </div>
                        <div className="">
                            <button type="submit" className="w-100 btn submit-btn mb-3" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
                            <Link className="mt-2 w-100 text-link" to="/register">New Here? Register</Link>

                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center p-0">
                    <img src="starter.jpg" className="starter-img" alt="basa"/>
                </div>
            </div>
        </div>
    </> );
}
 
export default Login;
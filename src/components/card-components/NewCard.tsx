import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "../general-components/Navbar";
import * as yup from 'yup'
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../interfaces/Card";
import { addCard, getAllCategories } from "../../services/cardService";
import { errorMessage, infoMessage } from "../../services/toastService";
import Footer from "../general-components/Footer";


interface NewCardProps {
    
}
 
const NewCard: FunctionComponent<NewCardProps> = () => {

    const navigate = useNavigate()

    const [categoryArr, setCategoryArr] = useState<string[]>([])
    
    useEffect(() => {
        getAllCategories().then((result)=>{
            setCategoryArr(result.data)
        }).catch((err)=>console.log(err))
    }, []);

    const formik = useFormik({
        initialValues: {name:'', description:'', address:'', phone:'', img:'', category:'Tech'},
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            category: yup.string().required().min(2),
            description: yup.string().required().min(6),
            address: yup.string().required().min(3),
            phone: yup.string().required().min(8).matches(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/ , 'Is not in correct format'),
            img: yup.string().required().min(2),
        }),
        onSubmit: (values:Card)=>{
            addCard(values).then((result)=>{
                // console.log(result.data)
                infoMessage(`Biz Card "${values.name}" was Added to DB`)
                navigate('/my-biz')
            }).catch((err)=>{
                console.log(err)
                errorMessage('Something Went Wrong With adding a Biz Card')
            })
        }
    })

    return ( <>
        <Navbar/>
        <h1 className="display-1 page-title text-center my-4">Add New Card</h1>
        <div className="container section-container">
            <form onSubmit={formik.handleSubmit} className='text-center w-50 mx-auto '>
                <div className="mb-3 form-floating">
                    <input type="text" className="form-control" id="cardName" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                    <label htmlFor="cardName" className="form-label display-6 fs-5">Name</label>
                    {formik.touched.name && formik.errors.name ? (<p className="text-danger">{formik.errors.name}</p>):null}
                </div>
                <div className="mb-3 form-floating">
                    <input type="text" className="form-control" id="cardAddress" name='address' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                    <label htmlFor="cardAddress" className="form-label display-6 fs-5">Address</label>
                    {formik.touched.address && formik.errors.address ? (<p className="text-danger">{formik.errors.address}</p>):null}
                </div>
                <div className="mb-3 form-floating">
                    <select className="form-select display-6 fs-6"   id="cardCategory" name='category' value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        {categoryArr.map((cat)=>(
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <label htmlFor="cardCategory" className="form-label display-6 fs-5">Category</label>
                    {formik.touched.category && formik.errors.category ? (<p className="text-danger">{formik.errors.address}</p>):null}
                </div>
                <div className="mb-3 form-floating">
                    <input type="text" className="form-control" id="cardDescription" name='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                    <label htmlFor="cardDescription" className="form-label display-6 fs-5">Description</label>
                    {formik.touched.description && formik.errors.description ? (<p className="text-danger">{formik.errors.description}</p>):null}
                </div>
                <div className="mb-3 form-floating">
                    <input type="string" className="form-control" id="productPhone" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                    <label htmlFor="productPhone" className="form-label display-6 fs-5">Phone</label>
                    {formik.touched.phone && formik.errors.phone ? (<p className="text-danger">{formik.errors.phone}</p>):null}
                </div>
                <div className="mb-3 form-floating">
                    <input type="text" className="form-control" id="cardImage" name='img' value={formik.values.img} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="c"/>
                    <label htmlFor="cardImage" className="form-label display-6 fs-5">Image URL</label>
                    {formik.touched.img && formik.errors.img ? (<p className="text-danger">{formik.errors.img}</p>):null}
                </div>
                
                <div className="">
                    <button type="submit" className="w-100 btn btn-secondary mb-3 submit-btn" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
                    {/* <Link className="mt-2 w-100 text-link" to="/my-biz">Back to My Cards</Link> */}
                </div>
            </form>
        </div>
        <Footer/>
    </> );
}
 
export default NewCard;
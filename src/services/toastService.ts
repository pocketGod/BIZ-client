import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// export const successMessage = (message:string)=>{
//     toast.success(message, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//     })
// }

export const errorMessage = (message:string)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}


export const infoMessage = (message:string)=>{
    toast.info(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}
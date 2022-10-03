import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { User } from '../interfaces/User'

const API:string = process.env.REACT_APP_API || ''


export const userRegister = (newUser:User):Promise<any>=>axios.post(`${API}register`, newUser)

export const userLogin = (user:User): Promise<any>=> axios.post(`${API}login`, user)

export const getIsBiz = ():boolean =>{
    return (jwt_decode(sessionStorage.getItem('token') as string) as any).biz
}

export const changeBizStatus = (ID:string):Promise<any>=>{
    return axios.get(`${API}profile/change-biz/${ID}`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

export const getMyUserDetails = ():Promise<any>=>{
    return axios.get(`${API}profile`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

export const getOtherUserDetails = (ID:string):Promise<any>=> {
    return axios.get(`${API}profile/other-user/${ID}`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

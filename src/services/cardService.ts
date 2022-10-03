import axios from 'axios'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'
import { Card } from '../interfaces/Card'

const API:string = process.env.REACT_APP_API || ''

export const getAllCards = () :Promise<any> =>{
    return axios.get(`${API}card`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

export const getMyCards = () :Promise<any> =>{
    return axios.get(`${API}card/my-cards`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

export const getOneCard = (ID:string):Promise<any> =>{
    return axios.get(`${API}card/${ID}`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}

export const editCard = (newCard:Card) :Promise<any> =>{
    let body = _.omit(newCard, ['_id','card_id','user_id'])
    return axios.put(`${API}card/${newCard.card_id}`, body,{
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}


export const getIsCardOwner = (ID:string):boolean =>{
    return ((jwt_decode(sessionStorage.getItem('token') as string) as any).id == ID)
}


export const deleteCard = (card:Card) :Promise<any> =>{
    return axios.delete(`${API}card/${card.card_id}`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}


export const addCard = (newCard:Card) :Promise<any> =>{
    return axios.post(`${API}card`, newCard,{
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}


export const getAllCategories = ():Promise<any> =>{
    return axios.get(`${API}card/categories`, {
        headers:{
            Authorization: sessionStorage.getItem('token') as string
        }
    })
}
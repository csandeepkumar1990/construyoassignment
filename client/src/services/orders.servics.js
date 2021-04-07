import axios from 'axios';
import api from '../apiservices/apiendpoint'

const apiendpoint = api()

const getOrdersFromService = async() => {
    let response = await axios.get(`${apiendpoint}/orders`)
    return response
}

const getOrderwithId = async(docId) => {
    let response = await axios.get(`${apiendpoint}/orders/${docId}`)
    return response
}

const updateOrderFromService = async(docId, data) => {
    let response = await axios.put(`${apiendpoint}/orders/${docId}`, data)
    return response
}

const deleteOrderFromService = async(docId) => {
    let response = await axios.delete(`${apiendpoint}/orders/${docId}`)
    return response
}

export {getOrdersFromService, getOrderwithId, updateOrderFromService, deleteOrderFromService}
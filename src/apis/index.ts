import axios from "../libs/request";

export const orderList = (data: any) => axios.request({ url: `/order/orderList`, data, method: 'post' })
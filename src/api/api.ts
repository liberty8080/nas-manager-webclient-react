import axios, {AxiosInstance} from "axios";

export interface IResponse{
    code:number
    msg:string
    data:any
}

export const AxiosIns:AxiosInstance=axios.create({
    baseURL:'http://127.0.0.1:9001',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})
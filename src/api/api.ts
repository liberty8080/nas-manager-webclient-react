import axios, {AxiosInstance} from "axios";

export interface ApiResult<T>{
    code:number
    msg:string
    data:T
}

export const AxiosIns:AxiosInstance=axios.create({
    baseURL:'http://127.0.0.1:9001',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})


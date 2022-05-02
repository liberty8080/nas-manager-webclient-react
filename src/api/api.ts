import axios, {AxiosInstance} from "axios";

export interface ApiResult<T>{
    code:number
    msg:string
    data:T
}

export const AxiosIns:AxiosInstance=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})


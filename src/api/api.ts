import axios, {AxiosInstance} from "axios";

export interface ApiResult<T = any> {
    code: number
    msg: string
    data: T
}

//todo: remove later
console.log(process.env.REACT_APP_BASE_URL)
const AxiosIns: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
})

// handle error msg at response interceptor
AxiosIns.interceptors.response.use(res => {
    let s = res.data as ApiResult
    if (s.code !== 200) {
        return Promise.reject(res)
    }
    return res
}, error => {
    console.log("error",error)
    return Promise.reject(error)
})

// wrapped Axios with simple usage
export interface ApiClient {
    get<T = any>(path: string): Promise<ApiResult<T>>;

    post<T = any>(path: string, data: any): Promise<ApiResult<T>>;

    put<T = any>(path: string, data: any): Promise<ApiResult<T>>;

    patch<T = any>(path: string, data: any): Promise<ApiResult<T>>;

    delete<T = any>(path: string): Promise<ApiResult<T>>;

}

export const Api: ApiClient = {

    async get(path: string): Promise<ApiResult> {
        let res = await AxiosIns.get(path)
        return res.data
    },

    async patch(path: string, data: any): Promise<ApiResult> {
        let res = await AxiosIns.patch(path, data)
        return res.data
    },

    async post(path: string, data: any): Promise<ApiResult> {
        let res = await AxiosIns.post(path, data)
        return res.data
    },

    async put(path: string, data: any): Promise<ApiResult> {
        let res = await AxiosIns.put(path, data)
        return res.data
    },

    async delete(path: string): Promise<ApiResult> {
        let res = await AxiosIns.delete(path)
        return res.data
    },
}


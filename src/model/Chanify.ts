export interface Chanify{
    id:number,
    address:string,
    token:string,
    comment:string,
    type:chanifyType
}

export enum chanifyType{
    default,magic
}
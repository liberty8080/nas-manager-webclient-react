import React, {useEffect, useState} from "react";
import {AxiosIns, ApiResult} from "../api/api";
import {Table} from "antd";
import {MagicSub} from "../model/Magic";

export default function Magic(){
    const [magicSub,setMagicSub] = useState<MagicSub[]>([])
    useEffect(() => {
        AxiosIns.get<ApiResult<MagicSub[]>>("/Magic/all").then(res => {
            console.log(res.data)
            setMagicSub(res.data.data)
        }).catch(e=>{
            console.log()
        })
    }, [])
    const columns = [
        {dataIndex: 'comment', key: 'comment', title: '名称'},
        {
            dataIndex: 'url',
            key: 'url',
            title: 'URL',
        },
        {dataIndex: 'expirationTime', key: 'expirationTime', title: '过期时间'},
        {dataIndex: 'bandwidthLeft', key: 'bandwidthLeft', title: '剩余流量'},
        {dataIndex: 'type', key: 'type', title: '类型'},
        {dataIndex: 'cron', key: 'cron', title: 'cron'},
        {dataIndex: 'id', key: 'id', title: 'ID'}

    ]
    return(<div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
        <Table columns={columns} dataSource={magicSub} rowKey={"id"}
               pagination={{position: []}}/>
    </div>)
}
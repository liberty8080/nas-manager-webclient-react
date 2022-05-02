import React, {useEffect, useState} from "react";
import {ApiResult, AxiosIns} from "../api/api";
import {Table} from 'antd';
import {GB, KB, MB, Torrent} from "../model/Torrents";


export default function Downloads() {
    const [torrents, setTorrents] = useState<Torrent[]>([])
    useEffect(() => {
        AxiosIns.get<ApiResult<Torrent[]>>("/downloads/torrents").then(res => {
            setTorrents(res.data.data)
        })
    }, [])

    const columns = [
        {dataIndex: 'id', key: 'id', title: 'ID'},
        {dataIndex: 'name', key: 'name', title: '名称'},
        {
            dataIndex: 'torrent_size',
            key: 'torrent_size',
            title: '文件大小',
            render: (text: string, record: any, index: number) => {
                let size = record.torrent_size
                if (size > GB) {
                    return (size / GB).toFixed(2) + "GB"
                }
                if (size > MB) {
                    return (size / MB).toFixed(2) + "MB"
                }
                if (size > KB) {
                    return (size / KB).toFixed(2) + "KB"
                }
            }
        },
        {dataIndex: 'download_dir', key: 'download_dir', title: '目标文件夹'},
        {dataIndex: 'status', key: 'status', title: '状态'},
        {dataIndex: 'rate_download', key: 'rate_download', title: '下载速度'},
        {
            dataIndex: 'rate_upload',
            title: '上传速度',
            key: 'rate_upload',
        },
        {dataIndex: 'left_time', title: '剩余时间', key: 'left_time',}
    ]
    return (
        <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>

            <Table columns={columns} dataSource={torrents}
                   pagination={{position: []}}/>
        </div>
    )
}


import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {AxiosIns, IResponse} from "../api/api";
import {Table, Tag, Space} from 'antd';
import {TablePaginationConfig} from "antd/es/table/Table";

interface Torrent {
    ID: number
    Name: string
    TorrentSize: number
    DownloadDir: string
    Status: string
    RateDownload: number
    RateUpload: number
}

const GB = 8 * 1024 * 1024 * 1024
const MB = 8 * 1024 * 1024
const KB = 8 * 1024

export default function Downloads() {
    const [torrents, setTorrents] = useState<Torrent[]>([])
    useEffect(() => {
        AxiosIns.get<IResponse>("/downloads/torrents").then((res: { data: { data: React.SetStateAction<Torrent[]>; }; }) => {
            console.log(res.data.data)
            setTorrents(res.data.data)
        })
    }, [])
    /*    const columns: GridColDef[] = [
            {field: 'id', headerName: 'ID', type: 'number',hideable:true},
            {field: 'name', headerName: '名称', type: 'string', flex:1,minWidth: 200},
            {field: 'torrent_size', headerName: '文件大小',flex:0.5, type: 'string'},
            {field: 'download_dir', headerName: '目标文件夹', type: 'string',flex:0.5,},
            {field: 'status', headerName: '状态',flex:0.5,type:'singleSelect',valueOptions:['']},
            {field: 'rate_download', headerName: '下载速度', type: 'number',flex:0.5,},
            {
                field: 'rate_upload',
                headerName: '上传速度',
                description: 'This column has a value getter and is not sortable.',
                flex:0.5,
                sortable: false,
                minWidth: 110,
                // valueGetter: (params: GridValueGetterParams) =>
                //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            },
            {field: 'left_time', headerName: '剩余时间',flex:0.5,}
        ];*/
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
            {/*            <DataGrid columns={columns} rows={torrents} sx={{
                border: 0,
                userSelect: 'none',
                '& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within': {outline: 0}
            }} components={{Pagination: null}}
                      componentsProps={{
                          cell: {
                              onMouseEnter: null,
                              onMouseLeave: null,
                          },
                      }}
                      disableColumnMenu/>*/}
            <Table columns={columns} dataSource={torrents}
                   pagination={{position: []}}/>
        </div>
    )
}


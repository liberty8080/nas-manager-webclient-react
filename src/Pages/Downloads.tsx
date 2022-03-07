import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {AxiosIns, IResponse} from "../api/api";

interface Torrent {
    ID: number
    Name: string
    TorrentSize: number
    DownloadDir: string
    Status: string
    RateDownload: number
    RateUpload: number

}

export default function Downloads() {
    const [torrents, setTorrents] = useState<Torrent[]>([])
    useEffect(() => {
        AxiosIns.get<IResponse>("/downloads/torrents").then((res: { data: { data: React.SetStateAction<Torrent[]>; }; }) => {
            console.log(res.data.data)
            setTorrents(res.data.data)
        })
    }, [])
    const columns: GridColDef[] = [
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
    ];

    return (
        <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
            <DataGrid columns={columns} rows={torrents} sx={{
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
                      disableColumnMenu/>
        </div>
    )
}
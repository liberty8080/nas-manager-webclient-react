import React, {useEffect} from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {AxiosIns} from "../api/api";


export default function Downloads() {

    useEffect(()=>{
        AxiosIns.get("/downloads/torrents").then((res)=>{
            console.log(res.data.data)
        })
    })
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', type: 'string'},
        {field: 'name', headerName: '名称', type: 'singleSelect'},
        {field: 'filesize', headerName: '文件大小', type: 'number'},
        {field: 'progress', headerName: '下载进度',},
        {field: 'category', headerName: '分类',},
        {
            field: 'download_speed',
            headerName: '下载速度',
            type: 'number',
        },
        {
            field: 'upload_speed',
            headerName: '上传速度',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 110,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    const rows = [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},

    ];
    return (
        <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
            <DataGrid columns={columns} rows={rows} sx={{
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
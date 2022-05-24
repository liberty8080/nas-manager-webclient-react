import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField, useMediaQuery
} from "@mui/material";
import {Chanify, chanifyType} from "../model/Chanify";
import {Api} from "../api/api";
import {useSnackbar} from "notistack";
import {ModalStatus} from "../model/Common";
import {useTheme} from "@mui/system";
import {MagicSub} from "../model/Magic";

const defaultChanify: Chanify = {
    address: "", comment: "", id: 0, token: "", type: chanifyType.default
}
export default function ChanifyPage() {
    const [dataList, setDataList] = useState<Chanify[]>([])
    const [current, setCurrent] = useState<Chanify>(defaultChanify);
    const [loading, setLoading] = useState(false); // if loading
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [modalStatus,setModalStatus] = useState(ModalStatus.close)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // 重置
    const reset = () => {
        setCurrent(defaultChanify)
    }
    const handleModalClose = ()=>{
        setModalStatus(ModalStatus.close)
    }

    useEffect(() => {
        Api.get<Chanify[]>('/chanify/all')
            .then(res => {
                setDataList(res.data)
            })
    }, [loading])

    const handleAdd = () => {
        setModalStatus(ModalStatus.add)
        reset()
    }
    const handleEdit = (record: Chanify) => {
        setModalStatus(ModalStatus.edit)
        setCurrent(record)
    }

    const handleDelete = (id: number) => {
        setLoading(true)
        Api.delete(`/chanify/${id}`).then(() => {
            setLoading(false)
        }).catch(error=>{
            enqueueSnackbar(error)
        })
    }

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent)=>{
        const {name, value} = e.target
        setCurrent({...(current), [name]: value})
    }

    const onSubmit = ()=>{
        setLoading(true)
        Api.post('/chanify/update',current)
            .then(res=>{
                console.log(res)
                setLoading(false)
                enqueueSnackbar(res.msg)
            })
            .catch(error=>{
                enqueueSnackbar(error)
            })
        reset()
        handleModalClose()
    }

    const columns = [
        {dataIndex: 'comment', key: 'comment', title: '名称'},
        {
            dataIndex: 'address',
            key: 'address',
            title: 'Address',
        },
        {dataIndex: 'token', key: 'token', title: 'token'},
        {dataIndex: 'type', key: 'type', title: '类型'},
        {
            title: '操作', key: 'action', render: (record: Chanify) => <div>
                <Button onClick={()=>handleEdit(record)}>编辑</Button>
                <Button onClick={()=>handleDelete(record.id)}>删除</Button>
            </div>
        }
    ]
    return (<>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}
            onClick={() => setLoading(false)}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Dialog open={modalStatus !== ModalStatus.close} onClose={handleModalClose}
                fullScreen={fullScreen}>
            <DialogTitle>{modalStatus === ModalStatus.add ? "Add Subscribe" : "Edit Subscribe"}</DialogTitle>
            <DialogContent>
                <TextField autoFocus required fullWidth margin="dense" variant="standard" autoComplete="off"
                           onChange={onInputChange} name={'comment'} value={current.comment}
                           label={"Name"}/>

                <FormControl variant="standard" fullWidth margin="dense"
                >
                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="type"
                        value={current.type.toString()}
                        onChange={onInputChange}
                        label="Type"
                    >
                        <MenuItem value={0}>Default</MenuItem>
                        <MenuItem value={1}>Magic</MenuItem>
                    </Select>
                </FormControl>
                <TextField required fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                           onChange={onInputChange} name={'address'} value={current.address}
                           label={"Address"}/>
                <TextField required fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                           onChange={onInputChange} name={'token'} value={current.token}
                           label={"Token"}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button type="submit" onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={handleAdd}>添加订阅</Button>
        <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
            <Table columns={columns} dataSource={dataList} rowKey={"id"}
                   pagination={{position: []}}/>
        </div>
    </>)
}
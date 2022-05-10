import React, {useEffect, useState} from "react";
import {Api} from "../api/api";
import {Table} from "antd";
import {MagicSub} from "../model/Magic";
import {
    Backdrop,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
    TextField,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/system";

export default function Magic() {
    const [subList, setSubList] = useState<MagicSub[]>([]) // table list
    const [DetailModel, setDetailModel] = useState(false); // detail page if open
    const [loading, setLoading] = useState(false); // if loading
    const [currentSub, setCurrentSub] = useState<MagicSub>(defaultSub);

    useEffect(() => {
        Api.get<MagicSub[]>("/magic/all").then(res => setSubList(res.data))
    }, [DetailModel, loading])

    const handleAdd = () => {
        setDetailModel(true)
        setCurrentSub(defaultSub) // when add new an empty sub
    }
    const handleModalClose = () => {
        setDetailModel(false)
    }

    const handleEdit = (record: MagicSub) => {
        setDetailModel(true)
        setCurrentSub(record)
    }

    const handleDelete = (id: number) => {
        setLoading(true)
        Api.delete(`/magic/${id}`).then(() => {
            setLoading(false)
        })
    }
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
        // {dataIndex: 'id', key: 'id', title: 'ID'},
        {
            title: '操作', key: 'action', render: (record: MagicSub) => <div>
                <Button onClick={() => handleEdit(record)}>编辑</Button>
                <Button onClick={() => handleDelete(record.id)}>删除</Button>
            </div>
        }
    ]
    return (<>
            <div style={{}}>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                    onClick={() => setLoading(false)}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Button onClick={handleAdd}>添加订阅</Button>
                <MagicDialog open={DetailModel} onClose={handleModalClose} current={currentSub}
                             onChange={setCurrentSub}/>
            </div>
            <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
                <Table columns={columns} dataSource={subList} rowKey={"id"}
                       pagination={{position: []}}/>
            </div>
        </>
    )
}

interface IDialogProps {
    open: boolean,
    onClose: () => void
    current: MagicSub
    onChange: (sub: MagicSub) => void
}

const defaultSub: MagicSub = {
    id: 0,
    url: "",
    expirationTime: "",
    bandwidthLeft: "",
    type: 0,
    data: "",
    cron: "",
    comment: "",
}

const MagicDialog = ({current, onChange, onClose, open}: IDialogProps) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const reset = () => onChange(defaultSub)
    //提交事件
    const onSubmit = () => {
        if (current === defaultSub) {
            Api.post("/magic", current).then()
        } else {
            Api.put("/magic", current).then()
        }
        reset()
        onClose()
    }
    // 输入框onChange事件
    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
        const {name, value} = e.target
        onChange({...(current), [name]: value})
    }

    //取消按钮事件
    const onCancel = () => {
        reset()
        onClose()
    }


    return (<>
        <Dialog open={open} onClose={onCancel} fullScreen={fullScreen}>
            <DialogTitle>{current === defaultSub ? "Add Subscribe" : "Edit Subscribe"}</DialogTitle>
            <DialogContent>
                <TextField autoFocus required fullWidth margin="dense" variant="standard" autoComplete="off"
                           onChange={onInputChange} name={'url'} value={current.url} label={"Subscribe URL"}/>

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
                        <MenuItem value={0}>Songuo</MenuItem>
                        <MenuItem value={1}>StarDream</MenuItem>
                        <MenuItem value={2}>Frog</MenuItem>
                    </Select>
                </FormControl>
                <TextField required fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                           onChange={onInputChange} name={'comment'} value={current.comment} label={"Comment"}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="submit" onClick={onSubmit}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </>)
}
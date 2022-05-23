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
import {useSnackbar} from "notistack";

// 模态框状态
enum MagicModalStatus {Close, Edit, Add}

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

export default function Magic() {
    const [subList, setSubList] = useState<MagicSub[]>([]) // table list
    const [DetailModel, setDetailModel] = useState(MagicModalStatus.Close); // detail page if open
    const [loading, setLoading] = useState(false); // if loading
    const [currentSub, setCurrentSub] = useState<MagicSub>(defaultSub);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        Api.get<MagicSub[]>("/magic/all").then(res => setSubList(res.data))
    }, [DetailModel, loading])

    const handleAdd = () => {
        setDetailModel(MagicModalStatus.Add)
        setCurrentSub(defaultSub) // when add new an empty sub
    }
    const handleModalClose = () => {
        setDetailModel(MagicModalStatus.Close)
    }

    const handleEdit = (record: MagicSub) => {
        setDetailModel(MagicModalStatus.Edit)
        setCurrentSub(record)
    }

    const handleDelete = (id: number) => {
        setLoading(true)
        Api.delete(`/magic/${id}`).then(() => {
            setLoading(false)
        })
    }

    const onSubmit = () => {
        switch (DetailModel) {
            case MagicModalStatus.Add:
                Api.post("/magic", currentSub)
                    .then(
                        () => enqueueSnackbar("添加成功"))
                    .catch(error => {
                        enqueueSnackbar(error)
                    })
                break;
            case MagicModalStatus.Edit:
                Api.put("/magic", currentSub)
                    .then(
                        () => enqueueSnackbar("修改成功"))
                    .catch(error => {
                        enqueueSnackbar(error)
                    })
                break;
            default:
                break;
        }

        setCurrentSub(defaultSub)
        handleModalClose()
    }

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
        const {name, value} = e.target
        setCurrentSub({...(currentSub), [name]: value})
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
                {/*                <MagicDialog open={DetailModel} onClose={handleModalClose} current={currentSub}
                             onChange={setCurrentSub} />*/}
                <Dialog open={DetailModel !== MagicModalStatus.Close} onClose={handleModalClose}
                        fullScreen={fullScreen}>
                    <DialogTitle>{DetailModel === MagicModalStatus.Add ? "Add Subscribe" : "Edit Subscribe"}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required fullWidth margin="dense" variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'url'} value={currentSub.url}
                                   label={"Subscribe URL"}/>

                        <FormControl variant="standard" fullWidth margin="dense"
                        >
                            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="type"
                                value={currentSub.type.toString()}
                                onChange={onInputChange}
                                label="Type"
                            >
                                <MenuItem value={0}>Songuo</MenuItem>
                                <MenuItem value={1}>StarDream</MenuItem>
                                <MenuItem value={2}>Frog</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'comment'} value={currentSub.comment}
                                   label={"Comment"}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose}>Cancel</Button>
                        <Button type="submit" onClick={onSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
                <Table columns={columns} dataSource={subList} rowKey={"id"}
                       pagination={{position: []}}/>
            </div>
        </>
    )
}



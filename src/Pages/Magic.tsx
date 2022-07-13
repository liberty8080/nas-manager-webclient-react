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

/*enum MagicSubType {
    V2 = "V2",
    Rocket = "小火箭"
}*/
const defaultSub: MagicSub = {
    rocketRegex: "",
    id: 0,
    name: "",
    url: "",
    type: 0,
    cron: "",
    comment: ""
}

export default function Magic() {
    const [subList, setSubList] = useState<MagicSub[]>([]) // table list
    const [magicModalStatus, setMagicModalStatus] = useState(MagicModalStatus.Close); // detail page if open
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState(false); // if loading
    const [currentSub, setCurrentSub] = useState<MagicSub>(defaultSub);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        Api.get<MagicSub[]>("/magic/all").then(res => setSubList(res.data))
    }, [loading])

    // 添加事件
    const handleAdd = () => {
        setMagicModalStatus(MagicModalStatus.Add)
        setCurrentSub(defaultSub) // when add new an empty sub
        setTitle("Add Subscribe")
    }
    // 关闭事件
    const handleModalClose = () => {
        setMagicModalStatus(MagicModalStatus.Close)
    }
    // 编辑事件
    const handleEdit = (record: MagicSub) => {
        setMagicModalStatus(MagicModalStatus.Edit)
        setCurrentSub(record)
        setTitle("Edit Subscribe")
    }
    // 删除事件
    const handleDelete = (id: number) => {
        setLoading(true)
        Api.delete(`/magic/${id}`).then(() => {
            setLoading(false)
            enqueueSnackbar("删除成功")
        })
            .catch(()=> enqueueSnackbar("删除失败！"))
    }

    // 更新订阅数据
    const handleUpdate = (id: number) => {
        Api.get(`/magic/update?id=${id}`).then(()=>{
            enqueueSnackbar("订阅数据已更新")
        })
            .catch(()=>{
                enqueueSnackbar("订阅更新失败！")
            })
    }
    // 提交事件
    const onSubmit = () => {
        setLoading(true)
        switch (magicModalStatus) {
            case MagicModalStatus.Add:
                Api.post("/magic", currentSub)
                    .then(
                        () => {
                            setLoading(false)
                            enqueueSnackbar("添加成功")
                        })
                    .catch(error => {
                        enqueueSnackbar(error)
                    })
                break;
            case MagicModalStatus.Edit:
                Api.put("/magic", currentSub)
                    .then(
                        () => {
                            enqueueSnackbar("修改成功")
                            setLoading(false)
                        })
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
        {dataIndex: 'id', key: 'id', title: 'ID'},
        {dataIndex: 'name', key: 'name', title: '名称'},
        {
            dataIndex: 'url',
            key: 'url',
            title: 'URL',
        },
        {dataIndex: 'expirationTime', key: 'expirationTime', title: '过期时间'},
        {
            dataIndex: 'bandwidthLeft', key: 'bandwidthLeft', title: '剩余流量', render: (record: number) =>
                <div>{record}GB</div>
        },
        {
            dataIndex: 'type', key: 'type', title: '类型', render: (type: number) => {
                switch (type) {
                    case 0:
                        console.log("111")
                        return <div>V2</div>
                    case 1:
                        console.log("222")
                        return <div>小火箭</div>
                }
            }
        },
        // {dataIndex: 'cron', key: 'cron', title: 'cron'},
        {dataIndex: 'comment', key: 'comment', title: '备注'},
        {
            title: '操作', key: 'action', render: (record: MagicSub) => <div>
                <Button onClick={() => handleUpdate(record.id)}>更新</Button>
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
                <Dialog open={magicModalStatus !== MagicModalStatus.Close} onClose={handleModalClose}
                        fullScreen={fullScreen}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required multiline fullWidth margin="dense" variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'url'} value={currentSub.url}
                                   label={"Subscribe URL"}/>
                        <TextField required fullWidth margin="dense" variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'name'} value={currentSub.name}
                                   label={"Name"}/>

                        <FormControl variant="standard" fullWidth margin="dense"
                        >
                            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                            <Select required
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="type"
                                    value={currentSub.type.toString()}
                                    onChange={onInputChange}
                                    label="Type"
                            >
                                <MenuItem value={0}>V2</MenuItem>
                                <MenuItem value={1}>小火箭</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'rocketRegex'} value={currentSub.rocketRegex}
                                   label={"正则（Rocket）"}/>
                        <TextField fullWidth margin="dense" variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'cron'} value={currentSub.cron}
                                   label={"cron表达式"}/>
                        <TextField fullWidth margin="dense" multiline variant="standard" autoComplete="off"
                                   onChange={onInputChange} name={'comment'} value={currentSub.comment}
                                   label={"备注"}/>
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



import React, {useEffect, useState} from "react";
import {ApiResult, AxiosIns} from "../api/api";
import {Table} from "antd";
import {MagicSub} from "../model/Magic";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/system";

export default function Magic() {
    const [magicSub, setMagicSub] = useState<MagicSub[]>([])
    const [DetailModel, setDetailModel] = useState(false);

    useEffect(() => {
        AxiosIns.get<ApiResult<MagicSub[]>>("/Magic/all").then(res => {
            setMagicSub(res.data.data)
        })
    }, [])
    const handleModalOpen = () => {
        setDetailModel(true)
    }
    const handleModalClose = () => {
        setDetailModel(false)
    }
    const handleSubmit = (e: React.MouseEvent<Element>) => {
        console.log(e.target)
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
        {dataIndex: 'id', key: 'id', title: 'ID'},
        {
            title: '操作', key: 'action', render: () => <div>
                <Button>编辑</Button>
                <Button>删除</Button>
            </div>
        }
    ]
    return (<>
            <div style={{}}>
                <Button onClick={handleModalOpen}>添加订阅</Button>
                <MagicDialog open={DetailModel} onClose={handleModalClose} onSubmit={handleSubmit}/>
            </div>
            <div style={{height: '100%', width: '100%', backgroundColor: "white", borderRadius: '12px'}}>
                <Table columns={columns} dataSource={magicSub} rowKey={"id"}
                       pagination={{position: []}}/>
            </div>
        </>
    )
}

interface IDialogProps {
    open: boolean,
    onClose: React.MouseEventHandler
    onSubmit: React.MouseEventHandler
}

const defaultValue: MagicSub = {
    id: 0,
    url: "",
    expirationTime: "",
    bandwidthLeft: "",
    type: 0,
    data: "",
    cron: "",
    comment: "",
}

const MagicDialog = (props: IDialogProps) => {

    const [magicValue, setMagicValue] = useState<MagicSub>(defaultValue)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const onSubmit = (e: React.SyntheticEvent) => {
        console.log(magicValue);
        e.preventDefault()
    }
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target
        setMagicValue({...magicValue, [name]: value})
    }

    const onClose = (e: React.MouseEvent) => {
        setMagicValue(defaultValue)
        props.onClose(e)
    }


    return (<>
        {/*<form onSubmit={onSubmit}>*/}
            <Dialog open={props.open} onClose={onClose} fullScreen={fullScreen}>
                <DialogTitle>Add Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField autoFocus required fullWidth margin="dense" variant="standard" autoComplete="false"
                               onChange={onChange} name={'url'} value={magicValue.url} label={"Subscribe URL"}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={onSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        {/*</form>*/}

    </>)
}
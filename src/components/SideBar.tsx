import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import {Box} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../store/reducers";
import {useTheme} from "@mui/material/styles";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import {Link as RouterLink} from 'react-router-dom'
import {AppActionTypes} from "../store/actions";


interface IProps {
    drawerOnClose: (event: object) => void
}
//todo: 自定义MenuItem
function MenuList() {
    const dispatch = useDispatch();
    const handleMenuClicked = () => {
            dispatch({
                type: AppActionTypes.MENU_OPEN, payload: false
            })
    }

    return (<>
        <Toolbar/>
        <Box sx={{overflow: "auto"}}>
            <List>
                <ListItemButton component={RouterLink} to={'/downloads'} key={"Downloads"} onClick={handleMenuClicked}>
                    <ListItemIcon> <DownloadForOfflineRoundedIcon/> </ListItemIcon>
                    <ListItemText primary={"Downloads"}/>
                </ListItemButton>

                {/* {["Downloads", "starred", "sendmail", "drafts"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {["all mail", "trash", "spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}*/}
            </List>
        </Box></>)
}

export default function SideBar(props: IProps) {
    const theme = useTheme()
    const appSettings = useSelector((state: rootState) => state.app)
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <Box
            component="nav"
            sx={{width: {sm: matchUpMd ? appSettings.drawerWidth : 0}, flexShrink: {sm: 0}}}
            aria-label="mailbox folders"
        >
            {/*mobile drawer*/}
            {!matchUpMd && <Drawer variant="temporary"
                     sx={{
                         width: appSettings.drawerWidth, flexShrink: 0,
                         [`& .MuiDrawer-paper`]: {width: appSettings.drawerWidth, boxSizing: "border-box",},
                     }}
                     open={appSettings.isOpen} onClose={props.drawerOnClose}
            >
                <MenuList/>
            </Drawer>}

            {/*browser drawer*/}
            {matchUpMd && <Drawer variant="permanent" open={appSettings.isOpen} onClose={props.drawerOnClose}
                     sx={{
                         display: {xs: 'none', md: 'block'},
                         width: appSettings.drawerWidth, flexShrink: 0,
                         [`& .MuiDrawer-paper`]: {
                             width: appSettings.drawerWidth,
                             boxSizing: "border-box",
                         },
                     }}
            >
                <MenuList/>
            </Drawer>}

        </Box>
    )

}
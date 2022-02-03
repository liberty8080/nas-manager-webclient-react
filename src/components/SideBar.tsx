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
import {useSelector} from "react-redux";
import {rootState} from "../store/reducers";
import {useTheme} from "@mui/material/styles";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import {Link as RouterLink} from 'react-router-dom'


interface IProps {
    drawerOnClose: (event: object) => void
}

function MenuList() {
    return (<>
        <Toolbar/>
        <Box sx={{overflow: "auto"}}>
            <List>
                    <ListItemButton component={RouterLink} to={'/downloads'} key={"Downloads"} >
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
            <Drawer variant="temporary"
                    sx={{
                        width: appSettings.drawerWidth, flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {width: appSettings.drawerWidth, boxSizing: "border-box",},
                    }}
                    open={appSettings.isOpen} onClose={props.drawerOnClose}
            >
                <MenuList/>
            </Drawer>

            {/*browser drawer*/}
            <Drawer variant="permanent" open={appSettings.isOpen} onClose={props.drawerOnClose}
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
            </Drawer>

        </Box>
    )

}
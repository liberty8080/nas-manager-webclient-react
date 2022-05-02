import {
    Collapse,
    Divider,
    Drawer,
    List, ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Box} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../store/reducers";
import {useTheme} from "@mui/material/styles";
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import {Link as RouterLink} from 'react-router-dom'
import {AppActionTypes} from "../store/actions";
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import {useState} from "react";


interface IProps {
    drawerOnClose: (event: object) => void
}

//todo: 自定义MenuItem
function MenuList() {
    // const [open, setOpen] = useState(true);

    const menuSettingsOpen = useSelector((state: rootState) => state.app.isMenuSettingsOpen)

    const dispatch = useDispatch();
    const handleMenuClicked = () => {
        dispatch({
            type: AppActionTypes.MENU_OPEN, isOpen: false
        })
    }
    const handleSettingsClick = () => {
        dispatch({
            type: AppActionTypes.MENU_SETTINGS_OPEN,isMenuSettingsOpen:!menuSettingsOpen
        })
    };
    return (<>
        <Toolbar/>
        <Box sx={{overflow: "auto"}}>
            <List>
                <ListItemButton component={RouterLink} to={'/downloads'} key={"Downloads"} onClick={handleMenuClicked}>
                    <ListItemIcon> <DownloadForOfflineRoundedIcon/> </ListItemIcon>
                    <ListItemText primary={"Downloads"}/>
                </ListItemButton>
                <Divider/>
                <ListItemButton onClick={handleSettingsClick}>
                    <ListItemIcon>
                        <SettingsApplicationsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                    {menuSettingsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={menuSettingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DownloadForOfflineRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
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
                                       [`& .MuiDrawer-paper`]: {
                                           width: appSettings.drawerWidth,
                                           boxSizing: "border-box",
                                       },
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
                                          borderColor: "white"
                                      },
                                  }}
            >
                <MenuList/>
            </Drawer>}

        </Box>
    )

}
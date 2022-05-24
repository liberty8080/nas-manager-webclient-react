import {
    Collapse,
    Divider,
    Drawer,
    List,
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
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import {AppActionTypes} from "../model/Store";
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';

interface IProps {
    drawerOnClose: (event: object) => void
}

//todo: 自定义MenuItem
function MenuList() {
    const menu = useSelector((state: rootState) => state.app.Menu)
    const dispatch = useDispatch();
    const handleMenuClicked = () => {
        dispatch({
            type: AppActionTypes.SET_MENU, payload: {...menu, isMenuOpen: !menu.isMenuOpen}
        })
    }
    const handleSettingsClick = () => {
        dispatch({
            type: AppActionTypes.SET_MENU, payload: {...menu, isSettingsOpen: !menu.isSettingsOpen}
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
                        <SettingsApplicationsRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                    {menu.isSettingsOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={menu.isSettingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={RouterLink} to={'/magic'} key={"Magic"} sx={{pl: 4}}
                                        onClick={handleMenuClicked}>
                            <ListItemIcon>
                                <FlightRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Magic"/>
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to={'/chanify'} key={"Chanify"} sx={{pl: 4}}
                                        onClick={handleMenuClicked}>
                            <ListItemIcon>
                                <FlightRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Chanify"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Box></>)
}

export default function SideBar(props: IProps) {
    const theme = useTheme()
    const menu = useSelector((state: rootState) => state.app.Menu)
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <Box
            component="nav"
            sx={{width: {sm: matchUpMd ? menu.DrawWidth : 0}, flexShrink: {sm: 0}}}
            aria-label="mailbox folders"
        >
            {/*mobile drawer*/}
            {!matchUpMd && <Drawer variant="temporary"
                                   sx={{
                                       width: menu.DrawWidth, flexShrink: 0,
                                       [`& .MuiDrawer-paper`]: {
                                           width: menu.DrawWidth,
                                           boxSizing: "border-box",
                                       },
                                   }}
                                   open={menu.isMenuOpen} onClose={props.drawerOnClose}
            >
                <MenuList/>
            </Drawer>}

            {/*browser drawer*/}
            {matchUpMd && <Drawer variant="permanent" open={menu.isMenuOpen} onClose={props.drawerOnClose}
                                  sx={{
                                      display: {xs: 'none', md: 'block'},
                                      width: menu.DrawWidth, flexShrink: 0,
                                      [`& .MuiDrawer-paper`]: {
                                          width: menu.DrawWidth,
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
import {
    CssBaseline,
    Toolbar,
} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import { Outlet } from 'react-router-dom';


import Header from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppActionTypes} from "./store/actions";
import {rootState} from "./store/reducers";
import SideBar from "./components/SideBar";

export default function MainPage() {
    const theme = useTheme();
    const menuOpen = useSelector((state: rootState) => state.app.isOpen)
    const dispatch = useDispatch()
    const toggleMenuOpen = () => {
        dispatch({
            type: AppActionTypes.MENU_OPEN, isOpen: !menuOpen
        })
    }

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <Header handleLeftDrawerToggle={toggleMenuOpen}/>
            <SideBar drawerOnClose={toggleMenuOpen}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {/*路由替换区域*/}
                <Outlet/>
            </Box>
        </Box>
    );
}

import {
    CssBaseline,
    Toolbar,
} from "@mui/material";
import {Box} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import {Outlet} from 'react-router-dom';


import Header from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "./store/reducers";
import SideBar from "./components/SideBar";
import './styles/App.css'
import {AppActionTypes, initialState} from "./model/Store";

export default function MainPage() {
    const theme = useTheme();
    // 改成app才能生效，不知道为什么
    // const menu = useSelector((state: rootState) => state.app.Menu)

    const app = useSelector((state: rootState) => state.app)
    const dispatch = useDispatch()
    const toggleMenuOpen = () => {
        let menu = app.Menu
        dispatch({
            type: AppActionTypes.SET_MENU, payload: {...menu,isMenuOpen:!menu.isMenuOpen}
        })
    }

    return (
        <Box sx={{display: "flex"}}>
            {/*<CssBaseline/>*/}
            <Header handleLeftDrawerToggle={toggleMenuOpen}/>
            <SideBar drawerOnClose={toggleMenuOpen}/>
            <Box component="main"
                 sx={{flexGrow: 1, p: 3, mt:'64px', minHeight: 'calc(100vh - 64px)', backgroundColor: 'rgb(227, 242, 253)',borderRadius:"14px 14px 0 0"}}>
                {/*路由替换区域*/}
                <Outlet/>
            </Box>
        </Box>
    );
}

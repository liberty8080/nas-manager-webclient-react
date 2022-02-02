import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {customStates} from "../store/actions";
import React from "react";

interface Iprops{
    handleLeftDrawerToggle:React.MouseEventHandler
}
export default function Header(props:Iprops){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));


  return (
    <AppBar sx={{ display: "flex" }}>
      <Toolbar>
          <Typography variant="h6" sx={{display:{xs:'none',md:'block'}}}>NasManager</Typography>
        <IconButton color="inherit" aria-label="open-drawer" edge="end" sx={{}} onClick={props.handleLeftDrawerToggle} >
          <MenuIcon  />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

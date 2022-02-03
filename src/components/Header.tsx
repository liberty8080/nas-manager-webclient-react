import {AppBar, IconButton, Toolbar, Typography, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useTheme} from "@mui/system";
import React from "react";

interface IProps {
    handleLeftDrawerToggle: React.MouseEventHandler
}

export default function Header(props: IProps) {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <AppBar sx={{display: "flex", zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open-drawer" edge="end"
                            sx={{display: {xs: 'block', md: 'none'}}}
                            onClick={props.handleLeftDrawerToggle}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" sx={{mx: matchUpMd ? 0 : 'auto'}}>NasManager</Typography>
            </Toolbar>
        </AppBar>
    );
}

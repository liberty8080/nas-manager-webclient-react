import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserView } from "react-device-detect";
import { useTheme } from "@mui/system";

export default function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar sx={{ display: "flex" }}>
      <Toolbar>
          <Typography variant="h6" sx={{display:{xs:'none',md:'block'}}}>NasManager</Typography>
        <IconButton color="inherit" aria-label="open-drawer" edge="end" sx={{}}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

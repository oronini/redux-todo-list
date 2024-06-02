import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={styles.app_bar}>
          <Toolbar className={styles.tool_bar}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className={styles.title}
            >
              React redux toolkit Todo list
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;

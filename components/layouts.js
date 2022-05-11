import { useContext } from "react";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import styles from "./layouts.module.css";
import { Store } from "../utlis/Store";
import Switch from "@mui/material/Switch";
import Badge from "@mui/material/Badge";
import Cookies from 'js-cookie';
export default function layouts({ children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;

  // const theme = createTheme({
  //   typography: {
  //     h1: {
  //       fontSize: "1.6rem",
  //       fontWeight: 400,
  //       margin: "1rem 0",
  //     },
  //     h2: {
  //       fontSize: "1.4rem",
  //       fontWeight: 400,
  //       margin: "1rem 0",
  //     },
  //   },
  //   palette: {
  //     type: darkMode ? "dark" : "light",
  //     primary: {
  //       main: "#f0c000",
  //     },
  //     secondary: {
  //       main: "#208080",
  //     },
  //   },
  // });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode=!darkMode;
    Cookies.set('darkMode',newDarkMode ? 'ON' : 'OFF');
  };

  return (
    <div>
      <Head>
        <title>Next Amazona</title>
      </Head>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar className={styles.toolBar}>
          <Link href="/" >
            {/* <a className={styles.headertext}> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Amazona
              </Typography>
            {/* </a> */}
          </Link>
          <div>
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
            <Link href="/cart" className={styles.headertext}>
              {/* <a> */}
                {cart.cartItems.length > 0 ? 
                  (<Badge color="error" badgeContent={cart.cartItems.length}>Cart</Badge>)
                 : (
                  "Cart"
                )}
              {/* </a> */}
            </Link>
            <Button color="inherit" className={styles.headerButton}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={styles.main}>{children}</Container>
      <Typography className={styles.footer}>
        All rights reserved by AMMM
      </Typography>
    </div>
  );
}

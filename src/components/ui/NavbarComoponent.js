
// import { AppBar, useScrollTrigger, Toolbar } from "@material-ui/core";
// import { Toolbar } from "@material-ui/core";
import { AppBar, Button, Toolbar, useScrollTrigger } from "@mui/material";
import React from "react";
import "./classes.css"; 
// import logo from  "../../assets/payRollerLogo.png"
import logo from '../../assets/PayRollLogoFinal.png'
import NavTabs from "./NavTabs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// import { height } from "@mui/system";





function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

// const myclasses = classes;
let currentUser = {}

const NavbarComponent = (props)=>{
    let empText = '';
    currentUser.role=='Admin'?empText = 'Employees':empText = 'Your' 
    return (
        <>
        <ElevationScroll>
            <AppBar  position="fixed" color="primary">
                <Toolbar disableGutters>
                    <img  src={logo} alt="logo" style={{width: '15em', marginLeft: '0.3em'}} />
                    <Button sx={{ ml: 'auto',color: 'white'}}  startIcon={<AccountCircleIcon/>}>
                        Hello User
                    </Button>
                    {/* <Button sx={{color: 'white'}}  startIcon={<AccountCircleIcon/>}>
                        Add Employee
                    </Button>
                    <Button sx={{color: 'white'}}  startIcon={<AccountCircleIcon/>}>
                                    Show {empText} Details
                    </Button> */}
                    {/* <NavTabs /> */}
                </Toolbar>
            </AppBar>
            
        </ElevationScroll>
        <Toolbar sx={{mb:3}}></Toolbar>
    
        </>
    )
}

export default NavbarComponent;
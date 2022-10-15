import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import myColors from "./colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function LinkTab(props) {
    return (
      <Tab
        sx={{
            color: myColors.navTabWhite,
            textTransform: 'none'
        }}
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  let currentUser = {}
  currentUser.role = 'Admin'

export default function NavTabs() {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    let empText = '';
    currentUser.role=='Admin'?empText = 'Employees':empText = 'Your' 
  
    return (
    //   <Box sx={{ width: '100%' }}>
        <Tabs  textColor="secondary" value={value} onChange={handleChange} aria-label="nav tabs example">
          {/* <LinkTab label="Hello User" color='secondary' href="#" /> */}
          {/* <LinkTab label="Page Three" href="/spam" /> */}
          <Button sx={{color: 'white'}}  startIcon={<AccountCircleIcon/>}>
                        Add Employee
          </Button>
          <Button sx={{color: 'white'}}  startIcon={<AccountCircleIcon/>}>
                        Show {empText} Details
          </Button>
        </Tabs>
    //   </Box>
    );
  }
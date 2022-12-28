import { Button, Grid, Typography } from "@mui/material";
import colors from "./colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const navigate = useNavigate()
  const navigateTo = (link)=>{
    navigate({
      pathname: link
    })
  }
  const currentUser = useSelector((state)=>{return state.currentUserReducer.currentUser})
  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid item
          xs={11}
          md={7}
          sx={{
            paddingBottom: "2em",
            textAlign: "center",
            backgroundColor: colors.cardGrey,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 1,
            }}
            color="secondary"
            variant="h4"
            gutterBottom
          >
            Welcome {currentUser.name.split(' ')[0]}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mt: 1,
            }}
            color="secondary"
            variant="h5"
            gutterBottom
          >
            Select An option....!!
          </Typography>
            <Typography>

            <Button
              variant="contained"
              color="secondary"
              sx={{ my: 1 }}
              startIcon={<AddCircleIcon />}
              onClick={()=>{navigateTo('/add-employee')}}
            >
              Add Employee
            </Button>
            </Typography>
            <Typography>

            <Button
              variant="contained"
              color="secondary"
              sx={{ my: 1 }}
              startIcon={<AddCircleIcon />}
              onClick={()=>{navigateTo('/add-sale')}}
            >
              Add sale
            </Button>
            </Typography>
          
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;

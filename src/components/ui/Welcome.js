import { Button, Grid, Typography } from "@mui/material";
import colors from "./colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
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
          <Link to="/add-employee">
            <Button
              variant="contained"
              color="secondary"
              sx={{ my: 1 }}
              startIcon={<AddCircleIcon />}
            >
              Add Employee
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;

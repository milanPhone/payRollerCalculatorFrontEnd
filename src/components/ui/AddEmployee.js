import {
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import colors from "./colors";
import EmailIcon from "@mui/icons-material/Email";
import useFormInput from "../../hooks/useFormInput";
import { useEffect, useReducer, useState } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PaidIcon from "@mui/icons-material/Paid";
import PercentIcon from "@mui/icons-material/Percent";
import AddIcon from "@mui/icons-material/Add";

import IconButton from "@mui/material/IconButton";
import { Visibility } from "@mui/icons-material";
import links from "../../util/links";
import errors from "../../util/errors";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShowCommission = (props) => {
  return (
    <>
      <Grid item xs={9} md={7} sx={{ mt: 2 }}>
        <FormControl
          fullWidth
          size="small"
          sx={{ m: 1 }}
          color="secondary"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-name">
            Commission Percentage
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-props.basicSalary"
            type="text"
            value={props.commission.inputValue}
            onChange={(e) => {
              props.commission.inputValueChanged(e);
            }}
            onBlur={(e) => {
              props.commission.inputValueBlur(e);
            }}
            error={props.commission.hasError}
            startAdornment={
              <InputAdornment position="start">
                <PercentIcon color="secondary" />
              </InputAdornment>
            }
            label="Commission Percentage"
          />
          <FormHelperText
            sx={{ fontSize: "0.6em" }}
            error={props.commission.hasError}
          >
            {props.commission.helperText}
          </FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};

const ShowBasicSalary = (props) => {
  return (
    <>
      <Grid item xs={9} md={7} sx={{ mt: 2 }}>
        <FormControl
          fullWidth
          size="small"
          sx={{ m: 1 }}
          color="secondary"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-name">
            Basic Salary
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-props.basicSalary"
            type="text"
            value={props.basicSalary.inputValue}
            onChange={(e) => {
              props.basicSalary.inputValueChanged(e);
            }}
            onBlur={(e) => {
              props.basicSalary.inputValueBlur(e);
            }}
            error={props.basicSalary.hasError}
            startAdornment={
              <InputAdornment position="start">
                <PaidIcon color="secondary" />
              </InputAdornment>
            }
            label="Basic Salary"
          />
          <FormHelperText
            sx={{ fontSize: "0.6em" }}
            error={props.basicSalary.hasError}
          >
            {props.basicSalary.helperText}
          </FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};

const AddEmployee = (props) => {
  const navigate = useNavigate();
  const emailValidator = (str) => {
    if (str.trim() == "") {
      return {
        valid: false,
        helperData: "Email is required",
      };
    }
    if (
      !str
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return {
        valid: false,
        helperData: "Invalid Email",
      };
    } else {
      return {
        valid: true,
        helperData: "",
      };
    }
  };
  const textFieldValidator = (str) => {
    if (str.trim() == "") {
      return {
        valid: false,
        helperData: "Field is required",
      };
    }
    return {
      valid: true,
      helperData: "",
    };
  };

  const passwordValidator = (str) => {
    console.log("str = ", str);
    if (str.match(/\s/g)) {
      return {
        valid: false,
        helperData: "Can't have space",
      };
    }
    if (
      !str.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return {
        valid: false,
        helperData:
          "Minimum eight characters, at least one letter, one number and one special character",
      };
    } else {
      return {
        valid: true,
        helperData: "",
      };
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prevState) => {
      let old = prevState;
      return !old;
    });
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword((prevState) => {
      let old = prevState;
      return !old;
    });
  };
  const password = useFormInput(passwordValidator, "");

  const email = useFormInput(emailValidator, "");

  const name = useFormInput(textFieldValidator, "");

  const role = useFormInput(textFieldValidator, "");

  const basicSalary = useFormInput(textFieldValidator, "");

  const commission = useFormInput(textFieldValidator, "");

  const confirmPasswordValidator = (confirmPassword, password) => {
    console.log("password---", password);
    if (confirmPassword != password) {
      return {
        valid: false,
        helperData: "Confirm Password and Password didn't matched",
      };
    }
    return {
      valid: true,
      helperData: "",
    };
  };
  const confirmPasswordInitial = {
    inputValue: "",
    isValid: false,
    isTouched: false,
    hasError: false,
    helperText: "",
  };

  const confirmPasswordReducer = (state, action) => {
    console.log("action----", action);
    if (action.type == "onBlur") {
      let oldState = { ...state };
      oldState.isTouched = true;
      let { valid, helperData } = confirmPasswordValidator(
        action.value.confirmPassword,
        action.value.password
      );
      oldState.isValid = valid;
      oldState.hasError = !valid;
      oldState.helperText = helperData;

      return oldState;
    }
    if (action.type == "onChange") {
      let oldState = { ...state };
      oldState.inputValue = action.value.confirmPassword;
      let { valid, helperData } = confirmPasswordValidator(
        action.value.confirmPassword,
        action.value.password
      );
      oldState.isValid = valid;
      oldState.hasError = !valid;
      oldState.helperText = helperData;

      return oldState;
    }
    if(action.type== 'reset'){
      let oldState = {...confirmPasswordInitial};
      return oldState;

    }
  };

  const [confirmPassword, confirmPasswordDispatch] = useReducer(
    confirmPasswordReducer,
    confirmPasswordInitial
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      email.isValid &&
      name.isValid &&
      role.isValid &&
      password.isValid &&
      confirmPassword.isValid
    ) {
      if (basicSalary.isValid || commission.isValid) setIsFormValid(true);
      else setIsFormValid(false);
    } else {
      setIsFormValid(false);
    }
  }, [
    email.isValid,
    name.isValid,
    role.isValid,
    basicSalary.isValid,
    commission.isValid,
    confirmPassword.isValid,
    password.isValid,
  ]);
  
  const currentUser = useSelector((state)=>{return state.currentUserReducer.currentUser})
  let token = ''
  const addEmployeeHandler = async ()=>{
    try{
      const addEmployeeData = {};
      addEmployeeData.email = email.inputValue;
      addEmployeeData.name = name.inputValue;
      addEmployeeData.role = role.inputValue;
      console.log('currentUser-----',currentUser);
      if(currentUser.user_id!=-1){
        console.log('currentUser----',currentUser);
        token = currentUser.authToken;
      }
      if(role.inputValue=='salaried'){
        addEmployeeData.basicSalary = basicSalary.inputValue
      }
      if(role.inputValue=='commission'){
        addEmployeeData.commission = commission.inputValue
      }

      addEmployeeData.password = password.inputValue
      console.log('token----',token)
      const fetchResponse = await fetch(links.backendApiUrl+ '/agent/add-agent',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addEmployeeData)
      })
      if(fetchResponse.status == 401){
        let newError = new Error();
        newError.message = errors.unauthorizedAccess;
        newError.statusCode = fetchResponse.status
        throw newError;
      }
      if(fetchResponse.status == 500){
        let newError = new Error();
        let errorResult = await fetchResponse.json()
        newError.message = errorResult.error;
        throw newError;
      }
      if(fetchResponse.status!=201){
        let newError = new Error();
        newError.message = errors.serverError;
        throw newError;
      }
      const addEmployeeDataResult = await fetchResponse.json()
      console.log('result---',addEmployeeDataResult);
      let values = {
        email,
        name,
        role,
        basicSalary,
        commission,
        password
      }
      for(let prop in values){
        values[prop].reset();
      }
      confirmPasswordDispatch({type: 'reset'})

    }
    catch(err){
      //display error message
      if(err.statusCode==401){
        navigate('/',{replace: true})
        
      }
      console.log('error---',err.message);
    }
    
  }

  return (
    <Grid
      container
      sx={{ height: "75vh", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        item
        xs={11}
        md={7}
        sx={{
          textAlign: "center",
          backgroundColor: colors.cardGrey,
          borderRadius: "1.5em",
          // display: "flex",
          // justifyContent: "center",
        }}
      >
        <Grid container sx={{ justifyContent: "center", p: 3 }}>
          <Grid item xs={9} md={7}>
            <Typography
              sx={{
                textAlign: "center",
                // fontWeight: "bold",
                mt: 1,
              }}
              color="secondary"
              variant="h5"
              gutterBottom
            >
              Add Employee
            </Typography>
          </Grid>
          <Grid item xs={9} md={7}>
            <FormControl
              fullWidth
              size="small"
              sx={{ m: 1 }}
              color="secondary"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                value={email.inputValue}
                onChange={(e) => {
                  email.inputValueChanged(e);
                }}
                onBlur={(e) => {
                  email.inputValueBlur(e);
                }}
                error={email.hasError}
                startAdornment={
                  <InputAdornment position="start">
                    {/* <IconButton
                                    aria-label="toggle password visibility"
                                    //onClick={()=>{showPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="start"
                                    > */}
                    <EmailIcon color="secondary" />
                    {/* /</IconButton> */}
                  </InputAdornment>
                }
                label="Email"
              />
              <FormHelperText sx={{ fontSize: "0.6em" }} error={email.hasError}>
                {email.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={9} md={7}>
            <FormControl
              fullWidth
              size="small"
              sx={{ m: 1 }}
              color="secondary"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                type="text"
                value={name.inputValue}
                onChange={(e) => {
                  name.inputValueChanged(e);
                }}
                onBlur={(e) => {
                  name.inputValueBlur(e);
                }}
                error={name.hasError}
                startAdornment={
                  <InputAdornment position="start">
                    <AbcIcon color="secondary" />
                  </InputAdornment>
                }
                label="name"
              />
              <FormHelperText sx={{ fontSize: "0.6em" }} error={name.hasError}>
                {name.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={9} md={7}>
            <FormControl
              fullWidth
              size="small"
              sx={{ m: 1 }}
              color="secondary"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password.inputValue}
                onChange={(e) => {
                  password.inputValueChanged(e);
                  confirmPasswordDispatch({
                    type: "onChange",
                    value: {
                      confirmPassword: confirmPassword.inputValue,
                      password: e.target.value,
                    },
                  });
                }}
                onBlur={(e) => {
                  password.inputValueBlur(e);
                  confirmPasswordDispatch({
                    type: "onChange",
                    value: {
                      confirmPassword: confirmPassword.inputValue,
                      password: e.target.value,
                    },
                  });
                }}
                error={password.hasError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        showPasswordHandler();
                      }}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <Visibility color="secondary" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText
                sx={{ fontSize: "0.6em" }}
                error={password.hasError}
              >
                {password.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={9} md={7}>
            <FormControl
              fullWidth
              size="small"
              sx={{ m: 1 }}
              color="secondary"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword.inputValue}
                onChange={(e) => {
                  confirmPasswordDispatch({
                    type: "onChange",
                    value: {
                      confirmPassword: e.target.value,
                      password: password.inputValue,
                    },
                  });
                }}
                onBlur={(e) => {
                  confirmPasswordDispatch({
                    type: "onBlur",
                    value: {
                      confirmPassword: e.target.value,
                      password: password.inputValue,
                    },
                  });
                }}
                error={confirmPassword.hasError}
                helperText={confirmPassword.helperText}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={() => {
                        showConfirmPasswordHandler();
                      }}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <Visibility color="secondary" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              <FormHelperText
                sx={{ fontSize: "0.6em" }}
                error={password.hasError}
              >
                {confirmPassword.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={9} md={7}>
            <FormControl
              sx={{
                ml: 1,
              }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role.inputValue}
                label="Age"
                onChange={(e) => {
                  role.inputValueChanged(e);
                }}
                onBlur={(e) => {
                  role.inputValueBlur(e);
                }}
                error={role.hasError}
                helperText={role.helperText}
              >
                <MenuItem value={"salaried"}>salaried</MenuItem>
                <MenuItem value={"commission"}>commission</MenuItem>
              </Select>
              <FormHelperText sx={{ fontSize: "0.6em" }} error={role.hasError}>
                {role.helperText}
              </FormHelperText>
            </FormControl>
          </Grid>
          {role.inputValue == "salaried" && (
            <ShowBasicSalary basicSalary={basicSalary} />
          )}

          {role.inputValue == "commission" && (
            <ShowCommission commission={commission} />
          )}

          <Grid item xs={9} md={7}>
            <Fab
              variant="extended"
              disabled={!isFormValid}
              color="secondary"
              sx={{ mt: 2 }}
              onClick = {()=>{
                addEmployeeHandler()
              }}
            >
              Add
              <AddIcon sx={{ fontSize: "1.4 em", marginLeft: "0.2 em" }} />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddEmployee;

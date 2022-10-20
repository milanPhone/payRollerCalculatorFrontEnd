import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import colors from "./colors";
import LockIcon from '@mui/icons-material/Lock';
import useFormInput from "../../hooks/useFormInput";
import EmailIcon from '@mui/icons-material/Email';
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import links from "../../util/links";
import errors from "../../util/errors";

const Login = (props)=>{

    const passwordValidator = (str)=>{
        console.log('str = ',str)
        if(str.match(/\s/g)){
            return {
                valid: false,
                helperData: 'Can\'t have space'
            }
        }
        if(!str.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            return {
                valid: false,
                helperData: 'Minimum eight characters, at least one letter, one number and one special character'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
    }
    const [showPassword,setShowPassword] = useState(false);
    const showPasswordHandler = ()=>{
        setShowPassword((prevState)=>{
            let old = prevState;
            return !old;
        })
    }
    const emailValidator = (str)=>{
        if(str.trim()==''){
            return {
                valid: false,
                helperData: 'Email is required'
            }
        }
        if(!str.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return {
                valid: false,
                helperData: 'Invalid Email'
            }
        }
        else{
            return {
                valid: true,
                helperData: ''
            }
        }
    }
    const password = useFormInput(passwordValidator,'');
    const email = useFormInput(emailValidator,'');

    const [isFormValid,setIsFormValid] = useState(false)
    useEffect(()=>{console.log(password.isValid,email.isValid);setIsFormValid(password.isValid && email.isValid);},[password.isValid,email.isValid])
    let history = useHistory()
    const loginHandler = async ()=>{
        try{
            console.log('password = ',password.inputValue)
            console.log('email = ',email.inputValue)
            let loginData = {
                email: email.inputValue,
                password: password.inputValue
            }
            const loginResponse = await fetch(links.backendApiUrl+'/agent/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(loginData)
            });
            if(loginResponse.status == 500){
                let newError = new Error();
                const errorResult = await loginResponse.json()
                newError.message = errorResult.error;
                throw newError;
            }
            if(loginResponse.status!=201){
                let newError = new Error();
                newError.message = errors.serverError;
                throw newError;
            }
            const loginResult = await loginResponse.json();
            localStorage.setItem('currentUser',JSON.stringify({
                user_id: loginResult.agent_id,
                authToken: loginResult.authToken
            }))
            //code to add message component...!!
            history.replace('/welcome')
        }
        catch(err){
            console.log('error----',err)
        }
    }

    return (

    <Grid container sx={{height: '75vh', alignItems: 'center'}}>
        <Grid  item xs={11} md={7} sx={{backgroundColor:colors.cardGrey,
                                        height:'fit-content',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        pb:2
                                        }}>
                <Grid container sx={{justifyContent: 'center',pt:3}}>
                    <LockIcon color="secondary" sx={{fontSize:'5em'}}></LockIcon>
                    
                </Grid>
                <Grid container sx={{justifyContent: 'center'}}>
                    <Typography color='secondary' sx={{fontSize:'1.8em',lineHeight: '1em'}}>Login</Typography>
                </Grid>
                <Grid container sx={{justifyContent: 'center' , mt:2}}>
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                        <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type='text'
                                value={email.inputValue}
                                onChange={(e)=>{email.inputValueChanged(e)}}
                                onBlur={(e)=>{email.inputValueBlur(e)}}
                                error={email.hasError}
                                helperText={email.helperText}
                                startAdornment={
                                <InputAdornment position="start">
                                    {/* <IconButton
                                    aria-label="toggle password visibility"
                                    //onClick={()=>{showPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="start"
                                    > */}
                                    <EmailIcon color='secondary' />
                                    {/* /</IconButton> */}
                                </InputAdornment>
                                }
                                label="Email"
                            />
                            <FormHelperText sx={{fontSize:'0.6em'}} error={email.hasError}>{email.helperText}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} md={7} sx={{display:'flex',justifyContent:'center'}}>
                        <FormControl fullWidth size='small' sx={{ m: 1 }} color='secondary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password.inputValue}
                                onChange={(e)=>{password.inputValueChanged(e)}}
                                onBlur={(e)=>{password.inputValueBlur(e)}}
                                error={password.hasError}
                                helperText={password.helperText}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{showPasswordHandler()}}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    <Visibility color='secondary' />
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText sx={{fontSize:'0.6em'}} error={password.hasError}>{password.helperText}</FormHelperText>
                        </FormControl>
                        </Grid>
                        <Grid item xs={9} md={7} sx={{display: 'flex',justifyContent: 'center', my:2}}>
                            <Button disabled={!isFormValid} color='secondary' onClick={loginHandler} variant="contained" sx={{width:'15ch'}}>Login</Button>
                        </Grid>
                </Grid>
        </Grid>        
    </Grid>
    )
}

export default Login;
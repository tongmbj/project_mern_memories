import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false); //I fucking trolled, it was square brackets not curlypoints. giving me such undefined issues
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    
    //console.log("isSignup:", isSignup);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);//toggle showpassword

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log("success");
        const result = res?.profileObj; //using question mark avoids error when result is undefined
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            console.log("dispatched");
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later");
    };

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
        flow: googleSuccess(),
        onError: googleFailure(),
      });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handlechange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign in' }
                    </Button>
                    <GoogleOAuthProvider clientId="470713474953-asd8c679g8ks9t49jvg5en4itvecad9q.apps.googleusercontent.com">
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={() => login()} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                    </GoogleOAuthProvider>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
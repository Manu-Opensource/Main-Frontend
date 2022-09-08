import {Typography, TextField, Stack, Button} from '@mui/material';
import * as React from 'react';
import { ApiRequest } from '../controllers/api';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default class Signup extends React.Component {
    state = {
        errorEmail: null,
        errorPassword: null,
        captchaToken: null,
        captchaError: null,
    }

    signup = async () => {
        this.setState({errorEmail: false, errorPassword: false});
        let emailBox = document.getElementById("Email");
        let passwordBox = document.getElementById("Password");
        if (emailBox.value === "") {
            this.setState({errorEmail: "Please enter an email"});
            return;
        }
        if (passwordBox.value === "") {
            this.setState({errorPassword: "Please enter an password"});
            return;
        }

        if (!this.state.captchaToken) {
            this.setState({captchaError: "Please verify captcha"});
            return;
        } else this.setState({captchaError: null});

        let isEmailValid = await (await ApiRequest("validate-email", {email: emailBox.value})).text();

        if (isEmailValid !== 'true') {
            this.setState({errorEmail: isEmailValid === "true" ? null : isEmailValid})
            return;
        }

        let signupResponse = await (await ApiRequest("signup", {
            email: emailBox.value,
            password: passwordBox.value,
            captchaToken: this.state.captchaToken})).text
    }
    
    render = () => {
        return (
            <div className="flex justify-center content-center h-screen">
                <div className="m-auto shadow-xl shadow-cyan-500/70 bg-[#212121] p-16 rounded-[1rem] grid grid-cols-1 justify-items-center">
                    <Typography variant="h4" color="#FFFFFF"> Get Started. </Typography> 
                    <form>
                        <Stack>
                            <TextField id="Email" error={this.state.errorEmail} helperText={this.state.errorEmail} label="Email" variant="standard" sx={{ mt: 4 }}/>
                            <TextField id="Password" error={this.state.errorPassword} helperText={this.state.errorPassword} label="Password" variant="standard" type="password" sx={{ mt: 4 }}/>
                            <div className="mt-4">
                                <Stack>
                                <HCaptcha sitekey="ecf2b6c5-d158-4677-b869-c82a4fecab18" theme="dark" onVerify={
                                    (captchaToken) => {this.setState({captchaToken: captchaToken})}}/>
                                <Typography variant="p" color="#f44336"> {this.state.captchaError} </Typography>
                                </Stack> 
                            </div>
                            <Button variant="contained" sx={{ mt: 4 }} onClick={this.signup}> Get Coding! </Button>
                        </Stack>
                    </form>
                </div>
            </div>
        );
    }
}

import {Typography, TextField, Stack, Button} from '@mui/material';
import * as React from 'react';

export default class Signup extends React.Component {
    
    render = () => {
        return (
            <div className="flex justify-center content-center h-screen">
                <div className="m-auto shadow-xl shadow-cyan-500/70 bg-[#212121] p-16 rounded-[1rem]">
                    <Typography variant="h4" color="#FFFFFF"> Get Started </Typography> 
                    <form>
                        <Stack>
                            <TextField id="Email" label="Email" variant="standard" sx={{ mt: 4 }}/>
                            <TextField id="Password" label="Password" variant="standard" type="password" sx={{ mt: 4 }}/>
                            <Button variant="contained" sx={{ mt: 4 }}> Get Coding! </Button>
                        </Stack>
                    </form>
                </div>
            </div>
        );
    }
}

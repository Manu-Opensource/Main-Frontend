import * as React from 'react';
import Header from '../components/header';
import { Stack, Typography, Box, Button, Divider } from '@mui/material';
import { getUserData } from '../controllers/auth';

export default class Home extends React.Component {
    componentDidMount = async () => {
        this.setState({user: await getUserData()});
    }


    render = () => {
        return (
            <Box sx={{ backgroundColor: 'background.default', minHeight: window.innerHeight }}>
                <Header authenticated={this.state?.user ? true : false}/>
                <Stack direction="column" alignItems="center">
                    <Typography variant="h2" color="#FFFFFF" sx={{ mt: 4 }}>
                        Welcome {`${this.state?.user ? "Back" : ""}`}! </Typography>

                    {this.state?.user ? 
                    <div>
                        <Stack direction="column" alignItems="center">
                            <Typography variant="h4" color="#FFFFFF" sx={{ mt: 4}}>
                                Why not start a course? </Typography>
                            <Button variant="contained" sx={{ mt: 4 }} href="/courses"> Explore Courses </Button>
                        </Stack>
                    </div> :
                    <div>
                        <Stack direction="column" alignItems="center">
                            <div>
                                <Button variant="contained" sx={{ mt: 4, mr: 8 }} href="/signup"> Sign Up </Button>
                                <Button variant="contained" sx={{ mt: 4 }} href="/signin"> Sign In </Button>
                            </div>
                            <Divider />
                            <Typography variant="h4" color="#FFFFFF" sx={{ mt: 4}}>
                                Or </Typography>
                            <Button variant="contained" sx={{ mt: 4 }} href="/courses"> Explore Courses </Button>
                        </Stack>
                        
                    </div>
                    }
                </Stack>
            </Box>
        );
    }
}

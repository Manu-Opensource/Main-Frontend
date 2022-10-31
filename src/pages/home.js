import * as React from 'react';
import Header from '../components/header';
import { Stack, Typography, Box, Button } from '@mui/material';
import { getUserData } from '../controllers/auth';

export default class Home extends React.Component {
    state = {
        userData: {
            activeCourses: [],
            name: "",
        }
    }

    componentDidMount = async () => {
        this.setState({user: await getUserData()});
    }


    render = () => {
        return (
            <Box sx={{ backgroundColor: 'background.default', minHeight: window.innerHeight }}>
                <Header authenticated={this.state.user ? true : false}/>
                <Stack direction="column" alignItems="center">
                    <Typography variant="h2" color="#FFFFFF" sx={{ mt: 4 }}>
                        Welcome Back {this.state.userData.name}! </Typography>

                    {this.state.userData.activeCourses.length === 0 ?
                    <div>
                        <Stack direction="column" alignItems="center">
                            <Typography variant="h4" color="#FFFFFF" sx={{ mt: 4}}>
                                Why not start a course? </Typography>
                            <Button variant="contained" sx={{ mt: 4 }} href="/courses"> Explore Courses </Button>
                        </Stack>

                    </div> :
                    
                    <div>
                        

                    </div>
                    }
                </Stack>
            </Box>
        );
    }
}

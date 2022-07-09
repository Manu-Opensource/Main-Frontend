import * as React from 'react';
import { Avatar, AppBar, Container, Button, Stack } from '@mui/material';
import Logo from '../logo.png';

export default class Header extends React.Component {

    render = () => {
        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Courses
                        </Button>
                        <img src={Logo} className="h-12"/>
                        <Avatar>T</Avatar>
                    </Stack>
                </Container>
            </AppBar>
        );
    }
}

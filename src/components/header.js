import * as React from 'react';
import { AppBar, Container, Button, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../logo.png';

export default class Header extends React.Component {
    state = {}

    toggleMenu = (event) => {
        this.setState({menu: this.state.menu ? null : event.currentTarget});
    }

    render = () => {
        return (
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} href="/courses">
                            Courses
                        </Button>

                        <a href="/">
                        <img alt="" src={Logo} className="h-12"/>
                        </a>

                        <div>
                            <IconButton
                                size="large" 
                                onClick={this.toggleMenu} >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                anchorEl={this.state.menu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.menu)}
                                onClose={this.toggleMenu}
                            >
                                {this.props.authenticated ? 
                                <div>
                                    <MenuItem> Manage Account </MenuItem>
                                    <MenuItem> Log Out </MenuItem>
                                </div>
                                :
                                <div>
                                <MenuItem onClick={() => {window.location.href="/signin"}}> Sign In </MenuItem>
                                <MenuItem onClick={() => {window.location.href="/signup"}}> Sign Up </MenuItem>
                                </div>}
                            </Menu>
                        </div>
                    </Stack>
                </Container>
            </AppBar>
        );
    }
}

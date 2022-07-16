import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { Box } from '@mui/material';


export default class Courses extends React.Component {
    state = {
        data: undefined
    }

    getData = () => {
        return [
            {
                title: "Coding",
                buttonText: "View Course"
            },
            {
                title: "Gaming",
                buttonText: "View Course"

            },
        ];
    }

    componentDidMount = () => {
        this.setState({data: this.getData()});
    }

    render = () => {
        return (
            <Box sx={{ backgroundColor: 'background.default', minHeight: window.innerHeight }}>
                <Header/>
                {this.state.data ? 
                <List content={this.state.data}/>
                : <div/>}
            </Box>
        );
    }
}

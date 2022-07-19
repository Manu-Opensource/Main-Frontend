import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { Box } from '@mui/material';
import { ApiRequest } from '../controllers/api';


export default class Courses extends React.Component {
    state = {
        data: undefined
    }

    getData = async () => {
        let courses = await(await ApiRequest("courses")).json(); 
        let ret = [];
        Object.keys(courses).forEach(k => {
            ret.push({
                title: courses[k].Name,
                buttonText: "View Course",
                href: `/coures/${courses[k].Id}`
            });
        });
        return ret;
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
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

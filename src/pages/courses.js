import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import { getUserData, loggedIn } from '../controllers/auth';


export default class Courses extends React.Component {
    state = {
        data: undefined
    }

    getData = async () => {
        let courses = await(await ApiRequest("courses")).json(); 
        let ret = [];
        courses.forEach(course => {
            ret.push({
                title: course.name,
                buttonText: "View Course",
                href: `/courses/${course.id}`
            });
        });
        return ret;
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
        if (await loggedIn())
            this.setState({user: await getUserData()});
    }

    render = () => {
        return (
            <>
                <Header authenticated={this.state.user ? true : false}/>
                {this.state.data ? 
                <List content={this.state.data}/>
                : <div/>}
            </>
        );
    }
}

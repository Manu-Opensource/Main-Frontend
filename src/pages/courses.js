import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import { getUserData } from '../controllers/auth';


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
        ret.userData = await getUserData();
        return ret;
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
    }

    render = () => {
        return (
            <>
                <Header authenticated={this.state.data?.userData ? true : false}/>
                {this.state.data ? 
                <List content={this.state.data}/>
                : <div/>}
            </>
        );
    }
}

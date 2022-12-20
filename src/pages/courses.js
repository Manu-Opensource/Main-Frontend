import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import parseXml from '../controllers/xml';
import { ApiRequest } from '../controllers/api';
import { getUserData } from '../controllers/auth';


export default class Courses extends React.Component {
    state = {
        data: undefined
    }

    getData = async () => {
        let courses = parseXml(await(await ApiRequest("courses.xml", {_gh: true})).text()).children; 
        let ret = [];
        courses.forEach(course => {
            ret.push({
                title: course.attributes.Name,
                buttonText: "View Course",
                href: `/courses/${course.attributes.Id}`
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
                <List content={this.state.data} disableCompletion/>
                : <div/>}
            </>
        );
    }
}

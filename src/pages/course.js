import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import parseXml from '../controllers/xml';
import { getUserData } from '../controllers/auth';

export default class Course extends React.Component {
    state = {
        data: undefined,
        user: undefined
    }
    
    getData = async () => {
        let courseId = window.location.href.split("/").at(-1);
        let course = await (await ApiRequest(`course/${courseId}`)).json();

        let obj = parseXml(course.lessons);

        return {
            lessons: obj.children[0].children.map(lesson => {
                return {
                    title: lesson.attributes.Name,
                    buttonText: "View Lesson",
                    href: `/lessons/${lesson.attributes.Id}`,
                }
            }),
            name: course.name,
        };
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData(), user: await getUserData()});
    }

    render = () => {
        return (
            <>
                <Header authenticated={this.state.user ? true : false}/>
                {this.state.data ?
                <List content={this.state.data.lessons} />
                : <div/>}
            </>
        );
    }
}

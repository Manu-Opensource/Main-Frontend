import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import parseXml from '../controllers/xml';

export default class Course extends React.Component {
    state = {
        data: undefined
    }
    
    getData = async () => {
        let courseId = window.location.href.split("/").at(-1);
        let course = await (await ApiRequest(`course/${courseId}`)).json();

        let name;
        let xmlString;

        course.forEach(pair => {
            if (pair.Key === "Name") name = pair.Value;
            else if (pair.Key === "Lessons") xmlString = pair.Value;
        });

        let obj = parseXml(xmlString);

        console.log(obj)

        return {
            lessons: obj.children[0].children.map(lesson => {
                return {
                    title: lesson.attributes.Name,
                    buttonText: "View Lesson",
                    href: `/lessons/${lesson.attributes.Id}`,
                }
            }),
            name: name,
        };
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
    }

    render = () => {
        return (
            <>
                <Header/>
                {this.state.data ?
                <List content={this.state.data.lessons} />
                : <div/>}
            </>
        );
    }
}

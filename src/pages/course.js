import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import { XMLParser } from 'fast-xml-parser';

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

        const parser = new XMLParser();
        let obj = parser.parse(xmlString);


        return {
            lessons: obj.XML.Lessons.Lesson.map(lesson => {
                return {
                    title: lesson.Name,
                    buttonText: "View Lesson",
                    href: `/lessons/${lesson.Id}`,
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

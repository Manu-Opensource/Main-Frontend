import * as React from 'react';
import Header from '../components/header';
import LessonRenderer from '../components/lessonRenderer';
import { ApiRequest } from '../controllers/api';
import parseXml from '../controllers/xml';

export default class Lesson extends React.Component {
    state = {
        data: undefined
    }

    getData = async () => {
        let lessonId = window.location.href.split("/").at(-1);
        let lesson = await (await ApiRequest(`lesson/${lessonId}`)).json();

        let xmlString;

        lesson.forEach(pair => {
            if (pair.Key === "Content") xmlString = pair.Value;
        });

        this.setState({data: xmlString});
    }

    componentDidMount = async() => {
        this.getData();
    }

    render = () => {
        return ( 
            <div>
                <Header/>
                {this.state.data ?
                    <LessonRenderer data={this.state.data}/>
                : <div/>}
            </div>
        );
    }

}

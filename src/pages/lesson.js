import * as React from 'react';
import Header from '../components/header';
import LessonRenderer from '../components/lessonRenderer';
import { ApiRequest } from '../controllers/api';
import { getUserData } from '../controllers/auth';
import parseXml from '../controllers/xml';

export default class Lesson extends React.Component {
    state = {
        data: undefined,
        user: undefined
    }

    getData = async () => {
        let lessonPath = window.location.href.split("lessons/").at(-1);
        let lesson = await (await ApiRequest(`lessons/${lessonPath}.xml`, {_gh: true})).text();
        let lessonId = lesson.split("/").at(-1);

        this.setState({data: lesson, lessonId: lessonId, userData: await getUserData()});
    }

    componentDidMount = async() => {
        this.getData();
    }

    render = () => {
        return ( 
            <div>
                <Header authenticated={this.state.userData ? true : false}/>
                {this.state.data ?
                    <LessonRenderer
                        data={this.state.data}
                        lessonPath={this.state.lessonPath}
                        lessonId={this.state.lessonId}
                        completed={this.state.userData && this.state.userData.completedLessons.find(v => v === this.state.lessonId) ? true : false}/>
                : <div/>}
            </div>
        );
    }

}

import * as React from 'react';
import Header from '../components/header';
import LessonRenderer from '../components/lessonRenderer';
import { ApiRequest } from '../controllers/api';
import { getUserData, loggedIn } from '../controllers/auth';

export default class Lesson extends React.Component {
    state = {
        data: undefined,
        user: undefined
    }

    getData = async () => {
        let lessonId = window.location.href.split("/").at(-1);
        let lesson = await (await ApiRequest(`lesson/${lessonId}`)).json();

        let xmlString = lesson.content;

        this.setState({data: xmlString, lessonId: lessonId});
    }

    componentDidMount = async() => {
        this.getData();
        if (loggedIn())
            this.setState({user: await getUserData()});
    }

    render = () => {
        return ( 
            <div>
                <Header authenticated={this.state.user ? true : false}/>
                {this.state.data ?
                    <LessonRenderer
                        data={this.state.data}
                        lessonId={this.state.lessonId}
                        completed={this.state.user && this.state.user.completedLessons.find(v => v === this.state.lessonId) ? true : false}/>
                : <div/>}
            </div>
        );
    }

}

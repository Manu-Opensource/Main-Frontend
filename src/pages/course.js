import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import parseXml from '../controllers/xml';
import { getUserData, loggedIn } from '../controllers/auth';
import { Stack, Typography, Divider } from '@mui/material';
import CircularProgressWithText from '../components/circularProgressWithText';

export default class Course extends React.Component {
    state = {
        data: undefined,
        user: undefined
    }
    
    getData = async () => {
        let courseId = window.location.href.split("/").at(-1);
        let course = await (await ApiRequest(`course/${courseId}`)).json();
        let completedLessons = [];
        let isLoggedIn = await loggedIn();
        if (isLoggedIn)
            completedLessons = (await getUserData()).completedLessons;


        let obj = parseXml(course.lessons);
        let completedCount = 0;
        let lessons = obj.children[0].children.map(lesson => {
            let completed = completedLessons.find(v => v == lesson.attributes.Id) ? true : false
            if (completed) completedCount++;
            return {
                title: lesson.attributes.Name,
                buttonText: "View Lesson",
                href: `/lessons/${lesson.attributes.Id}`,
                completed: completed
            }
        });
        lessons = lessons.concat(lessons);

        let completionPercent = completedCount / obj.children[0].children.length * 100;
        return {
            loggedIn: isLoggedIn,
            lessons: lessons,
            name: course.name,
            completionPercent: completionPercent,
            description: course.description,
        };
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
        if (await loggedIn())
            this.setState({user: await getUserData()});
    }

    render = () => {
        if (this.state.data)
            console.log(this.state.data.completionPercent);
        return (
            <>
                <Header authenticated={this.state.user ? true : false}/>
                {this.state.data ?
                <div>
                    <Stack className="text-center mb-8 mt-4">
                        <Typography variant="h2" color="#FFFFFF"> {this.state.data.name} </Typography>
                        <Divider/>
                    </Stack>
                    <div className="grid grid-cols-3">
                        <div className="bg-[#212121] flex flex-col items-center rounded-lg ml-20 p-4 text-center gap-4 h-max sticky top-32">
                            <Typography variant="h3" color="#FFFFFF"> About Course </Typography>

                            <Typography variant="h5" color="#FFFFFF" className="mt-24"> {this.state.data.description} </Typography>
                            {this.state.data.loggedIn ?
                                <>
                                <Typography variant="h3" color="#FFFFFF" className="gap-8"> Progress </Typography>
                                <div className="mt-4">
                                    <CircularProgressWithText value={this.state.data.completionPercent}/>
                                </div>
                                </>
                            : <div/>}
                        </div>
                        <List content={this.state.data.lessons} />
                    </div>
                </div>
                : <div/>}
            </>
        );
    }
}

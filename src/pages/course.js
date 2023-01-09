import * as React from 'react';
import Header from '../components/header';
import List from '../components/list';
import { ApiRequest } from '../controllers/api';
import parseXml from '../controllers/xml';
import { getUserData } from '../controllers/auth';
import { Stack, Typography, Divider } from '@mui/material';
import CircularProgressWithText from '../components/circularProgressWithText';

export default class Course extends React.Component {
    state = {
        data: undefined,
        user: undefined
    }
    
    getData = async () => {
        let courseId = window.location.href.split("/").at(-1);
        let course = await (await ApiRequest(`courses/${courseId}.xml`, {_gh: true})).text();
        let completedLessons = [];
        let userData = await getUserData();
        if (userData) completedLessons = userData.completedLessons;

        let obj = parseXml(course);
        console.log(obj);
        let completedCount = 0;
        let courseInfo;
        let sub = 0;
        let lessons = obj.children.map(child => {
            if (child.name === "Lesson") {
                let completed = completedLessons.find(v => v == child.attributes.Id) ? true : false
                if (completed) completedCount++;
                return {
                    title: child.attributes.Name,
                    buttonText: "View Lesson",
                    href: `/lessons/${child.attributes.Path + child.attributes.Id}`,
                    completed: completed
                }
            } else if (child.name === "Header") {
                sub++;
                return {
                    isHeader: true,
                    title: child.attributes.Name,
                }
            } else if (child.name === "CourseInfo") {
                courseInfo = child.children[0];
                sub++;
            }
            return null;
        }).filter(l => {return l});

        let completionPercent = completedCount / (obj.children.length - sub) * 100;
        return {
            userData: userData,
            lessons: lessons,
            name: course.name,
            completionPercent: completionPercent,
            courseInfo: courseInfo,
        };
    }

    componentDidMount = async () => {
        this.setState({data: await this.getData()});
    }

    render = () => {
        return (
            <>
                <Header authenticated={this.state.data?.userData ? true : false}/>
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
                            {this.state.data.userData ?
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

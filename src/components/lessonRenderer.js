import * as React from 'react';
import parseXml from '../controllers/xml';
import { Title, Subtitle, Header, Subheader, Text, Code, Spoiler, Link, Authors } from './lessonRendererComponents.js';
import { Button, Stack } from '@mui/material';
import { ApiRequest } from '../controllers/api';


export default class LessonRenderer extends React.Component {
    state = {completed: false};

    constructor(props) {
        super(props);
        this.state.completed = props.completed;
    }

    parseEl = (el, i) => {
        if (typeof(el) === "string") return el;
        let children = el.children.map(child => {return this.parseEl(child, i * 10000)});
        switch(el.name) {
            case "Title":
                return ( <Title key={i}>{children}</Title> )
            //case "Subtitle":
            //    return ( <Subtitle>{children}</Subtitle> )
            case "Header":
                return ( <Header key={i}>{children}</Header> )
            //case "Subheader":
            //    return ( <Subheader>{children}</Subheader> )
            case "Text":
                return ( <Text key={i}>{children}</Text> )
            case "Code":
                return ( <Code key={i} language={el.attributes.lang}>{children}</Code> )
            case "Link":
                return ( <Link key={i} href={el.children[0]} target="_blank" rel="noreferrer">{children}</Link> )
            case "Spoiler":
                return ( <Spoiler key={i}> {children} </Spoiler> )
            case "Authors":
                return ( <Authors key={i}> {children} </Authors> )
            default:
                return null
        }
    }

    gen = (xmlString) => {
        let generated = [];
        let tree = parseXml(xmlString).children[0].children;
        let i = 1;
        tree.forEach(el => {
            generated.push(this.parseEl(el, i));
            i++;
        });
        this.setState({renderedXML: generated});
    }

    componentDidMount = () => {
        this.gen(this.props.data); 
    }

    toggleCompleted = () => {
        let completed = !this.state.completed;
        this.setState({completed: completed});
        ApiRequest(`completelesson/${this.props.lessonId}`, completed ? {completed: "True"} : {});
    }

    render = () => {
        return (
            <div className="w-1/2 m-auto pb-24">
                <Stack alignItems="center">
                    {this.state.renderedXML ?
                        this.state.renderedXML
                        : <div/> }
                    <Button sx={{mt: 4}} onClick={this.toggleCompleted} variant="contained">
                    {
                        this.state.completed ? "Unmark Completed"
                        : "Mark Completed" }</Button>
                </Stack>
            </div>
        );
    }
}

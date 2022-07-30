import * as React from 'react';
import parseXml from '../controllers/xml';
import { Title, Subtitle, Header, Subheader, Text, Code, Spoiler, Link, Authors } from './lessonRendererComponents.js';
import { Stack } from '@mui/material';


export default class LessonRenderer extends React.Component {
    state = {};

    parseEl = (el) => {
        if (typeof(el) === "string") return el;
        let children = el.children.map(child => {return this.parseEl(child)});
        switch(el.name) {
            case "Title":
                return ( <Title>{children}</Title> )
            //case "Subtitle":
            //    return ( <Subtitle>{children}</Subtitle> )
            case "Header":
                return ( <Header>{children}</Header> )
            //case "Subheader":
            //    return ( <Subheader>{children}</Subheader> )
            case "Text":
                return ( <Text>{children}</Text> )
            case "Code":
                return ( <Code language={el.attributes.lang}>{children}</Code> )
            case "Link":
                return ( <Link href={el.children[0]} target="_blank" rel="noreferrer">{children}</Link> )
            case "Spoiler":
                return ( <Spoiler> {children} </Spoiler> )
            case "Authors":
                return ( <Authors> {children} </Authors> )
            default:
                console.log(el.name);
                return null
        }
    }

    gen = (xmlString) => {
        let generated = [];
        let tree = parseXml(xmlString).children[0].children;
        console.log(tree)
        tree.forEach(el => {
            generated.push(this.parseEl(el));
        });
        this.setState({renderedXML: generated});
    }

    componentDidMount = () => {
        this.gen(this.props.data); 
    }

    render = () => {
        return (
            <div className="w-1/2 m-auto pb-24">
                <Stack alignItems="center">
                    {this.state.renderedXML ?
                        this.state.renderedXML
                        : <div/> }
                </Stack>
            </div>
        );
    }
}
import * as React from 'react';
import { Button, Typography, Stack, Link as MUILink, Divider } from '@mui/material';
import Prism from 'prismjs';
import "../prism.css"

export class Title extends React.Component {
    render = () => {
        return (
            <Stack>
                <Typography variant="h2" color="#FFFFFF"> {this.props.children} </Typography>
                <Divider/>
            </Stack>
        );
    }
}

export class Subtitle extends React.Component {
    render = () => {
        return (
            <Typography variant="h3" color="#FFFFFF"> {this.props.children} </Typography>
        );
    }
}

export class Header extends React.Component {
    render = () => {
        return (
            <Typography variant="h4" color="#FFFFFF" sx={{mt: 4}}> {this.props.children} </Typography>
        );
    }
}

export class Subheader extends React.Component {
    render = () => {
        return (
            <Typography variant="h5" color="#FFFFFF"> {this.props.children} </Typography>
        );
    }
}

export class Text extends React.Component {
    render = () => {
        return (
            <Typography variant="h6" color="#FFFFFF" sx={{mt: 2}}> {this.props.children} </Typography>
        );
    }
}

export class Code extends React.Component {
    componentDidMount = () => {
        Prism.highlightAll()
    }
    render = () => {
        return (
            <div className="mt-4 line-numbers">
                <pre>
                    <code className={`language-${this.props.language} match-braces`}>
                        {this.props.children.map(child => {return child.trim()})}
                    </code>
                </pre>
            </div>
        );
    }
}

export class Link extends React.Component {
    render = () => {
        return (
            <MUILink href={this.props.href} underline="hover"> {this.props.children} </MUILink>
        );
    }
}

export class Spoiler extends React.Component {
    state = {
        hidden: true
    }

    render = () => {
        return (
            <div>
                {this.state.hidden ?
                    <Button variant="contained" sx={{ mt: 4 }} onClick={() => {this.setState({hidden: false})}}> Show Hidden </Button>
                : <Stack direction="column" alignItems="center">
                    {this.props.children}
                    <Button variant="contained" sx={{ mt: 4 }} onClick={() => {this.setState({hidden: true})}}> Hide </Button>
                </Stack>}
            </div>
        );
    }
}

export class Question extends React.Component {
    state = {
        hidden: true
    }

    render = () => {
        return (
            <div className="bg-[#212121] p-6 rounded-lg mt-4">
                <Stack>
                    <Typography variant="h6" color="#FFFFFF"> {this.props.name} </Typography>
                    {this.props.children}
                </Stack>
            </div>
        );
    }
}

export class Choice extends React.Component {
    state = {
        answered: 0 //0: unanswered, 1: incorrect, 2: correct
    }

    render = () => {
        return (
            <>
            {this.state.answered != 0 ?
            <Button variant="contained"
                    sx={{ mt: 4, boxShadow: 3 }}
                    onClick={() => {this.setState({answered: (this.props.correct === "true") + 1})}}
                    color={this.state.answered == 2 ? "success" : "error"}>
                    {this.props.children}
            </Button>
            : 
            <Button variant="contained"
                    sx={{ mt: 4, boxShadow: 3 }}
                    onClick={() => {this.setState({answered: (this.props.correct === "true") + 1})}}>
                    {this.props.children}
            </Button>
            }
            </>
        );
    }
}

export class Authors extends React.Component {
    render = () => {
        return (
            <Typography variant="p" color="#FFFFFF" sx={{mt: 2}}> Written By: {this.props.children} </Typography>
        );
    }
}

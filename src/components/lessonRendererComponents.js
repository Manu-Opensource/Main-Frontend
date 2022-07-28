import * as React from 'react';
import { Typography } from '@mui/material';
import Prism from 'prismjs';
import "../prism.css"

export class Title extends React.Component {
    render = () => {
        return (
            <Typography variant="h2" color="#FFFFFF"> {this.props.children} </Typography>
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
            <Typography variant="h4" color="#FFFFFF"> {this.props.children} </Typography>
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
            <Typography variant="p" color="#FFFFFF"> {this.props.children} </Typography>
        );
    }
}

export class Code extends React.Component {
    componentDidMount = () => {
        Prism.highlightAll()
    }
    render = () => {
        return (
            <div>
                <pre>
                    <code className="language-python">
                        {this.props.children}
                    </code>
                </pre>
            </div>
        );
    }
}

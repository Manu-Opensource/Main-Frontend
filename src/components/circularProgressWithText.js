import * as React from 'react'
import { CircularProgress, Typography } from '@mui/material'

//Based off of example from https://mui.com/material-ui/react-progress/ but modified to fit OOP and tailwindcss

export default class CircularProgressWithText extends React.Component {
    render = () => {
        return (
            <div className="relative inline-flex">
                <div>
                    <CircularProgress variant="determinate" value={100} size={200} thickness={2} sx={{ color: () => "#000000"}}/>
                    <CircularProgress variant="determinate" {...this.props} size={200} thickness={2} className="absolute left-0"/>
                </div>
                <div className="inset-0 absolute flex items-center justify-center">
                    <Typography variant="h3" component="div" color="#FFFFFF"> {Math.round(this.props.value)}% </Typography> 
                </div>
            </div>
        );
    }
}

import * as React from 'react'
import { Typography, Button } from '@mui/material';


//props:
// content: [] {string title, string buttonText, function buttonAction}
export default class List extends React.Component {
    render = () => {
        if (!this.props.content) return (<div/>);
        return ( 
            <div className="flex flex-col justify-center">
                {this.props.content.map(listEntry => {
                    return (
                        <div className="mt-4 bg-[#212121] m-auto w-[15vw] flex flex-col justify-center text-center p-2 rounded">
                            <Typography variant="h5" color="#FFFFFF" sx={{ mt: 2 }} >
                                {listEntry.title}
                            </Typography>
                            <Button variant="contained" sx={{ mt: 2 }}>{listEntry.buttonText}</Button>
                        </div>
                    );
                })}
            </div>
        )
    }
}

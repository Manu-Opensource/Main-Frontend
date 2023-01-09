import * as React from 'react'
import { Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

//props:
// content: [] {string title, string buttonText, function buttonAction}
export default class List extends React.Component {
    render = () => {
        if (!this.props.content) return (<div/>);
        let i = 1;
        return ( 
            <div className="flex flex-col justify-center">
                {this.props.content.map(listEntry => {
                    if (listEntry.isHeader) {
                        return (
                            <div key={i++} className="m-auto my-0 flex flex-col text-center w-[15vw]"> 
                                <Typography variant="h4" color="#FFFFFF" >
                                    {listEntry.title}
                                </Typography>
                                <div className="bg-[#ffffff] w-[15vw] h-1 rounded" /> 
                            </div>
                        );
                    }
                    return (
                        <div key={i++} className="mt-4 bg-[#212121] m-auto w-[15vw] flex flex-col justify-center text-center p-2 rounded">
                        {/* <div className="flex flex-row justify-center content-center text-center"> */}
                        <div className={`grid ${!this.props.disableCompletion ? "grid-cols-2" : ""} w-full content-center justify-items-center items-center`}>
                                <Typography variant="h5" color="#FFFFFF" sx={{ mt: 2 }} >
                                    {listEntry.title}
                                </Typography>
                                {this.props.disableCompletion ? <div/> 
                                :
                                    (listEntry.completed ?
                                        <CheckCircleOutlineIcon color="success" fontSize="large"/>                                : 
                                        <CancelOutlinedIcon color="error" fontSize="large"/>)
                                }
                            </div>
                            <Button variant="contained" sx={{ mt: 2 }} href={listEntry.href}>{listEntry.buttonText}</Button>
                        </div>
                    );
                })}
            </div>
        )
    }
}

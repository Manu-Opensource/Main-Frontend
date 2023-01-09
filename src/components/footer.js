import * as React from 'react';
import { Typography } from '@mui/material';

export default class Footer extends React.Component {

    render = () => {
        
        return (
            <footer className="width-screen text-center p-4 bg-[#212121] bottom-0 inset-x-0 absolute">
                <Typography variant="p" color="#FFFFFF"> AP® and Advanced Placement® are registered trademarks of the College Board, which has no relation to this product. </Typography>
            </footer>
        );
    }
}

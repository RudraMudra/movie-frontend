// import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

const TextAvatar = ({ text }) => {
    const StringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    
    }
    return (
        <Avatar
            sx={{
                backgroundColor: StringToColor(text),
                width: 40,
                height: 40,
                color: 'white'
            }}
        >
            children={`${text.slice(0, 1).toUpperCase()}`}
        </Avatar>
    );
};



export default TextAvatar;
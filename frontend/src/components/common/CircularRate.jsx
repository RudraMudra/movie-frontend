import {Box, Typography, CircularProgress} from '@mui/material';

const CircularRate = ({value}) => {
    return (
        <Box display="flex" alignItems="center">
        <CircularProgress variant="determinate" size={50} value={value * 10} color='success' />
        <Typography variant="caption" component="div" fontSize="15px" fontWeight="900" sx={{marginTop: "-3px", marginLeft: "-31px"}}>
            {Math.floor(value*10) / 10}
        </Typography>
        </Box>
    );
};

export default CircularRate;
import React from 'react'
import {LinearProgress,withStyles} from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function ProgressBar(props) {
    return (
        <>
            <BorderLinearProgress
                variant='determinate'
                value={props.value} 
            />
        </>
    )
}

export default ProgressBar

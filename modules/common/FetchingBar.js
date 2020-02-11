import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    opacity: 0.5,
    animation: '$blinking 1.5s ease-in-out infinite',
    padding: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
  '@keyframes blinking': {
    '50%': {
      opacity: 0,
    },
  },
}));

function FetchingBar({ text = 'กำลังอัพเดทข้อมูลล่าสุด...' } ) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}><Typography>{text}</Typography></Paper>
  );
}

export default FetchingBar;
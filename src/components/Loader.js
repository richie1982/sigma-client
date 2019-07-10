import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export const Loader = () => {
  const classes = useStyles();
  const [ progress, setProgress ] = useState(0);

  useEffect(() => {
    const tick = () => {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <CircularProgress className={classes.progress} variant="determinate" value={progress} size={100} color={'secondary'}/>
      {/* <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={progress}
        color="secondary"
      /> */}
    </div>
  );
}

export default Loader
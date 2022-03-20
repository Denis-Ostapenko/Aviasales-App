import React from 'react';
import classes from './Loading.module.scss';

const Loading = () => (
  <div className={classes.loading}>
    <p className={classes.loading__text}>Загружаем билеты...</p>
    <div className={classes.loading__progress} />
  </div>
);

export default Loading;

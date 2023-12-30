import React from 'react';
import styles from './Button.module.scss';

const Button = ({onClick}) => {
  return (
   <button className={styles.button} onClick={onClick}>Load more</button>
  );
};

export { Button };
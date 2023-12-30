import React from 'react';
import styles from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={onSubmit} action="">
        <button className={styles.button} type="submit">&#128269;</button>
        <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          name="search"
          className={styles.input}
        />
      </form>
   </header>
  );
};

export { Searchbar };
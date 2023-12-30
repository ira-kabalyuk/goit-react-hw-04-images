import React from 'react';

import styles from './Modal.module.scss';

const Modal = ({modalData, closeModal}) => {
  return (
     <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <img className={styles.img} id={modalData.id} src={modalData.largeImageURL} alt="" />
        </div>
      </div>
  );
};

export { Modal };
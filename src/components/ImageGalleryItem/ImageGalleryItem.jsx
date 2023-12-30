import React from 'react';
import styles from './ImageGalleryItem.module.scss';


const ImageGalleryItem = ({image, isOpenModal}) => {
  return (
   <li className={styles.item}>
      <img
        className={styles.image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => isOpenModal(image.id)} />
  </li>
  );
};

export { ImageGalleryItem };
import React from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from '../ImageGalleryItem';

const ImageGallery = ({ images, isOpenModal }) => {
  return (    
   <ul className={styles.gallery}>
      {images.map((image, index) => 
        <ImageGalleryItem image={image} key={index} isOpenModal={isOpenModal} />
      )}
    </ul>
)};

export { ImageGallery };
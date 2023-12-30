import React, { useState, useEffect } from 'react';
import { requestImages } from 'services/api';

import { STATUSES } from 'utils/constants';

import { Loader } from "./Loader";
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Modal } from './Modal';
import { Error } from './Error';


const App = () => {

  const [images, setImages] = useState(null);
  const [status, setStatus] = useState(STATUSES.idle);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [total, setTotal] = useState(null);

    
  const showImages = status === STATUSES.success;
  const showError = status === STATUSES.error;
  const showLoader = status === STATUSES.pending;
  const emptyImages = showImages && images?.length === 0;
  const imageLength = images?.length;

  
  useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      }
    }, []);

  useEffect(() => {
    if (!searchTerm || !page) {
      return;
    }

    fetchImagesByQuery(searchTerm, page);
  }, [searchTerm, page]);



  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.search.value;
    setSearchTerm(searchValue);
    setPage(1);
  };

  const fetchImagesByQuery = async (searchTerm, page) => {
    try {
      setStatus(STATUSES.pending)
      const newImages = await requestImages(searchTerm, page);
      setImages((prevState) => [...(prevState || []), ...newImages.hits]);
      setTotal(newImages.total);
      setStatus(STATUSES.success); 
    } catch (error) {
      setError(error.message);
      setStatus(STATUSES.error);
    }
  }

    const handleLoadMore = () => {
      setPage((prevState) => prevState + 1);
  };

    const handleOpenModal = (id) => {  
      const selectedImage = images.find(image => image.id === id);
      setIsOpenModal(true);
      setModalData(selectedImage);
  }

    const handleCloseModal = (event) => {
      if (event.target === event.currentTarget) {
        setIsOpenModal(false);
    }
  }

    const handleKeyPress = (event) => {
      if (event.code === "Escape") {
        setIsOpenModal(false);
    }
  }
  
  return (
    <>
      <Searchbar onSubmit={handleSubmit}/>
      {showError && <Error>Oops, some error occurred... {error}</Error>}
      {emptyImages && <Error>Sorry, no images found &#129335;</Error>}
      {showImages && images && <ImageGallery images={images} isOpenModal={handleOpenModal} />}
      {imageLength < total && !showLoader && <Button onClick={handleLoadMore} />}
      {((!images && !imageLength < total) || showLoader) && <Loader />}
      {isOpenModal &&
        <Modal modalData={modalData} closeModal={handleCloseModal} />
      }
    </>
  );
};


export {App};

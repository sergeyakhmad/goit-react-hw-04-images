import React, { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import imageApi from '../../services/image-api';
import s from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

export default function ImageGallery({ search }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [largeUrl, setLargeUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (search === '') return;
    setImages([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (search === '') {
      setStatus('idle');
      return;
    }
    const requestImage = (search, page) => {
      setStatus('pending');
      imageApi
        .fetchImage(search, page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            toast.error('Sorry, your search did not match anything');
            setStatus('idle');
            return;
          }

          setImages(prev => [...prev, ...hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };

    requestImage(search, page);
  }, [page]);

  const toggleModal = e => {
    setShowModal(prev => !prev);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const onClickImg = url => {
    setLargeUrl(url);
  };

  if (status === 'idle') {
    return <h2 className={s.title}>Let's find some images</h2>;
  }

  if (status === 'rejected') {
    return <h2 className={s.title}>{error.message}</h2>;
  }

  return (
    <>
      {status === 'pending' && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeUrl} alt="" />
        </Modal>
      )}
      <ul className={s.gallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            onClick={onClickImg}
            key={id}
            src={webformatURL}
            alt={tags}
            openModal={toggleModal}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
      {images.length > 0 && <Button onClick={loadMore} />}
    </>
  );
}

import {useState, useEffect} from "react";
import { Blocks } from "react-loader-spinner";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";

import styles from "../components/App.module.css";

import { galleryApiService } from "./services/gallery-api";

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  
  useEffect(() => {
    if (query === '') {
      return;
    };
    
    setLoading(true);
    galleryApiService(query, page)
      .then(gallery => {
        if (gallery.total === 0) {
          return alert("Oops.. Not found! :(");
        };

        setTotalImages(gallery.total);
        setGallery(s => [...s, ...gallery.hits]);
      })
      .finally(() => setLoading(false));
     
  }, [query, page, setLoading, setTotalImages, setGallery]);
  
  const handleSubmitForm = (query) => {
    setQuery(query);
    setGallery([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  const handleImageClick = event => {
    if (event.target.nodeName !== "IMG") {
      return;
    };

    setShowModal(true);
    setLargeImage(event.target);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.app} >
      <Searchbar onSubmit={handleSubmitForm} />
      
      {gallery.length > 0 && <ImageGallery gallery={gallery} onClick={handleImageClick} />}
      
      {loading && <Blocks
        visible={loading}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{ display: "block", margin: "0 auto" }} />
      }
      
      {gallery.length > 0 && gallery.length < totalImages && <Button onClick={loadMore} />}
      
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImage.dataset.largeImgSrc} alt={largeImage.alt} />
        </Modal>
      )}
      
    </div>
  );
};

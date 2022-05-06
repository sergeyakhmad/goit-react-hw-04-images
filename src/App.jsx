import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');

  const handleFormSubmit = search => {
    setSearch(search);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery search={search} />
      <ToastContainer />
    </div>
  );
}

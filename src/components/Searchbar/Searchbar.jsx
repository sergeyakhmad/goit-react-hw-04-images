import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSabmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      return toast.error('Enter something in the search');
    }

    onSubmit(search);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSabmit}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.button__label}>Search</span>
        </button>
        <input
          onChange={handleChange}
          className={s.input}
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

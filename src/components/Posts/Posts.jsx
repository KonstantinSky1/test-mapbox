import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@mui/material';

import './Posts.css';

import PostCard from '../PostCard/PostCard.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import useFormWithValidation from '../Hooks/UseForm.js';
import filterPosts from '../../utils/filterPosts.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { JsonPlaceholderContext } from '../../contexts/JsonPlaceholderContext.js';

function Posts() {
  const defaultData = {
    search: ''
  };

  const [page, setPage] = useState(1);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [errMessageFind, setErrMessageFind] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const itemsPerPage = 5;

  const { values, handleChange, setValues } = useFormWithValidation(defaultData);

  const history = useHistory();

  const { posts, items, setItems } = useContext(JsonPlaceholderContext);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageQuantity(Math.ceil(items.length / itemsPerPage));
  }, [items, itemsPerPage, itemOffset]);

  useEffect(() => {
    let filtered = filterPosts(posts, valueSearch);

    if ((filtered.length === 0) && isSearch) {
      setErrMessageFind('Ничего не найдено');
    } else {
      setErrMessageFind('');
      setItems(filtered);
    }
  }, [valueSearch, isSearch]);

  function handleChangePage(num) {
    const newOffset = ((num-1) * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  }

  function handleSubmitSearch(event) {
    event.preventDefault();

    if (values.search === '' || (values.search).trim() === '') {
      setErrMessageFind('Введите ключевое слово');
      return;
    }

    setValueSearch((values.search).trim());
    setIsSearch(true);
    setPage(1);
    handleChangePage(1);
  }

  function handleResetSearch() {
    setValues(defaultData);
    setValueSearch('');
    setPage(1);
    handleChangePage(1);
    setErrMessageFind('');
  }

  function handleToMapboxButton() {
    history.push('/mapbox');
  }

  return (
    <div className="posts">
      <div className="posts__container">
        <div className="posts__content">
          <SearchForm
            values={values}
            handleChange={handleChange}
            handleSubmitSearch={handleSubmitSearch}
            handleResetSearch={handleResetSearch}
          />
          <ErrorMessage
            errorMessage={errMessageFind}
            style={{color: 'red', fontSize: '11px', position: 'relative', top: '-5px'}}
          />

          <table className="posts__list">
            <thead className="posts__list-header">
              <tr>
                <th className="posts__list-header-number number">
                  №
                </th>
                <th className="title">
                  Title
                </th>
                <th className="description">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map(post => {
                  return <PostCard
                          post={post}
                          key={post.id}
                        />
                })
              }
            </tbody>
          </table>

          {
            !!pageQuantity && (
              <Pagination
                count={pageQuantity}
                page={page}
                size="small"
                sx={{
                  marginX: 'auto',
                  marginY: 2,
                  width: 'fit-content'
                }}
                onChange={(_, num) => {
                  handleChangePage(num)
                  setPage(num)}}
              />
            )
          }
        </div>

        <button
          onClick={handleToMapboxButton}
          className="toMapboxBtn"
          type="button"
        >
          Карта
        </button>
      </div>
    </div>
  );
}

export default Posts;
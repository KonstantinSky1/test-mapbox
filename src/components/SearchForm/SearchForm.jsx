import React from "react";

import './SearchForm.css';

function SearchForm({ handleSubmitSearch, values, handleChange, handleResetSearch }) {
  return (
    <form
      onSubmit={handleSubmitSearch}
      noValidate
      name="search-form"
    >
      <div className="searchForm__search">
        <input
          value={values.search}
          onChange={handleChange}
          type="text"
          name="search"
          placeholder="Поиск..."
          className="searchForm__input"
          required
        />
        <button
          type="submit"
          className="searchForm__button"
        >
          Найти
        </button>
        <button
          onClick={handleResetSearch}
          type="button"
          className="searchForm__button searchForm__button_type_reset"
        >
          Сброс
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
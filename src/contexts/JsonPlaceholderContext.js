import React, { useState, useEffect } from 'react';

import api from '../utils/Api.js';
import changePosts from '../utils/changePosts.js';

export const JsonPlaceholderContext = React.createContext();

export const JsonPlaceholderContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getTestContent()
      .then(res => {
        if(res) {
          changePosts(res);
          setPosts(res);
          setItems(res);
        }
      })
      .catch(err => console.log(err));
  }, []);
  

  return (
    <JsonPlaceholderContext.Provider value={{ posts, items, setItems }}>
      {children}
    </JsonPlaceholderContext.Provider>
    );
}
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './Mapbox.css';
import markerPic from '../../images/icons/iconMarker.png';
import { JsonPlaceholderContext } from '../../contexts/JsonPlaceholderContext.js';

function Mapbox() {
  const history = useHistory();

  const { posts } = useContext(JsonPlaceholderContext);

  const [viewState, setViewState] = useState({
    latitude: 43.2566700,
    longitude: 76.9286100,
    zoom: 11
  });

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const handleClosePopup = (event) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    }

    window.addEventListener('keydown', handleClosePopup);

    return () => {
      window.removeEventListener('keydown', handleClosePopup);
    }
  }, []);

  return (
    <>
      <button
        className="goBackButton"
        onClick={() => history.goBack()}
        type="button"
      >
      </button>

      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {
          posts && posts.map(post => (
            <Marker
              key={post.id}
              longitude={post.longitude}
              latitude={post.latitude}
              anchor="bottom"
            >
              <button
                onClick={(e) => setSelectedPost(post)}
                type="button"
                className="markerButton"
              >
                <img
                  src={markerPic}
                  alt="Marker Icon"
                />
              </button>
            </Marker>
          ))
        }

        {
          selectedPost ? (
            <Popup
              closeOnClick={false}
              longitude={selectedPost.longitude}
              latitude={selectedPost.latitude}
              onClose={() => setSelectedPost(null)}
            >
              <div className="popup">
                <h2 className="popup__title">{selectedPost.title}</h2>
                <p className="popup__text">{selectedPost.body}</p>
              </div>
            </Popup>
          ) : null
        }
      </Map>
    </>
  );
}

export default Mapbox;
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumList extends React.Component {
  render() {
    const { albumList } = this.props;
    // const { collectionId } = albumList;

    return (
      <div id="cards-container">
        {albumList.map((album) => (
          <Link
            style={ { color: 'black', textDecoration: 'none' } }
            data-testid={ `link-to-album-${album.collectionId}` }
            key={ album.collectionId }
            to={ `/album/${album.collectionId}` }
          >
            <div id="card-container">
              <img className="card-img" alt="" src={ album.artworkUrl100 } />
              <div>
                <p className="text">{ album.artistName }</p>
                <p className="text">{ album.collectionName }</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

AlbumList.propTypes = {
  albumList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

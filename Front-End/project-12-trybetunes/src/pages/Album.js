import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: '',
      albumSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  async getSongs() {
    const { match: { params: { id } } } = this.props;

    const getMusic = await getMusics(id);

    this.setState({
      songs: getMusic[0],
      albumSongs: [...getMusic],
    });
  }

  render() {
    const { songs, albumSongs, loading } = this.state;

    if (loading) return (<Loading />);

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{songs.artistName}</p>
        <p data-testid="album-name">{songs.collectionName}</p>
        <div>
          { albumSongs.filter((songKind) => songKind.kind === 'song')
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
              />
            ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

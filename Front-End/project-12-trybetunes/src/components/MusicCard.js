import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
    this.onChecked = this.onChecked.bind(this);
  }

  componentDidMount() {
    this.checkChecked();
  }

  async onChecked() {
    const { song } = this.props;
    const { checked } = this.state;

    this.setState({ loading: true });

    if (!checked) {
      this.setState({
        loading: true,
      });
      await addSong(song);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(song);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  async checkChecked() {
    const { song: { trackId } } = this.props;

    this.setState({
      loading: true,
    });

    const storage = await getFavoriteSongs();

    const arrayOfIds = storage.map((element) => element.trackId);

    return this.setState({
      checked: arrayOfIds.includes(trackId),
      loading: false,
    });
  }

  render() {
    const { song: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;

    if (loading) return (<Loading />);

    return (
      <>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            checked={ checked }
            onChange={ this.onChecked }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

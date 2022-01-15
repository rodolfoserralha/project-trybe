import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumList from '../components/AlbumList';

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      showButton: true,
      loading: false,
      artistName: '',
      albumList: [],
      noSearch: true,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.inputSearchCheck = this.inputSearchCheck.bind(this);
    this.searchApi = this.searchApi.bind(this);
    this.printArtistName = this.printArtistName.bind(this);
  }

  handleSearchInput({ target }) {
    this.setState({
      searchInput: target.value,
    }, this.inputSearchCheck);
  }

  inputSearchCheck() {
    const { searchInput } = this.state;
    const min = 2;
    // { target.value.length > min) ? showButton : !showButton; }
    if (searchInput.length >= min) {
      this.setState({
        showButton: false,
      });
    } else {
      this.setState({
        showButton: true,
      });
    }
  }

  async searchApi() {
    const { searchInput } = this.state;

    this.setState({
      loading: true,
      artistName: searchInput,
    });

    const fetch = await searchAlbumsAPI(searchInput);

    this.setState({
      loading: false,
      searchInput: '',
      albumList: [...fetch],
      noSearch: false,
    });
  }

  printArtistName() {
    const { albumList, artistName } = this.state;

    if (albumList.length === 0) {
      return <span>Nenhum álbum foi encontrado</span>;
    }
    return (
      <div id="album-result">
        <h3>
          Resultado de álbuns de:
          {' '}
          { artistName }
        </h3>
      </div>
    );
  }

  render() {
    const { searchInput, showButton, loading, noSearch, albumList } = this.state;
    const FORM = (
      <form id="search-form">
        <label htmlFor="search-artist-input">
          <input
            className="inputs"
            data-testid="search-artist-input"
            type="text"
            value={ searchInput }
            onChange={ this.handleSearchInput }
          />
        </label>
        <button
          data-testid="search-artist-button"
          className="btns"
          type="submit"
          // value={ searchInput }
          disabled={ showButton }
          onClick={ this.searchApi }
        >
          Procurar
        </button>
      </form>
    );

    return (
      <div id="page-search" data-testid="page-search">
        <Header />
        { loading ? <Loading /> : FORM }
        { !noSearch && this.printArtistName() }
        <AlbumList albumList={ albumList } />
      </div>
    );
  }
}

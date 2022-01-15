import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    getUser()
      .then((response) => this.setState({
        user: response.name,
        loading: false,
      }));
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <h1 data-testid="header-user-name">
              Olá
              {' '}
              { user }
              , bem-vindo.
            </h1>
          )}
        <Link
          style={ { color: 'white' } }
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisar
        </Link>
        <Link
          style={ { color: 'white' } }
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favoritos
        </Link>
        <Link
          style={ { color: 'white' } }
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

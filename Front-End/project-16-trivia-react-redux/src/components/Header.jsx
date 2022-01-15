import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  componentDidMount() {
    this.playerUpdate();
  }

  componentDidUpdate() {
    this.playerUpdate();
  }

  playerUpdate() {
    const { player } = this.props;
    const state = {
      player: {
        name: player.name,
        assertions: player.assertions,
        score: player.score,
        gravatarEmail: player.gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { email, name, score } = this.props;
    const newEmail = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${newEmail}` }
          data-testid="header-profile-picture"
          alt="gravatar"
          className="header-img"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <h3>
          PONTOS:
          {' '}
          <span data-testid="header-score">
            { score }
          </span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  player: state.player,

});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);

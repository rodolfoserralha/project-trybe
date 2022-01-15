import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import './css/feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();
    this.saveRanking = this.saveRanking.bind(this);
  }

  CouldBeBetter() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          {' '}
          questões
        </p>
        <p>
          Você fez
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
          {' '}
          pontos
        </p>
      </div>
    );
  }

  NiceJob() {
    const { assertions, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">Mandou bem!</p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          {' '}
          questões
        </p>
        <p>
          Você fez
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
          {' '}
          pontos
        </p>
      </div>
    );
  }

  saveRanking() {
    const { score, name, email, history } = this.props;
    const newEmail = md5(email).toString();
    const actualPlayer = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${newEmail}`,
    };

    const ranking = localStorage.getItem('ranking') || '[]';
    const newRanking = [...JSON.parse(ranking), actualPlayer];
    const sortRanking = newRanking.sort((a, b) => (b.score - a.score));

    localStorage.setItem('ranking', JSON.stringify(sortRanking));
    history.push('/ranking');
  }

  render() {
    const { assertions, history } = this.props;
    const MIN_ASSERTIONS = 3;
    const condi = assertions < MIN_ASSERTIONS;
    return (
      <>
        <Header />
        <div className="feedback">
          <section>
            <p>
              { condi ? this.CouldBeBetter() : this.NiceJob() }
            </p>
          </section>
          <section className="playAGain">
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ () => history.push('/') }
            >
              Jogar novamente
            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.saveRanking }
            >
              Ver Ranking
            </button>

          </section>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

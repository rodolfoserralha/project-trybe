import React from 'react';
import PropTypes from 'prop-types';
import './css/ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking,
    });
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map(({ name, score, picture }, index) => (
            <div className="player-ranking" key={ index }>
              <img src={ picture } alt={ index } />
              <h2 data-testid={ `player-name-${index}` }>{name}</h2>
              <h3 data-testid={ `player-score-${index}` }>{score}</h3>
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Página inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;

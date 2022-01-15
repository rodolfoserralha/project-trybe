import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  constructor() {
    super();
    this.teste = this.teste.bind(this);
  }

  teste() {
    return (
      <button
        className="exlude-button"
        type="submit"
        // onClick={ onRemoveCard }
      >
        Excluir
      </button>
    );
  }

  render() {
    // const { cardTrunfoState } = this.state;
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="card">
        <h1 data-testid="name-card">{ cardName }</h1>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <h2 data-testid="description-card">{ cardDescription }</h2>
        <h3 data-testid="attr1-card">{ cardAttr1 }</h3>
        <h3 data-testid="attr2-card">{ cardAttr2 }</h3>
        <h3 data-testid="attr3-card">{ cardAttr3 }</h3>
        <h4 data-testid="rare-card">{ cardRare }</h4>
        { cardTrunfo ? <p id="2" data-testid="trunfo-card">Super Trunfo</p> : <p /> }
      </div>
    );
  }
}

Card.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}).isRequired;

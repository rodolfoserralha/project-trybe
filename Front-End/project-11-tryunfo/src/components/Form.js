import React from 'react';
import PropTypes from 'prop-types';
import './Forms.css';

export default class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form className="form" onSubmit={ onSaveButtonClick }>
        <h1>Adicionar nova carta</h1>

        <div className="standart-container">
          <label htmlFor="name-input">
            Nome:
            <input
              data-testid="name-input"
              type="text"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
              required
            />
          </label>
        </div>

        <div className="standart-container">
          <label htmlFor="description-input">
            Descrição:
            <textarea
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
              name="cardDescription"
              required
            />
          </label>
        </div>

        <div className="grid-container">
          <h4>Attr01</h4>
          <label htmlFor="attr1-input">
            <input
              data-testid="attr1-input"
              type="number"
              value={ cardAttr1 }
              onChange={ onInputChange }
              name="cardAttr1"
            />
          </label>
        </div>

        <div className="grid-container">
          <h4>Attr02</h4>
          <label htmlFor="attr2-input">
            <input
              data-testid="attr2-input"
              type="number"
              value={ cardAttr2 }
              onChange={ onInputChange }
              name="cardAttr2"
            />
          </label>
        </div>

        <div className="grid-container">
          <h4>Attr03</h4>
          <label htmlFor="attr3-input">
            <input
              data-testid="attr3-input"
              type="number"
              value={ cardAttr3 }
              onChange={ onInputChange }
              name="cardAttr3"
            />
          </label>
        </div>

        <p>Pontos restantes</p>

        <div className="grid-container">
          <h4>Imagem</h4>
          <label htmlFor="image-input">
            <input
              data-testid="image-input"
              type="text"
              value={ cardImage }
              onChange={ onInputChange }
              name="cardImage"
              required
            />
          </label>
        </div>

        <div className="standart-container">
          <label htmlFor="rare-input">
            Raridade:
            <select
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
              name="cardRare"
              required
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="trunfo-input">
            { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : <input
              data-testid="trunfo-input"
              type="checkbox"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />}
            Super Trybe Trunfo
          </label>
        </div>

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}).isRequired;

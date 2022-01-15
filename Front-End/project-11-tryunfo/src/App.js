import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onRemoveCard = this.onRemoveCard.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value }, this.check);
  }

  onSaveButtonClick(event) {
    event.preventDefault();

    const { cardTrunfo } = this.state;
    if (cardTrunfo) this.setState({ hasTrunfo: true });

    const object = {};

    Object.assign(object, this.state);
    console.log(object);
    delete object.savedCards;

    const { savedCards } = this.state;
    savedCards.push(object);

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  onRemoveCard({ target }) {
    const { id } = target.previousSibling.lastChild;
    const { savedCards } = this.state;
    this.setState({
      savedCards: savedCards.filter((card) => card.cardName !== target.id),
    });
    if (id) {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  check() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const array = [cardName, cardDescription, cardImage, cardRare];
    const test = (array.every((item) => item !== ''));

    const sumAtrr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const maxSumAtrr = 210;
    const maxAtrr = 90;
    const minAtrr = 0;
    const checkSum = sumAtrr <= maxSumAtrr;
    const checkMinAtrr = (Number(cardAttr1) >= minAtrr)
      && (Number(cardAttr2) >= minAtrr)
      && (Number(cardAttr3) >= minAtrr);
    const checkMaxAtrr = (Number(cardAttr1) <= maxAtrr)
      && (Number(cardAttr2) <= maxAtrr)
      && (Number(cardAttr3) <= maxAtrr);

    if (test && checkSum && checkMinAtrr && checkMaxAtrr) {
      return this.setState({
        isSaveButtonDisabled: false,
      });
    }
    this.setState({
      isSaveButtonDisabled: true,
    });
  }

  render() {
    const { savedCards } = this.state;
    return (
      <div className="container">
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <section className="card-container">
          <h1>Pré Visualização</h1>
          <Card { ...this.state } />
        </section>

        <section className="card-saved">
          {savedCards.map((card, index) => (
            <section key={ index }>
              <Card
                { ...card }
              />
              <button
                id={ card.cardName }
                data-testid="delete-button"
                className="exlude-button"
                type="submit"
                onClick={ this.onRemoveCard }
              >
                Excluir
              </button>
            </section>
          ))}
        </section>
      </div>
    );
  }
}

export default App;

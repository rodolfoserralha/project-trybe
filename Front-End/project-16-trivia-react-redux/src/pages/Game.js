import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionAction, scoreAction } from '../actions';
import './css/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingQuestions: true,
      isBackgroundColored: false,
      buttonDisable: false,
      seconds: 30,
      activeButton: false,
      questionNumber: 0,
      positions: [],
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.answers = this.answers.bind(this);
    this.checkBackground = this.checkBackground.bind(this);
    this.correctAnswerClick = this.correctAnswerClick.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  componentDidMount() {
    const fiveSeconds = 5000;
    this.setAnswersPosition();
    this.fetchQuestions();
    setTimeout(() => this.timerInterval(), fiveSeconds);
  }

  setAnswersPosition() {
    const number = 3;
    // shuffle: https://flaviocopes.com/how-to-shuffle-array-javascript/
    const shuffleNumber = 0.5;
    const positions = [0, 1, 2, number].sort(() => Math.random() - shuffleNumber);
    this.setState({ positions });
  }

  timerInterval() {
    const oneSecond = 1000;
    const timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
      const { seconds } = this.state;
      if (!seconds) {
        this.setState({
          activeButton: true,
        });
        clearInterval(timer);
        this.checkBackground();
      }
    }, oneSecond);
  }

  fetchQuestions() {
    const { token, dispatchQuestions } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => {
        res.json()
          .then((json) => {
            dispatchQuestions(json.results);
            this.setState({ loadingQuestions: false });
          });
      });
  }

  checkBackground() {
    this.setState({
      isBackgroundColored: true,
      buttonDisable: true,
      activeButton: true,
    });
  }

  correctAnswerClick() {
    const { dispatchScore } = this.props;
    this.checkBackground();
    const { seconds } = this.state;
    const { questions } = this.props;
    const initialPoint = 10;
    const difficulties = { hard: 3, medium: 2, easy: 1 };
    const points = initialPoint + (seconds * difficulties[questions[0].difficulty]);
    dispatchScore(points);
  }

  answers(questions) {
    const { isBackgroundColored, buttonDisable } = this.state;
    const incorrectButton = (n) => (
      <button
        key={ `incorrect-answer${n}` }
        type="button"
        data-testid="wrong-answer"
        onClick={ this.checkBackground }
        className={ isBackgroundColored ? 'incorrect-answer' : '' }
        disabled={ buttonDisable }
      >
        {questions.incorrect_answers[n]}
      </button>
    );

    const correctButton = (
      <button
        key="correct-answer"
        type="button"
        data-testid="correct-answer"
        onClick={ this.correctAnswerClick }
        className={ isBackgroundColored ? 'correct-answer' : '' }
        disabled={ buttonDisable }
      >
        {questions.correct_answer}
      </button>
    );
    return [
      correctButton,
      ...questions.incorrect_answers.map((_value, index) => incorrectButton(index)),
    ];
  }

  changeQuestion() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const numberFour = 4;
    if (questionNumber < numberFour) {
      this.setAnswersPosition();
      this.setState((prevState) => ({
        questionNumber: prevState.questionNumber + 1,
        isBackgroundColored: false,
        buttonDisable: false,
        seconds: 30,
      }));
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { questions } = this.props;
    const {
      loadingQuestions,
      seconds,
      activeButton,
      questionNumber,
      positions,
    } = this.state;
    const question = questions[questionNumber];
    return (
      <>
        <Header />
        <div className="game-page">
          {/* <h1>Game pages</h1> */}
          { !loadingQuestions && (
            <>
              <h1 data-testid="question-category">{question.category}</h1>
              <h2 data-testid="question-text">{question.question}</h2>
              {positions.map((n) => this.answers(question)[n])}
              <div className="active-button-div">
                {activeButton && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.changeQuestion }
                  >
                    Próxima
                  </button>
                )}
              </div>
            </>
          ) }
          <p>
            Tempo:
            {' '}
            { seconds }
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (payload) => dispatch(questionAction(payload)),
  dispatchScore: (payload) => dispatch(scoreAction(payload)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

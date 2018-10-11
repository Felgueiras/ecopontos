import React from 'react'

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { newQuizzes, setQuizzes } from "../../../../redux/actions/index";


import { withOfflineBehaviourSingleElement } from '../../../../utils/HoCs'

// mui
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import ChevronRight from '@material-ui/icons/ChevronRight'

// other components
import ButtonsSwitch from '../../components/ButtonsSwitch';
import WalletUtils from '../../../../utils/WalletUtils'

// icons
import completedIcon from '../../../../img/icones/24x24px/aprender/pontos_ganhos.svg';
import incompleteIcon from '../../../../img/icones/24x24px/aprender/pontos_por_ganhar.svg';
import topIcon from '../../../../img/ilustracoes/aprender/total_pontos_ganhos.svg';
import DateUtils from '../../../../utils/DateUtils';

const displayInline = {
  display: 'inline-block'
}

const imageStyle = {
  display: 'inline-block',
  marginLeft: '5px'
};

export const QuizOverview = class QuizOverview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      snack: false,
      snackMessage: '',
      category: 0,
    }
  }

  handleQuizSelection = () => {
    if (this.props.checkNetwork()) {
      // open quiz
      if (this.props.completed === false) {
        this.props.history.push('/dashboard/learning/quiz/' + this.props.quizIndex);

      }
      else {
        this.setState({
          snack: true,
          snackMessage: 'Já concluiu este quizz anteriormente'
        });
      }
    }
  }



  handleSnackbarClosing = () => {
    this.setState({ snack: false });
  };


  render() {


    let tokenInfo;
    const quiz = this.props.quiz;

    if (this.props.completed !== false) {
      tokenInfo = 'Acumulou ' + this.props.completed;
    }
    else {
      tokenInfo = 'Vale ' + quiz.value;
    }

    return (
      <div onClick={this.handleQuizSelection}>
        <div className="row margin-top-normal">
          <div className="col-7">
            {this.props.completed ? (
              <strong>{quiz.name}</strong>) :
              (<p className="text-highlighted">{quiz.name}</p>)
            }
            <p className="text-smaller">{quiz.age}</p>
          </div>
          <div className="col quiz-points" >
            <p style={displayInline} className="text-smaller">{tokenInfo}</p>
            <img src={this.props.completed ? completedIcon : incompleteIcon} alt=''
              style={imageStyle}
              className="icon-small" />
            <ChevronRight color="primary" className="align-middle" />
          </div>
        </div>

        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClosing}
        />
        <Divider />
      </div>
    );
  }
}

const LearningView = withRouter(QuizOverview);


class QuizzesList extends React.Component {

  constructor(props) {
    super(props);

    this.walletUtils = new WalletUtils(this.props.wallet.transactions);

    // reset new quizzes notification
    this.props.newQuizzes(0);
  }

  state = {
    category: 0
  }

  isQuizCompleted = (quiz) => {

    // check wallet transactions
    const completedQuizzes = this.walletUtils.getCompletedQuizzes();
    for (let index = 0; index < completedQuizzes.length; index++) {
      const transaction = completedQuizzes[index];
      if (transaction.data.quiz === quiz.name) {
        return transaction.value;
      }
    }
    return false;
  }

  buttonSelected = index => {
    this.setState({ category: index });
  };


  updateNewQuizzes = () => {

    let quizzesOriginal = this.props.quizzes;
    // for each one, check if available
    for (let index = 0; index < quizzesOriginal.length; index++) {
      const quiz = quizzesOriginal[index];
      if (this.quizAvailableForDate(quiz) && !this.isQuizCompleted(quiz)) {
        quiz.new = true;
      }
      else {
        quiz.new = false;
      }

    }
    this.props.setQuizzes(quizzesOriginal);
  }



  render() {
    // this.updateNewQuizzes();

    let quizzesOriginal = this.props.quizzes;
    let quizzesFinal;



    const quizCategories = ['mobilidade', 'energia'];
    quizzesFinal = quizzesOriginal.filter(quiz => DateUtils.quizAvailableForDate(quiz));
    quizzesFinal = quizzesFinal.filter(quiz => quiz.category === quizCategories[this.state.category]);

    const LearningViewOffline = withOfflineBehaviourSingleElement(LearningView);

    const quizzesList = quizzesFinal.map((quiz, index) =>
      <li key={index}><LearningViewOffline quiz={quiz}
        completed={this.isQuizCompleted(quiz)}
        quizIndex={quizzesOriginal.indexOf(quiz)}></LearningViewOffline></li>);

    const tokensEarned = this.walletUtils.getTokensEarnedInQuizzes();

    return (
      <div className="center">
        <div className="text-center">
          <img src={topIcon} alt='' className="icon-normal" />
          {tokensEarned === 0 ? (
            <p className="text-h2">
              Teste os seus conhecimentos com os quizzes e acumule pontos!
            </p>
          ) : (
              <p><span className="text-h1">{tokensEarned} pontos</span> <br />total acumulado</p>
            )}
        </div>
        <ButtonsSwitch
          buttons={quizCategories}
          buttonSelected={this.buttonSelected}
        />
        <ul>{quizzesList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes,
    wallet: state.wallet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newQuizzes: numQuizzes => dispatch(newQuizzes(numQuizzes)),
    setQuizzes: quizzes => dispatch(setQuizzes(quizzes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizzesList);
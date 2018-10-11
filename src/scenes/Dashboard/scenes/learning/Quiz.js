import React from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


// Redux
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

// other components
import CongratulationsDialog from '../../components/CongratulationsDialog';
import powerQuizLogo from '../../../../img/logo_powerquiz.png'
import Question from './components/Question';
import { StringUtils } from '../../../../utils/StringUtils';


class Quiz extends React.Component {

    constructor(props) {
        super(props);

        const quizzes = this.props.quizzes;

        const quizID = this.props.match.params.id;
        this.quiz = quizzes[quizID];

        this.powerQuiz = false;

        if (this.quiz.type === 'power-quiz')
            this.powerQuiz = true;

        this.questions = this.quiz.questions;

        this.state = {
            disabled: true,
            questionIndex: 0,
            open: false,
            message: '',
            answers: [],
            powerQuiz: this.powerQuiz,
            powerQuizAnimation: this.powerQuiz
        }
    }





    goToNextQuestion = () => {
        let _this = this;

        const lastQuestion = (this.state.questionIndex + 1) === this.questions.length;
        if (lastQuestion) {

            this.setState({ waitingResult: true });


            let elearningPlayer = window.elearningPlayer;
            elearningPlayer.answer(this.quiz.name, this.state.answers);

            // wait for wallet update
            const walletSize = this.props.wallet.transactions.length;

            var interval = setInterval(checkWallet, 1000);

            var timesRun = 0;
            function checkWallet() {
                timesRun += 1;

                let wonPoints = false;
                let main = "Ups...";

                if (_this.props.wallet.transactions.length !== walletSize) {
                    let message, value;
                    const lastTransaction =
                        _this.props.wallet.transactions[
                        _this.props.wallet.transactions.length - 1
                        ];
                    if (lastTransaction.description === "valid") {
                        value = lastTransaction.value;
                        if (value > 0) {
                            message = "Por ter concluído o quiz acumulou <b>" + value + "</b> pontos";
                            wonPoints = true;
                            main = "Parabéns!";
                        }
                        else {
                            message = "As respostas estavam incorretas e não ganhou pontos";
                        }
                    }
                    _this.setState({
                        open: true,
                        message: message,
                        waitingResult: false,
                        error: !wonPoints,
                        main: main
                    });
                    clearInterval(interval);
                }

                if (timesRun === 20) {
                    _this.setState({
                        open: true,
                        message: 'A operação falhou',
                        waitingResult: false,
                        error: true,
                        main: main
                    });
                    clearInterval(interval);
                }
            }
        }
        else {
            this.setState({
                questionIndex: this.state.questionIndex + 1,
                disabled: true
            });
        }
    }

    showQuizzesList = () => {
        // navigate to quizzes list
        this.props.history.replace('/dashboard/learning');
    }


    submitQuestionAnswer = (choice) => {
        let newAnswers = this.state.answers;
        newAnswers.push(choice);
        this.setState({ disabled: false })
    }

    closePowerQuiz = () => {
        this.setState({ powerQuiz: false });
    }

    render() {

        const { powerQuiz, powerQuizAnimation, waitingResult } = this.state;

        if (powerQuiz) {
            let _this = this;
            setTimeout(() => {
                _this.setState({ powerQuizAnimation: false })
            }, 1000);
        }

        const currentQuestion = this.questions[this.state.questionIndex];
        let buttonText = "questão seguinte";
        if (this.state.questionIndex + 1 === this.questions.length) {
            buttonText = "terminar quizz";
        }

        return (
            <div className="text-center">
                {powerQuiz ? (
                    <React.Fragment>
                        {/* <CSSTransition
                            in={powerQuizAnimation}
                            timeout={1500}
                            classNames="power-quiz"
                            mountOnEnter
                            unmountOnExit
                            onExit={() => this.exited()}
                        > */}
                        {/* <React.Fragment> */}
                        <p className="text-h2">Concebido pelo projeto </p>
                        <img className="image-info" src={powerQuizLogo} alt='' />
                        Vá a <a href="http://powerquiz.pt/">http://powerquiz.pt/</a>  e aceite o desafio da eficiência energética.
                        <Button
                            className="margin-top-normal"
                            variant="raised"
                            onClick={this.closePowerQuiz}
                            fullWidth={true}
                            color="primary"
                        >
                            Continuar
                        </Button>

                        {/* </React.Fragment> */}
                        {/* </CSSTransition> */}
                    </React.Fragment>
                ) :
                    (
                        <React.Fragment>
                            {/* question indicator */}
                            <p className="text-smaller margin-big">{this.state.questionIndex + 1} de {this.questions.length} questões</p>
                            {/* question text */}
                            <p className="text-h2-not-bold margin-big">{currentQuestion.question}</p>
                            {/* question view */}
                            <Question
                                key={currentQuestion.question}
                                submitQuestionAnswer={this.submitQuestionAnswer}
                                goToNextQuestion={this.goToNextQuestion}
                                question={currentQuestion} />
                            <div className="to-bottom margin-bottom" >
                                <Button
                                    variant="raised"
                                    onClick={this.goToNextQuestion}
                                    fullWidth={true}
                                    color="primary"
                                    disabled={this.state.disabled || waitingResult}
                                >
                                    {buttonText}
                                </Button>
                                {waitingResult && <CircularProgress size={24} style={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: -12,
                                    marginLeft: -12,
                                }} />}
                            </div>
                            <CongratulationsDialog
                                main={this.state.main}
                                message={this.state.message}
                                buttonLabel={StringUtils.quizSuccess}
                                open={this.state.open}
                                close={this.showQuizzesList}
                                error={this.state.error}
                            />
                        </React.Fragment>
                    )
                }

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

export default connect(mapStateToProps, null)(withRouter(Quiz));


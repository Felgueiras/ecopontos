import React from 'react';


// mui
import { QuestionChoice } from './QuestionChoice';
import { Dialog, DialogTitle, DialogContent, Button } from '../../../../../../node_modules/@material-ui/core';

class Question extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            answer: this.props.answer ? this.props.answer : null,
            waitingResult: false,
            error: false,
            disabled: false
        }
    }

    submitChoice = (choice) => {
        // block selecting other choice
        this.setState({ disabled: true });
        // enable next question button
        this.props.submitQuestionAnswer(choice);
    }


    showHint = () => {
        const { question } = this.props;
        const hint = question.hint;
        if (hint !== '')
            this.setState({ hint: true });
    }

    handleRequestCloseDialog = () => {
        this.setState({ hint: false });
        // go to next question
        this.props.goToNextQuestion();
    };

    render() {

        const { question } = this.props;

        let questionAnswers;
        if (question.answers) {
            questionAnswers = question.answers.map((answer, index) =>
                <li key={question.question + index} className="margin-choice">
                    <QuestionChoice
                        answer={null}
                        choice={answer}
                        index={index}
                        submitChoice={this.submitChoice}
                        showHint={this.showHint}
                        disabled={this.state.disabled}
                        correctAnswer={question.correctAnswer}>
                    </QuestionChoice>
                </li>
            );
        }

        return (
            <React.Fragment>
                <ul>{questionAnswers}</ul>
                {/* hint text */}
                <Dialog
                    fullWidth={true}
                    open={this.state.hint}
                    onClose={this.handleRequestCloseDialog}
                    className="text-center">
                    <DialogTitle>{question.answers[question.correctAnswer]}</DialogTitle>
                    <DialogContent>
                        <p>{question.hint}</p>
                        <Button
                            fullWidth={true}
                            color="primary"
                            variant="raised"
                            onClick={this.handleRequestCloseDialog}>
                            Entendido!
                        </Button>
                    </DialogContent>

                </Dialog>
            </React.Fragment>
        )
    }
}

export default Question;

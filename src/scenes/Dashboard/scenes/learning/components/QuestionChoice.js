import React from 'react';

// mui
import ChoiceRight from '@material-ui/icons/Check';
import ChoiceWrong from '@material-ui/icons/Close';
import { mainColor } from '../../../../../constants/theme';


export const QuestionChoice = class QuestionChoice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            answer: this.props.answer ? this.props.answer : null,
            waitingResult: false,
            error: false
        }
    }

    handleChoice = (index) => {
        if (this.props.disabled === false) {
            if (this.props.correctAnswer === index) {
                this.setState({ answer: 'right' });
            }
            else {
                this.setState({ answer: 'wrong' });
            }
            this.props.submitChoice(index);
            this.props.showHint();
        }
    }



    render() {

        const choice = this.props.choice;
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const letter = alphabet[this.props.index];

        this.choiceRight = this.state.answer === 'right';
        this.choiceWrong = this.state.answer === 'wrong';
        const selected = this.choiceRight || this.choiceWrong;

        if (this.props.disabled && this.props.correctAnswer === this.props.index) {
            // highlight correct answer
            this.choiceRight = true;
        }

        let bgColor;
        if (selected === false) {
            bgColor = '#eeeeee';
        }
        if (this.choiceRight === true) {
            bgColor = mainColor;
        }
        if (this.choiceWrong === true) {
            bgColor = '#ff0000';
        }
        let backgroundStyle = {
            border: '2px solid ' + bgColor,
            borderRadius: '5px'
        };

        

        return (
            <React.Fragment>
                <div className="row"
                    style={backgroundStyle}
                    onClick={() => this.handleChoice(this.props.index)}>
                    <div className="col-1 text-center"
                        style={{ background: bgColor, color: 'white', padding: '0px' }}>
                        <p className="text-small-bold">{letter.toUpperCase()}</p>
                    </div>
                    <div className="col-10 text-center" >
                        <p className="text-small">{choice}</p>
                    </div>
                    <div className="col-1 no-padding">
                        {/* right/wrong */}
                        {this.choiceRight && (
                            <ChoiceRight className="answer-right" />
                        )}
                        {this.choiceWrong && (
                            <ChoiceWrong className="answer-wrong" />
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



import React from "react";
import { connect } from "react-redux";

import CongratulationsDialog from "./CongratulationsDialog";
import happyFace from '../../../img/emoticon/happy_face.svg';
import { StringUtils } from "../../../utils/StringUtils";



const mapStateToProps = state => {
    return {
        wallet: state.wallet,
        transactions: state.wallet.transactions,
        balance: state.wallet.balance,
        authorizations: state.authorizations,
        walkthrough: state.walkthrough,
        feedbackMain: '',
        feedbackMessage: '',
        feedBackButton: '',
        openFeedback: false
    };
};

class UserActivityListener extends React.Component {

    state = {
        openFeedback: false
    }

    close = () => {
        this.setState({ openFeedback: false });
    };

    // invoked immediately after updating occurs. This method is not called for the initial render.
    componentDidUpdate(prevProps) {
        if (!prevProps.transactions) return;
        const transactions = this.props.transactions;
        if (!transactions) return;
        if (this.props.transactions.length > prevProps.transactions.length) {
            if (transactions.length > 0) {
                // last one user activity
                const lastOne = transactions[transactions.length - 1];
                if (lastOne.source === 'user-activity') {
                    // open dialog
                    let distance = lastOne.data.distance;
                    const missingDistance = 500 - distance;
                    if (distance <= 1000) {
                        distance += ' m';
                    }
                    else {
                        distance = Math.floor(distance * 10 / 1000) / 10 + ' km';
                    }
                    let activity;
                    switch (lastOne.data.activity) {
                        case ("user_walking_context"):
                            activity = ' a pé';
                            break;
                        case ("user_biking_context"):
                            activity = ' de bicicleta';
                            break;
                    }
                    let value = lastOne.value, message, image = undefined, main = "Está quase!", wonPoints = false, err;
                    let openFeedback = true;
                    if (value > 0) {
                        message = "Por ter percorrido " + distance + activity + ' ganhou <b>' + lastOne.value + '</b> pontos.';
                        wonPoints = true;
                        main = "Parabéns!";
                    }
                    else {
                        if (missingDistance <= 100 && missingDistance > 0) {
                            image = happyFace;
                            message = "Percorreu " + distance + activity + ', mais ' + missingDistance + ' m e ganha <b>5</b> pontos!';
                        }
                        else{
                            openFeedback = false;
                        }
                    }

                    this.setState({
                        openFeedback: openFeedback,
                        feedbackMessage: message,
                        feedbackMain: main,
                        feedBackButton: StringUtils.userActivityNotification,
                        error: err,
                        image: image
                    });
                }
            }
        }
    }

    render() {

        return (
            <React.Fragment>
                <CongratulationsDialog
                    close={this.close}
                    open={this.state.openFeedback}
                    main={this.state.feedbackMain}
                    message={this.state.feedbackMessage}
                    buttonLabel={this.state.feedBackButton || ''}
                    image={this.state.image}
                    error={this.state.error}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, null)(UserActivityListener);



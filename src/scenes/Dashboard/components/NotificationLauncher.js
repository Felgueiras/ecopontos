import React from "react";
import { connect } from "react-redux";
import { setNotifications } from '../../../redux/actions/index'
import { withRouter } from "react-router-dom";

import WalletUtils from "../../../utils/WalletUtils";
import { newBonus, causeBonus } from "../../../utils/BonusUtils";
import ConfirmationDialog from "./ConfirmationDialog";

import bonusIcon from '../../../img/bonus/bonus.svg'
import quizIcon from '../../../img/quiz/quiz.svg'
import { StringUtils } from "../../../utils/StringUtils";
import DateUtils from "../../../utils/DateUtils";

class NotificationLauncher extends React.Component {

    state = {
        openFeedback: false
    }

    closeDialogQuiz = quiz => (next = false) => {
        this.closeDialog();
        if (next) {
            // go to quiz screen
            const quizIndex = this.props.quizzes.indexOf(quiz)
            this.props.history.push('/dashboard/learning/quiz/' + quizIndex);
        }

    };

    closeDialogBonus = (behaviour, bonus = undefined) => (next = false) => {
        this.closeDialog();
        let numBonus = 0;
        switch (behaviour) {
            case 'single':
                {
                    numBonus = (next == true) ? 0 : 1;
                    if (next) {
                        this.props.history.push("/dashboard/map/" + bonus.spotID + "/bonus/" + bonus.id);
                    }
                }
                break;
            case 'insufficient':
                break;
            case 'multiple':
                {
                    const newBonusItems = this.props.bonus.filter(bonus => newBonus(bonus)).length;
                    numBonus = (next == true) ? 0 : newBonusItems;
                    if (next) {
                        this.props.history.push("/dashboard/bonus");
                    }
                    break;
                }

            default:
                break;
        }
        this.updateNotificationsBonus(numBonus);
    }

    closeDialogBonusAvailable = (next = false) => {
        this.closeDialog();
        if (next) {
            this.props.history.push("/dashboard/bonus");
        }

    }

    updateNotificationsBonus = (newBonuses = undefined) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let update = this.props.notifications;
        update.date = currentDate;
        update.shownBonus = true;
        if (newBonuses != 0) {
            update.newBonuses = newBonuses;
        }
        this.props.setNotifications(update)
    }

    closeDialog = () => {
        this.setState({ openFeedback: false });
    }

   

    isQuizCompleted = (quiz) => {

        // check wallet transactions
        const completedQuizzes = new WalletUtils(this.props.transactions).getCompletedQuizzes();
        for (let index = 0; index < completedQuizzes.length; index++) {
            const transaction = completedQuizzes[index];
            if (transaction.data.quiz === quiz.name) {
                return true;
            }
        }
        return false;
    }

    handleNotificationsQuizzes = () => {

        const { quizzes, notifications } = this.props;

        // get mini-quizzes
        let miniQuizzes = quizzes.filter(quiz => quiz.type === 'mini-quiz' && DateUtils.quizAvailableForDate(quiz) && !this.isQuizCompleted(quiz));

        if (miniQuizzes.length > 0) {
            const newQuiz = miniQuizzes[0];
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            let showNotification = false;

            const notificationDate = notifications.date;
            if (typeof notificationDate === 'string' || notificationDate instanceof String) {
                notifications.date = new Date(notificationDate)
            }
            if (notifications.date && notifications.date.getTime() != currentDate.getTime()) {
                let update = this.props.notifications;
                update.date = currentDate;
                update.shownQuiz = true;
                this.props.setNotifications(update);
                showNotification = true;
            } else {
                // same date - check shown
                if (notifications.shownQuiz === false) {
                    showNotification = true;
                }
            }

            if (showNotification) {
                // show pop-up
                this.state = {
                    image: quizIcon,
                    closeHandler: this.closeDialogQuiz(newQuiz),
                    openFeedback: true,
                    dialogMain: 'Novo quiz!',
                    dialogMessage: `O mini-quiz <b>${newQuiz.name}</b> está disponível. Deseja fazê-lo agora?`,
                    dialogButtonText: StringUtils.quizNew
                };

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                let update = this.props.notifications;
                update.date = currentDate;
                update.shownQuiz = true;
                this.props.setNotifications(update);
            }
        }
    }

    handleNotificationsBonus = () => {

        let { bonus, bonusCredit } = this.props;

        // bonus that became available today
        const newBonusItems = bonus.filter(bonus => newBonus(bonus));

        if (newBonusItems.length > 0) {

            if (newBonusItems.length == 1) {
                const selectedBonus = newBonusItems[0];
                // check if bonus-credit is enough
                const isCollectable = bonusCredit - selectedBonus.cost >= 0;

                let showNotification = true;
                if (showNotification) {
                    let message, buttonText, closeHandler;
                    if (isCollectable == true) {
                        message = `O bónus ${selectedBonus.name} está disponível e vale 
                        <b>${selectedBonus.cost}  pontos</b>. Deseja usufruir dele agora?`;
                        buttonText = StringUtils.bonusNew;
                        closeHandler = this.closeDialogBonus('single', selectedBonus);
                    }
                    else {
                        // missing points
                        const missing = Math.abs(bonusCredit - selectedBonus.cost);
                        message = `O bónus ${selectedBonus.name} está disponível, no entanto faltam-lhe 
                        <b>${missing}</b> pontos para poder usufruir dele.`;
                        buttonText = StringUtils.bonusNewInsufficientCredits;
                        closeHandler = this.closeDialogBonus('insufficient');
                    }
                    this.state = {
                        image: bonusIcon,
                        closeHandler: closeHandler,
                        openFeedback: true,
                        dialogMain: 'Novo bónus!',
                        dialogMessage: message,
                        dialogButtonText: buttonText
                    };
                }
            }
            else {

                let showNotification = true;
                if (showNotification) {
                    let message;
                    message = `Há <b>${newBonusItems.length}</b> novos bónus disponíveis, deseja consultá-los?`;
                    this.state = {
                        image: bonusIcon,
                        closeHandler: this.closeDialogBonus('multiple'),
                        openFeedback: true,
                        dialogMain: 'Novos bónus!',
                        dialogMessage: message,
                        dialogButtonText: StringUtils.bonusesNew
                    };
                }

            }


        }
    }

    handleNotificationCauseBonus = () => {

        let { bonus: bonuses, cause } = this.props;

        const causeBonusArray = causeBonus(bonuses, cause.id);

        if (causeBonusArray.length > 0) {

            const selectedBonus = causeBonusArray[0];

            let message, buttonText, closeHandler;
            message = `A causa que apoia segue em 1º lugar!<br></br>Como recompensa, o bónus ${selectedBonus.name} está disponível gratuitamente</b>. Deseja usufruir dele agora?`;
            buttonText = StringUtils.bonusNew;
            closeHandler = this.closeDialogBonus('single', selectedBonus);

            this.state = {
                image: bonusIcon,
                closeHandler: closeHandler,
                openFeedback: true,
                dialogMain: 'Parabéns!',
                dialogMessage: message,
                dialogButtonText: buttonText
            };
        }
    }

    handleNotificationsBonusAvailable = () => {

        const minBonusCredit = 100;

        // check token amount
        const { balance } = this.props;

        let showNotification = false;
        if (balance - minBonusCredit >= 0) {
            showNotification = true;
        }


        if (showNotification) {
            // show pop-up
            this.state = {
                closeHandler: this.closeDialogBonusAvailable,
                openFeedback: true,
                dialogMain: 'Parabéns',
                dialogMessage: `Pode usufruir de bónus a partir de agora. Deseja consultá-los?`,
                dialogButtonText: StringUtils.bonusesNew
            };

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            let update = this.props.notifications;
            update.date = currentDate;
            update.shownBonusAvailable = true;
            this.props.setNotifications(update);
        }
    }
    constructor(props) {
        super(props);

        const { notifications } = this.props;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let differentDate = new Date(notifications.date).getTime() != currentDate.getTime();
        if (notifications.shownQuiz === false || differentDate)
            this.handleNotificationsQuizzes();
        // if (notifications.shownBonus === false || differentDate)
        //     this.handleNotificationsBonus();
        // TODO: notifications cause bonus
        // this.handleNotificationCauseBonus();

    }

    render() {

        // "hide" notification launcher first time showing Dashboard
        const { showNotifications } = this.props;
        // if (notifications.shownBonusAvailable === false) {
        //     this.handleNotificationsBonusAvailable();
        // }



        return (
            <React.Fragment>
                <ConfirmationDialog
                    image={this.state.image}
                    close={this.state.closeHandler}
                    open={this.state.openFeedback && showNotifications}
                    main={this.state.dialogMain}
                    message={this.state.dialogMessage}
                    positiveAction={this.state.dialogButtonText}
                    negativeAction={'Cancelar'}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizzes: state.quizzes,
        cause: state.cause,
        showNotifications: state.showNotifications,
        transactions: state.wallet.transactions,
        balance: state.wallet.balance,
        bonusCredit: state.wallet['bonus-credit'],
        notifications: {
            shownBonus: state.shownBonus,
            shownQuiz: state.shownQuiz,
            shownBonusAvailable: state.shownBonusAvailable,
            newBonuses: state.newBonuses,
            date: state.notificationDate,
        },
        bonus: state.bonus,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setNotifications: notifications => dispatch(setNotifications(notifications))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationLauncher));
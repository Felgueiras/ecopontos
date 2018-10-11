import React from "react";
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// Redux
import { connect } from "react-redux";
import { performLogout, showNotifications } from "../../redux/actions/index";

// components
import BottomBar from './components/BottomBar';
import TopBar from './components/TopBar';
import { withRouter } from "react-router-dom";


import '../../css/index.css';
import '../../css/react-table.css';
import NavigationDrawer from "./components/NavigationDrawer";
import DashboardContent from "./components/DashboardContent";
import { AppBar, Toolbar, IconButton, Typography, Dialog, DialogContent, DialogContentText, Button, SvgIcon } from "../../../node_modules/@material-ui/core";
import UserActivityListener from "./components/UserActivityListener";
import ConfirmationDialog from "./components/ConfirmationDialog";
import NotificationLauncher from "./components/NotificationLauncher";

// icons
import { MenuIcon, BackIcon } from './components/AppBarIcons'
import { StringUtils } from "../../utils/StringUtils";

const mapStateToProps = state => {
    return {
        quizzes: state.quizzes,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        performLogout: article => dispatch(performLogout(article)),
        showNotificaions: () => dispatch(showNotifications()),
    };
};


class Dashboard extends React.Component {

    state = {
        drawer: false,
        confirmation: false,
        dialog: false,
        confirmationMain: '',
        confirmationMessage: '',
    }

    closeConfirmation = (action = false) => {
        this.setState({
            confirmation: false
        });
        if (action) {
            this.props.history.goBack();
        }
    }

    openConfirmation = () => {
        this.setState({
            confirmation: true,
            confirmationMain: 'Tem a certeza que deseja sair do quiz?',
            confirmationMessage: 'Ao sair perde o seu progresso.'
        });
    }

    goBack = () => {
        const { history } = this.props;
        if (history.location.pathname.includes('/learning/quiz/')) {
            this.openConfirmation();
        }
        else {
            this.props.history.goBack();
        }
    }

    toggleDrawer = () => {
        this.setState({ drawer: true });
    }

    logOut = () => {
        // console.log(runtime);
        this.setState({ dialog: true });
    };

    componentDidMount() {
        if (this.props.history.action === "POP") {
            // custom back button implementation
        }
    }

    handleClose = close => {

        let _this = this;
        // close dialog
        this.setState({ confirmation: false, dialog: false });

        if (close === true) {
            runtime.close(true).then(
                function (result) {
                    if (result === true) {
                        _this.props.performLogout("");
                        _this.props.history.replace("/login");
                    }
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    };




    render() {

        // show back arrow
        const pathname = this.props.history.location.pathname;
        const address = pathname.split("/")[2];
        let showBackArrow =
            pathname.split("/").length !== 3 || pathname.includes("forum") |pathname.includes("profile") || pathname.includes("accounts") || pathname.includes("map")
            || pathname.includes("help") || pathname.includes("settings") || pathname.includes("history");
        // showBackArrow = showBackArrow && !pathname.includes("map/all");

        const insideDashboard = pathname !== '/dashboard' && window.hypertiesStarted;


        var appBarTitle = "";

        switch (address) {
            case "panel":
                appBarTitle = "My Sharing Lisboa";
                break;
            case "forum":
                appBarTitle = "Fórum";
                break;
            case "profile":
                appBarTitle = "Perfil";
                break;
            case "challenge":
                appBarTitle = "Escolas";
                break;
            case "bonus":
                appBarTitle = "Bónus";
                break;
            case 1:
                appBarTitle = "Fórum";
                break;
            case "learning":
                appBarTitle = "Aprender";
                if (pathname.includes('quiz/')) {
                    const quizIndex = pathname.split("/")[4];
                    // get quizz name
                    appBarTitle = this.props.quizzes[quizIndex].name;
                }
                break;
            case 'help':
                appBarTitle = "Ajuda";
                if (pathname.includes('about'))
                    appBarTitle = "Sobre";
                if (pathname.includes('tutorial'))
                    appBarTitle = "Tutorial";
                if (pathname.includes('glossary'))
                    appBarTitle = "Glossário";
                if (pathname.includes('feedback'))
                    appBarTitle = "Fale connosco";
                if (pathname.includes('terms'))
                    appBarTitle = "Termos e Condiçõs";
                break;
            case "map":
                appBarTitle = "Mapa";
                if (pathname.includes('bonus'))
                    appBarTitle = "Bónus";
                break;
            case "accounts":
                appBarTitle = "Contas externas";
                break;
            case "settings":
                appBarTitle = "Definições";
                break;
            case "history":
                appBarTitle = "Histórico";
                break;
            case "shops":
                appBarTitle = "Lojas";
                break;
            default:
        }

        const topBarHeight = window.jQuery(".top-bar").height();
        // console.log('Height: ', topBarHeight);

        const fakeTopBarStyle = {
            // height: `${topBarHeight}px`
            height: `103px`
        }

        return (
            <React.Fragment>
                {insideDashboard &&
                    <React.Fragment>
                        {/* fake topbar */}
                        <div className="top-bar-fake" style={fakeTopBarStyle}></div>
                        <div className="top-bar">
                            {showBackArrow ? (
                                <AppBar position="static">
                                    <Toolbar>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Menu"
                                            onClick={this.goBack}
                                        >
                                            <BackIcon />
                                        </IconButton>
                                        <Typography
                                            variant="title"
                                            color="inherit" >
                                            {appBarTitle}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            ) : (
                                    <AppBar position="static">
                                        <Toolbar>
                                            <IconButton
                                                onClick={this.toggleDrawer}
                                                aria-label="Menu"
                                                className="hamburguer_icon">
                                                <MenuIcon />
                                            </IconButton>
                                            <Typography
                                                variant="title"
                                                color="inherit" >
                                                {appBarTitle}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                )}
                            <TopBar key="topbar1" />
                        </div>
                    </React.Fragment>
                }

                <DashboardContent {...this.props} />
                <ConfirmationDialog
                    main={this.state.confirmationMain}
                    message={this.state.confirmationMessage}
                    open={this.state.confirmation}
                    close={this.closeConfirmation}
                    positiveAction={StringUtils.quizLeave}
                    negativeAction={'cancelar'}
                />
                {insideDashboard &&
                    <NavigationDrawer
                        ref={this.drawer}
                        close={() => this.setState({ drawer: false })}
                        identity={this.props.identity}
                        open={this.state.drawer}
                        openDrawer={this.toggleDrawer}
                        selected={this.handleDrawerSelection}
                        logOut={this.logOut} />
                }
                {insideDashboard &&
                    <React.Fragment>
                        <UserActivityListener />
                        <NotificationLauncher />
                        <div className="bottom">
                            <BottomBar
                                openConfirmation={this.openConfirmation}
                            />
                        </div>
                        <ConfirmationDialog
                            main={'Tem a certeza que pretende sair da aplicação?'}
                            open={this.state.dialog}
                            close={this.handleClose}
                            positiveAction={StringUtils.appLeave}
                            negativeAction={'Cancelar'}
                        />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }

    componentWillUnmount() {
        this.props.showNotificaions();
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
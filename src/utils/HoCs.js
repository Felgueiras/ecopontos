import React from 'react';
import OfflineDialog from '../scenes/Dashboard/components/OfflineDialog';

import { connect } from 'react-redux';

// MUI
// import SplashScreen from '../scenes/WelcomeScreen/SplashScreen';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';


// walkthrough
import Joyride from 'react-joyride';
import { walkthroughStyle, stepsDashboard } from './walkthrough-helper'
import { SnackbarContent } from '../../node_modules/@material-ui/core';



/*
Takes 3 parameters: test, ComponentOnPass, and ComponentOnFail and returns either of the supplied components depending on the result of the test function. If the test function returns true, ComponentOnPass will be returned, if false, ComponentOnFail will be returned. Immediately returns a new component unlike other HOCs in this post.
*/

const branch = (test, ComponentOnPass, ComponentOnFail) => props => test
    ? <ComponentOnPass {...props} />
    : ComponentOnFail
        ? <ComponentOnFail {...props} />
        : null

export const hasLogger = (prefix = '') => WrappedComponent => {
    const HasLogger = props => {
        console.log(`${prefix}[Props]:`, props)
        return <WrappedComponent {...props} />
    }

    return HasLogger;
}

export const hasMethod1 = (prefix = '') => WrappedComponent => {

    function something() {
    }

    const HasLogger = props => {
        console.log(`${prefix}[Props2]:`, props)
        return <WrappedComponent {...props} something={something} />
    }

    return HasLogger;
}

export const hasMethod2 = (prefix = '') => WrappedComponent => {

    function something() {
    }

    const HasLogger = props => {
        console.log(`${prefix}[Props3]:`, props)
        return <WrappedComponent {...props} abc={something} />
    }

    return HasLogger;
}

/**
 * Takes 1 parameter: ErrorComponent which has a default value of the Error component. Can supply a custom ErrorComponent if desired rather than using the default value. It returns a wrapped component with a new expected prop: hasError. It conditionally renders the supplied component if hasError is false. Otherwise, it renders the ErrorComponent.
 */
export const hasError = (ErrorComponent = Error) => WrappedComponent => {
    const HasError = props =>
        branch(props.hasError, ErrorComponent, WrappedComponent)(props)

    return HasError
}

export function withLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return (<div className="text-center">
            <p>Loading...</p>
        </div>);
    }
}

export function withLoadingProgress(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return (
            <React.Fragment>
                {/* <SplashScreen loading determinate completed={this.state.completed} /> */}
            </React.Fragment>
        );
    }
}
export const withOfflineBehaviourSingleElement = (WrappedComponent) => {
    class WithOfflineBehaviour extends React.Component {

        state = {
            dialogOpen: false
        }

        checkNetwork = () => {
            if (this.props.network)
                return true;
            else {
                this.setState({ dialogOpen: true });
                return false;
            }
        }

        handleClose = () => {
            this.setState({ snack: false });
        };

        render() {
            const { dialogOpen } = this.state;

            return (<React.Fragment>
                <OfflineDialog
                    open={dialogOpen}
                    close={() => this.setState({ dialogOpen: false })} />
                <WrappedComponent
                    {...this.props}
                    checkNetwork={this.checkNetwork}
                />
            </React.Fragment>

            );
        }
    }

    const mapStateToProps = state => {
        return {
            network: state.network
        };
    };

    const styles = {
        root: {
            backgroundColor: 'rgb(49, 49, 49, 0.4)',
            display: 'inline',
            textAlign: 'center'
        }
    };

    const WithOfflineBehaviourConnected = connect(mapStateToProps, null)(WithOfflineBehaviour);
    return withStyles(styles)(WithOfflineBehaviourConnected);
}


export const withOfflineBehaviour = (blocking = false) => (WrappedComponent) => {
    
    
    class WithOfflineBehaviour extends React.Component {

        state = {
            dialogOpen: false
        }

        checkNetwork = () => {
            if (this.props.network)
                return true;
            else {
                this.setState({ dialogOpen: true });
                return false;
            }
        }

        handleClose = () => {
            this.setState({ snack: false });
        };

        render() {
            const { dialogOpen } = this.state;
            const { network } = this.props;
            const classes = this.props.classes;


            return (<React.Fragment>
                {!blocking && 
                    <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={network === false}
                    autoHideDuration={null}
                    onClose={this.handleClose}
                    classes={{ root: classes.snackbarRoot }}
                    >
                    <SnackbarContent
                        classes={{ root: classes.root }}
                        message={
                            <span>
                                {/* <Icon className={classNames(classes.icon, classes.iconVariant)} /> */}
                                {'Sem ligação à internet'}
                            </span>
                        }
                        ></SnackbarContent>
                </Snackbar>
                }
                <OfflineDialog
                    open={blocking ? network === false:  dialogOpen}
                    close={() => this.setState({ dialogOpen: false })}
                    blocking={blocking}
                    />
                <WrappedComponent
                    {...this.props}
                    checkNetwork={this.checkNetwork}
                />
            </React.Fragment>

            );
        }
    }

    const mapStateToProps = state => {
        return {
            network: state.network
        };
    };

    // const bottomBarHeight = window.jQuery(".bottom-bar").height();
    const styles = {
        root: {
            backgroundColor: 'rgb(51, 51, 51, 0.8)',
            display: 'inline',
            textAlign: 'center'
        },
        snackbarRoot: {
            margin: '16px !important',
            marginBottom: `${56+16}px !important`,
            // marginBottom: `${bottomBarHeight+16}px !important`,
            zIndex: 2
        },
    };

    const WithOfflineBehaviourConnected = connect(mapStateToProps, null)(WithOfflineBehaviour);
    return withStyles(styles)(WithOfflineBehaviourConnected);
}


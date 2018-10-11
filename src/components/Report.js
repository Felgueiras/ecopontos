import React, { Component } from 'react';
import { FormControl, Snackbar, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { EcoServices } from './EcoServices';
import { getEcopontoByKey } from './ecopontos';
import { withRouter } from "react-router-dom";


class Report extends Component {


    constructor(props) {
        super(props);

        const ecopontoRef = this.props.match.params.id;
        const ecoponto = getEcopontoByKey(ecopontoRef);
        this.state = {
            searchEnabled: false,
            snack: false,
            ecoponto: ecoponto
        }
    }



    handleChange = name => event => {
        // let stateAux = this.state;
        // stateAux[name] = event.target.checked;
        this.setState({ [name]: event.target.checked, searchEnabled: true });
        // this.props.handle(stateAux);
    };

    report = () => {
        // TODO: generate + send report to entity
        const { entity, ref } = this.state.ecoponto;
        this.setState({ snack: true });
        this.props.history.goBack();
    }

    render() {

        const { searchEnabled } = this.state;

        let _this = this;

        return (
            <div className="text-center">
                <FormControl className="wrapper">
                    {EcoServices.issues.map(function (issue) {
                        return (
                            <FormControlLabel
                                className="box"
                                control={
                                    <Checkbox
                                        color="primary"
                                        onChange={_this.handleChange(issue)}
                                    />
                                }
                                label={
                                    <p>{issue}</p>
                                }
                            />
                        )
                    })
                    }

                </FormControl>
                <Button
                    onClick={this.report}
                    variant="contained"
                    color="secondary"
                    disabled={!searchEnabled}
                >
                    Reportar
                </Button>
                <Snackbar
                    open={this.state.snack}
                    message={'Obrigado pelo seu feedback'}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ snack: false })}
                />
            </div>
        )
    }
}

export default withRouter(Report);
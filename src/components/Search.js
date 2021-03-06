import React, { Component } from 'react';
import { FormControl, Button, InputLabel, Input, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { EcoServices } from './EcoServices';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



class Search extends Component {

    state = this.props.filters || {};

    handleChange = name => event => {
        let stateAux = this.state;
        stateAux[name] = event.target.checked;
        this.setState({ [name]: event.target.checked, searchEnabled: true });
        this.props.handle(stateAux);
        console.log(stateAux);
    };

    filter = () => {
        // check filter terms
        console.log('filter');
    }

    checkEnabled = (service) => {
        const { filters } = this.props;
        let checked = false;

        for (var property in filters) {
            if (filters.hasOwnProperty(property)) {
                if (service.key === property && filters[property])
                    checked = true;
            }
        }
        return checked;
    }

    render() {

        const classes = this.props.classes;


        let _this = this;

        return (
            <div className="text-center">
                {/* <FormControl className="full-width">
                    <InputLabel htmlFor="agent-code">Quem recomendou (nome ou email)</InputLabel>
                    <Input id="agent-code" value={this.state.code} onChange={this.handleChange} />
                </FormControl> */}
                {/* <FormControl fullWidth>
                    <InputLabel htmlFor="age-simple">Do que está à procura?</InputLabel>
                    <Select
                        value={this.state.topic}
                        onChange={this.handleChangeTopic}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={"papelão"}>papelão</MenuItem>
                        <MenuItem value={"vidrão"}>vidrão</MenuItem>

                    </Select>
                </FormControl> */}
                <FormControl className="wrapper" style={{marginTop: '10px'}}>
                    {/* <InputLabel htmlFor="age-simple">Do que está à procura?</InputLabel> */}
                    {EcoServices.services.map(function (item, i) {
                        return (
                            <FormControlLabel
                                classes={{ root: classes.label }}
                                className="box"
                                control={
                                    <Checkbox
                                        classes={{ root: classes.root }}
                                        color="primary"
                                        checked={_this.checkEnabled(item)}
                                        onChange={_this.handleChange(item.key)}
                                    />
                                }
                                label={
                                    <p>{item.name}</p>
                                }
                            />
                        )
                    })
                    }

                </FormControl>
                {/* <Button
                    onClick={this.filter}
                    variant="contained"
                    color="secondary"
                    disabled={!searchEnabled}
                >
                    procurar
                </Button> */}
            </div>
        )
    }
}

Search.propTypes = {
    handle: PropTypes.func

}

const styles = {
    root: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
    },
    label: {
        margin: '0px !important',
        paddingBottom: '0px !important',
    }
};

export default withStyles(styles)(Search);
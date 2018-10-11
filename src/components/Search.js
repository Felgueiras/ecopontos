import React, { Component } from 'react';
import { FormControl, Button, InputLabel, Input, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { EcoServices } from './EcoServices';
import PropTypes from 'prop-types';


export default class Search extends Component {

    state = {
        topic: null,
        searchEnabled: false
    };

    handleChange = name => event => {
        let stateAux = this.state;
        stateAux[name] = event.target.checked;
        this.setState({ [name]: event.target.checked, searchEnabled: true });
        this.props.handle(stateAux);
    };

    filter = () => {
        // check filter terms
        console.log('filter');
    }

    render() {

        let _this = this;

        const { searchEnabled } = this.state;
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
                <FormControl className="wrapper">
                    {/* <InputLabel htmlFor="age-simple">Do que está à procura?</InputLabel> */}
                    {EcoServices.services.map(function (item, i) {
                        return (
                            <FormControlLabel
                                className="box"
                                control={
                                    <Checkbox
                                        color="primary"
                                        // checked={this.state.checked}
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

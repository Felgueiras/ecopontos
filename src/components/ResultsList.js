import React, { Component } from 'react';
import { FormControl, Button, Paper, Table, TableHead, TableRow, TableBody, TableCell, InputLabel, Input, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class ResultsList extends Component {

    state = {
        topic: null
    };

    handleChangeTopic = event => {
        this.setState({ topic: event.target.value });
    };


    render() {
        return (
            <React.Fragment>
                <h1>Resultados</h1>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell numeric>Calories</TableCell>
                                <TableCell numeric>Fat (g)</TableCell>
                                <TableCell numeric>Carbs (g)</TableCell>
                                <TableCell numeric>Protein (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell numeric>{row.calories}</TableCell>
                                        <TableCell numeric>{row.fat}</TableCell>
                                        <TableCell numeric>{row.carbs}</TableCell>
                                        <TableCell numeric>{row.protein}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

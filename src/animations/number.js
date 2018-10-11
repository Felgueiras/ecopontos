import React from 'react';

import { Motion, spring } from 'react-motion';

class Example extends React.Component {
    state = {
        name: '',
        showValidationMessage: false,
        showValidationButton: false,
    };

    render() {
        const {
            name,
            showValidationMessage,
            showValidationButton,
        } = this.state;
        return (
            <Motion
                defaultStyle={{ x: 0 }}
                style={{ x: spring(10) }}>
                {value => <div>{value.x}</div>}
            </Motion>
        );
    }
}


export default Example;

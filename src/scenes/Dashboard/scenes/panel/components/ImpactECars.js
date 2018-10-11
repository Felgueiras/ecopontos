import React from 'react'
import PropTypes from 'prop-types'

import eCar from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/carro.svg'

import ImpactImage from './ImpactImage';
import { AnimationContext } from './Impact';

const ImpactECars = (props) => {

    const numEcars = props.eCars;
    let list = [];
    const indexes = [0, 9, 1, 8, 2, 7, 3, 6, 4, 5];

    const animation = {
        field: 'right',
        duration: '4',
        timeout: 100
    }

    for (let index = 0; index < numEcars; index++) {
        const newIndex = indexes[index];
        const eCarStyle = {
            width: '8%',
            height: 'auto',
            bottom: 0,
            right: `${newIndex / props.max * 100}%`
        };

        const listItem =
            (
                <AnimationContext.Consumer>
                    {(animation) =>
                        <ImpactImage
                            animation={animation}
                            key={'ecar_' + index}
                            image={eCar}
                            style={eCarStyle} />
                    }
                </AnimationContext.Consumer>
            );
        list.push(listItem)
    }


    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    )
}

ImpactECars.propTypes = {
    eCars: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired

}

export default ImpactECars

import React from 'react'
import PropTypes from 'prop-types'

import car from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro.svg'
import car2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro1a.svg'
import car3 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro1b.svg'
import car4 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro2a.svg'
import car5 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro2b.svg'
import car6 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro3a.svg'
import car7 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/carro3b.svg'

import ImpactImage from './ImpactImage';
import { AnimationContext } from './Impact';

const ImpactCars = (props) => {

    const { people, bikes, cars, indexesPeople, indexesBikes } = props;

    let list = [];

    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newIndexes = [];

    for (let index = 0; index < people; index++) {
        newIndexes.push(indexesPeople[index]);
    }

    for (let index = 0; index < bikes; index++) {
        newIndexes.push(indexesBikes[index]);
    }


    const carImages = [car, car2, car3, car4, car5, car6, car7];
    for (let index = 0; index < props.max; index++) {
        const toExit = (newIndexes.includes(indexes[index]));
        const newIndex = indexes[index];
        const carStyle = {
            width: '10%',
            height: 'auto',
            bottom: 0,
            left: `${newIndex / props.max * 100}%`
        };
        const image = carImages[index % carImages.length];

        const listItem =
            (
                <AnimationContext.Consumer>
                    {(animation) =>
                        <ImpactImage
                            exit={toExit}
                            animation={animation}
                            key={'car_' + index}
                            image={image}
                            style={carStyle} />
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

ImpactCars.propTypes = {
    cars: PropTypes.number.isRequired,
    people: PropTypes.number.isRequired,
    bikes: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired

}

export default ImpactCars

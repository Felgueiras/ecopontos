import React from 'react'
import PropTypes from 'prop-types'

// people
import person from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/caminhada_1.svg'
import person2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/caminhada_2.svg'
// bikes
import bike from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/bicicleta_1.svg'
import bike2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/bicicleta_2.svg'
import bike3 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/bicicleta_3.svg'
import bike4 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/bicicleta_4.svg'
import bike5 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/bicicleta_5.svg'
import ImpactImage from './ImpactImage';
import { AnimationContext } from './Impact';

const ImpactPeopleBikes = (props) => {

    const { people: numPeople, bikes: numBikes, indexesBikes, indexesPeople } = props;
    let list = [];


    for (let index = 0; index < numPeople; index++) {
        const newIndex = indexesPeople[index];

        const personStyle = {
            width: 'auto',
            height: '11%',
            bottom: 0,
            left: `${newIndex / props.max * 100 + 3}%`
        };
        const image = (index % 2 == 0) ? person : person2;
        const listItem =
            (
                <AnimationContext.Consumer>
                    {(context) =>
                        <ImpactImage
                            animation={context}
                            key={'people_' + index}
                            image={image}
                            style={personStyle} />
                    }
                </AnimationContext.Consumer>
            );
        list.push(listItem)
    }

    let listBikes = [];

    const bikeImages = [bike, bike2, bike3, bike4, bike5];

    for (let index = 0; index < numBikes; index++) {
        const newIndex = indexesBikes[index];

        const bikeStyle = {
            width: 'auto',
            height: '11%',
            bottom: 0,
            left: `${newIndex / props.max * 100 + 3}%`
        };
        const image = bikeImages[index % bikeImages.length];


        const listItem =
            <AnimationContext.Consumer>
                {(animation) =>
                    <ImpactImage
                        animation={animation}
                        key={'bike_' + index}
                        image={image}
                        style={bikeStyle} />
                }
            </AnimationContext.Consumer>

        list.push(listItem);
    }

    return (
        <React.Fragment>
            {list}
            {listBikes}
        </React.Fragment>
    )
}

ImpactPeopleBikes.propTypes = {
    people: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
}

export default ImpactPeopleBikes

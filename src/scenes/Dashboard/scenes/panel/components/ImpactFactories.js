import React from 'react'
import PropTypes from 'prop-types'

// factories
import factory from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/fabrica_1.svg'
import factory2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/fabrica_2.svg'
import factory3 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/fabrica_3.svg'
import factory4 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_poluida/fabrica_4.svg'
import ImpactImage from './ImpactImage';
import { AnimationContext } from './Impact';

const ImpactFactories = (props) => {


    const { factories: numFactories, max } = props;
    let list = [];
    const factoryImages = [factory, factory2, factory3, factory4];
    const minLeft = 30;

    for (let index = 0; index < max; index++) {
        const toExit = index >= numFactories;
        const factoryright = index / max * 40 + minLeft;
        const factoryStyle = {
            width: '15%',
            height: 'auto',
            bottom: '11px',
            left: `${factoryright}%`
        };
        const image = factoryImages[index % factoryImages.length];

        const listItem =
            (
                <AnimationContext.Consumer>
                    {(animation) =>
                        <ImpactImage
                            key={'factory_' + index}
                            exit={toExit}
                            animation={animation}
                            image={image}
                            style={factoryStyle} />
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

ImpactFactories.propTypes = {
    factories: PropTypes.number
}

export default ImpactFactories

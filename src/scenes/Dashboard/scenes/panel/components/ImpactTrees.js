import React, { Component } from 'react'
import PropTypes from 'prop-types'

// trees
import tree from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_1.svg'
import tree2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_2.svg'
import tree3 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_3.svg'
import tree4 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_4.svg'
import tree5 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_5.svg'
import tree6 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_6.svg'
import tree7 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_7.svg'
import tree8 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_8.svg'
import tree9 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arvore_9.svg'
// bushes
import bush from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_1.svg'
import bush2 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_2.svg'
import bush3 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_3.svg'
import bush4 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_4.svg'
import bush5 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_5.svg'
import bush6 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_6.svg'
import bush7 from '../../../../../img/ilustracoes/impacto_ambiental/cidade_ecologica/arbusto_7.svg'
import ImpactImage from './ImpactImage';
import { AnimationContext } from './Impact';

const ImpactTrees = (props) => {



    const numTrees = props.trees;
    
    let list = [];

    const smallTree = '4%';
    const bigTree = '6%';

    const bushStyles = [
        {
            width: smallTree,
            height: 'auto',
            bottom: '2%',
            left: '1%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '28%',
            left: '30%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '35%',
            left: '44%'
        },
        {
            width: smallTree,
            height: 'auto',
            bottom: '16%',
            left: '62%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '2%',
            left: '68%'
        },
        {
            width: '3%',
            height: 'auto',
            bottom: '2%',
            left: '76%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '2%',
            left: '86%'
        }
    ];

    const treeStyles = [
        {
            width: smallTree,
            height: 'auto',
            bottom: '2%',
            left: '18%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '2%',
            left: '19%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '34%',
            left: '35%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '35%',
            left: '39%'
        },
        {
            width: bigTree,
            height: 'auto',
            bottom: '36%',
            left: '47%'
        },
        {
            width: smallTree,
            height: 'auto',
            bottom: '34%',
            left: '52%'
        },
        {
            width: smallTree,
            height: 'auto',
            bottom: '31%',
            left: '57%'
        },
        {
            width: smallTree,
            height: 'auto',
            bottom: '23%',
            left: '76%'
        },
        {
            width: smallTree,
            height: 'auto',
            bottom: '2%',
            left: '78%'
        }
    ];
    const indexes = [0, 4, 3, 2, 6, 8, 1, 7, 5, 9, 11, 10, 14, 12, 15, 13];
    for (let index = 0; index < numTrees; index++) {

        const newIndex = indexes[index];
        

        const images = [tree, tree2, tree3, tree4, tree5, tree6, tree7, tree8, tree9,
            bush, bush2, bush3, bush4, bush5, bush6, bush7];
        const image = images[newIndex % images.length];


        const style = (index < 9) ? treeStyles[newIndex % treeStyles.length] : bushStyles[(newIndex - 9) % bushStyles.length];


        const listItem =
            (
                <AnimationContext.Consumer>
                    {(animation) =>
                        <ImpactImage
                            key={"tree_"+index}
                            animation={animation}
                            image={image}
                            style={style} />
                    }
                </AnimationContext.Consumer>
            );
        list.push(listItem)
    }

    return (
        <div>
            {list}
        </div>
    )
}

ImpactTrees.propTypes = {
    trees: PropTypes.number.isRequired
}

export default ImpactTrees

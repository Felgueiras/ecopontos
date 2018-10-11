import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';



class ImpactImage extends Component {

    applyAnimation = (input) => {
        let field = 'opacity', duration = 2;
        let styleBeforeAnimation = JSON.parse(JSON.stringify(input));        
        let styleAfterAnimation = JSON.parse(JSON.stringify(input));

        // before
        styleBeforeAnimation[field] = '0';
        styleBeforeAnimation.transition = field + ' ' + duration + 's';

        // after
        styleAfterAnimation[field] = '1';
        styleAfterAnimation.transition = field + ' ' + duration + 's';

        return { styleBeforeAnimation, styleAfterAnimation };
    }

    constructor(props) {
        super(props);
        const { animation } = this.props;

        const { styleBeforeAnimation, styleAfterAnimation } = this.applyAnimation(props.style, props.animation);

        let style = animation ? styleBeforeAnimation : styleAfterAnimation;
        this.state = {
            style: style,
            styleAfterAnimation: styleAfterAnimation,
            exitAnimation: true
        }

    }

    componentDidMount() {
        let _this = this;
        const { styleAfterAnimation } = this.state;
        const { animation } = this.props;

        const timeout = 100;

        if (animation) {
            setTimeout(() => {
                _this.setState({
                    style: styleAfterAnimation
                })

            }, timeout);
        }
    }

    render() {
        const { image, exit, animation } = this.props;
        const { style, exitAnimation } = this.state;

        if (exit && animation) {
            let _this = this;
            setTimeout(() => {
                _this.setState({ exitAnimation: false })
            }, 500);
        }


        const handleExit = () => {

            if (animation) {
                return <CSSTransition
                    in={exitAnimation}
                    timeout={3000}
                    classNames="impact-image"
                    mountOnEnter
                    unmountOnExit
                >
                    <React.Fragment>
                        <img
                            src={image}
                            className="absolute"
                            alt="Thumbnail"
                            style={style} />
                    </React.Fragment>
                </CSSTransition>;
            }
            else {
                return <React.Fragment></React.Fragment>
            }
        }
        return (
            <React.Fragment>
                {exit ? (
                    handleExit()) : (<img
                        src={image}
                        className="absolute"
                        alt="Thumbnail"
                        style={style} />)
                }
            </React.Fragment>
        )
    }
}

ImpactImage.propTypes = {
    image: PropTypes.node.isRequired,
    style: PropTypes.object.isRequired,
    animation: PropTypes.object.isRequired,
    exit: PropTypes.bool
}

export default ImpactImage;
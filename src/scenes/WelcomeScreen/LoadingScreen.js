import React from "react";
// redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


// material UI
import { withStyles } from '@material-ui/core/styles';


// styles
import '../../animations/styles.css';

// images
import background from "../../img/background.png";
import logoColor from "../../img/loading/sharinglisboa_cor.png";
import logoGray from "../../img/loading/sharinglisboa_cinza.png";


const styles = {
  refresh: {
    display: "inline-block",
    position: "relative"
  }
};

const addBack = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);

    if (props.logged && props.login) {
      this.props.history.replace("/dashboard");
    }
  }



  render() {

    const { completed } = this.props;

    const height = 15;
    const size = 50;
    const marginTop = 50;
    const marginLeft = 25
    const translateX = (100 - size) / 2 - marginLeft;

    const imgSize = `${size}vw`;

    const divCommon = {
      marginTop: `${marginTop}%`,
      height: `${height}%`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'width 1s'
    }

    const divStyle = {
      ...divCommon,
      width: `${completed / (size / marginLeft)}%`,
      float: 'left',
      marginLeft: `${marginLeft}vw`
    }
    const reverseDivStyle = {
      ...divCommon,
      width: `${(100 - completed) / (size / marginLeft)}%`,
      float: 'right',
      marginRight: `${marginLeft}vw`
    }

    const imageStyle = {
      width: imgSize,
      position: 'absolute',
      transform: `translateX(${translateX}vw)`
    }

    const reverseImageStyle = {
      width: imgSize,
      float: 'right',
      transform: `translateX(-${translateX}vw)`
    }

    const outerDiv = {
      width: '100%',
      height: '100%',
    }



    return (
      <div className="center text-center full-height">
        <div style={outerDiv} className="pulsate-bck">
          <div style={divStyle}>
            <img src={logoColor} style={imageStyle} alt='' />
          </div>
          <div style={reverseDivStyle}>
            <img src={logoGray} style={reverseImageStyle} alt='' />
          </div>
        </div>
        {/* 
        <img src={logo} className="image-info" alt="logo" />
        <div className="center-vertical full-width">
          <CircularProgress
            variant="determinate"
            size={50}
            value={completed}
            className="margin-top-normal"
          />
          <p>A carregar... Por favor, aguarde.</p>
        </div>
         */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged,
    login: state.login,
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, null)(LoadingScreen)));

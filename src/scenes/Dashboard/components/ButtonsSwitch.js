import React from 'react'

// material ui
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';




class ButtonsSwitch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  buttonSelected = index => e => {
    this.setState({ selected: index });
    this.props.buttonSelected(index);
  };


  render() {
    const classes = this.props.classes;
    const { buttons } = this.props;

    const buttonProps = [];

    for (let index = 0; index < buttons.length; index++) {
      var btnProps = {};
      if (this.state.selected === index) {
        btnProps.color = "primary";
      }
      buttonProps.push(btnProps)
    }

    const buttonClasses = { label: classes.label, root: classes.root, containedPrimary: classes.containedPrimary };


    return (
      <React.Fragment>
        <ul>
          <div className="row buttons-switch">
            {buttons.map((button, index) =>
              (
                <div className="col col-full-width"
                  key={"button_switch_" + index}
                >
                  <Button
                    classes={buttonClasses}
                    variant="raised"
                    fullWidth={true}
                    onClick={this.buttonSelected(index)}
                    {...buttonProps[index]}
                  >
                    {buttons[index].replace(/^\w/, c => c.toUpperCase())}
                  </Button>
                </div>
              ))}
          </div>
        </ul>
      </React.Fragment>
    );
  }
}

const styles = {
  label: {
    textTransform: 'initial'
  },
  root: {
    "-webkit-box-shadow": 'none',
    "-moz-box-shadow": 'none',
    boxShadow: 'none',
    'border-radius': '0px',
    backgroundColor: 'white'
  },
  containedPrimary: {
    backgroundColor: '#32b1a4 !important'
  }
};

export default withStyles(styles)(ButtonsSwitch);

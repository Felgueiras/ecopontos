import React from "react";
import { withRouter } from "react-router-dom";

// MUI
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

// icons
import feedback from "../../../../img/icones/48x48px/ajuda/fale_connosco.svg";
import glossary from "../../../../img/icones/48x48px/ajuda/glossario.svg";
import terms from "../../../../img/icones/48x48px/ajuda/termos.svg";
import tutorial from "../../../../img/icones/48x48px/ajuda/tutorial.svg";
import about from "../../../../img/icones/48x48px/ajuda/acerca.svg";
// TODO: icon
import manual from "../../../../img/icones/48x48px/ajuda/acerca.svg";

const HelpElement = props => {
  return (
    <React.Fragment>
      <div
        className="text-center margin-big-both"
        onClick={props.handleSelection(props.index)}
      >
        <img src={props.image} alt={props.label} className="image-normal" />
        <strong>{props.label}</strong>
      </div>
    </React.Fragment>
  );
};

const helpScreens = [
  {
    link: "about",
    name: "Sobre",
    icon: about
  },
  {
    link: "Tutorial",
    name: "Sobre",
    icon: tutorial
  },
  {
    link: "glossary",
    name: "Glossário",
    icon: glossary
  },
  {
    link: "feedback",
    name: "Fale connosco",
    icon: feedback
  },
  {
    link: "terms",
    name: "Termos e condições",
    icon: terms
  },
  {
    link: "manual",
    name: "Manual",
    icon: manual
  }
];
const styles = theme => ({
  dividerStyle: {
    width: "90%",
    margin: "auto"
  }
});

class Help extends React.Component {
  handleSelection = index => e => {
    this.props.history.push("/dashboard/help/" + helpScreens[index].link);
  };

  render() {
    const { classes } = this.props;

    const items = helpScreens.map((topic, index) => (
      <HelpElement
        label={topic.name}
        index={index}
        image={topic.icon}
        handleSelection={this.handleSelection}
      />
    ));

    return (
      <div className="margin-top-normal">
        <div className="row">
          <div className="col">{items[0]}</div>
          <div className="col vertical-line">{items[1]}</div>
        </div>
        <Divider classes={{ root: classes.dividerStyle }} />
        <div className="row">
          <div className="col">{items[2]}</div>
          <div className="col vertical-line">{items[3]}</div>
        </div>
        <Divider classes={{ root: classes.dividerStyle }} />
        <div className="row">
          <div className="col">{items[4]}</div>
          <div className="col vertical-line">{items[5]}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Help));

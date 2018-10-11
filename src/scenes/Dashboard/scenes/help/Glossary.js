import React from 'react';

// MUI
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';


import { glossaryTerms as glossary } from './glossary-contents.js';
import { mainColor } from '../../../../constants/theme.js';

class Glossary extends React.Component {

  state = {
    expanded: null
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  displayLinks = (links) => {
    const listItems = links.map((link, index) => <li key={"link_" + index}>
      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
    </li>);
    return <ul>{listItems}</ul>
  }


  render() {
    const { expanded } = this.state;
    const classes = this.props.classes;


    glossary.sort(function (a, b) {
      if (a.term < b.term) return -1;
      if (a.term > b.term) return 1;
      return 0;
    })

    const glossaryTerms = glossary.map((term, index) => (
      <div 
        key={"glossary_term_" + index}
      >
        <ExpansionPanel
          expanded={expanded === 'panel' + index}
          onChange={this.handleChange('panel' + index)}
        >
          <ExpansionPanelSummary
            classes={{
              expanded: classes.expanded, content: classes.content,
              expandIcon: classes.expandIcon
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <p>{term.term}</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{ root: classes.root}}
          >
            {term.definition.split('\n').map((item, i) => <p key={i}>{item}</p>)}
            {term.links && this.displayLinks(term.links)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div >
    ));


    return (
      <React.Fragment>
        <div >{glossaryTerms}</div>
      </React.Fragment >
    );
  }
}

const styles = {
  expanded: {
    fontWeight: 'bold'
  },
  content: {
    paddingLeft: 5
  }, expandIcon: {
    color: mainColor
  },
  root: {
    marginLeft: 10,
    marginRight: 40,
    display: 'block',
    padding: 0

  }
};
export default withStyles(styles)(Glossary);

/**
 *
 * Expansion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ExpandMore, Help } from '@material-ui/icons';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  withStyles,
  Typography,
  Divider,
  Popover,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: '5px 15px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  actions: {
    padding: '8px 8px',
    justifyContent: 'normal',
  },
  overrides: {
    MuiExpansionPanelSummary: {
      root: {
        marginRight: '25px',
      },
    },
  },
  paper: {
    padding: theme.spacing.unit,
    marginBottom: '25px',
    width: '250px',
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

export class Expansion extends React.Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, children, name, subheading, style, help } = this.props;
    const { anchorEl } = this.state;
    const open = !!anchorEl;

    return (
      <ExpansionPanel
        className={classes.root}
        defaultExpanded={this.props.defaultExpanded}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography className={classes.heading} style={style}>
            {name}
          </Typography>
          {subheading && (
            <Typography className={classes.secondaryHeading}>
              {subheading}
            </Typography>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children[0]}</ExpansionPanelDetails>

        <Divider />
        <ExpansionPanelActions className={classes.actions}>
          <div style={{ flexGrow: '1' }}>
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              disableRestoreFocus
            >
              <Typography>{help}</Typography>
            </Popover>
            <Help
              onMouseOver={this.handlePopoverOpen}
              onMouseOut={this.handlePopoverClose}
              onFocus={this.handlePopoverOpen}
              onBlur={this.handlePopoverClose}
              style={{ cursor: 'help' }}
            />
          </div>
          {children[1]}
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Expansion.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  help: PropTypes.string,
  defaultExpanded: PropTypes.bool,
};

export default withStyles(styles)(Expansion);

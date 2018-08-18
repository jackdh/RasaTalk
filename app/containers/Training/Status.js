/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import { selectStatus } from './../RightSidebar/selectors';

const grow = keyframes`
  to {
    width: 1.25em;
  }
`;

const Loading = styled(Typography)`
  :after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${grow} steps(4, end) 900ms infinite;
    content: '\\2026'; /* ascii code for the ellipsis character */
    width: 6px;
  }
`;

const StyleListItem = styled(ExpansionPanelDetails)`
  && {
    height: 250px;
    overflow-x: auto;
  }
`;

export class Status extends React.PureComponent {
  render() {
    const {
      status: { available_projects },
    } = this.props;

    if (!available_projects) {
      return <div>Rasa not found</div>;
    }

    return (
      <React.Fragment>
        {Object.keys(available_projects).map((project, index) => (
          <ExpansionPanel key={`Status-${index}`}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {!(available_projects[project].status === 'training') && (
                <Typography variant="title">{project}</Typography>
              )}
              {available_projects[project].status === 'training' && (
                <Loading variant="title">Training: {project}</Loading>
              )}
            </ExpansionPanelSummary>
            <StyleListItem>
              <List style={{ width: '100%' }}>
                {available_projects[project].available_models.map(
                  (model, mIndex) => (
                    <React.Fragment key={`Status-${mIndex}`}>
                      <ListItem>
                        <ListItemText primary={model} />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ),
                )}
              </List>
            </StyleListItem>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    );
  }
}

Status.defaultProps = {
  status: {
    available_projects: {
      default: {
        status: 'ready',
        available_models: ['fallback'],
      },
    },
  },
};

Status.propTypes = {
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: selectStatus(),
});

export default connect(mapStateToProps)(Status);

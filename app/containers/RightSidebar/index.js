/* eslint-disable camelcase */
/**
 *
 * RightSidebar
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import {
  Paper,
  Tab,
  Tabs,
  TextField,
  MenuItem,
  Card,
  CardHeader,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Chatbot from 'containers/Chatbot/Loadable';
import Drawer from 'components/RightSidebarDrawer';
import SwipeableViews from 'react-swipeable-views';
import RightSidebarContent from 'components/RightSidebarContent';
import isEmpty from 'lodash/isEmpty';
import { selectRasaUp } from '../DashboardPage/selectors';

import saga from './saga';
import Rasa from './rasa';
import reducer from './reducer';
import { selectInfo, selectStatus } from './selectors';
import { getStatus, updateModel, updateAgent, removeAgent } from './actions';

const StyledDiv = styled.div`
  width: ${props => (props.width ? props.width : '240')}px;
`;

export class RightSidebar extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.dispatch(getStatus());
  }

  componentDidUpdate(prevProps) {
    const {
      values: { project, model },
      status: { available_projects },
      dispatch,
    } = this.props;
    if (!isEmpty(available_projects)) {
      if (
        available_projects[project] &&
        (project !== prevProps.values.project || !model)
      ) {
        dispatch(updateModel(this.getModels(available_projects, project)[0]));
      } else if (!project) {
        const first = Object.keys(available_projects)[0];
        dispatch(updateAgent(first));
        dispatch(updateModel(this.getModels(available_projects, first)[0]));
      }
    }
  }

  getModels(projects, project) {
    if (projects[project]) {
      return projects[project].available_models
        .filter(x => x !== 'fallback')
        .slice()
        .sort()
        .reverse();
    }
    this.props.dispatch(removeAgent());
    return [];
  }

  changeTab = (event, value) => this.setState({ value });

  changeTabIndex = index => this.setState({ value: index });

  render() {
    const {
      open,
      width,
      dispatch,
      status: { available_projects },
      values: { project, model },
      rasaIsUp,
    } = this.props;
    const { value } = this.state;
    if (!(available_projects && project)) {
      return (
        <Drawer open={open} style={{ zIndex: '10' }}>
          <StyledDiv width={width}>
            <Card>
              <CardHeader
                title={
                  rasaIsUp ? 'Please create an Agent' : "Can't connect to rasa."
                }
              />
            </Card>
          </StyledDiv>
        </Drawer>
      );
    }

    return (
      <Drawer open={open} style={{ zIndex: '10' }}>
        <StyledDiv width={width}>
          <Paper>
            <Tabs
              name="tabs"
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.changeTab}
              fullWidth
            >
              <Tab label="Rasa" />
              <Tab label="Chatbot" />
            </Tabs>
          </Paper>
          <RightSidebarContent>
            <TextField
              id="select-agent"
              select
              label="Agent"
              value={project}
              onChange={e => dispatch(updateAgent(e.target.value))}
              fullWidth
            >
              {available_projects &&
                Object.keys(available_projects).map(p => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
            </TextField>

            <TextField
              id="select-model"
              select
              label="Model"
              value={model}
              onChange={e => dispatch(updateModel(e.target.value))}
              margin="normal"
              fullWidth
            >
              {available_projects &&
                this.getModels(available_projects, project).map(m => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
            </TextField>

            <SwipeableViews index={value} onChangeIndex={this.changeTabIndex}>
              <Rasa />
              <Chatbot />
            </SwipeableViews>
          </RightSidebarContent>
        </StyledDiv>
      </Drawer>
    );
  }
}

RightSidebar.defaultProps = {
  width: 240,
};

RightSidebar.propTypes = {
  width: PropTypes.number,
  open: PropTypes.bool.isRequired,
  rasaIsUp: PropTypes.bool,
  dispatch: PropTypes.func,
  status: PropTypes.object,
  values: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: selectStatus(),
  values: selectInfo(),
  rasaIsUp: selectRasaUp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'rightSidebar', reducer });
const withSaga = injectSaga({ key: 'rightSidebar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RightSidebar);

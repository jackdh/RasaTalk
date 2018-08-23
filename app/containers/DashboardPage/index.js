/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid } from '@material-ui/core';
import {
  DateRange,
  InsertChart,
  People,
  QuestionAnswer,
  SupervisorAccount,
  Timeline,
} from '@material-ui/icons/';

import reducer from './reducer';
import saga from './saga';
import { changeTitle } from '../HomePage/actions';
import { getDashboard } from './actions';
import { selectStats } from './selectors';
import StatsCard from '../../components/Cards/StatsCard';
import ItemGrid from '../../components/Grid/ItemGrid';

export class DashboardPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle('Dashboard');
    this.props.dispatch(getDashboard());
  }

  render() {
    const { stats } = this.props;
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>

        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Timeline}
              iconColor="green"
              title="Rasa Stats"
              description={stats.online ? 'Up' : 'Down'}
              small={stats.online ? '✓' : 'x'}
              statIcon={DateRange}
              statText={stats.projects && `${stats.projects} - Projects`}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={People}
              iconColor="orange"
              title="Users"
              description={stats.users ? stats.users : 'Down'}
              statIcon={SupervisorAccount}
              statText="Last user: "
            />
          </ItemGrid>

          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={QuestionAnswer}
              iconColor="red"
              title="Chats"
              description={
                stats.messageHistorys ? stats.messageHistorys : 'Down'
              }
              small="#"
              statIcon={SupervisorAccount}
              statText={`Sessions: ${stats.sessions}`}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InsertChart}
              iconColor="blue"
              title="Agents"
              description={stats.agents ? stats.agents : 'Down'}
              small="#"
              statIcon={SupervisorAccount}
              statText={`${stats.expressions} expressions`}
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  stats: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  stats: selectStats(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);

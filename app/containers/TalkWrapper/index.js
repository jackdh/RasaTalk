/**
 *
 * TalkWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ProfileCard from 'components/Cards/ProfileCard';
import { Button, Grid } from '@material-ui/core';
import Wrapper from 'components/Grid/Wrapper';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import Talk from 'containers/Talk/Loadable';
import SingleTalkFlow from 'containers/SingleTalkFlow/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTalkWrapper from './selectors';
import reducer from './reducer';
import saga from './saga';
import { addTalkWrappers } from './actions';
import { changeTitle, getTalkWrappers } from '../HomePage/actions';
import AddTalkWrapper from './AddTalkWrapper';
import {
  selectTalkWrappers,
  selectAddingTalkWrappers,
} from '../../containers/HomePage/selectors';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

/* eslint-disable react/prefer-stateless-function */
export class TalkWrapper extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(changeTitle('Groups of Talks'));
    this.props.dispatch(getTalkWrappers());
  }

  render() {
    const { dispatch, match, groups, adding } = this.props;
    return (
      <div>
        <Helmet>
          <title>Talk Wrapper</title>
          <meta name="description" content="List of Talk Groups" />
        </Helmet>

        <Route path={`${match.path}/:groupid`} exact component={Talk} />
        <Route
          path={`${match.path}/:groupid/:nodeuid`}
          exact
          component={SingleTalkFlow}
        />
        <Route
          path={match.path}
          exact
          name="Talk Flow"
          render={() => (
            <Wrapper>
              <Grid item xs={8}>
                <Grid container spacing={40}>
                  {groups &&
                    groups.map(group => (
                      <Grid item xs={12} sm={12} md={4} key={group._id}>
                        <ProfileCard
                          subtitle={group.subtitle}
                          agent={group.name}
                          description={group.description}
                          avatar={group.avatar}
                          footer={
                            <StyledLink to={`/talkGroups/${group._id}`}>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ marginBottom: '15px' }}
                              >
                                View
                              </Button>
                            </StyledLink>
                          }
                          classes={this.props.classes}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <ProfileCard
                  avatar="none"
                  subtitle=""
                  agent="Talk Groups"
                  description="Groups of the different outputs of your chatbots."
                />

                <AddTalkWrapper
                  saving={adding}
                  handleSubmit={(w, r) => dispatch(addTalkWrappers(w, r))}
                />
              </Grid>
            </Wrapper>
          )}
        />
      </div>
    );
  }
}

TalkWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
  match: PropTypes.object,
  groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  adding: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  TalkWrapper: makeSelectTalkWrapper(),
  groups: selectTalkWrappers(),
  adding: selectAddingTalkWrappers(),
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

const withReducer = injectReducer({ key: 'talkWrapper', reducer });
const withSaga = injectSaga({ key: 'talkWrapper', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TalkWrapper);

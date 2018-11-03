/**
 *
 * NodeWrapper
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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNodeWrapper from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getNodeWrappers, addNodeWrappers } from './actions';
import { changeTitle } from '../HomePage/actions';
import AddNodeWrapper from './AddNodeWrapper';

/* eslint-disable react/prefer-stateless-function */
export class NodeWrapper extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(changeTitle('Groups of Talks'));
    this.props.dispatch(getNodeWrappers());
  }

  render() {
    const {
      dispatch,
      nodewrapper: { adding, groups },
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>NodeWrapper</title>
          <meta name="description" content="List of Talk Groups" />
        </Helmet>
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
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginBottom: '15px' }}
                        >
                          View
                        </Button>
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

            <AddNodeWrapper
              saving={adding}
              handleSubmit={(w, r) => dispatch(addNodeWrappers(w, r))}
            />
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

NodeWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
  nodewrapper: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  nodewrapper: makeSelectNodeWrapper(),
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

const withReducer = injectReducer({ key: 'nodeWrapper', reducer });
const withSaga = injectSaga({ key: 'nodeWrapper', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodeWrapper);

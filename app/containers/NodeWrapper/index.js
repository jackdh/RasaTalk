/**
 *
 * NodeWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNodeWrapper from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class NodeWrapper extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>NodeWrapper</title>
          <meta name="description" content="Description of NodeWrapper" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

NodeWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

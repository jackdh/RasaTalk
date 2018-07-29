/**
 *
 * ThirdParty
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
import makeSelectThirdParty from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ThirdParty extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>ThirdParty</title>
          <meta name="description" content="Description of ThirdParty" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ThirdParty.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  thirdparty: makeSelectThirdParty(),
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

const withReducer = injectReducer({ key: 'thirdParty', reducer });
const withSaga = injectSaga({ key: 'thirdParty', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ThirdParty);

/**
 *
 * History
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
import makeSelectHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeTitle } from '../HomePage/actions';

export class History extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle('History');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>History</title>
          <meta name="description" content="Description of History" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

History.propTypes = {
  changeTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: makeSelectHistory(),
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

const withReducer = injectReducer({ key: 'history', reducer });
const withSaga = injectSaga({ key: 'history', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(History);

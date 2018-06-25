/**
 *
 * Feedback
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
import makeSelectFeedback from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeTitle } from '../HomePage/actions';

export class Feedback extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle('Feedback');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Feedback</title>
          <meta name="description" content="Description of Feedback" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Feedback.propTypes = {
  changeTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  feedback: makeSelectFeedback(),
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

const withReducer = injectReducer({ key: 'feedback', reducer });
const withSaga = injectSaga({ key: 'feedback', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Feedback);

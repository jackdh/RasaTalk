/**
 *
 * SmallTalk
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
import makeSelectSmallTalk from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changeTitle } from '../HomePage/actions';

export class SmallTalk extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle('Small Talk');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>SmallTalk</title>
          <meta name="description" content="Description of SmallTalk" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SmallTalk.propTypes = {
  changeTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  smalltalk: makeSelectSmallTalk(),
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

const withReducer = injectReducer({ key: 'smallTalk', reducer });
const withSaga = injectSaga({ key: 'smallTalk', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmallTalk);

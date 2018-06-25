/**
 *
 * Chatbot
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Bubbles from 'components/Bubbles';
import injectSaga from 'utils/injectSaga';
import { Refresh } from '@material-ui/icons';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { selectInfo } from 'containers/RightSidebar/selectors';
import { Grid, TextField, Collapse, Button } from '@material-ui/core/';

import saga from './saga';
import reducer from './reducer';
import { updateInput, sendInput, clearInput } from './actions';
import makeSelectChatbot from './selectors';

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  button {
    max-width: 25px;
    height: 41px;
    align-self: flex-end;
    margin-bottom: 6px;
  }
`;

export class Chatbot extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.dispatch(sendInput());
    }
  };

  render() {
    const {
      chatbot: { input, messages },
      values: { model },
      dispatch,
    } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Collapse in={!!model}>
            <InputWrap>
              <TextField
                id="name"
                label="Chatbot Query"
                value={input}
                inputProps={{
                  autoComplete: 'off',
                }}
                margin="normal"
                onKeyPress={this.handleKeyPress}
                onChange={e => dispatch(updateInput(e.target.value))}
                style={{ flexGrow: '1', marginRight: '10px' }}
              />

              <Button
                size="small"
                variant="outlined"
                onClick={() => dispatch(clearInput())}
              >
                <Refresh />
              </Button>
            </InputWrap>
          </Collapse>

          <div>
            {messages.map((group, index) => (
              <Bubbles
                dispatch={dispatch}
                key={`bubble-${index}`}
                group={group}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    );
  }
}

Chatbot.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chatbot: PropTypes.object,
  values: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  chatbot: makeSelectChatbot(),
  values: selectInfo(),
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

const withReducer = injectReducer({ key: 'chatbot', reducer });
const withSaga = injectSaga({ key: 'chatbot', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chatbot);

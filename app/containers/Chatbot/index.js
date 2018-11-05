/**
 *
 * Chatbot
 *
 */
/* eslint-disable react/no-array-index-key */
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
import {
  Grid,
  TextField,
  Collapse,
  Button,
  MenuItem,
} from '@material-ui/core/';

import { selectTalkWrappers } from 'containers/HomePage/selectors';
import { getTalkWrappers } from 'containers/HomePage/actions';
import findIndex from 'lodash/findIndex';
import saga from './saga';
import reducer from './reducer';
import { updateInput, sendInput, clearInput, setTalkWrapper } from './actions';
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

  componentDidMount() {
    this.props.dispatch(getTalkWrappers());
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.chatbot.talkWrapper && this.props.talkWrappers) {
      this.props.dispatch(setTalkWrapper(this.props.talkWrappers[0]));
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.dispatch(sendInput());
    }
  };

  render() {
    const {
      chatbot: { input, messages, talkWrapper },
      values: { model },
      talkWrappers,
      dispatch,
    } = this.props;
    const talkWrapperStrings = talkWrappers.map(t => t.name);
    const tIndex = findIndex(talkWrappers, { _id: talkWrapper._id });
    return (
      <Grid container>
        <Grid item xs={12}>
          <Collapse in={!!model}>
            {talkWrapper && (
              <TextField
                id="select-agent"
                select
                label="Agent"
                value={tIndex}
                onChange={e =>
                  dispatch(setTalkWrapper(talkWrappers[e.target.value]))
                }
                fullWidth
              >
                {talkWrapperStrings.map((p, index) => (
                  <MenuItem key={p} value={index}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            )}
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
  talkWrappers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  chatbot: makeSelectChatbot(),
  talkWrappers: selectTalkWrappers(),
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

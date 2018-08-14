/* eslint-disable react/no-array-index-key */
/**
 *
 * Bubbles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paper, Typography, Button } from '@material-ui/core';

import { updateInput, sendInput } from '../../containers/Chatbot/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  padding: 2px;
`;

const Bubble = styled(Paper)`
  width: 80%;
  padding: 10px;
  margin-bottom: 1px;
  align-self: ${props => (props.type === 'human' ? 'flex-end' : 'flex-start')};
`;

const StyledButton = styled(Button)`
  display: block;
  width: 80%;

  margin-top: 10px;
`;

function Bubbles(props) {
  const { group, dispatch } = props;

  const clickButton = text => {
    dispatch(updateInput(text));
    dispatch(sendInput());
  };

  return (
    <Wrapper>
      {group.map((message, i) => (
        <React.Fragment key={`${message.text}-${i}`}>
          <Bubble type={message.type} elevation={4}>
            <Typography>{message.text}</Typography>
          </Bubble>
          {message.quick_replies &&
            message.quick_replies.map((button, index) => (
              <StyledButton
                key={`${button.title}-${index}`}
                size="small"
                variant="outlined"
                onClick={() => clickButton(button.title)}
              >
                {button.title}
              </StyledButton>
            ))}
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

Bubbles.propTypes = {
  group: PropTypes.array,
  dispatch: PropTypes.func,
};

export default Bubbles;

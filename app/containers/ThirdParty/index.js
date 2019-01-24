/**
 *
 * ThirdParty
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  CardActions,
  Button,
  Typography,
  TextField,
  Switch,
  CircularProgress,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';

import { selectFacebook, selectTelegram } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { saveFacebook, updateForm, getAll, saveTelegram } from './actions';

import { getAgents, changeTitle, getTalkWrappers } from '../HomePage/actions';
import { selectAgents, selectTalkWrappers } from '../HomePage/selectors';

const TPCard = styled(Card)`
  && {
    width: 300px;
    display: inline-block;
    margin-right: 15px;
  }
`;

const StyledHeader = styled(CardMedia)`
  && {
    height: 0;
    padding-top: 56.25%;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
`;

/* eslint-disable react/prefer-stateless-function */
export class ThirdParty extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(getTalkWrappers());
    this.props.dispatch(getAgents());
    this.props.dispatch(getAll());
    this.props.changeTitle('Third Party Setup');
  }

  render() {
    const { facebook, handleUpdateForm, talkWrappers, telegram } = this.props;
    return (
      <div>
        <Helmet>
          <title>ThirdParty</title>
          <meta name="description" content="Description of ThirdParty" />
        </Helmet>
        <div style={{ display: 'flex' }}>
          <TPCard>
            <StyledHeader
              image="https://i.imgur.com/KWX47zR.png"
              title="Facebook Logo"
            />
            <CardContent>
              <FormWrapper>
                <Typography style={{ flexGrow: 1 }}>Enabled</Typography>
                <Switch
                  checked={facebook.enabled}
                  onChange={handleUpdateForm}
                  name="facebook.enabled"
                />
              </FormWrapper>
              <TextField
                id="verify"
                name="facebook.verify_token"
                label="Verify Token"
                margin="normal"
                fullWidth
                value={facebook.verify_token}
                onChange={handleUpdateForm}
              />
              <TextField
                id="Access"
                name="facebook.access_token"
                label="Access Token"
                margin="normal"
                fullWidth
                value={facebook.access_token}
                onChange={handleUpdateForm}
              />
              <TextField
                select
                name="facebook.agent"
                helperText="Please select an agent"
                fullWidth
                margin="normal"
                value={facebook.agent}
                onChange={handleUpdateForm}
              >
                {this.props.agents.map(agent => (
                  <MenuItem key={agent._id} value={agent._id}>
                    {agent.agent}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="facebook.talkWrapper"
                helperText="Please select an wrapper"
                fullWidth
                margin="normal"
                value={facebook.talkWrapper}
                onChange={handleUpdateForm}
              >
                {talkWrappers.map(talkWrapper => (
                  <MenuItem key={talkWrapper._id} value={talkWrapper._id}>
                    {talkWrapper.name}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              {facebook.touched && (
                <div style={{ position: 'relative' }}>
                  <Button
                    onClick={() => this.props.dispatch(saveFacebook())}
                    disabled={facebook.saving}
                  >
                    Save
                  </Button>
                  {facebook.saving && (
                    <CircularProgress
                      size={30}
                      style={{ position: 'absolute', right: '28px' }}
                    />
                  )}
                </div>
              )}
            </CardActions>
          </TPCard>
          <TPCard>
            <StyledHeader
              image="https://i.imgur.com/gZUllu6.png"
              title="Telegram Logo"
            />
            <CardContent>
              <FormWrapper>
                <Typography style={{ flexGrow: 1 }}>Enabled</Typography>
                <Switch
                  checked={telegram.enabled}
                  onChange={handleUpdateForm}
                  name="telegram.enabled"
                />
              </FormWrapper>
              <TextField
                id="Access"
                name="telegram.telegram_token"
                label="Telegram Bot Token"
                margin="normal"
                fullWidth
                value={telegram.telegram_token}
                onChange={handleUpdateForm}
              />
              <TextField
                id="Access"
                name="telegram.domain_name"
                label="Current Domain name (HTTPS!)"
                placeholder="https://talk.jackdh.com"
                margin="normal"
                fullWidth
                value={telegram.domain_name}
                onChange={handleUpdateForm}
              />
              <TextField
                select
                name="telegram.agent"
                helperText="Please select an agent"
                fullWidth
                margin="normal"
                value={telegram.agent}
                onChange={handleUpdateForm}
              >
                {this.props.agents.map(agent => (
                  <MenuItem key={agent._id} value={agent._id}>
                    {agent.agent}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="telegram.talkWrapper"
                helperText="Please select an wrapper"
                fullWidth
                margin="normal"
                value={telegram.talkWrapper}
                onChange={handleUpdateForm}
              >
                {talkWrappers.map(talkWrapper => (
                  <MenuItem key={talkWrapper._id} value={talkWrapper._id}>
                    {talkWrapper.name}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              {telegram.touched && (
                <div style={{ position: 'relative' }}>
                  <Button
                    onClick={() => this.props.dispatch(saveTelegram())}
                    disabled={telegram.saving}
                  >
                    Save
                  </Button>
                  {telegram.saving && (
                    <CircularProgress
                      size={30}
                      style={{ position: 'absolute', right: '28px' }}
                    />
                  )}
                </div>
              )}
            </CardActions>
          </TPCard>
        </div>
      </div>
    );
  }
}

ThirdParty.propTypes = {
  dispatch: PropTypes.func.isRequired,
  facebook: PropTypes.object.isRequired,
  telegram: PropTypes.object.isRequired,
  changeTitle: PropTypes.func.isRequired,
  handleUpdateForm: PropTypes.func.isRequired,
  agents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  talkWrappers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  facebook: selectFacebook(),
  telegram: selectTelegram(),
  agents: selectAgents(),
  talkWrappers: selectTalkWrappers(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeTitle: title => dispatch(changeTitle(title)),
    handleUpdateForm: event =>
      dispatch(
        updateForm(
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
          event.target.name,
        ),
      ),
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

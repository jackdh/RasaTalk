import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { saveFacebook } from './actions';

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
    padding-top: 56.25%; // 16:9
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export class Facebook extends React.PureComponent {
  render() {
    const { stats, handleUpdateForm, agents, dispatch } = this.props;
    return (
      <TPCard>
        <StyledHeader
          image="https://i.imgur.com/KWX47zR.png"
          title="Facebook Logo"
        />
        <CardContent>
          <FormWrapper>
            <Typography style={{ flexGrow: 1 }}>Enabled</Typography>
            <Switch
              checked={stats.enabled}
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
            value={stats.verify_token}
            onChange={handleUpdateForm}
          />
          <TextField
            id="Access"
            name="facebook.access_token"
            label="Access Token"
            margin="normal"
            fullWidth
            value={stats.access_token}
            onChange={handleUpdateForm}
          />
          <TextField
            select
            name="facebook.agent"
            helperText="Please select an agent"
            fullWidth
            margin="normal"
            value={stats.agent}
            onChange={handleUpdateForm}
          >
            {agents.map(agent => (
              <MenuItem key={agent.agent} value={agent.agent}>
                {agent.agent}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          {stats.touched && (
            <div style={{ position: 'relative' }}>
              <Button
                onClick={() => dispatch(saveFacebook())}
                disabled={stats.saving}
              >
                Save
              </Button>
              {stats.saving && (
                <CircularProgress
                  size={30}
                  style={{ position: 'absolute', right: '28px' }}
                />
              )}
            </div>
          )}
        </CardActions>
      </TPCard>
    );
  }
}

Facebook.propTypes = {
  stats: PropTypes.object,
  handleUpdateForm: PropTypes.func,
  agents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dispatch: PropTypes.func,
};

export default Facebook;

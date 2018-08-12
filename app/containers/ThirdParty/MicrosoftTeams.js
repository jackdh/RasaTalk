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
import { saveMicrosoftTeams } from './actions';

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

export class MicrosoftTeams extends React.PureComponent {
  render() {
    const { stats, handleUpdateForm, agents, dispatch } = this.props;
    return (
      <TPCard>
        <StyledHeader
          image="https://i.imgur.com/mvXdfqu.jpg"
          title="Microsoft Teams Logo"
        />
        <CardContent>
          <FormWrapper>
            <Typography style={{ flexGrow: 1 }}>Enabled</Typography>
            <Switch
              checked={stats.enabled}
              onChange={handleUpdateForm}
              name="microsoftTeams.enabled"
            />
          </FormWrapper>
          <TextField
            id="clientId"
            name="microsoftTeams.client_id"
            label="Client ID"
            margin="normal"
            fullWidth
            value={stats.client_id}
            onChange={handleUpdateForm}
          />
          <TextField
            id="clientSecret"
            name="microsoftTeams.client_secret"
            label="Client Secret"
            margin="normal"
            fullWidth
            value={stats.client_secret}
            onChange={handleUpdateForm}
          />
          <TextField
            select
            name="microsoftTeams.agent"
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
                onClick={() => dispatch(saveMicrosoftTeams())}
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

MicrosoftTeams.propTypes = {
  stats: PropTypes.object,
  handleUpdateForm: PropTypes.func,
  agents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dispatch: PropTypes.func,
};

export default MicrosoftTeams;

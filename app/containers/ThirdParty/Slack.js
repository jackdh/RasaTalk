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
import { saveSlack } from './actions';

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

export class Slack extends React.PureComponent {
  render() {
    const { stats, handleUpdateForm, agents, dispatch } = this.props;
    return (
      <TPCard>
        <StyledHeader
          image="https://i.imgur.com/ug7tgaa.png"
          title="Slack Logo"
        />
        <CardContent>
          <FormWrapper>
            <Typography style={{ flexGrow: 1 }}>Enabled</Typography>
            <Switch
              checked={stats.enabled}
              onChange={handleUpdateForm}
              name="slack.enabled"
            />
          </FormWrapper>
          <TextField
            id="clientId"
            name="slack.client_id"
            label="Client ID"
            margin="normal"
            fullWidth
            value={stats.client_id}
            onChange={handleUpdateForm}
          />
          <TextField
            id="clientSecret"
            name="slack.client_secret"
            label="Client Secret"
            margin="normal"
            fullWidth
            value={stats.client_secret}
            onChange={handleUpdateForm}
          />
          <TextField
            select
            name="slack.agent"
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
                onClick={() => dispatch(saveSlack())}
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

Slack.propTypes = {
  stats: PropTypes.object,
  handleUpdateForm: PropTypes.func,
  agents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dispatch: PropTypes.func,
};

export default Slack;

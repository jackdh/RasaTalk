/* eslint-disable camelcase */
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import { createStructuredSelector } from 'reselect';
import { withTheme } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Collapse,
  TextField,
} from '@material-ui/core';
import { selectInfo, selectParse, selectStatus } from './selectors';
import { sendQuery, updateExpression } from './actions';

class Rasa extends React.PureComponent {
  render() {
    const {
      status: { available_projects },
      values: { project, q },
      parse: { sending, response },
      dispatch,
      theme: { palette },
    } = this.props;

    if (!(available_projects && project)) {
      return <CircularProgress />;
    }

    return (
      <React.Fragment>
        <TextField
          id="full-width"
          label="Expression"
          value={q}
          onKeyDown={e => (e.key === 'Enter' ? dispatch(sendQuery()) : null)}
          onChange={e => dispatch(updateExpression(e.target.value))}
          fullWidth
          margin="normal"
        />

        <Collapse in={!!q}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => dispatch(sendQuery())}
            style={{ width: '100%' }}
          >
            {!sending && 'Send'}
            {sending && (
              <CircularProgress style={{ width: '20px', height: '20px' }} />
            )}
          </Button>
        </Collapse>

        <Collapse in={!!response} style={{ padding: '5px' }}>
          {response && (
            <ReactJson
              src={response}
              theme={palette.type === 'dark' ? 'eighties' : 'rjv-default'}
              style={{
                backgroundColor:
                  palette.type === 'dark' ? 'rgb(66, 66, 66)' : '#fff',
              }}
              indentWidth={1}
              displayDataTypes={false}
              displayObjectSize={false}
            />
          )}
        </Collapse>
      </React.Fragment>
    );
  }
}

Rasa.propTypes = {
  values: PropTypes.object,
  status: PropTypes.object,
  parse: PropTypes.object,
  theme: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  status: selectStatus(),
  values: selectInfo(),
  parse: selectParse(),
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

export default compose(
  withTheme(),
  withConnect,
)(Rasa);

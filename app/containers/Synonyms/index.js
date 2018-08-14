/**
 *
 * Synonyms
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import Wrapper from 'components/Grid/Wrapper';
import BackButton from 'components/BackButton';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ProfileCard from 'components/Cards/ProfileCard';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from '@material-ui/core';

import reducer from './reducer';
import saga from './saga';
import Link from '../../images/link.png';
import makeSelectSynonyms from './selectors';
import { changeTitle } from '../HomePage/actions';
import {
  getSynonyms,
  updateVariants,
  addSynonyms,
  removeSynonyms,
} from './actions';
import SynTable from './Table';

export class Synonyms extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    newSyn: '',
  };

  componentDidMount() {
    this.props.changeTitle(`Synonym: ${this.props.match.params.entity}`);
    this.props.dispatch(getSynonyms(this.props.match.params.entity));
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addSyn().then(() => {
        this.setState({ newSyn: '' }, () => this.textInput.focus());
      });
    }
  };

  addSyn = () =>
    new Promise(resolve => {
      this.props.dispatch(
        addSynonyms(this.props.match.params.entity, this.state.newSyn, resolve),
      );
    });

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {
      selectSynonyms: { synonyms, addingSyn },
      dispatch,
      match: {
        params: { entity },
      },
    } = this.props;

    return (
      <Wrapper>
        <BackButton tooltip="Back to entities" link="/entities" />
        <Grid item xs={8}>
          <SynTable
            title={`Synonym: ${this.props.match.params.entity}`}
            synonyms={synonyms}
            onUpdate={(reference, list) =>
              dispatch(updateVariants(entity, reference, list))
            }
            handleDelete={list => dispatch(removeSynonyms(entity, list))}
          />
        </Grid>
        <Grid item xs={4}>
          <ProfileCard
            loading={false}
            agent="Synonyms"
            description="Variants will only be used when the highlighted word in the training data matches the Synonym. Otherwise it will just link the matched word to this synonym."
            avatar={Link}
          />
          <Card style={{ marginTop: '30px' }}>
            <CardHeader
              title="Add new synonym"
              subheader="Feel free to use any name you&#39;d like with or without prefixes."
            />
            <CardContent>
              <TextField
                id="newNode"
                label="New Synonym"
                value={this.state.newSyn}
                onChange={this.handleChange('newSyn')}
                onKeyPress={this.handleKeyPress}
                inputRef={input => {
                  this.textInput = input;
                }}
                fullWidth
                disabled={addingSyn}
              />
            </CardContent>
          </Card>
        </Grid>
      </Wrapper>
    );
  }
}

Synonyms.propTypes = {
  match: PropTypes.object.isRequired,
  selectSynonyms: PropTypes.object.isRequired,
  changeTitle: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectSynonyms: makeSelectSynonyms(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'synonyms', reducer });
const withSaga = injectSaga({ key: 'synonyms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Synonyms);

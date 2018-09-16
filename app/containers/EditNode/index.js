/* eslint-disable no-nested-ternary */
/* eslint-disable indent */

/**
 *
 * EditNode
 *
 */

import React from 'react';
import { Map } from 'immutable';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlexRow from 'components/FlexRow';
import injectSaga from 'utils/injectSaga';
import Expansion from 'components/Expansion';
import injectReducer from 'utils/injectReducer';
import FlexCheckbox from 'components/FlexCheckbox';
import { createStructuredSelector } from 'reselect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Checkbox, TextField } from 'redux-form-material-ui';
import { CloudDone, CloudOff } from '@material-ui/icons';
import {
  Button,
  Divider,
  Typography,
  CircularProgress,
  Tooltip,
} from '@material-ui/core';
import {
  arrayPush,
  Field,
  FieldArray,
  getFormValues,
  reduxForm,
} from 'redux-form/immutable';

import saga from './saga';
import reducer from './reducer';
import Webhook from './form/webhook';
import validate from './form/validate';
import { RenderSlots } from './form/slots';
import RenderResponse from './responses';
import QuickReplies from './form/quickReplies';
import makeSelectEditNode, { selectActive } from './selectors';
import { Body, Header, Wrapper } from './form/styles';
import { loadNode, saveNode } from './actions';
import { setEditNode } from '../SingleTalkFlow/actions';
import { selectHead } from '../SingleTalkFlow/selectors';

const ButtonSection = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export class EditNode extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (this.props.node) {
      this.props.dispatch(loadNode());
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.node !== this.props.node) {
      this.props.dispatch(loadNode());
    } else if (
      this.props.dirty &&
      this.props.valid &&
      !isEqual(this.props.values, prevProps.values)
    ) {
      // this.props.dispatch(saveNode());
    }
  }

  recognisesName(values) {
    if (values && values.recognises) {
      if (values.recognises.isJumpedTo) return 'Jumped To';
      if (values.recognises.regex) return `Regex: ${values.recognises.regex}`;
      if (values.recognises.condition)
        return `Condition: ${values.recognises.condition}`;
    }
    return '';
  }

  addSlot() {
    this.props.dispatch(arrayPush('EditNode', 'slots', Map({})));
  }
  render() {
    const {
      dispatch,
      values,
      handleSubmit,
      dirty,
      invalid,
      submitting,
      submitFailed,
      editnodetwo: { loading },
      headNode,
      node,
    } = this.props;
    const fv = values ? values.toJS() : {};
    const isParent = headNode === node;
    return (
      <Wrapper>
        <Header>
          <Typography variant="title">
            {fv.name && `${fv.name.name}`}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : dirty ? (
            <CloudOff />
          ) : (
            <CloudDone />
          )}

          {fv.name && (
            <Tooltip id="tooltip-icon" title="Copy">
              <CopyToClipboard text={fv.name.uid}>
                <Typography variant="subheading" style={{ cursor: 'pointer' }}>
                  {fv.name && `${fv.name.uid}`}
                </Typography>
              </CopyToClipboard>
            </Tooltip>
          )}
        </Header>

        <Body>
          <form onSubmit={handleSubmit(() => dispatch(saveNode()))}>
            {/* Name */}
            <Expansion
              name="Name"
              subheading={fv.name && `${fv.name.name}`}
              help="The name of the node is just used to help identify it. The Security group can be used to limit who can control / view it as well as help to organise them."
            >
              <FlexRow>
                <Field
                  name="name.name"
                  component={TextField}
                  fullWidth
                  placeholder="Order Pizza"
                  label="Name"
                  type="text"
                />
                {isParent && (
                  <Field
                    name="name.group"
                    component={TextField}
                    fullWidth
                    placeholder="Food Group"
                    label="Group"
                    type="text"
                  />
                )}
              </FlexRow>
              <React.Fragment>
                <FlexCheckbox name="Node Enabled">
                  <Field name="enabled" component={Checkbox} label="Enabled" />
                </FlexCheckbox>
              </React.Fragment>
            </Expansion>

            {/* Recognises */}
            <Expansion
              name="Recognises"
              subheading={this.recognisesName(fv)}
              help="This is how this node will be triggered."
            >
              <React.Fragment>
                <FlexRow>
                  {(!fv.recognises ||
                    (!fv.recognises.isJumpedTo && !fv.recognises.regex)) && (
                    <Field
                      name="recognises.condition"
                      component={TextField}
                      fullWidth
                      placeholder="#order_pizza"
                      label="Recognises"
                      type="text"
                    />
                  )}
                  {(!fv.recognises ||
                    (!fv.recognises.isJumpedTo &&
                      !fv.recognises.condition)) && (
                    <Field
                      name="recognises.regex"
                      component={TextField}
                      fullWidth
                      placeholder="^\[order_pizza]+\$"
                      label="Regex"
                      type="text"
                    />
                  )}
                  {fv.recognises &&
                    (!fv.recognises.isJumpedTo && fv.recognises.regex) && (
                      <Field
                        name="recognises.regexFlags"
                        component={TextField}
                        fullWidth
                        placeholder="gi"
                        label="Regex
                      Flags"
                        type="text"
                      />
                    )}
                </FlexRow>
              </React.Fragment>
              <React.Fragment>
                <FlexCheckbox name="Is Jumped To">
                  <Field
                    name="recognises.isJumpedTo"
                    component={Checkbox}
                    label="Jumped To"
                  />
                </FlexCheckbox>
              </React.Fragment>
            </Expansion>

            {/* Slots */}
            <Expansion
              name="Slots"
              help="Use slots to extract details from a request."
            >
              <React.Fragment>
                <FlexRow style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <FieldArray name="slots" component={RenderSlots} />
                </FlexRow>
              </React.Fragment>
              <React.Fragment>
                <Button onClick={() => this.addSlot()}>Add Slot</Button>
              </React.Fragment>
            </Expansion>

            {/* Responses */}
            <Expansion
              name="Responses"
              help="This is what is sent back to the user. If using a custom implementation markdown is suggested."
            >
              <React.Fragment>
                <FlexRow style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <FieldArray name="responses" component={RenderResponse} />
                </FlexRow>
              </React.Fragment>
              <React.Fragment>
                <Button
                  onClick={() =>
                    dispatch(
                      arrayPush(
                        'EditNode',
                        'responses',
                        Map({ output: [null] }),
                      ),
                    )
                  }
                >
                  Add Response
                </Button>
              </React.Fragment>
            </Expansion>

            {/* Quick Replies */}
            <Expansion
              name="Quick Replies (Buttons)"
              style={{ flexBasis: '50%' }}
              help="These can be formatted into buttons to which the user can then press. Supplying a URL can be used to differentiation link buttons to text buttons."
            >
              <React.Fragment>
                <FlexRow style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <FieldArray name="quick_replies" component={QuickReplies} />
                </FlexRow>
              </React.Fragment>
              <React.Fragment>
                <Button
                  onClick={() =>
                    dispatch(arrayPush('EditNode', 'quick_replies', Map({})))
                  }
                >
                  Add Quick Reply
                </Button>
              </React.Fragment>
            </Expansion>

            {/* Jump To */}
            <Expansion
              name="Jump To"
              help="If you want your node to automatically move to another, paste it's ID below."
            >
              <React.Fragment>
                <FlexRow>
                  <Field
                    name="jump.to"
                    component={TextField}
                    fullWidth
                    placeholder="SW47UY"
                    label="Jump To"
                    type="text"
                  />
                  <Field
                    name="jump.condition"
                    component={TextField}
                    fullWidth
                    placeholder="Date.now() < 12.00.00"
                    label="Condition"
                    type="text"
                  />
                </FlexRow>
              </React.Fragment>
              <React.Fragment />
            </Expansion>

            {/* Save */}
            <Expansion
              name="Save"
              help="This allows you to collect a user response and use it in a chat later on."
            >
              <React.Fragment>
                <FlexRow>
                  <Field
                    name="save.name"
                    component={TextField}
                    fullWidth
                    placeholder="[userChoice]"
                    label="Save Name"
                    type="text"
                  />
                  <Field
                    name="save.condition"
                    component={TextField}
                    fullWidth
                    placeholder="Date.now() < 12 || [pizzaType] !== 'pep'"
                    label="Condition"
                    type="text"
                  />
                </FlexRow>
              </React.Fragment>
              <React.Fragment />
            </Expansion>

            {/* Webhooks */}
            <Expansion
              name="Webhooks"
              help="Webhooks allow you to use any API, However they can slot down a user's response until Sockets are implemented."
            >
              <React.Fragment>
                <div style={{ width: '100%' }}>
                  <FlexRow>
                    <Field
                      name="webhook.to"
                      component={TextField}
                      fullWidth
                      label="URL"
                      placeholder="https://api..."
                    />
                    <Field
                      name="webhook.type"
                      component={TextField}
                      fullWidth
                      label="Method"
                      placeholder="GET"
                    />
                    <Field
                      name="webhook.body"
                      component={TextField}
                      fullWidth
                      label="Body"
                      placeholder={'{data: "whatever"}'}
                    />
                  </FlexRow>

                  <FlexRow>
                    <Field
                      name="webhook.success"
                      component={TextField}
                      fullWidth
                      label="Jump Success"
                      placeholder="GL60QB"
                    />
                    <Field
                      name="webhook.failure"
                      component={TextField}
                      fullWidth
                      label="Jump Failure"
                      placeholder="OX41XU"
                    />
                  </FlexRow>

                  {fv.webhook &&
                    fv.webhook.save && (
                      <React.Fragment>
                        <Divider style={{ margin: '25px 0' }} />
                        <Typography>Save Response</Typography>
                        <FlexRow>
                          <FieldArray
                            name="webhook.variables"
                            component={Webhook}
                          />
                        </FlexRow>
                      </React.Fragment>
                    )}
                </div>
              </React.Fragment>
              <React.Fragment>
                <FlexCheckbox name="Save Response">
                  <Field
                    name="webhook.save"
                    component={Checkbox}
                    label="Save response"
                  />
                  {fv.webhook &&
                    fv.webhook.save && (
                      <Button
                        onClick={() =>
                          dispatch(
                            arrayPush('EditNode', 'webhook.variables', Map({})),
                          )
                        }
                      >
                        Add Webhook Save
                      </Button>
                    )}
                </FlexCheckbox>
              </React.Fragment>
            </Expansion>
            <ButtonSection>
              {dirty && (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={(invalid && submitFailed) || submitting}
                  size="small"
                >
                  Save
                </Button>
              )}
              {submitFailed &&
                invalid && (
                  <Typography
                    style={{ color: 'red', marginLeft: '10px' }}
                    size="small"
                  >
                    Please fix form errors.
                  </Typography>
                )}
              <Button
                onClick={() => dispatch(setEditNode(''))}
                variant="outlined"
                size="small"
                style={{ marginLeft: 'auto' }}
              >
                Close
              </Button>
            </ButtonSection>
          </form>
        </Body>
        {/* <pre>{JSON.stringify(values, ' ', 2)}</pre> */}
      </Wrapper>
    );
  }
}

EditNode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.string,
  headNode: PropTypes.string,
  values: PropTypes.object,
  editnodetwo: PropTypes.object,
  handleSubmit: PropTypes.func,
  dirty: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  submitFailed: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  editnodetwo: makeSelectEditNode(),
  values: getFormValues('EditNode'),
  isActive: selectActive(),
  headNode: selectHead(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withForm = reduxForm({ form: 'EditNode', validate });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'editNode', reducer });
const withSaga = injectSaga({ key: 'editNode', saga });

export default compose(
  withReducer,
  withSaga,
  withForm,
  withConnect,
)(EditNode);

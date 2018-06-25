import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';

import Variant from './Variant';

const styles = {};
const StyledCard = styled(Card)`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

function AddSingle(props) {
  const { classes, value, handleChange, keyDown } = props;
  return (
    <StyledCard className={classes.card}>
      <CardHeader title="Single Expression" subheader="Press enter to submit" />
      <CardContent>
        <FormControl fullWidth aria-describedby="name-helper-text">
          <InputLabel htmlFor="name-helper">Expression: </InputLabel>
          <Input
            id="expression"
            name="expression"
            value={value}
            onChange={handleChange}
            onKeyPress={keyDown}
          />
          <FormHelperText id="name-helper-text">
            Think of an expression as a way someone might trigger this intent.
          </FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions />
    </StyledCard>
  );
}

AddSingle.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  keyDown: PropTypes.func,
};

function AddMultiple(props) {
  const { submit, classes, value, handleChange } = props;
  return (
    <StyledCard className={classes.card}>
      <CardHeader
        title="Multiple Expressions"
        subheader="One expression per line."
      />
      <CardContent>
        <FormControl fullWidth aria-describedby="name-helper-text">
          <InputLabel htmlFor="name-helper">Expressions: </InputLabel>
          <Input
            multiline
            id="multipleExpressions"
            name="multipleExpressions"
            value={value.join('\n')}
            onChange={handleChange}
          />
          <FormHelperText id="name-helper-text">
            Think of an expression as a way someone might trigger this intent.
          </FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions>
        {value.length > 0 &&
          value[0] !== '' && (
          <Button
            type="button"
            color="primary"
            variant="raised"
            onClick={submit}
          >
              Add
          </Button>
        )}
      </CardActions>
    </StyledCard>
  );
}

AddMultiple.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.array,
  handleChange: PropTypes.func,
  submit: PropTypes.func,
};

class Add extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.saveMultiple = this.saveMultiple.bind(this);
    this.saveGenerated = this.saveGenerated.bind(this);
    this.toggleInclude = this.toggleInclude.bind(this);

    const activeTab =
      localStorage.getItem('expressionTabPanel') === null
        ? 0
        : +localStorage.getItem('expressionTabPanel');
    this.state = {
      activeTab,
      expression: '',
      multipleExpressions: [],
      toBeReplaced: '',
      variants: [],
      generatedExpressions: [],
      includeExpression: false,
    };
  }

  onKeyDown(e) {
    if (e.key === 'Enter' && this.state.expression) {
      this.props.addExpression([this.state.expression]).then(() => {
        this.setState({ expression: '' });
      });
    }
  }

  handleInputChange(e) {
    const { name } = e.target;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (
      name === 'multipleExpressions' ||
      name === 'variants' ||
      name === 'generatedExpressions'
    ) {
      const split = value.split('\n');
      this.setState({ [name]: split });
    } else {
      this.setState({ [name]: value });
    }
  }

  toggleInclude() {
    this.setState({ includeExpression: !this.state.includeExpression });
  }

  toggle(event, tab) {
    if (this.state.activeTab !== tab) {
      this.setState(
        {
          activeTab: tab,
        },
        () => {
          localStorage.setItem('expressionTabPanel', tab);
        },
      );
    }
  }
  saveMultiple() {
    this.props.addExpression(this.state.multipleExpressions).then(() => {
      this.setState({ multipleExpressions: [''] });
    });
  }

  saveGenerated() {
    this.props.addExpression(this.state.generatedExpressions).then(() => {
      this.setState({ variants: [''] });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.activeTab}
            onChange={this.toggle}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Single" />
            <Tab label="Multiple" />
            <Tab label="Variants" />
          </Tabs>
        </AppBar>
        {this.state.activeTab === 0 && (
          <AddSingle
            classes={classes}
            value={this.state.expression}
            handleChange={this.handleInputChange}
            keyDown={this.onKeyDown}
          />
        )}
        {this.state.activeTab === 1 && (
          <AddMultiple
            classes={classes}
            submit={this.saveMultiple}
            value={this.state.multipleExpressions}
            handleChange={this.handleInputChange}
            keyDown={this.onKeyDown}
          />
        )}
        {this.state.activeTab === 2 && (
          <Variant
            includeExpression={this.state.includeExpression}
            toBeReplaced={this.state.toBeReplaced}
            variants={this.state.variants}
            multipleExpressions={this.state.multipleExpressions}
            generatedExpressions={this.state.generatedExpressions}
            handleInputChange={this.handleInputChange}
            toggleInclude={this.toggleInclude}
            saveGenerated={this.saveGenerated}
          />
        )}
      </div>
    );
  }
}

Add.propTypes = {
  addExpression: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Add);

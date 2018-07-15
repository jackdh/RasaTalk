/* eslint-disable indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';

export default class Variant extends Component {
  searchAndReplace = () => {
    const temp = [];
    let variant;
    let expression;
    for (let i = 0; i < this.props.multipleExpressions.length; i += 1) {
      expression = this.props.multipleExpressions[i];

      if (this.props.includeExpression) temp.push(expression);

      for (let x = 0; x < this.props.variants.length; x += 1) {
        variant = this.props.variants[x];

        const regExp = new RegExp(this.props.toBeReplaced, 'gi');
        const match = expression.match(regExp);
        if (match) {
          const res = expression.replace(regExp, variant);
          temp.push(res);
        }
      }
    }
    this.props.handleInputChange({
      target: {
        name: 'generatedExpressions',
        value: temp.join('\n'),
      },
    });
  };

  render() {
    const {
      toBeReplaced,
      variants,
      multipleExpressions,
      generatedExpressions,
      handleInputChange,
      saveGenerated,
    } = this.props;
    return (
      <Card>
        <CardHeader
          title="Variant Generator"
          subheader="Helpful for creating lots of test expressions if you'd rather not use entities."
        />
        <CardContent>
          <Grid container spacing={32}>
            <Grid item xs={4}>
              <Typography variant="title" gutterBottom>
                Search For:
              </Typography>
              <TextField
                id="name"
                placeholder="\[location\]"
                name="toBeReplaced"
                value={toBeReplaced}
                onChange={handleInputChange}
                fullWidth
                helperText="Uses Regex expressions to make sure to escape special characters!"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="title" gutterBottom>
                In:
              </Typography>
              <TextField
                onChange={handleInputChange}
                value={multipleExpressions.join('\n')}
                multiline
                name="multipleExpressions"
                id="multipleExpressions"
                placeholder="I want to visit [locaation]"
                fullWidth
                helperText="One per line"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="title" gutterBottom>
                Replace it With:
              </Typography>
              <TextField
                onChange={handleInputChange}
                value={variants.join('\n')}
                multiline
                name="variants"
                id="variants"
                placeholder="London"
                fullWidth
                helperText="One per line"
              />
            </Grid>
          </Grid>
          <br />
          <Grid container>
            {toBeReplaced &&
              variants.length > 0 &&
              multipleExpressions.length > 0 && (
                <Button
                  type="button"
                  color="primary"
                  variant="raised"
                  fullWidth
                  onClick={this.searchAndReplace}
                >
                  Generate!
                </Button>
              )}
          </Grid>
          <br />
          {generatedExpressions.length > 0 && (
            <Grid container>
              <TextField
                onChange={handleInputChange}
                value={generatedExpressions.join('\n')}
                multiline
                name="generatedExpressions"
                id="generatedExpressions"
                fullWidth
              />
              <Button
                style={{ marginTop: '30px' }}
                type="button"
                color="primary"
                variant="raised"
                fullWidth
                onClick={saveGenerated}
              >
                Save!
              </Button>
            </Grid>
          )}
        </CardContent>
      </Card>
    );
  }
}

Variant.defaultProps = {
  includeExpression: false,
  toBeReplaced: '',
  variants: [],
  multipleExpressions: [],
  generatedExpressions: [],
};

Variant.propTypes = {
  includeExpression: PropTypes.bool,
  toBeReplaced: PropTypes.string,
  variants: PropTypes.array,
  multipleExpressions: PropTypes.array,
  generatedExpressions: PropTypes.array,
  handleInputChange: PropTypes.func.isRequired,
  saveGenerated: PropTypes.func.isRequired,
};

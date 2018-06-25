/* eslint-disable no-underscore-dangle,jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

export class Text extends React.Component {
  state = {
    anchorEl: null,
    top: 200,
    left: 400,
    entity: '',
    value: '',
    start: 0,
    end: 0,
  };

  onMouseUp = event => {
    let value = '';
    let oRange;
    let oRect;
    if (window.getSelection && window.getSelection().toString() !== '') {
      const selection = window.getSelection();
      value = selection.toString();
      oRange = selection.getRangeAt(0);
      oRect = oRange.getBoundingClientRect();

      const start = this.props.expression.value.indexOf(value);
      const end = start + value.length;
      let available = true;
      this.props.expression.entities.map(entity => {
        if (start > entity.start && start < entity.end) {
          available = false;
        } else if (end > entity.start && end < entity.end) {
          available = false;
        } else if (start === entity.start && end === entity.end) {
          available = false;
        }
        return available;
      });

      if (available) {
        this.setState({
          anchorEl: event.currentTarget,
          top: oRect.top - 85,
          left: oRect.left + 10,
          value,
          start,
          end,
        });
      }
    }
  };

  clickEntity = (event, { value, end, start, entity }) => {
    this.setState({
      anchorEl: event.currentTarget,
      top: event.clientY - 85,
      left: event.clientX + 10,
      value,
      start,
      end,
      entity,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleChange = event => {
    const {
      target: { name, value },
    } = event;
    const entity = {
      entity: value,
      _id: this.props.expression._id,
      value: this.state.value,
      start: this.state.start,
      end: this.state.end,
    };
    if (value) {
      this.props.addEntity(entity);
    } else {
      this.props.removeEntity(entity);
    }
    this.setState({ [name]: value });
  };

  compare = (a, b) => {
    if (a.start < b.start) {
      return -1;
    }
    if (a.start > b.start) {
      return 1;
    }
    return 0;
  };

  insertHighlight = (string, entities) => {
    entities.sort(this.compare);
    let negativeShift = 0;
    const final = [];
    let tempString = string;

    entities.map(entity => {
      const start = tempString.slice(0, entity.start - negativeShift);
      const end = tempString.slice(
        entity.start - negativeShift,
        entity.end - negativeShift,
      );
      final.push(start);
      final.push(
        <Tooltip
          key={`${start}-${end}`}
          id="tooltip-top"
          title={entity.entity}
          placement="top"
        >
          <span key={end} onClick={event => this.clickEntity(event, entity)}>
            {end}
          </span>
        </Tooltip>,
      );
      tempString = tempString.slice(entity.end - negativeShift);
      negativeShift = string.length - tempString.length;
      return null;
    });

    if (tempString) final.push(tempString);

    return final.length > 0 ? final : string;
  };

  render() {
    const { classes = {} } = this.props;
    const { anchorEl } = this.state;
    const {
      theme: {
        palette: { type },
      },
    } = this.props;
    const Highlight = styled(Typography)`
      > span {
        background-color: ${props =>
    props.type === 'light' ? '#ff0' : '#000'};
        border-radius: 4px;
        padding: 2px 5px;
        cursor: pointer;
      }
    `;

    return (
      <React.Fragment>
        <Popover
          anchorReference="anchorPosition"
          anchorPosition={{ top: this.state.top, left: this.state.left }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Card>
            <CardContent style={{ padding: '10px', width: '150px' }}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-simple">Entity</InputLabel>
                <Select
                  value={this.state.entity}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'entity',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.entities.map(entity => (
                    <MenuItem key={entity.name} value={entity.name}>
                      {entity.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Popover>

        <Highlight onMouseUp={this.onMouseUp} type={type}>
          {this.insertHighlight(
            this.props.expression.value,
            this.props.expression.entities,
          )}
        </Highlight>
      </React.Fragment>
    );
  }
}

Text.defaultProps = {
  entities: [],
};

Text.propTypes = {
  classes: PropTypes.object,
  expression: PropTypes.object.isRequired,
  removeEntity: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  addEntity: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Text);

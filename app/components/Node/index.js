import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, MenuItem, Collapse, Card, Typography } from '@material-ui/core';
import { ExpandMore, MoreVert } from '@material-ui/icons';

const StyledCard = styled(Card)`
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 1px;
  &:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.42), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;

const CardInner = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  padding: 0.75rem 1.25rem;
`;

const Text = styled(Typography)`
  && {
    flex-basis: 0;
    flex-grow: 1;
    align-self: center;
    line-height: 48px;
  }
`;

const Switch = ButtonGroup.extend`
  padding-top: 0.75em;
`;

class Node extends React.Component {
  state = {
    open: true,
    anchorEl: null,
  };

  handleCollapse = () => {
    this.setState({ open: !this.state.open });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  add = () => {
    this.props.add(this.props.family.uid);
    this.setState({ anchorEl: null });
  };

  remove = () => {
    this.props.remove(this.props.family.uid);
    this.setState({ anchorEl: null });
  };

  move = direction => {
    this.props.move(this.props.family.uid, direction);
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      details: { position, total, level },
      family: { name, uid, children },
    } = this.props;
    const { open, anchorEl } = this.state;

    const CollapseArea = styled.div`
      display: flex;
      flex-direction: column;
      margin-left: 30px;
    `;

    const CollapseIcon = styled.div`
      flex: 0 0 40px;
      padding: 0.75rem 1.25rem;
      ${!open &&
        `-webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);`};
    `;

    const showLeft = level > 1;
    const showRight = level > 0 && position > 1;
    const showUp = level > 0 && position > 1;
    const showDown = level > 0 && position !== total;

    return (
      <div>
        <StyledCard>
          <CardInner>
            {children.length > 0 && (
              <CollapseIcon>
                <ExpandMore onClick={this.handleCollapse} />
              </CollapseIcon>
            )}
            <ButtonGroup
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVert />
            </ButtonGroup>
            <Text onClick={() => this.props.setNode(uid)}>
              {name.trim() ? name : '{None}'}
            </Text>
            <Switch />
          </CardInner>
        </StyledCard>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.add}>Add</MenuItem>
          <MenuItem onClick={this.remove}>Remove</MenuItem>
          {showLeft && (
            <MenuItem onClick={() => this.move('left')}>Move Left</MenuItem>
          )}
          {showRight && (
            <MenuItem onClick={() => this.move('right')}>Move Right</MenuItem>
          )}
          {showUp && (
            <MenuItem onClick={() => this.move('up')}>Move Up</MenuItem>
          )}
          {showDown && (
            <MenuItem onClick={() => this.move('down')}>Move Down</MenuItem>
          )}
        </Menu>
        <Collapse in={open}>
          <CollapseArea>
            {children &&
              children.length > 0 &&
              children.map((child, index) => (
                <Node
                  add={this.props.add}
                  remove={this.props.remove}
                  move={this.props.move}
                  key={child.uid}
                  family={child}
                  details={{
                    position: index + 1,
                    total: children.length,
                    level: level + 1,
                  }}
                  setNode={this.props.setNode}
                />
              ))}
          </CollapseArea>
        </Collapse>
      </div>
    );
  }
}

Node.defaultProps = {
  details: {
    position: 1,
    total: 1,
    level: 0,
  },
};

Node.propTypes = {
  family: PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  }),
  details: PropTypes.shape({
    position: PropTypes.number, // Where are they in relation to their siblings
    total: PropTypes.number, // How many siblings
    level: PropTypes.number, // How deep are they
  }),
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  setNode: PropTypes.func.isRequired,
};

export default Node;

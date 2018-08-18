/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const StyledSpan = styled.span`
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.3s;
  :hover {
    color: #40a9ff;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledDiv = styled.div`
  height: 30px;
  line-height: 30px;
  margin-bottom: 16px;
  background: #f8f8f8;
  width: max-content;
`;

function Breadcrumb(props) {
  const { items } = props;

  return (
    <StyledDiv>
      {items.map(item => (
        <React.Fragment>
          {item.link && (
            <StyledSpan>
              <StyledLink to={item.link}>{item.text}</StyledLink> /
            </StyledSpan>
          )}
          {!item.link && <StyledSpan> {item.text} </StyledSpan>}
        </React.Fragment>
      ))}
    </StyledDiv>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Breadcrumb;

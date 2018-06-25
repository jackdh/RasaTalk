import styled from 'styled-components';
import { Paper, ExpansionPanel } from '@material-ui/core';

export const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  margin: 0 25px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`;

export const StyledExpansion = styled(ExpansionPanel)`
  margin: 5px 15px;
`;

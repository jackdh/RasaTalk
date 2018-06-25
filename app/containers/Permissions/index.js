/* eslint-disable no-underscore-dangle */
/**
 *
 * Permissions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  selectPermissions,
  selectGroups,
  selectRoles,
  selectUsers,
  selectSavingGroups,
  selectSavingUsers,
  selectSavingRoles,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeTitle } from '../HomePage/actions';
import { getPermissions, setPermissions, setUser } from './actions';
import PermSelect from './PermSelect';

const HeadingRow = styled(TableCell)`
  && {
    width: 10px;
  }
`;

const StyledCard = styled(Card)`
  && {
    overflow: inherit;
    position: relative;
  }
`;

const StyledLoader = styled(CircularProgress)`
  && {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

export class Permissions extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.changeTitle('Permissions');
    this.props.getPermissions();
  }

  render() {
    const {
      permissions,
      roles,
      groups,
      users,
      onUpdate,
      savingRoles,
      savingGroups,
      savingUsers,
      onUpdateUser,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Permissions</title>
          <meta name="description" content="Permissions" />
        </Helmet>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <StyledCard>
              <CardHeader
                title="Role"
                subheader="A user can only have one role."
              />
              {savingRoles && <StyledLoader />}
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      <TableCell>Permissions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.map(role => (
                      <TableRow key={role.name}>
                        <HeadingRow component="th" scope="row">
                          {role.name}
                        </HeadingRow>
                        <TableCell>
                          <PermSelect
                            onUpdate={items =>
                              onUpdate('roles', role.name, items)
                            }
                            selected={role.permissions}
                            suggestions={permissions}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardHeader
                title="Groups"
                subheader="A user can be a member of multiple groups."
              />
              {savingGroups && <StyledLoader />}
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      <TableCell>Permissions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map(group => (
                      <TableRow key={group.name}>
                        <HeadingRow component="th" scope="row">
                          {group.name}
                        </HeadingRow>
                        <TableCell>
                          <PermSelect
                            onUpdate={items =>
                              onUpdate('groups', group.name, items)
                            }
                            selected={group.permissions}
                            suggestions={permissions}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: '150px' }}>
            <StyledCard>
              <CardHeader
                title="User"
                subheader="Assign a user a role, their groups and any specific permissions."
              />
              {savingUsers && <StyledLoader />}
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Groups</TableCell>
                      <TableCell>Permissions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.name}>
                        <HeadingRow component="th" scope="row">
                          {user.name}
                        </HeadingRow>
                        <TableCell>
                          <PermSelect
                            onUpdate={item =>
                              onUpdateUser(user._id, 'role', item)
                            }
                            singleSelected={user.role}
                            suggestions={roles.map(role => role.name)}
                            single
                          />
                        </TableCell>
                        <TableCell>
                          <PermSelect
                            onUpdate={items =>
                              onUpdateUser(user._id, 'groups', items)
                            }
                            selected={user.groups}
                            suggestions={groups.map(group => group.name)}
                          />
                        </TableCell>
                        <TableCell>
                          <PermSelect
                            onUpdate={items =>
                              onUpdateUser(user._id, 'permissions', items)
                            }
                            selected={user.permissions}
                            suggestions={permissions}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Permissions.propTypes = {
  getPermissions: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  permissions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  roles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  groups: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  savingRoles: PropTypes.bool,
  savingGroups: PropTypes.bool,
  savingUsers: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  permissions: selectPermissions(),
  groups: selectGroups(),
  roles: selectRoles(),
  users: selectUsers(),
  savingRoles: selectSavingRoles(),
  savingGroups: selectSavingGroups(),
  savingUsers: selectSavingUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPermissions: () => dispatch(getPermissions()),
    changeTitle: title => {
      dispatch(changeTitle(title));
    },
    onUpdate: (group, id, permissions) => {
      dispatch(setPermissions(group, id, permissions));
    },
    onUpdateUser: (id, setting, permissions) => {
      dispatch(setUser(id, setting, permissions));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'permissions', reducer });
const withSaga = injectSaga({ key: 'permissions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Permissions);

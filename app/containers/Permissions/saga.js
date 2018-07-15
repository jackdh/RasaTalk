/* eslint-disable no-param-reassign */
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PERMISSIONS, SET_PERMISSIONS, SET_USER } from './constants';

import * as a from './actions';

function* getPermissions() {
  yield put(a.gettingPermissions(true));

  try {
    const { data } = yield call(axios.get, '/api/permissions');
    yield put(a.getPermissionsSuccess(data));
  } catch (e) {
    yield put(a.getPermissionsFailure(e));
  } finally {
    yield put(a.gettingPermissions(false));
  }
}

function* setPermissions({ group, id, permissions }) {
  yield put(a.settingPermissions(true, group));
  try {
    const permissions1 = permissions.length > 0 ? permissions.split(',') : [];
    yield call(axios.post, `/api/permissions/${group}`, {
      id,
      permissions: permissions1,
    });
    yield put(a.setPermissionsSuccess(group, id, permissions));
  } catch (e) {
    yield put(a.setPermissionsFailure(e));
  } finally {
    yield put(a.settingPermissions(false, group));
  }
}

function* setUser({ id, setting, permissions }) {
  yield put(a.settingPermissions(true, 'user'));
  if (setting !== 'role') {
    permissions = permissions.length > 0 ? permissions.split(',') : [];
  }
  try {
    yield call(axios.post, '/api/permissions/user', {
      id,
      setting,
      permissions,
    });
  } catch (e) {
    yield put(a.setUserFailure(e));
  } finally {
    yield put(a.settingPermissions(false, 'user'));
  }
}

export default function* permissonsData() {
  yield [
    takeLatest(GET_PERMISSIONS, getPermissions),
    takeLatest(SET_PERMISSIONS, setPermissions),
    takeLatest(SET_USER, setUser),
  ];
}

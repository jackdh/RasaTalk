import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { selectInfo } from 'containers/RightSidebar/selectors';
import axios from 'axios';

import { SEND_INPUT } from './constants';
import * as a from './actions';
import { selectInput } from './selectors';
const uuidv1 = require('uuid/v1');

export function* sendInput() {
  const messageId = uuidv1();
  try {
    const { model, project } = yield select(selectInfo());
    const { input, uuid, _id } = yield select(selectInput());
    yield put(a.sendingInput(true));
    yield put(
      a.addMessage({
        text: input,
        type: 'human',
        pending: true,
        uuid: messageId,
      }),
    );
    const { data } = yield call(axios.post, `/api/reply/${uuid}`, {
      model,
      project,
      message: input,
      talkWrapper: _id,
    });

    yield put(a.messageSuccess(messageId));
    yield all(data.map(message => put(a.addMessage(message))));
  } catch (error) {
    yield put(a.messageFailure(messageId));
  } finally {
    yield put(a.sendingInput(false));
  }
}

export default function* ChatbotSaga() {
  yield takeEvery(SEND_INPUT, sendInput);
}

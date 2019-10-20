import { all, takeLatest, put } from 'redux-saga/effects';

import history from '~/services/history';

import { setMeetupSuccess } from './actions';

export function* setMeetup({ payload }) {
  yield put(setMeetupSuccess(payload.meetup));
  history.push('/details');
}

export default all([takeLatest('@meetup/SET_MEETUP_REQUEST', setMeetup)]);

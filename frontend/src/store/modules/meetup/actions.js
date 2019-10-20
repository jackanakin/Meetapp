export function setMeetupRequest(meetup) {
  return {
    type: '@meetup/SET_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function setMeetupSuccess(meetup) {
  return {
    type: '@meetup/SET_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

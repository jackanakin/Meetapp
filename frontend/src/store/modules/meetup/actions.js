export function setMeetup(data) {
  return {
    type: '@user/SET_MEETUP',
    payload: { data },
  };
}

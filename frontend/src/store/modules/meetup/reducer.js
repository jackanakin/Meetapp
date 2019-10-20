import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@meetup/SET_MEETUP_SUCCESS':
      return produce(state, draft => {
        draft.meetup = action.payload.meetup;
      });
    default:
      return state;
  }
}

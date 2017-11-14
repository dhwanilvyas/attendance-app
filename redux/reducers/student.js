import { STUDENT_DATA_AVAILABLE } from '../actions/types';

const initialState = {
  student: null
};

studentReducer = (state = initialState, action) => {
  const { student } = action;

  switch (action.type) {
    case STUDENT_DATA_AVAILABLE:
      return Object.assign({}, state, {
        student: student
      });
    default:
      return state;
  }
}

export default studentReducer;

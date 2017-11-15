import { STUDENT_DATA_AVAILABLE } from '../actions/types';
import initialState from '../store/initialState';

student = (state = initialState.student, action) => {
  const { student } = action;

  switch (action.type) {
    case STUDENT_DATA_AVAILABLE:
      return student;
    default:
      return state;
  }
}

export default student;

import { STUDENT_DATA_AVAILABLE } from './types';
import Student from '../../utils/Student';

export const getStudentData = (studentId) => {
  return dispatch => {
    Student.getProfile(studentId)
      .then(response => {
        dispatch(studentDataAvailable(response.data.data));
      });
  }
}

studentDataAvailable = (student) => {
  return {
    type: STUDENT_DATA_AVAILABLE,
    student
  }
}

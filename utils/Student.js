import Expo from 'expo';
import API from './Api';

export default {
  login(studentId) {
    const requestBody = {
      student_id: studentId,
      device_id: Expo.Constants.deviceId
    };

    return API.put('student/device', requestBody).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  },

  getProfile(studentId) {
    const requestBody = {
      student_id: studentId
    };

    return API.post('student/profile', requestBody).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  },

  getAttendance(studentId, courseId) {
    const requestBody = {
      student_id: studentId,
      course_id: courseId
    };

    return API.post('student/attendance', requestBody).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  },

  getSession(courseId) {
    const requestBody = {
      course_id: courseId
    };

    return API.post('course/session', requestBody).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  },

  markAttendance(course, session, tokens) {
    const requestBody = {
      course_id: course,
      session_id: session,
      tokens
    };

    return API.post('student/attendance/mark', requestBody).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  }
}

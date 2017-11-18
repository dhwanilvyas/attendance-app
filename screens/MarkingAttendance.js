import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import Student from '../utils/Student';
import commonStyles from '../utils/commonStyles';

class MarkingAttendance extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    attendanceMarked: null,
    attendanceAlreadyMarked: false
  };

  redirect = (to, params) => {
    setTimeout(() => {
      this.props.navigation.navigate(to, params);
    }, 1500);
  }

  async componentDidMount() {
    const { course, session, scanned } = this.props.navigation.state.params;
    const response = await Student.markAttendance(this.props.student.id, course.id, session, scanned);
console.log(response);
    if (response.data.data) {
      if (response.data.data.attendance_marked) {
        this.setState({
          attendanceMarked: true
        });

        this.redirect('CourseAttendance', {student: this.props.student, course});
      }
      if (response.data.data.attendance_already_marked) {
        this.setState({
          attendanceAlreadyMarked: true
        });

        this.redirect('CourseAttendance', {student: this.props.student, course});
      }
    } else {
      this.setState({
        attendanceMarked: false
      });

      this.redirect('Home');
    }
  }

  render() {
    if (this.state.attendanceMarked === true || this.state.attendanceAlreadyMarked === true) {
      return (
        <Container>
          <Content contentContainerStyle={styles.successContainer}>
            <Icon name="thumbs-up" fontSize="60" />
            <Text>{this.state.attendanceMarked ? 'Attendance marked!' : 'Your attendance is already marked!'}</Text>
          </Content>
        </Container>
      );
    }

    if (this.state.attendanceMarked === false) {
      return (
        <Container>
          <Content contentContainerStyle={styles.errorContainer}>
            <Icon name="thumbs-down" fontSize="60" />
            <Text>Couldn't mark attendance</Text>
            <Text>Contact the faculty</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.markingContainer}>
          <Spinner />
          <Text>Marking your attendance...</Text>
        </Content>
      </Container>
    );
  }
}

const styles = {
  markingContainer: {
    ...commonStyles.center,
    // backgroundColor: '#635DB7',
  },
  successContainer: {
    ...commonStyles.center,
    backgroundColor: '#00CE9F',
  },
  errorContainer: {
    ...commonStyles.center,
    backgroundColor: '#EF5350',
  }
}

mapStateToProps = ({student}) => {
  return {
    student
  };
}

export default connect(mapStateToProps)(MarkingAttendance);

import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import Student from '../utils/Student';

class MarkingAttendance extends Component {
  state = {
    attendanceMarked: null,
    attendanceAlreadyMarked: false
  };

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const { course, session, scanned } = this.props.navigation.state.params;
    const response = await Student.markAttendance(this.props.student.id, course.id, session, scanned);

    if (response.data.data) {
      if (response.data.data.attendance_marked) {
        this.setState({
          attendanceMarked: true
        });
        setTimeout(() => {
          this.props.navigation.navigate('CourseAttendance', {student: this.props.student, course});
        }, 1500);
      }
      if (response.data.data.attendance_already_marked) {
        this.setState({
          attendanceAlreadyMarked: true
        });
        setTimeout(() => {
          this.props.navigation.navigate('CourseAttendance', {student: this.props.student, course});
        }, 1500);
      }
    } else {
      this.setState({
        attendanceMarked: false
      });
      setTimeout(() => {
        this.props.navigation.navigate('Home');
      }, 1500);
    }
  }

  render() {
    if (this.state.attendanceMarked === true || this.state.attendanceAlreadyMarked === true) {
      return (
        <Container>
          <Content contentContainerStyle={styles.successContainer}>
            <Icon name="thumbs-up" fontSize="40" />
            <Text>{this.state.attendanceMarked ? 'Attendance marked!' : 'Your attendance is already marked!'}</Text>
          </Content>
        </Container>
      );
    }

    if (this.state.attendanceMarked === false) {
      return (
        <Container>
          <Content contentContainerStyle={styles.errorContainer}>
            <Icon name="thumbs-down" fontSize="40" />
            <Text>Couldn't mark attendance</Text>
            <Text>Contact the faculty</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Spinner />
          <Text>Marking your attendance...</Text>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#635DB7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successContainer: {
    backgroundColor: '#00CE9F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    backgroundColor: '#EF5350',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

mapStateToProps = ({student}) => {
  return {
    student
  };
}

export default connect(mapStateToProps)(MarkingAttendance);

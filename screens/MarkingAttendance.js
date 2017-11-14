import React, { Component } from 'react';
import { Container, Content, H3, Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import Student from '../utils/Student';

class MarkingAttendance extends Component {
  state = {
    attendanceMarked: null
  };

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const { course, session, tokens } = this.props.navigation.state.params;
    const response = await Student.markAttendance(course.id, session, tokens);
    if (response.data && response.data.data.attendance_marked) {
      this.setState({
        attendanceMarked: true
      });
      setTimeout(() => {
        this.props.navigation.navigate('CourseAttendance', {student: this.props.student, course});
      }, 1000);
    }
    else {
      this.setState({
        attendanceMarked: false
      });
      setTimeout(() => {
        this.props.navigation.navigate('Home');
      }, 1000);
    }
  }

  render() {
    if (this.state.attendanceMarked === true) {
      return (
        <Container>
          <Content contentContainerStyle={styles.successContainer}>
            <Icon name="thumbs-up" fontSize="40" />
            <H3>Attendance marked!</H3>
          </Content>
        </Container>
      );
    }

    if (this.state.attendanceMarked === false) {
      return (
        <Container>
          <Content contentContainerStyle={styles.errorContainer}>
            <Icon name="thumbs-down" fontSize="40" />
            <H3>Couldn't mark attendance</H3>
            <H3>Contact the faculty</H3>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Spinner />
          <H3>Marking your attendance...</H3>
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
    student: student.student
  };
}

export default connect(mapStateToProps)(MarkingAttendance);

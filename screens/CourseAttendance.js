import React, { Component } from 'react';
import { Container, Content, Text, Spinner } from 'native-base';
import PercentageCircle from 'react-native-progress-circle';
import Student from '../utils/Student';

class CourseAttendance extends Component {
  static navigationOptions = {
    title: 'Course attendance'
  };

  state = {
    loading: true,
    courseAttendance: null
  };

  async componentDidMount() {
    const { student, course } = this.props.navigation.state.params;
    const response = await Student.getAttendance(student.id, course.id);

    this.setState({
      loading: false,
      courseAttendance: response.data.data
    });
  }

  render() {
    const { course } = this.props.navigation.state.params;
    const { courseAttendance, loading } = this.state;

    if (loading) {
      return <Spinner />
    }

    const circleBorderColor = courseAttendance.current_percentage > 60 ? 'green' : 'red';

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Text style={styles.text}>Your attendance for {course.name}</Text>
          <PercentageCircle radius={70} percent={courseAttendance.current_percentage} color={circleBorderColor} borderWidth={8}>
            <Text style={styles.percentage}>{courseAttendance.current_percentage}%</Text>
          </PercentageCircle>
          <Text style={styles.text}>Attended {courseAttendance.attended_lectures} out of {courseAttendance.lectures_done} lectures done.</Text>
          <Text style={styles.text}>Need to attend {courseAttendance.required_to_attend} out of {courseAttendance.lectures_left} lectures left.</Text>
          <Text>Minimum attendance required is 80%</Text>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentage: {
    fontSize: 40
  },
  text: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  }
};

export default CourseAttendance;

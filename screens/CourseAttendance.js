import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Grid, Col, Card } from 'native-base';
import { View } from 'react-native';
import PercentageCircle from 'react-native-progress-circle';
import Student from '../utils/Student';
import commonStyles from '../utils/commonStyles';

class CourseAttendance extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.course.name}`,
  });

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
        <Content contentContainerStyle={commonStyles.center}>
          <Text style={{...styles.text, paddingBottom: 20}}>Your attendance till date is</Text>
          <PercentageCircle radius={70} percent={courseAttendance.current_percentage} color={circleBorderColor} borderWidth={8}>
            <Text style={styles.percentage}>{courseAttendance.current_percentage}%</Text>
          </PercentageCircle>
          <Text style={styles.text}>Attended lectures</Text>
          <Text style={{marginBottom: 20}}>
            <Text style={{fontSize: 40, fontFamily: 'open-sans-light'}}>{courseAttendance.attended_lectures} / {courseAttendance.lectures_done}</Text>
            <Text> done</Text>
          </Text>
          <Text style={styles.text}>Need to attend</Text>
          <Text>
            <Text style={{fontSize: 40, fontFamily: 'open-sans-light'}}>{courseAttendance.required_to_attend} / {courseAttendance.lectures_left}</Text>
            <Text> left</Text>
          </Text>
          {/* <Text style={styles.text}>Attended {courseAttendance.attended_lectures} out of {courseAttendance.lectures_done} lectures done.</Text>
          <Text style={styles.text}>Need to attend {courseAttendance.required_to_attend} out of {courseAttendance.lectures_left} lectures left.</Text> */}
        </Content>
        <Text style={{textAlign: 'center', margin: 10, color: 'red', fontFamily: 'open-sans'}}>Minimum attendance required is 80%.</Text>
      </Container>
    );
  }
}

const styles = {
  percentage: {
    fontSize: 40,
    fontFamily: 'open-sans',
  },
  text: {
    fontSize: 20,
    fontFamily: 'open-sans',
    paddingTop: 15,
    textAlign: 'center'
  }
};

export default CourseAttendance;

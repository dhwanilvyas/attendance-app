import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ToastAndroid } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CourseList from '../components/CourseList';
import Student from '../utils/Student';

class SelectCourse extends Component {
  state = {
    visible: false
  };

  static navigationOptions = {
    title: 'Select course'
  };

  courseSeleted = async (course) => {
    this.setState({
      visible: true
    });
    const response = await Student.getSession(course.id);
    this.setState({
      visible: false
    });

    if (!response.data.data) {
      ToastAndroid.show('No session for this course is active', ToastAndroid.SHORT);
    } else {
      this.props.navigation.navigate('MarkAttendance', {course, session: response.data.data.session_id});
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Spinner cancelable visible={this.state.visible} textContent={"Please wait..."} textStyle={{color: '#FFF'}} />
          <CourseList courseSeleted={this.courseSeleted} />
        </Content>
      </Container>
    );
  }
}

export default SelectCourse;

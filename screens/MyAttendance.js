import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, H1, List, ListItem, Body, Text, Spinner, Left, Right, Icon } from 'native-base';
import CourseList from '../components/CourseList';

class MyAttendance extends Component {
  static navigationOptions = {
    title: 'My attendance'
  };

  courseSeleted = (course) => {
    this.props.navigation.navigate('CourseAttendance', {student: this.props.student, course});
  }

  render() {
    const { student } = this.props;

    if (!student) {
      return <Spinner />
    }

    return (
      <Container>
        <Content>
          <CourseList courseSeleted={this.courseSeleted} />
        </Content>
      </Container>
    );
  }
}

const styles = {
  listitem: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0
  }
};

mapStateToProps = ({student}) => {
  return {
    student
  };
}

export default connect(mapStateToProps)(MyAttendance);

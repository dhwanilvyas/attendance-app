import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, Text, Spinner } from 'native-base';
import { getStudentData } from '../redux/actions/student';

class Home extends Component {
  state = {
    student: null
  };

  static navigationOptions = {
    title: 'Mark attendance'
  };

  // componentDidMount() {
  //   const { params } = this.props.navigation.state;
  //   if (params.studentId)
  //     this.props.dispatch(getStudentData(this.props.navigation.state.params.studentId));
  // }

  render() {
    const { student } = this.props;

    if (!student) {
      return <Spinner />
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.title}>Hi, {student.name}</Text>
          <Button full dark onPress={() => this.props.navigation.navigate('SelectCourse')}>
            <Text>Mark attendance</Text>
          </Button>
          </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    // backgroundColor: '#26A69A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  title: {
    margin: 15,
    fontSize: 30
  }
}

mapStateToProps = ({student}) => {
  return {
    student: student.student
  };
}

export default connect(mapStateToProps)(Home);

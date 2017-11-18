import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, Text, Spinner } from 'native-base';
import { getStudentData } from '../redux/actions/student';
import commonStyles from '../utils/commonStyles';

class Home extends Component {
  static navigationOptions = {
    title: 'Mark attendance'
  };

  componentDidMount() {
    if (this.props.navigation.state.params)
      this.props.dispatch(getStudentData(this.props.navigation.state.params.studentId));
  }

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
    ...commonStyles.center,
    padding: 15
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 30,
    fontFamily: 'open-sans',
  }
}

mapStateToProps = ({student}) => {
  return {
    student
  };
}

export default connect(mapStateToProps)(Home);

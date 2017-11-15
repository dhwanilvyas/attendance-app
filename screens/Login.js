import React, { Component } from 'react';
import Expo from 'expo';
import { Container, Content, Center, Form, Item, Label, Input, H3, Button, Text, Spinner } from 'native-base';
import { ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import StudentApi from '../utils/Student';
import { getStudentData } from '../redux/actions/student';

class Login extends Component {
  state = {
    pageLoading: true,
    studentIdFound: true,
    studentId: null,
    loading: false,
    placeholder: '201612001'
  };

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    let studentId = await Expo.SecureStore.getItemAsync('attendanceapp');
    if (studentId) {
      this.props.dispatch(getStudentData(studentId));
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        pageLoading: false
      });
    }
  }

  checkStudentId = () => {
    if (!this.state.studentId) {
      ToastAndroid.show('Please enter student id', ToastAndroid.SHORT);
    } else {
      this.setState({
        loading: true
      });

      StudentApi.login(this.state.studentId)
        .then((response) => {
          if (!response.data) {
            this.setState({
              loading: false,
              studentIdFound: false,
              message: 'Student not found'
            });
          } else {
            this.props.dispatch(getStudentData(this.state.studentId));
            Expo.SecureStore.setItemAsync('attendanceapp', this.state.studentId);
            this.props.navigation.navigate('Tab', { studentId: this.state.studentId });
          }
        });
    }
  }

  render() {
    if (this.state.pageLoading) {
      return <Spinner />
    }

    return (
      <Container style={this.state.studentIdFound ? styles.container : styles.errorContainer}>
        <Content contentContainerStyle={styles.content}>
          <Form>
            <Text style={{ margin: 20, color: 'white'}}>Enter student id</Text>
            <Item style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
              <Input
                onChangeText={value => this.setState({studentId: value})}
                onSubmitEditing={this.checkStudentId}
                autoFocus
                keyboardType='numeric'
                placeholder={this.state.placeholder}
                value={this.state.studentId}
                placeholderTextColor='#e0e0e0'
                underlineColorAndroid='transparent'
                style={styles.input} />
              </Item>
            </Form>
          {!this.state.studentIdFound && <Text style={{margin: 20, color: '#212121'}}>Student id not found</Text>}
        </Content>
        <Button light block disabled={this.state.loading} style={{margin: 15, backgroundColor: this.state.loading ? '#e0e0e0' : '#ffffff'}} onPress={this.checkStudentId}>
          {!this.state.loading && <Text style={{color: !this.state.studentIdFound ? '#EF5350' : '#2ea664'}}>Proceed</Text>}
          {this.state.loading && <Spinner />}
        </Button>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#2ea664',
  },
  errorContainer: {
    backgroundColor: '#EF5350'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    fontSize: 30,
    color: '#ffffff'
  },
  button: {
    margin: 15
    // backgroundColor: '#ffffff',
    // marginBottom: 25,
    // marginLeft: 10,
    // marginRight: 10,
    // marginTop: 50
  },
  footerText: {
    color: '#2ea664',
  }
}

export default connect()(Login);

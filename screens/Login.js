import React, { Component } from 'react';
import Expo from 'expo';
import { Container, Content, Center, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { ToastAndroid } from 'react-native';
import StudentApi from '../utils/Student';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    pageLoading: true,
    studentIdFound: true,
    studentId: null,
    loading: false,
    deviceAlreadyRegistered: false
  };

  async componentDidMount() {
    let studentId = await Expo.SecureStore.getItemAsync('attendanceapp');
    if (studentId) {
      this.props.navigation.navigate('Home', {studentId});
    } else {
      this.setState({
        pageLoading: false
      });
    }
  }

  checkStudentId = () => {
    let studentIdFound = true, deviceAlreadyRegistered = false;

    if (!this.state.studentId) {
      ToastAndroid.show('Please enter student id', ToastAndroid.SHORT);
      return;
    }

    this.setState({
      loading: true
    });

    StudentApi.login(this.state.studentId)
      .then((response) => {
        if (!response.data.data) {
          studentIdFound = false;
          deviceAlreadyRegistered = false;
        } else if (response.data.data && response.data.data.device_already_registered) {
          studentIdFound = true;
          deviceAlreadyRegistered = true;
        } else {
          Expo.SecureStore.setItemAsync('attendanceapp', this.state.studentId);
          this.props.navigation.navigate('Home', { studentId: this.state.studentId });
        }

        this.setState({
          loading: false,
          studentIdFound,
          deviceAlreadyRegistered
        });
      });
  }

  render() {
    if (this.state.pageLoading) {
      return <Spinner />
    }

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Form>
            <Text style={{ margin: 20, fontFamily: 'open-sans', }}>Enter your student id</Text>
            <Item style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
              <Input
                onChangeText={value => this.setState({studentId: value})}
                onSubmitEditing={this.checkStudentId}
                autoFocus
                keyboardType='numeric'
                placeholder='201612001'
                value={this.state.studentId}
                placeholderTextColor='#acacac'
                underlineColorAndroid='transparent'
                returnKeyType='go'
                style={styles.input} />
              </Item>
            </Form>
            {!this.state.studentIdFound && <Text style={{margin: 20, color: 'grey', fontFamily: 'open-sans',}}>Student id does not exist. Please try again.</Text>}
            {this.state.deviceAlreadyRegistered && <Text style={{margin: 20, color: 'grey', fontFamily: 'open-sans',}}>Looks like you got a new device. Please contact the admin to update your device id.</Text>}
        </Content>
        <Button dark block disabled={this.state.loading} style={{ margin: 15 }} onPress={this.checkStudentId}>
          {!this.state.loading && <Text>Proceed</Text>}
          {this.state.loading && <Spinner />}
        </Button>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
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
    fontSize: 40,
    fontFamily: 'open-sans-light',
  },
}

export default Login;

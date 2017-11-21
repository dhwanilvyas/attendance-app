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
    message: null,
    studentId: null,
    loading: false,
    valid: false,
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
    let message = null;

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
          message = response.data.message;
        } else {
          Expo.SecureStore.setItemAsync('attendanceapp', this.state.studentId);
          this.props.navigation.navigate('Home', { studentId: this.state.studentId });
        }

        this.setState({
          loading: false,
          message,
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
                onChangeText={value => {
                  const valid = value.length >= 9 ? true : false;
                  this.setState({studentId: value, valid});
                }}
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
            {this.state.message && <Text style={{margin: 20, color: 'grey', fontFamily: 'open-sans',}}>{this.state.message}</Text>}
        </Content>
        <Button dark block disabled={this.state.loading || !this.state.valid} style={{ margin: 15 }} onPress={this.checkStudentId}>
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

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import Expo from 'expo';
import { Container, Spinner } from 'native-base';
import AppNavigation from './AppNavigation';
import store from './redux/store';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      appLoading: true
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    });

    this.setState({
      appLoading: false
    });
  }

  // componentDidMount() {
  //   Expo.SecureStore.deleteItemAsync('attendanceapp');
  // }

  render() {
    if (this.state.appLoading) {
      return (
        <View style={styles.container}>
          <Spinner />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <Container contentContainerStyle={styles.container}>
          <View style={styles.statusBar}>
            <StatusBar backgroundColor={'transparent'} translucent />
          </View>
          <AppNavigation />
        </Container>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 24
  },
  statusBar: {
    backgroundColor: "#000000",
    height: Expo.Constants.statusBarHeight,
  },
};

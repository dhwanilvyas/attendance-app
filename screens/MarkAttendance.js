import React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Container, Content, Button, Text } from 'native-base';
import Student from '../utils/Student';

const scanned = [];
class MarkAttendance extends React.Component {
  state = {
    hasCameraPermission: null,
  };

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Container>
          <Content contentContainerStyle={styles.container}>
            <BarCodeScanner
              onBarCodeRead={this.handleBarCodeRead}
              style={styles.container}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              >
                <Text style={styles.text}>Press this button only when it shows session complete on the big screen.</Text>
                <Button dark full style={styles.button} onPress={this.markAttendance}>
                  <Text>Mark attendance</Text>
                </Button>
              </BarCodeScanner>
          </Content>
        </Container>
      );
    }
  }

  handleBarCodeRead = ({ type, data }) => {
    if (!scanned.includes(data)) {
      scanned.push(data);
      ToastAndroid.show('QR scanned, wait for another to flash', ToastAndroid.SHORT);
    }
  }

  markAttendance = () => {
    if (!scanned.length) {
      ToastAndroid.show('You must scan atleast one QR code', ToastAndroid.SHORT);
      return;
    }

    const { session, course } = this.props.navigation.state.params;
    this.props.navigation.navigate('MarkingAttendance', {
      course,
      session,
      scanned
    });
  }
}

const styles = {
  container: {
     ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    margin: 15
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    padding: 10
  }
};

export default MarkAttendance;

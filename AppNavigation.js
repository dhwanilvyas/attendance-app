import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo from 'expo';
import Login from './screens/Login';
import SelectCourse from './screens/SelectCourse';
import MarkAttendance from './screens/MarkAttendance';
import MarkingAttendance from './screens/MarkingAttendance';
import Home from './screens/Home';
import MyAttendance from './screens/MyAttendance';
import CourseAttendance from './screens/CourseAttendance';

const Tabs = TabNavigator(
  {
    Home: { screen: Home },
    MyAttendance: { screen: MyAttendance },
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: '#212121',
      },
      labelStyle: {
        color: '#000000',
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffffff',
      },
    }
  }
);

const AppNavigation = StackNavigator(
  {
    Login: {
      screen: Login
    },
    MarkAttendance: {
      screen: MarkAttendance
    },
    MarkingAttendance: {
      screen: MarkingAttendance
    },
    SelectCourse: {
      screen: SelectCourse
    },
    CourseAttendance: {
      screen: CourseAttendance
    },
    Tab: {
      screen: Tabs,
      navigationOptions: {
        header: null,
        headerStyle: {
          marginTop: Expo.Constants.statusBarHeight
        }
      }
    }
  }
)

export default AppNavigation;

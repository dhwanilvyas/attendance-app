import React, { Component } from 'react';
import { List, ListItem, Body, Text, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { getStudentData } from '../redux/actions/student';

class CourseList extends Component {
  componentDidMount() {
    const { student } = this.props;
    this.props.dispatch(getStudentData(student.id));
  }

  render() {
    const { student } = this.props;

    return (
      <List>
        {student.courses.map(course => {
          return (
            <ListItem style={styles.listitem} key={course.id} onPress={() => this.props.courseSeleted(course)}>
              <Body>
                <Text>{course.name}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
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

export default connect(mapStateToProps)(CourseList);

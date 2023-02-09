import React, { Component } from 'react';
import { Button } from 'antd';



const childStyle = {
  padding: 20,
  margin: 20,
  backgroundColor: 'LightSkyBlue',
};

const NAME = 'Child 组件：';

export default class Child extends Component {
  constructor() {
    super();
    console.log(NAME, 'constructor');
    this.state = {
      counter: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(NAME, 'getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log(NAME, 'componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(NAME, 'shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(NAME, 'getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(NAME, 'componentDidUpdate');
  }

  componentWillUnmount() {
    console.log(NAME, 'componentWillUnmount');
  }

  changeCounter = () => {
    let { counter } = this.state;
    this.setState({
      counter: ++counter,
    });
  };

  render() {
    console.log(NAME, 'render',this.props,this.state);
    const { count } = this.props;
    const { counter } = this.state;
    return (
      <div style={childStyle}>
        <h3>子组件</h3>
        <p>父组件传过来的属性 count ： {count}</p>
        <p>子组件自身状态 counter ： {counter}</p>
        <Button  type='dashed' onClick={this.changeCounter}>改变自身状态 counter</Button>
      </div>
    );
  }
}
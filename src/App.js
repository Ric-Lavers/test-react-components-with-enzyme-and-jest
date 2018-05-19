import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () => {
  return( <div>testing</div> )
}
const Title = ({text}) => <h2>{text}</h2>

class App extends Component {
  state={
    on:false, 
    input:'',
    mainColor: 'blue',
    lifeCycle: '',
  }
  componentDidMount(){
    this.setState({ lifeCycle: 'componentDidMount' })
  }
  componentWillReceiveProps(){
    this.setState({ lifeCycle:"componentWillReceiveProps" })
  }

  handleStrings = (string) => {
    if(string = 'Hello World')return true;
    return false
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h2 className={this.state.mainColor} >Main color</h2>
        </header>
        <Title text={ 'something' }/>
        <p className="button-state">
          {this.state.on ? 'Yes!' : 'No!'}
        </p>
        <button onClick={() => this.setState({on: !this.state.on})} >click</button>

        <h3>{this.state.input}</h3>
        <input onChange={ e => this.setState({input:e.currentTarget.value})} type="text" />

        <p className="App-intro">
         Hey qorld
        </p>
        <ul  className="ric">
          <li></li>
          <li className="ric"></li>
          <li className="ric"></li>
        </ul>
        <Test/>
        <p className="lifeCycle">{this.state.lifeCycle}</p>
      </div>
    );
  }
}

export class Link extends Component {
  render(){
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}


export default App;

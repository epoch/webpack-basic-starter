import * as myModule from './myModule'
import './index.css'

console.log(myModule.intro)

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <App name="world" />, 
  document.getElementById('root')
);
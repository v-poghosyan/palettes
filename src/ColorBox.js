import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends Component {

  /* Props received : color, name */

  render () {

    return (
      <div style={{background: this.props.background}} className="ColorBox">
        <span>{this.props.name}</span>
      </div>
    );

  }

}

export default ColorBox;
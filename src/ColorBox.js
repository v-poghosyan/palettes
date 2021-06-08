import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {

  /* Props received : {color: '...', name: '...'} */

  render () {

    const {name, background} = this.props; /* Extracting the props */

    return (
      <CopyToClipboard text={background}>
        <div style={{background: background}} className="ColorBox">
          <div className="CB-copy-container">
            <div className="CB-box-name">
              <span>{name}</span>
            </div>
            <button className="CB-copy-button">Copy</button>
            <span className="CB-see-more">More</span>
          </div>
        </div>
      </CopyToClipboard>
    );

  }

}

export default ColorBox;
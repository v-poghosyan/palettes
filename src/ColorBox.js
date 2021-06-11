import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js'; /* Need this import to conditionally style text color based on the background color of a ColorBox */
import './ColorBox.css';

class ColorBox extends Component {

  /* Props received : {color: '...', name: '...', moreLink: true/false, ...} */

  constructor(props) {
    super(props);
    this.state = { beingCopied: false }; /* For conditional styling based on if ColorBox is being copied */
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    /* Sets beingCopied to 'true' and, as callback, sets it back to 'false' after 1.5 seconds */
    this.setState({beingCopied: true}, () => setTimeout(() => this.setState({beingCopied: false}), 1500));
  }

  render () {

    const {name, background, colorId, paletteId, moreLink} = this.props; /* Extracting the props */
    const copied = this.state.beingCopied; /* Extracting state */
    const isDark = (chroma(background).luminance() <= 0.15); /* Boolean value for whether or not a color is dark */
    const isLight = (chroma(background).luminance() >= 0.55); 

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background: background}}>
          {/* Next two divs are hidden overlays that appears only when ColorBox is being copied */}
          <div className={`CB-overlay ${copied ? 'show' : '' }`} style={{background: background}} />
          <div className={`CB-copy-msg ${copied ? 'show' : '' } ${isLight ? 'Dark-text' : ''}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="CB-copy-container">
            <div className={`CB-box-name ${isDark ? 'Light-text' : ''}`}>
              <span>{name}</span>
            </div>
            <button className={`CB-copy-button ${isLight ? 'Dark-text' : ''}`}>Copy</button>
            {/* Note 1: If ColorBox is being renderd from Palette, show 'see more' link. If being rendered from SingleColorPalette, don't */}
            {/* Note 2: stopPropagation() stops click event from propagating to parent CoptToClipboard, preventing copying */}
            {moreLink ? 
              <Link 
                to={`/palette/${paletteId}/${colorId}`} 
                onClick={(evt) => evt.stopPropagation()}
              > 
                <span className={`CB-see-more ${isLight ? 'Dark-text' : ''}`}>More</span>
              </Link> : "" }
          </div>
        </div>
      </CopyToClipboard>
    );

  }

}

export default ColorBox;
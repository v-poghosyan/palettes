import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

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

    const {classes, name, background, colorId, paletteId, moreLink} = this.props; /* Extracting the props */
    const copied = this.state.beingCopied; /* Extracting state */

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{background: background}}>
          {/* Next two divs are hidden overlays that appears only when ColorBox is being copied */}
          <div className={`${classes.CB_overlay} ${copied ? classes.CB_overlay_show : ''}`} style={{background: background}} />
          <div className={`${classes.CB_copy_msg} ${copied ? classes.CB_copy_msg_show : ''}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="CB-copy-container">
            <div className={classes.CB_box_name}>
              <span>{name}</span>
            </div>
            <button className={classes.CB_copy_button}>Copy</button>
            {/* Note 1: If ColorBox is being renderd from Palette, show 'see more' link. If being rendered from SingleColorPalette, don't */}
            {/* Note 2: stopPropagation() stops click event from propagating to parent CoptToClipboard, preventing copying */}
            {moreLink ? 
              <Link 
                to={`/palette/${paletteId}/${colorId}`} 
                onClick={(evt) => evt.stopPropagation()}
              > 
                <span className={classes.CB_see_more}>More</span>
              </Link> : "" }
          </div>
        </div>
      </CopyToClipboard>
    );

  }

}

export default withStyles(styles)(ColorBox);
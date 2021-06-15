import React, { Component } from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

// const backgroundImage = <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='69.282' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(207, 18%, 36%, 1)'/><path d='M13.333-3.849v23.094M6.667-15.396l20 11.547M13.333-19.245l20 11.547M20 0v23.094m20-34.641l-6.667 3.849-6.666 3.849L20 0M0-11.547l6.667 3.849 6.666 3.849L20 0m0-23.094l20 11.547v23.094L20 23.094l-6.667-3.849-6.666-3.849L0 11.547v-23.094l6.667-3.849 6.666-3.849zM40-3.769L20 7.698m20-3.849l-16.253 9.384L20 15.396M6.667-7.698v23.094m6.666 50.037v23.094M6.667 53.886l20 11.547M13.333 50.037l20 11.547M20 69.282v23.094m20-34.641l-6.667 3.849-6.666 3.849L20 69.282M0 57.735l6.667 3.849 6.666 3.849L20 69.282m0-23.094l20 11.547v23.094L20 92.376l-6.667-3.849-6.666-3.849L0 80.829V57.735l6.667-3.849 6.666-3.849zm20 19.325L20 76.98m20-3.849L20 84.678M6.667 61.584v23.094m26.666-53.886v23.094m-6.666-34.641l20 11.547M33.333 15.396l20 11.547M40 34.641v23.094m20-34.641l-6.667 3.849-6.666 3.849L40 34.641M20 23.094l6.667 3.849 6.666 3.849L40 34.641m0-23.094l20 11.547v23.094L40 57.735l-6.667-3.849-6.666-3.849L20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L40 42.339m20-3.849L40 50.037M26.667 26.943v23.094M-6.667 30.792v23.094m-6.666-34.641l20 11.547M-6.667 15.396l20 11.547M0 34.641v23.094m20-34.641l-6.667 3.849-6.666 3.849L0 34.641m-20-11.547l6.667 3.849 6.666 3.849L0 34.641m0-23.094l20 11.547v23.094L0 57.735l-6.667-3.849-6.666-3.849L-20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L0 42.339m20-3.849L0 50.037m-13.333-23.094v23.094'  stroke-width='0.5' stroke='hsla(194, 41%, 63%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>;

class PaletteList extends Component {

  /* Props received : { palettes: [the seed palettes]} } */

  render() {

    const {classes, palettes, deletePalette} = this.props; /* Extracting prop */

    return(
      <div className={classes.PaletteList}>
        <Navbar           
          showSlider={false}
          showFormatChanger={false}
          showAddNewPalette={true}
        />
        <div className={classes.PL_container}>
          <div className={classes.PL_palettes}>
            {palettes.map(
            (palette) => (
              <Link to={`/palette/${palette.id}`} key={palette.id}>
                <MiniPalette {...palette} key={palette.id} deletePalette={deletePalette}/>
              </Link>))} {/* Links to a matching Route "/palette/:id" */}
          </div>
        </div>
      </div>
    );

  }

}

export default withStyles(styles)(PaletteList);
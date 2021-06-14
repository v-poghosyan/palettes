import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import myTheme from './styles/Themes';

const drawerWidth = 250;
const appBarHeight = 45

const styles = {

  PaletteFormNav: {
    display: "flex"
  },

  appBar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    color: "#556e7d",
    height: `${appBarHeight}px`,
    transition: myTheme.transitions.create(['margin', 'width'], {
      easing: myTheme.transitions.easing.sharp,
      duration: myTheme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: myTheme.transitions.create(['margin', 'width'], {
      easing: myTheme.transitions.easing.easeOut,
      duration: myTheme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: myTheme.spacing(2),
  },

  popup: {

  }

}

class PaletteFormNav extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    ValidatorForm.addValidationRule(
      'isPalNameUnique', (value) => {
        return this.props.palettes.every((pal) => pal.paletteName.toLowerCase() !== value.toLowerCase());
      }
    );

  }

  render(){

    /* Extracting props */
    const {
      classes, 
      open,
      handleDrawerOpen,
      handleSave,
      handleTextChange,
      newPaletteName
    } = this.props;

    return(
      <div classname={classes.PaletteFormNav}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a palette
            </Typography>
            <div className={classes.popup}>
              <ValidatorForm onSubmit={() => handleSave(newPaletteName)}>
                <TextValidator
                  value={newPaletteName}
                  label="Palette Name"
                  name="newPaletteName" /* handleTextChange relies on this attribute */
                  onChange={handleTextChange}
                  validators={['required','isPalNameUnique']}
                  errorMessages={['Enter a palette name', 'Palette name already exists']}
                  style={{
                    width: "100%",
                  }}
                />
                <ThemeProvider theme={myTheme}>
                  <Button 
                    variant="contained"
                    type="submit"
                    color="secondary"
                    style={{
                      height: "25px",
                      marginLeft: "auto",
                      boxShadow: "none"
                    }}
                  >Save
                  </Button>
                </ThemeProvider>
              </ValidatorForm>
            </div>
            <ThemeProvider theme={myTheme}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  style={{
                    height: "25px",
                    marginLeft: "auto",
                    boxShadow: "none"
                  }}
                >Save Palette
                </Button>
                <Link to="/">
                  <Button 
                    variant="contained" 
                    color="secondary"
                    style={{
                      height: "25px",
                      marginLeft: "2px",
                      boxShadow: "none",
                      backgroundColor: "#f64f1e"
                    }}
                  >Back
                  </Button>
                </Link>
              </ThemeProvider>
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

export default withStyles(styles)(PaletteFormNav);
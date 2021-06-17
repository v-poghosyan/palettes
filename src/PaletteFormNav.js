import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import SavePaletteForm from './SavePaletteForm';
import classNames from 'classnames';
import {ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {Link} from 'react-router-dom';
import styles from './styles/PaletteFormNavStyles';
import myTheme from './styles/Themes';

class PaletteFormNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formShowing: false
    }
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  /* The following two methods control the pallete save dialog popup */
  showForm() {
    this.setState({formShowing: true});
  }

  hideForm() {
    this.setState({formShowing: false});
  }

  render(){

    /* Extracting props */
    const {
      classes,
      palettes,
      open,
      handleDrawerOpen,
      handleSave,
    } = this.props;
    const {formShowing} = this.state; /* Extracting state */

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
              className={classNames(classes.menuButton, {[classes.hide]: open})}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography className={classes.Title} variant="h6" noWrap>
              Create a palette
            </Typography>
            <ThemeProvider theme={myTheme}>
                <Button className={classes.Save_btn}
                  variant="contained" 
                  color="primary"
                  onClick={this.showForm}
                >Save
                </Button>
                <Link to="/">
                  <Button className={classes.Back_btn}
                    variant="contained" 
                    color="secondary"
                  >Back
                  </Button>
                </Link>
              </ThemeProvider>
              {formShowing ? 
                <SavePaletteForm 
                  hideForm={this.hideForm}
                  handleSave={handleSave} 
                  classes={classes} 
                  palettes={palettes}
                /> : ""}
          </Toolbar>
        </AppBar>
      </div>
    );

  }

}

export default withStyles(styles)(PaletteFormNav);
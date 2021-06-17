import React from 'react';
import styles from './styles/PageStyles';
import {withStyles} from '@material-ui/styles';

/* In App.js, writing <Page>page contents</Page> passes "page contents" in props.children to this component. Below, we're extracting children from props. */

function Page({children, classes}) {
  return <section className={classes.Page}>{children}</section>
}

export default withStyles(styles)(Page);
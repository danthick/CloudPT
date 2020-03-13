import React from 'react';
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    top: 0,
    left: 0,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));



export default function ButtonAppBar(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="fixed" style={{ background: '#57D957', boxShadow: 'none'}}>
            <Toolbar>
            {props.back? 
            <Link to={props.back} style={{color: "#a3a3a3"}}>
            <IconButton edge="start" color="inherit" aria-label="ArrowBackIosIcon">
                <ArrowBackIosIcon />
            </IconButton>
            </Link>
            
            : null}
            
            <Typography variant="h6" className={classes.title}>
                {props.pageName}
            </Typography>
            </Toolbar>
        </AppBar>
        <br/><br/>
        </div>
    );
}
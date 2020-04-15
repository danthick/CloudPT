import React from 'react';
// eslint-disable-next-line
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
    textAlign: "center"
  },
}));



export default function ButtonAppBar(props) {

    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "linear-gradient(90deg, rgba(117,236,117,1) 0%, rgba(92,184,92,1) 52%, rgba(71,140,71,1) 100%)", boxShadow: 'none', paddingTop: "30px"}}>
            <Toolbar>
            {props.back? 
            <Link to={props.back} style={{color: "#a3a3a3", width: "20px"}}>
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
        <br/><br/><br/><br/>
        </div>
    );
}
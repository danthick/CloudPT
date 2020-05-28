import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';

// Styles for bottom navigation bar
const useStyles = makeStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 100,
      height: "75px",
      borderTop: "1px solid #c7c7c7",
      overflow: "hidden",     
    },
  });
  
  export default function LabelBottomNavigation() {
    const classes = useStyles();
    // Checking what page the application is on
    const [value, setValue] = React.useState(window.location.pathname.split('/')[1]);
    const history = useHistory();
  
    const handleChange = (event, newValue) => {
        history.push(`/${newValue}`);
        setValue(newValue)
    };
    
    // Navigation routes
    return (
      <BottomNavigation value={value} onChange={handleChange}  className={classes.root}>
        <BottomNavigationAction disableTouchRipple={true} label="Home" value="home"  icon={<HomeIcon />} />
        <BottomNavigationAction disableTouchRipple={true} label="Workouts" value="workout"  icon={<FitnessCenterIcon />}/>
        <BottomNavigationAction disableTouchRipple={true} label="Messages" value="messages"  icon={<ChatIcon />} />
        <BottomNavigationAction disableTouchRipple={true} label="Account" value="account" icon={<PersonIcon />} />
      </BottomNavigation>
    );
  }
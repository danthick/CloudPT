import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: '0%'
    },
  });
  
  export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('home');
    const history = useHistory();
  
    const handleChange = (event, newValue) => {
        history.push(`/${newValue}`);
        setValue(newValue);
    };
  
    return (
      <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
        <BottomNavigationAction label="Home" value="home"  icon={<HomeIcon />}/>
        <BottomNavigationAction label="Workouts" value="workout"  icon={<FitnessCenterIcon />}/>
        <BottomNavigationAction label="Messages" value="messages"  icon={<ChatIcon />}/>
        <BottomNavigationAction label="Account" value="account" icon={<PersonIcon />} />
      </BottomNavigation>
    );
  }
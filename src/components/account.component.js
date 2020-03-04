import React, { Component, Fragment } from 'react';
// eslint-disable-next-line
import {BrowseRouter as Router, Route, Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default class Account extends Component{
    
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)

        this.state = {
            auth: false
          }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({
            auth: e.target.value
        });
      }

    componentDidMount() {
        fetch('http://localhost:4000/api/auth/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
                }
            ).then(res => {
                res.json().then(log => {
                     if (log.redirect === '/home') {
                        this.setState({auth: true});
                     } else {
                         window.location = "/"
                     }
                });
                }).catch(error => console.log(error))
            
      }


    logout() {
        //e.preventDefault();
        fetch('http://localhost:4000/api/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                  }
                }
            ).then(function(res) {
                res.json().then(log => {
                    console.log(log)
                    if (log.logout === true) {
                        //user = res.data.email;
                        window.location = '/'
                    } else {
                        // TO DO - didn't log in
                    }
                });
                }).catch(error => console.log(error))
    }
    

    
    
    render() {
        const classes = this.props;
        if (!this.state.auth) return null;
        return (
            <Fragment>
                <div style={{marginTop: 10}}>
                    <h3>This is the account page</h3>
                </div>

                <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                <Link to={'account/weight'}>
                <ListItem>
                {/* <ListItemIcon>
                    
                </ListItemIcon> */}
                <ListItemText primary="Update Weight" />
                </ListItem>
                </Link>

                <ListItem button>

                <ListItemText primary="Update Height" />
                </ListItem>

                <ListItem button>

                <ListItemText primary="Update User Details" />
                </ListItem>
                
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                    <ListItemText primary="Trash" />
                    </ListItem>
                    
                    <ListItemLink>
                        
                    <ListItemText primary="Spam" />
                    </ListItemLink>
                    
                </List>


                <div className="form-group">
                        <input type="button" value="Logout" className="btn btn-primary" onClick={this.logout} />
                </div>
            </div>

               
            </Fragment>
        )
    }
}
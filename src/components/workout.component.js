import React, { Component, Fragment } from 'react';


export default class Workout extends Component{
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

    render() {
        if (!this.state.auth) return null;
        return (
            <Fragment>

                <div style={{marginTop: 10}}>
                    <h3>This is the workout page</h3>
                </div>

                
              
            </Fragment>
            

        )
    }
}
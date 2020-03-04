import React, { Component, Fragment } from 'react';


export default class Home extends Component{
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)

        this.state = {
            auth: false
          }
          this.onChange = this.onChange.bind(this)
        // Do something
    }

    onChange(e) {
        this.setState({
            auth: e.target.value
        });
      }

    componentDidMount() {
        fetch('/api/auth/', {
                method: 'GET',
                //withCredentials: true,
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
                    //     //user = res.data.email;
                    //     window.location = '/home'
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
                    <h3>You have logged in!{this.props.user}</h3>
                </div>
                
              
            </Fragment>
            

        )
    }
}
import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


const SparkPost = require('sparkpost')
const client = new SparkPost('0637adc686a115395f4f4ccb9477d0c511f3f526')


client.transmissions.send({
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Authorization": "14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf"
      },
content: {
    from: 'no-reply@cloudpt.me',
    subject: 'Hello from app',
    html: '<p>Hello world</p>'
  },
  recipients: [
    {address: 'dan.thick@hotmail.co.uk'}
  ]
})
.then(data => {
  console.log('Woohoo! You just sent your first mailing!')
  console.log(data)
})
.catch(err => {
  console.log('Whoops! Something went wrong')
  console.log(err)
})

export default class Home extends Component{
    constructor(props) {
        super(props);

        this.state ={
            
        }
    }


    

    render() {
        return (
            <Fragment>
                <AppBar width="100%" pageName="HOME"/>
                
              
            </Fragment>
        )
    }
}
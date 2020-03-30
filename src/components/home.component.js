import React, { Component, Fragment } from 'react';
import AppBar from './appBar.component'


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
import {Spinner } from 'react-bootstrap'
import React from 'react'
export class Loading extends React.Component{
    render(){
        return (
            <Spinner animation="grow" variant="info" />
        )
    }
}

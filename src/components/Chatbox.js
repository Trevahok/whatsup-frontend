import React, { Component } from 'react'
import { InputGroup,FormControl, Card } from 'react-bootstrap'
import {  ArrowUpCircleFill } from 'react-bootstrap-icons'

export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            currentMesage : "",
        }
    }
    handleChange = (event)=>{
        var message = event.target.value;
        this.setState({currentMesage: message});
    }
    render() {
        return (
            <Card style={{ height: '100vh'}}>
                <Card.Header>
                    <p> room name </p>
                </Card.Header>
                <Card.Body>
                    <p> chats appear here </p>

                </Card.Body>
                <Card.Footer >
                    <InputGroup className="m-2">
                        <FormControl onChange={ this.handleChange } id="inlineFormInputGroup" placeholder="Type message..." value={this.state.currentMesage}/>
                        <InputGroup.Append className=''>
                            <InputGroup.Text className='rounded  bg-info text-light'> <ArrowUpCircleFill /> </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>

            </Card>

        )

    }

}
import React, { Component } from 'react'
import { ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap'
import { ArrowUpCircleFill } from 'react-bootstrap-icons'
import FlatList from 'flatlist-react'


export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMessage: ""
        }
    }
    handleChange = (event) => {
        var message = event.target.value;
        this.setState({ currentMessage: message });
        console.log(this.state.currentMessage)
    }
    handleSendMessage = () =>{
        this.props.sendMessage(this.state.currentMessage)
        this.setState({ currentMessage: "" })
    }
    handleKeyDown = event => {
        if (event.key === 'Enter') 
            this.handleSendMessage()
    }
    render() {
        const renderMessage = (message, idx) => (
            <ListGroup.Item key={idx}>
                {message}
            </ListGroup.Item>
        )

        return (
            <Card style={{ height: '100vh' }}>
                <Card.Header>
                    <h4> {this.props.currentRoom.name} </h4>
                    <p> {this.props.currentRoom.participants.map(e => e.name).join(', ')} </p>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <FlatList
                            list={this.props.messages}
                            renderItem={renderMessage}
                            renderWhenEmpty={() => <p className='text-center'> Much silence. </p>}
                        />

                    </ListGroup>
                </Card.Body>
                <Card.Footer >
                    <InputGroup className="m-2">
                        <FormControl onKeyDown={this.handleKeyDown} onChange={this.handleChange} id="inlineFormInputGroup" placeholder="Type message..." value={this.state.currentMessage} />
                        <InputGroup.Append className=''>
                            <Button onClick={this.handleSendMessage} className='rounded  bg-info text-light'> <ArrowUpCircleFill /> </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>

            </Card>

        )

    }

}
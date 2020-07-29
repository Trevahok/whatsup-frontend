import React, { Component } from 'react'
import { Badge, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap'
import { ArrowUpCircleFill } from 'react-bootstrap-icons'
import FlatList from 'flatlist-react'


export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMessage: ""
        }
    }
    handleSendMessage = () => {
        this.props.sendMessage(this.state.currentMessage.trim())
        this.setState({ currentMessage: "" })
    }
    handleKeyDown = event => {
        if (event.key === 'Enter' && this.state.currentMessage.trim() !== "")
            this.handleSendMessage()
    }
    render() {
        const renderMessage = (message, idx) => {
            const date = new Date(message.createdAt)
            return (
                <ListGroup.Item key={idx}>
                    <Row>
                        <Col>
                            {message.data}
                        </Col>
                        <Col xs={2}>
                            <Badge pill variant='secondary' >
                                {date.toDateString()}
                            </Badge>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        }
        if (!this.props.currentRoom)
            return (
                <Card style={{ height: '100vh' }}>
                    <Card.Body style={{ flex: 1, justifyContent: 'center' }}>
                        Click on a chat to get started
                    </Card.Body>

                </Card>

            )

        return (

            <Card style={{ height: '100vh' }}>
                <Card.Header>
                    <h4> {this.props.currentRoom.name} </h4>
                    <p> {this.props.currentRoom.participants.map(e => e.name).join(', ')} </p>
                    <p>Join this room using the ID: {this.props.currentRoom._id}</p>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                    <ListGroup>
                        <FlatList
                            list={this.props.messages}
                            renderItem={renderMessage}
                            renderWhenEmpty={() => <p className='text-center'> Since nobody is talking, let me ask. Whatsup? </p>}
                            groupBy
                        />

                    </ListGroup>
                </Card.Body>
                <Card.Footer  >
                    <InputGroup className="m-2">
                        <FormControl onKeyDown={this.handleKeyDown} onChange={(e) => this.setState({ currentMessage: e.target.value })} id="sendMessageInput" placeholder="Type message..." value={this.state.currentMessage} />
                        <InputGroup.Append className=''>
                            <Button onClick={this.handleSendMessage} variant='success' className='rounded text-light'> <ArrowUpCircleFill /> </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>

            </Card>

        )

    }

}
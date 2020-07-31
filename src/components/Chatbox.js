import React, { Component } from 'react'
import { Container, Badge, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap'
import { ArrowUpCircleFill, BoxArrowRight, } from 'react-bootstrap-icons'
import FlatList from 'flatlist-react'


export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMessage: ""
        }
    }
    toHHMMSS = (date) => {
        return new Date(date).toISOString().substr(11, 8);
    }

    handleSendMessage = () => {
        this.props.sendMessage(this.state.currentMessage.trim())
        this.setState({ currentMessage: "" })
    }
    handleKeyDown = event => {
        if (event.key === 'Enter' && this.state.currentMessage.trim() !== "")
            this.handleSendMessage()
    }

    render = () => {
        const renderMessage = (message, idx) => {
            return (
                <ListGroup.Item key={idx}>
                    <Container fluid>
                        <small className='text-muted'><small>{message.from} </small></small>
                        <Row>
                            <Col>
                                {message.data} 
                            </Col>
                            <Col sm={1}>
                                <Badge pill variant='secondary' >
                                    {` ${this.toHHMMSS(message.createdAt)} `}
                                </Badge>
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            )
        }
        if (!this.props.currentRoom)
            return (
                <Container style={{marginTop:'30%'}} className='text-center'>
                    Hey there, Click on a chat to get started !
                </Container>
            )

        return (

            <Card style={{ height: '100vh' }}>
                <Card.Header>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h4> {this.props.currentRoom.name} </h4>
                                    <p> {this.props.currentRoom.participants.map(e => e.name).join(', ')} </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Join this room using the ID: {this.props.currentRoom._id}</p>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={1}>
                            <Button variant='danger' onClick={() => this.props.leaveRoom(this.props.currentRoom._id)}>
                                <BoxArrowRight />
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }} >
                    <ListGroup>
                        <FlatList
                            list={this.props.messages}
                            renderItem={renderMessage}
                            renderWhenEmpty={() => <p className='text-center'> Since nobody is talking, let me ask. Whatsup? </p>}
                            groupBy={(el, idx) => new Date(el.createdAt).getHours()}
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
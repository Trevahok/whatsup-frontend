import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, InputGroup, FormControl, Card, Button } from 'react-bootstrap'
import { ArrowUpCircle, BoxArrowRight, CameraVideo, } from 'react-bootstrap-icons'
import FlatList from 'flatlist-react'
import { Link } from 'react-router-dom'
import Message from './Message.js'


export default class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMessage: ""
        }
        this.myRef = null 
    }

    handleSendMessage = () => {
        this.props.sendMessage(this.state.currentMessage.trim())
        this.setState({ currentMessage: "" })
    }
    handleKeyDown = event => {
        if (event.key === 'Enter' && this.state.currentMessage.trim() !== "")
            this.handleSendMessage()
    }
    handleSendButtonClick = () =>{
        if(this.state.currentMessage.trim() !== "")
            this.handleSendMessage()
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    render = () => {
        if (!this.props.currentRoom)
            return (
                <Container style={{ marginTop: '30%' }} className='text-center'>
                    Hey there, Click on a chat to get started !
                </Container>
            )

        return (

            <Card style={{ height: '100vh' }}>
                <Card.Header className='shadow-sm'>
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
                            <Link to= {`/call/${this.props.currentRoom._id}`} >
                            <Button variant='success'>
                                <CameraVideo />
                            </Button>

                            </Link>

                        </Col>
                        <Col xs={1}>
                            <Button variant='danger' onClick={() => this.props.leaveRoom(this.props.currentRoom._id)}>
                                <BoxArrowRight />
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}  >
                    <ListGroup id='chat'>
                        <FlatList
                            list={this.props.messages}
                            renderItem={(message, idx) => (<Message message={message} key={idx} />)}
                            renderWhenEmpty={() => <p className='text-center'> Since nobody is talking, let me ask. Whatsup? </p>}
                            groupBy={(el, idx) => this.formatDate(new Date(el.createdAt))}
                        />
                        <ListGroup.Item  style={{display: 'inline'}}ref={ (ref) => { if (ref ) { ref.scrollIntoView({ behavior: 'smooth', block: 'start' }) } }} ></ListGroup.Item>

                    </ListGroup>
                </Card.Body>
                <Card.Footer  >
                    <InputGroup className="m-2">
                        <FormControl onKeyDown={this.handleKeyDown} onChange={(e) => this.setState({ currentMessage: e.target.value })} id="sendMessageInput" placeholder="Type message..." value={this.state.currentMessage} />
                        <InputGroup.Append className=''>
                            <Button onClick={this.handleSendButtonClick} variant='success' className='rounded text-light'> <ArrowUpCircle /> </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Footer>

            </Card>

        )

    }

}

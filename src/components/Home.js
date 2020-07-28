import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            messages: [],
            rooms: [
                {
                    name: 'private room',
                    participants: [{ name: 'trev' }, { name: 'hohoho' }],
                    owner: { name: 'trev' }
                },
                {
                    name: 'room room',
                    participants: [{ name: 'trev' }, { name: 'hohoho' }],
                    owner: { name: 'trev' }
                },
                {
                    name: 'there is no room',
                    participants: [{ name: 'trev' }, { name: 'hohoho' }],
                    owner: { name: 'trev' }
                },
            ],
            currentRoom: {
                id: "room",
                name: "my goddamn room",
                participants: [
                    {
                        name: "trev",
                    },
                    {
                        name: "ahok"
                    },
                ]
            },
        }
    }
    sendMessage = (message) => {
        this.socket.emit('message', { message: message, room: this.state.currentRoom.id })
    }
    addSocket = () =>{
        this.socket = io.connect('http://localhost:8000')
        this.socket.on('connect', () => {
            this.socket.emit('joinRoom', { room: this.state.currentRoom.id })
        })
        this.socket.on('message', (data) => {
            this.setState({ messages: [...this.state.messages, data.message] })
        })

    }
    componentDidMount() {
        var token = localStorage.getItem('token')
        if (!token) {
            this.setState({ redirect: true })
            return
        }
        this.addSocket()
    }
    render() {

        if (this.state.redirect)
            return (<Redirect to='/login' />)
        return (
            <Container fluid>

                <Row>
                    <Col xs={3} className='bg-light border border-right-2 mr-0 p-0' style={{ height: '100vh' }}>
                        <Sidebar rooms={this.state.rooms} />
                    </Col>

                    <Col className='p-0' style={{ height: '100vh' }}>
                        <Chatbox sendMessage={this.sendMessage} currentRoom={this.state.currentRoom} messages={this.state.messages} />
                    </Col>
                </Row>
            </Container>

        )
    }
}
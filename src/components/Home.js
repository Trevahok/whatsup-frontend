import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import io from 'socket.io-client'
import { Route, Redirect, Switch, Router } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            rooms: [],
            currentRoom: null,
            messages: [],
            errors: [],
            loading: false,
        }
    }
    componentDidMount = async () => {
        this.token = localStorage.getItem('token')
        this.user = JSON.parse(localStorage.getItem('user'))
        if (!this.token) {
            this.setState({ redirect: true })
            return
        }
        this.addSocket()
        this.setState({ loading: true })
        await this.fetchRooms()
        this.setState({ loading: false })
    }
    addSocket = () => {
        this.socket = io.connect(process.env.REACT_APP_SERVER_URL)
        this.socket.on('message', (data) => {
            this.setState({ messages: [...this.state.messages, data] })
        })

    }
    sendMessage = (message) => {
        this.setState({ messages: [...this.state.messages, { data: message, createdAt: new Date().toString(), from: this.user.name }] })
        this.socket.emit('message', { from: this.user, message: message, roomId: this.state.rooms[this.state.currentRoom]._id })
    }
    fetchMessages = async (roomIdx) => {
        const res = await axios.get(`${process.env.REACT_APP_ROOM_URL}/${this.state.rooms[roomIdx]._id}/messages `, {
            headers: { Authorization: this.token }
        })
        this.setState({ messages: res.data.messages })

    }

    switchRoom = async (roomIdx) => {
        if (this.state.currentRoom)
            this.socket.emit('leaveRoom', { room: this.state.rooms[this.state.currentRoom]._id })
        this.socket.emit('joinRoom', { room: this.state.rooms[roomIdx]._id })
        this.setState({ currentRoom: roomIdx })
        this.setState({ loading: true })
        await this.fetchMessages(roomIdx)
        this.setState({ loading: false })

    }

    fetchRooms = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_ROOM_URL,
                { headers: { Authorization: this.token } }
            )
            this.setState({ rooms: res.data })
        }
        catch (error) {
            this.setState({ redirect: true })
            alert(error)
        }

    }

    createRoom = async (name) => {
        await axios.post(process.env.REACT_APP_ROOM_URL, { name: name },
            { headers: { Authorization: this.token } }
        )
        this.setState({ loading: true })
        await this.fetchRooms()
        this.setState({ loading: false })

    }
    joinRoom = async (roomid) => {
        try {
            await axios.post(process.env.REACT_APP_ROOM_URL + '/' + roomid + '/participants', { userid: this.user._id },
                { headers: { Authorization: this.token } }
            )
            this.setState({ loading: true })
            await this.fetchRooms()
            this.setState({ loading: false })
        }
        catch (error) {
            if (error.response.status !== 200) this.setState({ errors: error.response.data.errors })
            else this.setState({ errors: ['Unknown error occured'] })
            alert(error)
        }

    }
    leaveRoom = async (roomid) => {
        try {
            await axios.delete(process.env.REACT_APP_ROOM_URL + '/' + roomid + '/participants',
                { headers: { Authorization: this.token } }
            )
            this.setState({ loading: true })
            await this.fetchRooms()
            this.setState({ loading: false })
            this.setState({ currentRoom: null })
        }
        catch (error) {
            if (error.response.status !== 200) this.setState({ errors: error.response.data.errors })
            else this.setState({ errors: ['Unknown error occured'] })
            console.log(error)
            alert(error.response.data.errors)
        }

    }
    render() {

        if (this.state.redirect)
            return (<Redirect to='/login' />)
        return (
            <Container fluid>

                <Row>
                    <Col xs={3} className='bg-light border border-right-2 mr-0 p-0' style={{ height: '100vh' }}>
                        <Sidebar rooms={this.state.rooms} switchRoom={this.switchRoom} createRoom={this.createRoom} joinRoom={this.joinRoom} />
                    </Col>

                    <Col className='p-0' style={{ height: '100vh' }}>

                        <Chatbox leaveRoom={this.leaveRoom} messages={this.state.messages} sendMessage={this.sendMessage} currentRoom={this.state.rooms[this.state.currentRoom]} />
                    </Col>
                </Row>
                <Loading show={this.state.loading} />
            </Container>


        )
    }
}
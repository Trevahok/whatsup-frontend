import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            rooms: [],
            currentRoom: null
        }
    }
    sendMessage = (message) => {
        this.socket.emit('message', { message: message, room: this.state.rooms[this.state.currentRoom]._id })
    }
    addSocket = () => {
        this.socket = io.connect('http://localhost:8000')
        this.socket.on('message', (data) => {
            console.log('message')
            this.setState(prevState=>{
                const prevRooms = prevState.rooms
                prevRooms[prevState.currentRoom].messages = [...prevRooms[prevState.currentRoom].messages , data.message]
                return {
                    ...prevState,
                    rooms : prevRooms
                }

            })
        })

    }
    switchRoom = (roomIdx) => {
        if (this.state.currentRoom)
            this.socket.emit('leaveRoom', { room: this.state.rooms[this.state.currentRoom]._id })
        this.socket.emit('joinRoom', { room: this.state.rooms[roomIdx]._id })
        this.setState({ currentRoom: roomIdx })

    }
    fetchRooms = async ()=>{
        try {
            const res = await axios.get(process.env.REACT_APP_ROOM_URL, 
                { headers: { Authorization: this.token } }
            )
            this.setState({ rooms: res.data })
        }
        catch (error) {
            alert(error)
        }

    }
    componentDidMount = async () => {
        this.token = localStorage.getItem('token')
        if (!this.token) {
            this.setState({ redirect: true })
            return
        }
        this.fetchRooms()
        this.addSocket()
    }
    createRoom = async ( name )=>{
        await axios.post(process.env.REACT_APP_ROOM_URL, {name: name},
                { headers: { Authorization: this.token } }
        )
        this.fetchRooms()

    }
    render() {

        if (this.state.redirect)
            return (<Redirect to='/login' />)
        return (
            <Container fluid>

                <Row>
                    <Col xs={3} className='bg-light border border-right-2 mr-0 p-0' style={{ height: '100vh' }}>
                        <Sidebar rooms={this.state.rooms} switchRoom={this.switchRoom} createRoom={this.createRoom}/>
                    </Col>

                    <Col className='p-0' style={{ height: '100vh' }}>
                        <Chatbox sendMessage={this.sendMessage} currentRoom={this.state.rooms[this.state.currentRoom]}  />
                    </Col>
                </Row>
            </Container>

        )
    }
}
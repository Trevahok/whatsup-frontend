import React, { Component } from 'react'
import { OverlayTrigger, Tooltip, Button, Card, Row, Col, Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap'
import FlatList from 'flatlist-react'
import { CaretRight, Search, Plus, ChatLeft } from 'react-bootstrap-icons';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            roomName: "",
            searchRoomId: "",
        }
    }
    render() {
        const renderRoom = (room, idx) => (

            <ListGroup.Item id={room._id} key={room._id} variant='secondary' className='my-2 btn btn-outline-info text-left' onClick={() => this.props.switchRoom(idx)}>
                <Row>
                    <Col>
                        {room.name}
                    </Col>
                    <Col xs={1}>
                        <CaretRight />
                    </Col>
                </Row>
            </ListGroup.Item>

        )

        return (
            <Container fluid className='p-0'>
                <Card style={{ height: '100vh' }}>
                    <Card.Header >
                        <InputGroup className="m-0">
                            <FormControl id="roomInput" placeholder="Search Rooms..." onChange={e => this.setState({ searchTerm: e.target.value })} />
                            <InputGroup.Append className='success'>
                                <InputGroup.Text className='bg-primary'><Search /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card.Header>
                    <Card.Body style={{ overflowY: 'auto' }}>
                        <ListGroup className=' m-0 '>
                            <FlatList
                                list={this.props.rooms}
                                renderItem={renderRoom}
                                renderWhenEmpty={() => (
                                    <ListGroup.Item className='  '> Nothing to show here </ListGroup.Item>
                                )
                                }
                                searchTerm={this.state.searchTerm}
                                searchBy="name"
                                searchMinCharactersCount={2}
                                searchOnEveryWord


                            />
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <InputGroup className="m-0">
                            <FormControl id="createRoomInput" placeholder="Create Room Name..." value={this.state.roomName} onChange={e => this.setState({ roomName: e.target.value })} />
                            <InputGroup.Append className='primary'>
                                <Button variant='info' onClick={() => { this.props.createRoom(this.state.roomName); this.setState({roomName: ""}) }   }> 
                                    <Plus />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">ID length is 24 characters.</Tooltip>}>

                            <InputGroup className="m-0">
                                <FormControl value ={this.state.searchRoomId} id="joinRoomInput" placeholder="Join Room ID..." onChange={e => this.setState({ searchRoomId: e.target.value })} />
                                <InputGroup.Append className='primary'>
                                    <Button variant='warning' onClick={() => { if (this.state.searchRoomId.length === 24){ this.setState({searchRoomId: ""}); this.props.joinRoom(this.state.searchRoomId); } }}>
                                        <ChatLeft />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </OverlayTrigger>

                    </Card.Footer>
                </Card>
            </Container>


        )
    }
}
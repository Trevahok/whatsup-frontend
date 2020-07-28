import React, { Component } from 'react'
import {Button, Card, Row, Col, Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap'
import FlatList from 'flatlist-react'
import { CaretRight, Search, Plus } from 'react-bootstrap-icons';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            roomName : "",
        }
    }
    render() {
        const renderRoom = (room, idx) => (

            <ListGroup.Item id={room._id} key={idx} variant='secondary' className='my-2 btn btn-info text-left' onClick={() => this.props.switchRoom(idx)}>
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
               <Card  style={{ height: '100vh' }}>
                    <Card.Header >
                        <InputGroup className="m-0">
                            <FormControl id="inlineFormInputGroup" placeholder="Search Rooms..." onChange={e => this.setState({ searchTerm: e.target.value })} />
                            <InputGroup.Append className='success'>
                                <InputGroup.Text className='bg-success'><Search /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card.Header>
                    <Card.Body style={{overflowY :'auto'}}>
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
                            <FormControl id="inlineFormInputGroup" placeholder="Create Room Name..." onChange={e => this.setState({ roomName: e.target.value })} />
                            <InputGroup.Append className='primary'>
                                <Button variant='info' onClick={()=>this.props.createRoom(this.state.roomName)}>
                                    <Plus/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Card.Footer>
                </Card>
            </Container>


        )
    }
}
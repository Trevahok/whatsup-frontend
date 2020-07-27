import React, { Component } from 'react'
import { Row, Col, Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap'
import FlatList from 'flatlist-react'
import { CaretRight, Search } from 'react-bootstrap-icons';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            ]
        }
    }
    render() {
        const renderRoom = (room, idx) => (

            <ListGroup.Item key={idx} variant='secondary' className='my-2 btn btn-info text-left '>
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
            <Container fluid>
                <InputGroup className="m-2">
                    <FormControl id="inlineFormInputGroup" placeholder="Search Rooms..." />
                    <InputGroup.Append className='success'>
                        <InputGroup.Text className='bg-success'><Search /></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <ListGroup className=' ml-2 '>
                    <FlatList
                        list={this.state.rooms}
                        renderItem={renderRoom}
                        renderWhenEmpty={() => <p> Jeez, get some friends. </p>}
                    />
                </ListGroup>
            </Container>


        )
    }
}
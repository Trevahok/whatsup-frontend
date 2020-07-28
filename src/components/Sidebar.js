import React, { Component } from 'react'
import { Row, Col, Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap'
import FlatList from 'flatlist-react'
import { CaretRight, Search } from 'react-bootstrap-icons';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
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
                    <FormControl id="inlineFormInputGroup" placeholder="Search Rooms..." onChange={e => this.setState({ searchTerm: e.target.value })} />
                    <InputGroup.Append className='success'>
                        <InputGroup.Text className='bg-success'><Search /></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <ListGroup className=' ml-2 '>
                    <FlatList
                        list={this.props.rooms}
                        renderItem={renderRoom}
                        renderWhenEmpty={() => (
                            <ListGroup.Item className=' ml-2 '> Nothing to show here </ListGroup.Item>
                        )
                        }
                        searchTerm={this.state.searchTerm}
                        searchBy="name"
                        searchMinCharactersCount={2}
                        searchOnEveryWord


                    />
                </ListGroup>
            </Container>


        )
    }
}
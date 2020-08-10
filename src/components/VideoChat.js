import React from 'react'
import {Row, Col,Button, Card, Container } from 'react-bootstrap';
import axios from 'axios'
import Loading from './Loading'
import { TelephoneX } from 'react-bootstrap-icons';

export default class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentRoom : {},
            loading: true,
            errors:[]
        }
    }
    componentDidMount = async () =>{
        this.roomid = this.props.match.params.roomId 
        this.token =  localStorage.getItem('token')
        await this.fetchRoomDetails(this.roomid)
        this.setState({loading: false})
        console.log(this.state.currentRoom)



    }
    fetchRoomDetails = async (roomid) =>{
        try {
            const res = await axios.get(process.env.REACT_APP_ROOM_URL + '/' + roomid ,
                { headers: { Authorization: this.token } }
            )
            this.setState({currentRoom: res.data})
        }
        catch (error) {
            if (error.response.status !== 200) this.setState({ errors: error.response.data.errors })
            else this.setState({ errors: ['Unknown error occured'] })
            alert(error)
        }

    }
    render() {
        if(this.state.currentRoom === {} || !this.state.currentRoom.participants)
        return (
            <Loading show={this.state.loading} />
        )
        return (
            <Container fluid >

            <Card style={{height: '100vh'}} className='mt-3'>
            <Card.Header>
                <Container fluid>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h4> {this.state.currentRoom.name} </h4>
                                    <p> {this.state.currentRoom.participants.map(e=>e.name)} </p> 
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>Join this room using the ID: {this.state.currentRoom._id}</p>
                                </Col>
                            </Row>

                        </Col>
                        <Col xs={1}>
                            <Button variant='danger'>
                                <TelephoneX/>
                            </Button>
                        </Col>
                    </Row>
                </Container>
                </Card.Header>
                <Card.Body style={{ overflowY : 'auto'}}>


                </Card.Body>
                <Card.Footer>
                    <img height={150} width={350}></img>

                </Card.Footer>
                <Loading show={this.state.loading} />
            </Card>
            </Container>
        )
    }

}
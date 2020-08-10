import React from 'react'
import { Card } from 'react-bootstrap';
import axios from 'axios'

export default class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentRoom : {},
            loading: false,
            errors:[]
        }
    }
    componentDidMount = async () =>{
        var roomid = this.props.match.params.roomid;
        console.log(this.props.params)
        this.token = await localStorage.getItem('token')
        console.log(this.token)

    }
    fetchRoomDetails = async (roomid) =>{
        try {
            const res = await axios.get(process.env.REACT_APP_ROOM_URL + '/' + roomid , {},
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
        return (
            <Card style={{height: '100%'}}>
                <Card.Header>
                    <Card.Title>
                        {this.props.match.params.roomId || ' nothing to show her '}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <p>{this.token }</p>

                </Card.Body>
                <Card.Footer>

                </Card.Footer>

            </Card>
        )
    }

}
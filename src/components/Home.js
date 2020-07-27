import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'

export default class Home extends React.Component {
    render() {
        return (
            <Container fluid>

                <Row>
                    <Col xs={3} className='bg-light border border-right-2 mr-0 p-0' style={{height: '100vh'}}>
                        <Sidebar />
                    </Col>

                    <Col  className='p-0' style={{height: '100vh'}}>
                        <Chatbox />
                    </Col>
                </Row>
            </Container>

        )
    }
}
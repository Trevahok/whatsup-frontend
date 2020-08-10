import React from 'react'
import { Container, Badge, Row, Col, ListGroup, } from 'react-bootstrap'
export default class Message extends React.Component {
    toHHMMSS = (date) => {
        return new Date(date).toISOString().substr(11, 8);
    }
    render = ()=> {
        return (
            <ListGroup.Item key={this.props.key}>
                <Container fluid>
                    <small className='text-muted'><small>{this.props.message.from} </small></small>
                    <Row>
                        <Col>
                            {this.props.message.data}
                        </Col>
                        <Col sm={1}>
                            <Badge pill variant='secondary' >
                                {` ${this.toHHMMSS(this.props.message.createdAt)} `}
                            </Badge>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        )
    }
}
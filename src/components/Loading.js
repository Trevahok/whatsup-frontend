import { Row, Col, Modal, Spinner } from 'react-bootstrap'
import React from 'react'
export default class Loading extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="modal-dialog modal-sm" role="document">
                    <Row>
                        <Col sm={4}>
                            <Spinner size='lg' animation="grow" variant="info" />
                        </Col>
                        <Col>
                            Loading ...
                        </Col>
                    </Row>
                </div>
            </Modal>

        )
    }
}

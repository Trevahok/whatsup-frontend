import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { Row, Col, Container } from 'react-bootstrap';
import NavBar from './components/Navbar'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import VideoChat from './components/VideoChat'

class App extends React.Component {
  render() {
    return (

      <BrowserRouter >
        <NavBar />
        <Switch>
          <Route exact path='/login'  >
            <Container fluid>
              <Row>
                <Col></Col>
                <Col className="mt-5 col-md-6 col-md-offset-3 ">
                  <Login />
                </Col>
                <Col></Col>
              </Row>
            </Container>

          </Route>
          <Route exact path='/register'  >
            <Container fluid>
              <Row>
                <Col></Col>
                <Col className="mt-5 col-md-6 col-md-offset-3 ">
                  <Register />
                </Col>
                <Col></Col>
              </Row>
            </Container>

          </Route>
          <Route exact path='/' component={Home} />
          <Route  path='/call/:roomId' component={VideoChat} />
        </Switch>
      </BrowserRouter>

    );

  }
}
export default App

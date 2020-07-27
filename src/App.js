import React from 'react'
import Login from './components/Login'
import { Row, Col, Container } from 'react-bootstrap';
import NavBar from './components/Navbar'
import { Switch, Route, Router } from 'react-router-dom'
import Home from './components/Home'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (

        <Router history={history}>
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
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>

    );

  }
}
export default App

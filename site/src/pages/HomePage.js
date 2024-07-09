import React from 'react';
// import TeamList from '../components/teams/teamList';
import { Container, Navbar, Nav, Card, Row, Col } from 'react-bootstrap';
import GameCarousel from '../components/ticker/GameCarousel';
import '../index.css';
import { Link } from 'react-router-dom';
import nba_logo from '../static/nba-logo.png';
import nba_conf from '../static/nba-conf.png';
import placeholder from '../static/placeholder.png';




const HomePage = () => {
  return (
    <>
      <main>
        <GameCarousel/>
        <Container className="my-4">
            <h1>Welcome to IRLballers,</h1>
            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Link to='/teams'>
                            <Card.Img variant="top" src={nba_logo} alt='nba-logo' />
                        </Link>     
                        <Card.Body>
                            <Card.Title>
                                <Link to='/teams'>
                                    Teams
                                </Link>     
                            </Card.Title>
                            <Card.Text>
                                Explore NBA teams and their details.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Link to='/standings'>
                            <Card.Img style={{ height: '14.64rem' }} variant="top" src={nba_conf} />
                        </Link>   
                        <Card.Body>
                            <Link to='/standings'>
                                <Card.Title>Standings</Card.Title>
                            </Link>   
                            <Card.Text>
                                Check out where your favourite teams stand!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={placeholder} />
                        <Card.Body>
                            <Card.Title>About</Card.Title>
                            <Card.Text>
                                Learn more about IRLballers.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
      </main>
    </>
  )
}

export default HomePage
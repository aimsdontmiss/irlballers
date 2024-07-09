import React, { useContext, useEffect } from 'react';
import '../index.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import PlayoffContext from '../context/PlayoffContext';
import { MEDIA_URL } from '../config/index';
import { transformFilename } from '../utils/teamUtils';




function TeamPage() {
    
    const { id } = useParams();

    let { teamData } = useContext(PlayoffContext);
    
    useEffect(() => {
        console.log('Teams:', teamData);
        console.log('ID:', id);
    }, [teamData, id]);


    // const team = teamData?.find((team) => team.teamId === parseInt(id, 10));
    const team = teamData?.data?.allTeams.find((team) => team.teamId === parseInt(id, 10));
    console.log('Current Team:', team);

    if (!team) {

        return <p>Team not found</p>;

    }


    // const team_logo = team.name === 'Trail Blazers' ? transformFilename(team.logo) : team.logo;
    const team_logo = MEDIA_URL + team.logo

    // const logo =  MEDIA_URL + team_logo

    // if team.name ===

    console.log(team_logo)

  return (
    <>
        <main>
            <Container className="mt-4">
                <h1>{team.city} {team.name}</h1>
                <br/>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Img style={{ padding: '0.33rem' }} className="team-logo" variant="top" src={team_logo} alt={`${team.name} logo`} />
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{team.record.standing}. {team.city} {team.name}</Card.Title>
                                <Card.Text>
                                    <strong>City:</strong> {team.city} <br />
                                    <strong>Conference:</strong> {team.conference} <br />
                                    <strong>Record:</strong> {team.record.slug} <br />
                                    <strong>Coach:</strong> {team.coach} <br />
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

export default TeamPage;


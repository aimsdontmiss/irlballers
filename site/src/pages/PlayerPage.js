import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import '../index.css';




const fetchPlayer = async (playerId) => {
    const response = await fetch('http://localhost:8000/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any authorization headers if needed
        },
        body: JSON.stringify({
            query: `
                query GetPlayer($playerId: Int!) {
                    objPlayer(playerId: $playerId) {
                        playerId
                        name
                        number
                        country
                        school
                        birthdate
                        height
                        weight
                        teamName
                        position
                        stats {
                            ppg
                            apg
                            rpg
                        }
                    }
                }
            `,
            variables: {
                playerId: parseInt(playerId, 10), // Ensure playerId is an integer
            },
        }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    return data.data.objPlayer;
};

function PlayerPage() {
    const { playerId } = useParams();

    const { data: player, isLoading, error } = useQuery(
        ['player', playerId],
        () => fetchPlayer(playerId),
        {
            onError: (error) => {
                console.error('Error querying player', error);
            },
        }
    );

    if (player === null) return <p>Player N/A</p>;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const headshot = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;

    function calculateAge(birthdate) {
        // Parse birthdate string into a Date object
        const dob = new Date(birthdate);
    
        // Get current date
        const now = new Date();
    
        // Calculate age
        let age = now.getFullYear() - dob.getFullYear();
    
        // Adjust age if birthday hasn't occurred yet this year
        if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
            age--;
        }
    
        return age;
    }

    const dob = player.birthdate
    const DOB = dob.slice(0,10)
    const age = calculateAge(DOB)

    return (
        <>
            <main>
                <Container className="mt-3">
                    <h1>Stats</h1>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Img
                                    style={{ padding: '0.33rem' }}
                                    className="team-logo"
                                    variant="top"
                                    src={headshot}
                                    alt={`${player.name} logo`}
                                />
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{player.name}</Card.Title>
                                    <Card.Text>
                                        <strong>DOB:</strong> {DOB} ({age}) <br />
                                        <strong>Country:</strong> {player.country} <br />
                                        <strong>School:</strong> {player.school} <br />
                                        <strong>Height:</strong> {player.height}" <br />
                                        <strong>Weight:</strong> {player.weight}lb <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Team:</strong> {player.teamName} <br />
                                        <strong>Position:</strong> {player.position} <br />
                                        <strong>PPG:</strong> {player.stats.ppg} <br />
                                        <strong>APG:</strong> {player.stats.apg} <br />
                                        <strong>RPG:</strong> {player.stats.rpg} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}

export default PlayerPage;

import React, { useState, useEffect } from 'react';
import Standings from './standings';
import { Container } from '@mui/material';

const BracketData = () => {
    const [playoffData, setPlayoffData] = useState([]);

    useEffect(() => {
        // Fetch or set the playoff data
        const data = [
            { round: 1, matchup: 1, team1: "Team A", team2: "Team B", winner: "Team A" },
            { round: 1, matchup: 2, team1: "Team C", team2: "Team D", winner: "Team D" },
            // Add more matchups for subsequent rounds
        ];
        setPlayoffData(data);
    }, []);

    return (
        <>
            <Container>
                <h1>Playoff Bracket</h1>
                <Standings playoffData={playoffData} />
            </Container>

        </>
    );
};

export default BracketData;
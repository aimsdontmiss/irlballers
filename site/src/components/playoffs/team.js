import React from 'react';
import { Team as TournamentTeam } from '@g-loot/react-tournament-brackets';

const Team = ({ seed, name }) => {
    return (
        <TournamentTeam seed={seed}>
            {name}
        </TournamentTeam>
    );
}

export default Team;
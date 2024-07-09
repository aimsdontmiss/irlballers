import React, { useContext } from 'react';
import PlayoffContext from '../context/PlayoffContext';
import { Link } from 'react-router-dom';
import { MEDIA_URL } from '../config/index';
import '../index.css';

function TeamsPage() {
    const { teamData } = useContext(PlayoffContext);

    let teams = teamData.data.allTeams?.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Teams: ', teams);


    const groupedTeams = teams.reduce((acc, team) => {
        const firstChar = team.name.charAt(0).toUpperCase();
        const groupKey = /^[0-9]/.test(firstChar) ? '#' : firstChar;

        if (!acc[groupKey]) {
        acc[groupKey] = [];
        }
        acc[groupKey].push(team);
        return acc;
    }, {});

    // if !teams === 
    //     return <p>loading...</p>

  return (
    <div className="nba-container">
      <h1>Teams List</h1>
      {Object.keys(groupedTeams).sort().map((letter) => (
        <div key={letter} className="team-group">
          <h2 style={{ paddingLeft: '1.5rem' }}>{letter}</h2>
          <ul className="nba-team-list">
            {groupedTeams[letter].map((team) => (
              <li key={team.name} className="nba-team-item">
                <Link to={`/team/${team.teamId}`}>
                    <img src={MEDIA_URL + team.logo} alt={`${team.name} logo`} className="nba-team-logo" />
                </Link>
                <Link to={`/team/${team.teamId}`}>
                  <span className="nba-team-name">{team.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TeamsPage;

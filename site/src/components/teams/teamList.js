import { useQuery, gql } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import PlayoffContext from '../../context/PlayoffContext';
import { Link } from 'react-router-dom';


function TeamList() {

    let {teams, teamData, eastTeams, westTeams} = useContext(PlayoffContext)

    console.log(teamData)


    return (
        <>
            <main>
                <TableContainer component={Paper}>
                    <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>Eastern Conference</h1>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>RANK</TableCell>
                                <TableCell align="left">TEAM</TableCell>
                                <TableCell align="left">RECORD</TableCell>
                                <TableCell align="left">W%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {eastTeams.map(team => (
                            <TableRow
                            key={team.teamId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {team.record.standing}  
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/team/${team.teamId}`}>
                                        {team.city} {team.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{team.record.slug}</TableCell>
                                <TableCell align="left">{team.record.percent}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    <br />
                    <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>Western Conference</h1>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>RANK</TableCell>
                                <TableCell align="left">TEAM</TableCell>
                                <TableCell align="left">RECORD</TableCell>
                                <TableCell align="left">W%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {westTeams.map(team => (
                            <TableRow
                            key={team.teamId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {team.record.standing}.  
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/team/${team.teamId}`}>
                                        {team.city} {team.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{team.record.slug}</TableCell>
                                <TableCell align="left">{team.record.percent}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main> 
        </>
    )
};

export default TeamList;
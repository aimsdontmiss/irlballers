import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayoffContext from '../../context/PlayoffContext';
import { Link } from 'react-router-dom';




const Bracket = () => {

    let {eastPlayoffs, westPlayoffs} = useContext(PlayoffContext);

    console.log('EAST: ', eastPlayoffs)
    console.log('WEST: ', westPlayoffs)


  return (
    <>
        <main>
            <TableContainer component={Paper}>
                <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>East Playoffs</h1>
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
                        {eastPlayoffs.map(team => (
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
                <br />
                <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>West Playoffs</h1>
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
                        {westPlayoffs.map(team => (
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
}

export default Bracket;
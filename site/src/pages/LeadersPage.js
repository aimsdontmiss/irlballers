import React, { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import '../index.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 




const fetchStats = async ({ pageParam = 0, orderBy, order }) => {
    const response = await fetch('http://localhost:8000/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query GetLeaderboardStats($orderBy: StatOrderField!, $order: SortOrder!, $first: Int, $skip: Int) {
                    allStats(orderBy: $orderBy, order: $order, first: $first, skip: $skip) {
                        name
                        playerId
                        playerSet {
                            teamName
                        }
                        ppg
                        apg
                        rpg
                    }
                }
            `,
            variables: {
                orderBy: orderBy,
                order: order,
                first: 25,
                skip: pageParam
            }
        }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    return data.data.allStats;
};

function LeadersPage() {
    const [orderBy, setOrderBy] = useState("PPG");
    const [order, setOrder] = useState("DESC");

    const queryClient = useQueryClient();

    const {
        data: statsData,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['stats', orderBy, order],
        ({ pageParam = 0 }) => fetchStats({ pageParam, orderBy, order }),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length === 25) {
                    return allPages.length * 25; // Assuming 10 items per page
                } else {
                    return false;
                }
            },
        }
    );

    const handleSortChange = (field) => {
        if (field === orderBy) {
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setOrderBy(field);
            setOrder('DESC');
        }
        queryClient.invalidateQueries(['stats', field, order === 'ASC' ? 'DESC' : 'ASC']);
    };

    const getSortIcon = (field) => {
        if (orderBy === field) {
            return order === 'ASC' ? <FaArrowDown /> : <FaArrowUp />;
    }
        return null;
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main>
            <TableContainer component={Paper}>
                <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>League Leaders</h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>RANK</TableCell>
                            <TableCell>PLAYER NAME</TableCell>
                            <TableCell onClick={() => handleSortChange('PPG')}>PPG {getSortIcon('PPG')}</TableCell>
                            <TableCell onClick={() => handleSortChange('APG')}>APG {getSortIcon('APG')}</TableCell>
                            <TableCell onClick={() => handleSortChange('RPG')}>RPG {getSortIcon('RPG')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statsData.pages.map((page, pageIndex) =>
                            page.map((player, index) => (
                                <TableRow
                                    key={player.playerId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{pageIndex * 25 + index + 1}. </TableCell>
                                    <TableCell>
                                        <Link to={`/player/${player.playerId}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{player.ppg}</TableCell>
                                    <TableCell>{player.apg}</TableCell>
                                    <TableCell>{player.rpg}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

            </TableContainer>
            {hasNextPage && (
                <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </button>
            )}
        </main>
    );
}

export default LeadersPage;



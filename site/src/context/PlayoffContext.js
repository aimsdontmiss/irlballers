import { createContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

const PlayoffContext = createContext();

export default PlayoffContext;

export const PlayoffProvider = ({children}) => {

    // const queryClient = useQueryClient();

    // let [ teams, setTeams ] = useState([]);

    // const fetchTeams = async () => {
    //     const response = await fetch('localhost:8000/api/graphql/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Add any authorization headers if needed
    //       },
    //       body: JSON.stringify({
    //         query: `
    //           query {
    //             allTeams {
    //               conference
    //               teamId
    //               city
    //               name
    //               record {
    //                 slug
    //                 percent
    //                 standing
    //               }
    //             }
    //           }
    //         `,
    //       }),
    //     });
    //     const data = await response.json();
    //     return data;
    // };
    
    // const { data: teamData, loading, error } = useQuery(
    //     ['teams'],
    //     () => fetchTeams(),
    //     {

    //         onSuccess: (teamData) => {
    //             setTeams(teamData)
    //         },

    //         onError: (error) => {
    //             console.error('error querying teams', error)
    //         }
    //     }
    // )

    // const sortedTeams = [...teamData?.allTeams].sort((a, b) => {
    //     // First, compare conferences
    //     if (a.conference !== b.conference) {
    //         return a.conference.localeCompare(b.conference);
    //     }
    //     // If conferences are the same, compare standings
    //     return a.record.standing - b.record.standing;
    // });

    // const eastTeams = sortedTeams.filter(team => team.conference === 'EAST');
    // const westTeams = sortedTeams.filter(team => team.conference === 'WEST');

    // let contextData = {
    //     teams: teams,
    //     eastTeams: eastTeams,
    //     westTeams: westTeams,

    // }

    const queryClient = useQueryClient();
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        const response = await fetch('http://localhost:8000/api/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any authorization headers if needed
            },
            body: JSON.stringify({
                query: `
                    query {
                        allTeams {
                            conference
                            teamId
                            city
                            name
                            abbreviation
                            coach
                            logo
                            record {
                                slug
                                percent
                                standing
                            }
                        }
                    }
                `,
            }),
        });
        const data = await response.json();
        return data;
    };


    
    const { data: teamData, loading, error } = useQuery(
        ['teams'],
        fetchTeams,
        {
            onError: (error) => {
                console.error('Error querying teams', error);
            },
        }
    );

    // useEffect(() => {
    //     if (teamData && teamData.allTeams) {
    //         const sortedTeams = [...teamData.allTeams].sort((a, b) => {
    //             if (a.conference !== b.conference) {
    //                 return a.conference.localeCompare(b.conference);
    //             }
    //             return a.record.standing - b.record.standing;
    //         });

    //         setTeams(sortedTeams);
    //     }
    // }, [teamData]);

    const allTeams = teamData?.data?.allTeams || [];

    const sortedTeams = [...allTeams].sort((a, b) => {
        if (a.conference !== b.conference) {
            return a.conference.localeCompare(b.conference);
        }
        return a.record.standing - b.record.standing;
    });

    const eastTeams = sortedTeams?.filter((team) => team.conference === 'EAST');
    const westTeams = sortedTeams?.filter((team) => team.conference === 'WEST');

    const eastPlayoffs = eastTeams?.slice(0,8);
    const westPlayoffs = westTeams?.slice(0,8);

    const contextData = {
        teams: teams,
        teamData: teamData,
        eastTeams: eastTeams,
        westTeams: westTeams,
        eastPlayoffs: eastPlayoffs,
        westPlayoffs: westPlayoffs,
    };

    return (
            <PlayoffContext.Provider value={contextData}>
                {children}
            </PlayoffContext.Provider>
    )

}


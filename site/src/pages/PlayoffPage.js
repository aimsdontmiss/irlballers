import React from 'react';
import BracketData from '../components/playoffs/bracketData';
import Standings from '../components/playoffs/standings';
import Bracket from '../components/playoffs/bracket';
import { useContext } from 'react';
import PlayoffContext from '../context/PlayoffContext';

const PlayoffPage = () => {
  const { eastPlayoffs, westPlayoffs } = useContext(PlayoffContext);

  
    const playoffData = {
        name: `${eastPlayoffs[0]?.abbreviation} v. ${westPlayoffs[4]?.abbreviation}`,
        children: [
          {
            name:  `${westPlayoffs[2]?.abbreviation} v. ${westPlayoffs[4]?.abbreviation}`,
            children: [
              {
                name: `${westPlayoffs[0]?.abbreviation} v. ${westPlayoffs[4]?.abbreviation}`,
                children: [
                  { name: `${westPlayoffs[0]?.abbreviation} v. ${westPlayoffs[6]?.abbreviation}` },
                  { name: `${westPlayoffs[3]?.abbreviation} v. ${westPlayoffs[4]?.abbreviation}` }
                 
                ]
              },
              {
                name: `${westPlayoffs[2]?.abbreviation} v. ${westPlayoffs[1]?.abbreviation}`,
                children: [
                  { name: `${westPlayoffs[2]?.abbreviation} v. ${westPlayoffs[5]?.abbreviation}` },
                  { name: `${westPlayoffs[1]?.abbreviation} v. ${westPlayoffs[7]?.abbreviation}` }
                ]
              }
            ]
          },
          {
            name:  `${eastPlayoffs[0]?.abbreviation} v. ${eastPlayoffs[5]?.abbreviation}`,
            children: [
              {
                name: `${eastPlayoffs[0]?.abbreviation} v. ${eastPlayoffs[3]?.abbreviation}`,
                children: [
                  { name: `${eastPlayoffs[0]?.abbreviation} v. ${eastPlayoffs[7]?.abbreviation}` },
                  { name: `${eastPlayoffs[3]?.abbreviation} v. ${eastPlayoffs[4]?.abbreviation}` }

                ]
              },
              {
                name: `${eastPlayoffs[5]?.abbreviation} v. ${eastPlayoffs[1]?.abbreviation}`,
                children: [
                  { name: `${eastPlayoffs[2]?.abbreviation} v. ${eastPlayoffs[5]?.abbreviation}` },
                  { name: `${eastPlayoffs[1]?.abbreviation} v. ${eastPlayoffs[6]?.abbreviation}` }

                ]
              }
            ]
          },
        ]
    };
      
      
      
  return (
    <>
      <main>
        <Bracket />
        <Standings playoffData={playoffData}/>
      </main>
    </>
  )
}

export default PlayoffPage
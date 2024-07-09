import React from 'react';
import '../ticker/ticker.css';



const games = [
    { id: 1, teams: "Celtics vs Mavericks", date: "2024-06-06", score: "107-89" },
    { id: 2, teams: "Celtics vs Mavericks", date: "2024-06-09", score: "105-98" },
    { id: 3, teams: "Celtics vs Mavericks", date: "2024-06-12", score: "106-99" },
    { id: 4, teams: "Celtics vs Mavericks", date: "2024-06-14", score: "84-122" },
    { id: 5, teams: "Celtics vs Mavericks", date: "2024-06-17", score: "106-88" },
    // Add more games as needed
  ];


const kudosMessage = "Congratulations to your 2024 NBA Champions the Boston Celtics             ";


function GameCarousel() {
  return (
    <>
        <div className="ticker">
            <div className="ticker__inner">
                {games.map((game) => (
                <div key={game.id} className="ticker__item">
                    <span className="ticker__teams">GM {game.id}: {game.teams}</span>
                    <span className="ticker__date">{game.date}</span>
                    <span className="ticker__score">{game.score}</span>
                </div>
                ))}
                <div className="ticker__item">
                    <span className='ticker__msg'>{kudosMessage}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default GameCarousel
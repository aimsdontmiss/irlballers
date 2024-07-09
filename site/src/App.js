import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import HomePage from './pages/HomePage';
import PlayoffPage from './pages/PlayoffPage';
import Header from './components/header/header';
import { PlayoffProvider } from './context/PlayoffContext';
import BackToTopButton from './components/button/BackToTopButton';
import TeamPage from './pages/TeamPage';
import StandingPage from './pages/StandingPage';
import Footer from './components/footer/footer';
import LeadersPage from './pages/LeadersPage'
import PlayerPage from './pages/PlayerPage';
import TeamsPage from './pages/TeamsPage';




function App() {
  return (
    <>
      <Router>
        <PlayoffProvider>
          <Header />
          <Routes>
            <Route path='/' Component={HomePage} />
            <Route path='/playoffs' Component={PlayoffPage} />
            <Route path='/team/:id' Component={TeamPage} />
            <Route path='/player/:playerId' Component={PlayerPage} />
            <Route path='/standings' Component={StandingPage} />
            <Route path='/leaders' Component={LeadersPage} />
            <Route path='/teams' Component={TeamsPage} />
          </Routes>
          <Footer />
          <BackToTopButton />
        </PlayoffProvider>
      </Router>
    </>
  );
}

export default App;

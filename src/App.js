import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/Sidebar';
import Games from './components/Games/Games';
import  Streams from './components/TopStreams/topStreams';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Live from './components/Live/live';
import GameStreams from './components/GameStreams/GameStream';
import Resultats from './components/Résultats/resultats';
import Erreur from './components/Erreur/erreur';


function App() {
  return (
    <React.StrictMode>
      <Router>

        <div className="App">
              <Header />
              <Sidebar/>
              <Routes>
                  <Route exact path='/' Component={Games}/>
                  <Route exact path='/top-streams' Component={Streams}/>
                  <Route exact path='/live/:slug' Component={Live}/>
                  <Route exact path="/game/:slug" Component={GameStreams}/>
                  <Route exact path="/resultats/:slug" Component={Resultats}/>
                  <Route exact path='/resultats/' Component={Erreur}/>
              </Routes> 
        </div>

      </Router>
    </React.StrictMode>
    
  );
}

export default App;

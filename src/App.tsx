import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./App.css";
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import Seasons from './Data/Seasons';
import SeasonView from './Components/SeasonView';
// Test for push to master

const ActiveSeasons: number[] = [
  1,
  2
]


function App() {
  const [activeSeason, setActiveSeason] = useState(1);

  return (
    <>
      <Navbar expand="lg" className="App_NavBar" sticky="top">
        <Container>
          <Navbar.Brand >Album Club</Navbar.Brand>
          <Navbar.Brand className="App_SpotifyPlayer">
            <div id="SpotifyPlayer" />
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              Season
            </Dropdown.Toggle>            
            <Dropdown.Menu>
              {ActiveSeasons.map(seasonNumber => {
                return <Dropdown.Item 
                        onClick={() => { setActiveSeason(seasonNumber) }}
                        key={`Season${seasonNumber}`}>{`Season ${seasonNumber}`}
                      </Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <div className={"App_Container"}>
        <SeasonView Albums={Seasons[activeSeason -1]}/>
      </div>
    </>
  );
}

export default App;
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
    <div className={"App_Root"}>
      <Navbar expand="lg" className="App_NavBar" sticky="top">
        <Container>
          <div className="App_SpotifyPlayer">
            <div id="SpotifyPlayer" />
          </div>
        </Container>
      </Navbar>
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
      <div className={"App_Container"}>
        <SeasonView Albums={Seasons[activeSeason -1]}/>
      </div>
    </div>
  );
}

export default App;
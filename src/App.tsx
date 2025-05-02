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
      <div className="App_NavBar">
        <div className="App_SpotifyPlayer">
          <div id="SpotifyPlayer" />
        </div>
      </div>
      <Dropdown className={"App_Season_Dropdown"}>
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
        <SeasonView Albums={Seasons[activeSeason - 1]} />
      </div>
    </div>
  );
}

export default App;
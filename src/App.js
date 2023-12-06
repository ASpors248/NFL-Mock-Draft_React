import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { ProspectPanel } from './features/prospect/ProspectPanel';
import { PickPanel } from './features/pick/PickPanel';
import {Prospect, Team, Draft} from './components.js'

function App() {
  const [draft, setDraft] = useState(Draft([], []));
  let testProspect = Prospect("Alex Spors", "Wisconsin", "WR");
  let testProspect2 = Prospect("Tim Schieck", "Colorado", "TE");
  let testProspect3 = Prospect("Dan Saaman", "Vermont", "QB");
  let testTeam = Team("Green Bay", "Packers", 20);
  let testTeam2 = Team("Denver", "Broncos", 14);
  let testTeam3 = Team("New England", "Patriots", 3);

  useEffect(() => {
    if (draft.Prospects.length === 0) {
      loadDraft();
    }
  }, [draft])

  function loadDraft() {
    let currentDraft = Draft([testProspect, testProspect2, testProspect3], [testTeam, testTeam2, testTeam3]);
    console.log("loadDraft: ", currentDraft);
    setDraft(currentDraft);
  }

  console.log("draft: ", draft);

  return (
    <div className="App draft">
      <div className="header-panel">
        <h1>Welcome to the 2024 NFL Draft</h1>
        <h3>The Pack are back!</h3>
      </div>
      {(draft.Prospects.length > 0 && draft.Teams.length > 0) && 
        <>
          <ProspectPanel prospects={draft.Prospects} />
          <PickPanel teams={draft.Prospects} prospects={draft.Teams} />
        </>
      }
    </div>
  );
}

export default App;

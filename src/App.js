import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { DraftPanels } from './features/draft/DraftPanels';
import {Prospect, Team, Draft} from './components'

function App() {
  const [draft, setDraft] = useState(Draft([], []));
  let testProspect = Prospect("Alex Spors", "Wisconsin", "WR");
  let testProspect2 = Prospect("Tim Schieck", "Colorado", "TE");
  let testProspect3 = Prospect("Dan Saaman", "Vermont", "QB");
  let testProspect4 = Prospect("Chad Springetti", "Arizona", "K");
  let testTeam = Team("Green Bay", "Packers", ["1"]);
  let testTeam2 = Team("Denver", "Broncos", ["2", "4"]);
  let testTeam3 = Team("New England", "Patriots", ["3"]);

  useEffect(() => {
    if (draft.Prospects === undefined || draft.Prospects?.length === 0) {
      loadDraft();
    }
  }, [draft])

  function loadDraft() {
    let currentDraft = Draft([testProspect, testProspect2, testProspect3, testProspect4], [testTeam, testTeam2, testTeam3]);
    setDraft(currentDraft);
  }

  return (
    <div className="App draft">
      <div className="header-panel">
        <h1>Welcome to the 2024 NFL Draft</h1>
        <h3>The Pack are back!</h3>
      </div>
      {(draft.Prospects?.length > 0 && draft.Teams?.length > 0) && 
        <>
          <DraftPanels draft={draft}/>
        </>
      }
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function DraftPanels(draft) {
    const [currentDraft, setCurrentDraft] = useState(draft.draft)
    const [availableProspects, setAvailableProspects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [isOnTheClock, setIsOnTheClock] = useState({});

    useEffect(() => {
        if (availableProspects?.length === 0) {
            setAvailableProspects(currentDraft.Prospects);
        }
        if (teams?.length === 0) {
            setTeams(currentDraft.Teams);
            setIsOnTheClock(currentDraft.Teams[0]);
        }
        if (isSorted === false && teams.length > 0) {
            sortTeams();
            setIsSorted(true);
        }
    }, [currentDraft, teams, availableProspects, isOnTheClock]);
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        currentProspects[indexOfProspect].isAvailable = false;
        let currentTeams = [...teams];
        let indexOfOnTheClockTeam = currentTeams.indexOf(isOnTheClock);
        let currentTeam = isOnTheClock;
        if (currentTeam.Selections === null) {
            currentTeam.Selections = new Array();
            currentTeam.Selections.push(currentProspects[indexOfProspect]);
        } else {
            currentTeam.Selections.push(currentProspects[indexOfProspect]);
        }
        currentTeams[indexOfOnTheClockTeam] = currentTeam;
        setTeams(currentTeams);
        currentProspects.splice(indexOfProspect, 1);
        setAvailableProspects(currentProspects);
        setIsOnTheClock(teams[indexOfOnTheClockTeam + 1]);
    }

    function sortTeams() {
        let sortedArray = [];
        for (var i = 1; i < 5; i++) {
            let pickNum = i;
            for (var n = 0; n < teams.length; n++) {
                let teamHasCurrentPick = teams[n]?.PickNumbers?.includes(pickNum.toString());

                if (teamHasCurrentPick === true) {
                    sortedArray.push(teams[n]);
                    break;
                } 
            }
        }
        setTeams(sortedArray);
    }

    function populatePickPanel(team, index) {
        console.log("here");
        let hasMadePick = team.Selections === null ? false : true;
        let hasMoreThanOnePick = team.PickNumbers.length > 1;
        let pickNum = index + 1;
        return (
            formatTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick)
        )
    }

    function formatTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick) {
        console.log("has more than one: ", hasMoreThanOnePick, team);
        if (hasMadePick === true) {
            if (hasMoreThanOnePick === false) {
                return (
                    <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].School}`}</p>
                )
            } else {
                if (index > 0 && teams[index - 1].Selections === null) {
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}`}</p>
                    )
                } else {
                    let indexOfPick = team.PickNumbers.indexOf(pickNum.toString());
                    console.log("pickNum: ", pickNum);
                    console.log("indexOfPick: ", indexOfPick);
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[indexOfPick].School}`}</p>
                    )
                }
            }
        } else {
            return (
                <p>{`${pickNum}: ${team.City} ${team.Name}`}</p>
            )
        }
    }
    console.log(teams);
    console.log(isOnTheClock);
    return (
    <>
        <div className="pick-panel">
            {teams.length > 0 && 
                teams.map((team, index) => {
                    console.log("firstMap");
                    return (
                        populatePickPanel(team, index)
                    )
                })
            }
        </div>
        <div className="prospect-panel">
                {availableProspects?.length > 0 && 
                availableProspects.map((p, index) => {
                    return (
                        <React.Fragment key={index}>
                            {p?.isAvailable === true &&
                                <div className="prospect-card">
                                    <div className="prospect-info">
                                        <p>{`${p.Name}, ${p.Position}`}</p>
                                        <p>{p.School}</p>
                                    </div>
                                    <div className="prospect-select">
                                        <input type="button" aria-label={`Select ${p.Position}, ${p.Name}`} value="Draft Player" onClick={() => selectProspect(index)} />
                                    </div>    
                                </div>
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    </>
    );
}
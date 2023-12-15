import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function DraftPanels(draft) {
    const [currentDraft, setCurrentDraft] = useState(draft.draft)
    const [availableProspects, setAvailableProspects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [teamOnTheClock, setTeamOnTheClock] = useState({});

    useEffect(() => {
        if (availableProspects?.length === 0) {
            setAvailableProspects(currentDraft.Prospects);
        }
        if (teams?.length === 0) {
            setTeams(currentDraft.Teams);
            setTeamOnTheClock(currentDraft.Teams[0]);
        }
        if (isSorted === false && teams.length > 0) {
            sortTeams();
            setIsSorted(true);
        }
    }, [currentDraft, teams, availableProspects, teamOnTheClock]);
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        let currentTeams = [...teams];
        let indexOfOnTheClockTeam = currentTeams.indexOf(teamOnTheClock);
        let isFirstSelection = teamOnTheClock.Selections === null;
        let isFinalTeam = indexOfOnTheClockTeam === teams.length - 1;

        currentTeams[indexOfOnTheClockTeam] = addProspectToTeam(isFirstSelection, teamOnTheClock, currentProspects, indexOfProspect);
        setTeams(currentTeams);

        currentProspects[indexOfProspect].isAvailable = false;
        setAvailableProspects(currentProspects);

        if (!isFinalTeam) {
            setTeamOnTheClock(teams[indexOfOnTheClockTeam + 1]);
        }
    }

    function addProspectToTeam(isFirstSelection, currentTeam, currentProspects, indexOfProspect) {
        if (isFirstSelection) {
            currentTeam.Selections = new Array();
            currentTeam.Selections.push(currentProspects[indexOfProspect]);
        } else {
            currentTeam.Selections.push(currentProspects[indexOfProspect]);
        }

        return currentTeam;
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
        let hasMadePick = team.Selections === null ? false : true;
        let hasMoreThanOnePick = team.PickNumbers.length > 1;
        let pickNum = index + 1;
        return (
            formatTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick)
        )
    }

    function formatTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick) {
        let indexOfPick = team.PickNumbers.indexOf(pickNum.toString());
        if (hasMadePick === true) {
            if (hasMoreThanOnePick === false) {
                return (
                    <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].School}`}</p>
                )
            } else {
                if (team.Selections[indexOfPick] === undefined) {
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}`}</p>
                    )
                } else {
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[indexOfPick].Name}, ${team.Selections[indexOfPick].Position} - ${team.Selections[indexOfPick].School}`}</p>
                    )
                }
            }
        } else {
            return (
                <p>{`${pickNum}: ${team.City} ${team.Name}`}</p>
            )
        }
    }

    return (
    <>
        <div className="pick-panel">
            {teams.length > 0 && 
                teams.map((team, index) => {
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
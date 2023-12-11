import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function DraftPanels(draft) {
    const [currentDraft, setCurrentDraft] = useState(draft.draft)
    const [availableProspects, setAvailableProspects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        if (availableProspects?.length === 0) {
            setAvailableProspects(currentDraft.Prospects);
        }
        if (teams?.length === 0) {
            setTeams(currentDraft.Teams);
        }
        if (isSorted === false && teams.length > 0) {
            sortTeams();
            setIsSorted(true);
        }
    }, [currentDraft, teams]);
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        currentProspects.splice(indexOfProspect, 1);
        setAvailableProspects(currentProspects);
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
            determineTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick)
        )
    }

    function determineTeamDisplay(team, index, pickNum, hasMadePick, hasMoreThanOnePick) {
        if (hasMadePick === true) {
            if (!hasMoreThanOnePick) {
                return (
                    <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].Schoool}`}</p>
                )
            } else {
                if (index > 0 && teams[index - 1].Selections === null) {
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}`}</p>
                    )
                } else {
                    let indexOfPick = team.PickNumbers.indexOf(pickNum);
                    return (
                        <p>{`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[indexOfPick].Schoool}`}</p>
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
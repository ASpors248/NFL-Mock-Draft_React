import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function DraftPanels(allTeams, allProspects) {

    const [availableProspects, setAvailableProspects] = useState(Object.values(allProspects)[0]);
    const [teams, setTeams] = useState(Object.values(allTeams)[0]);

    useEffect(() => {
        
    }, [availableProspects, teams])
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        currentProspects.splice(indexOfProspect, 1);
        setAvailableProspects(currentProspects);
    }

    function populatePickPanel(team, indexOfTeamInArr) {
        let hasMadePick = team.Selections === null ? false : true;
        let hasMoreThanOnePick = team.PickNumbers.length > 1;
        let hasFirstRoundPick = doesTeamHaveFirstRoundPick(team, hasMoreThanOnePick)
        switch(hasMadePick) {
            case true:
                if (!hasMoreThanOnePick) {
                    return (
                        <p>`${team.PickNumbers[0]}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].Schoool}`</p>
                    )
                } else {
                    if (indexOfTeamInArr > 0 && teams[indexOfTeamInArr - 1].Selections === null) {
                        return (
                            <p>`${team.PickNumbers[1]}: ${team.City} ${team.Name}</p>
                        )
                    } else {
                        return (
                            <p>`${team.PickNumbers[0]}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].Schoool}`</p>
                        )
                    }
                }
            case false:
                if (!hasFirstRoundPick) {
                    break;
                }

                if (!hasMoreThanOnePick) {
                    return (
                        <p>`${team.PickNumbers[0]}: ${team.City} ${team.Name}</p>
                    )
                } else {
                    if (team.PickNumbers[0] === indexOfTeamInArr + 1) {
                        return (
                            <p>`${team.PickNumbers[0]}: ${team.City} ${team.Name}</p>
                        )
                    } else {
                        return (
                            <p>`${team.PickNumbers[1]}: ${team.City} ${team.Name}</p>
                        )
                    }
                }
        }
    }

    function doesTeamHaveFirstRoundPick(team, hasMoreThanOnePick) {
        if (hasMoreThanOnePick === false) {
            return team.PickNumbers[0] <= 32;
        } else {
            return team.PickNumbers.some(num => num <= 32);
        }
    }

    return (
    <>
        <div className="pick-panel">
            {teams.length > 0 && 
                teams.map((t, index) => {
                    return (
                        populatePickPanel(t, index)
                    )
                })
            }
        </div>
        <div className="prospect-panel">
            <table className="prospect-table">
            {availableProspects.length > 0 && 
                availableProspects.map((p, index) => {
                    return (
                        <>
                            {p.isAvailable === true &&
                                <tr key={index}>
                                    <div className="prospect-card">
                                        <p>{p.Position}</p>
                                        <p>{p.Name}</p>
                                        <p>{p.School}</p>
                                        <input type="button" aria-label={`Select ${p.Position}, ${p.Name}`} value="Select Player" onClick={() => selectProspect(index)}/>
                                    </div>
                                </tr>   
                            }
                        </>
                    )
                })
            }
            </table>
        </div>
    </>
    );
}
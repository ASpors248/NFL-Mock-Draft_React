import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function DraftPanels(allTeams, allProspects) {

    const [availableProspects, setAvailableProspects] = useState(Object.values(allProspects)[0]);
    const [teams, setTeams] = useState(Object.values(allTeams)[0]);

    useEffect(() => {
        console.log("prospects: ", allProspects, " teams: ", teams);
    }, [availableProspects, teams])
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        currentProspects.splice(indexOfProspect, 1);
        setAvailableProspects(currentProspects);
    }

    function sortAndReturnHTML() {
        let sortedArray = [];
        let pickNum = 1;
        for (let i = 0; i < 33; i++) {
            let teamHasCurrentPick = teams[i].PickNumbers?.includes(pickNum.toString());
            if (teamHasCurrentPick === true) {
                sortedArray.push(teams[i]);
                pickNum++
            } 
        }
        console.log("sorted: ", sortedArray);
        return populatePickPanel(sortedArray);
    }

    function populatePickPanel(sortedTeamArray) {
        sortedTeamArray.map((team, index) => {
            let hasMadePick = team.Selections === null ? false : true;
            let hasMoreThanOnePick = team.PickNumbers.length > 1;
            let pickNum = index + 1;

            switch(hasMadePick) {
                case true:
                    if (!hasMoreThanOnePick) {
                        return (
                            <p>`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[0].Schoool}`</p>
                        )
                    } else {
                        if (index > 0 && teams[index - 1].Selections === null) {
                            return (
                                <p>`${pickNum}: ${team.City} ${team.Name}</p>
                            )
                        } else {
                            let indexOfPick = team.PickNumbers.indexOf(pickNum);
                            return (
                                <p>`${pickNum}: ${team.City} ${team.Name}: ${team.Selections[0].Name}, ${team.Selections[0].Position} - ${team.Selections[indexOfPick].Schoool}`</p>
                            )
                        }
                    }
                case false:    
                    return (
                        <p>`${pickNum}: ${team.City} ${team.Name}</p>
                    )
            }
        })
    }

    return (
    <>
        <div className="pick-panel">
            {sortAndReturnHTML()}
        </div>
        <div className="prospect-panel">
            <table className="prospect-table">
            {availableProspects?.length > 0 && 
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
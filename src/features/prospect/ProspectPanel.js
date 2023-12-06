import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Prospect} from '../../components.js';

export function ProspectPanel(prospects) {

    const [availableProspects, setAvailableProspects] = useState(Object.values(prospects)[0]);

    useEffect(() => {

    }, [availableProspects])
    
    function selectProspect(indexOfProspect) {
        let currentProspects = [...availableProspects];
        currentProspects.splice(indexOfProspect, 1);
        setAvailableProspects(currentProspects);
    }

    return (
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
    );
}
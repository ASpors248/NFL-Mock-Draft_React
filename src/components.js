export const Prospect = (Name, School, Position, isAvailable = true) => {return {Name: Name, School: School, Position: Position, isAvailable: isAvailable }};
export const Team = (City, Name, PickNumbers) => {return {City: City, Name: Name, PickNumbers: PickNumbers}}
export const Draft = (Prospects, Teams) => {return {Prospects: Prospects, Teams: Teams}};

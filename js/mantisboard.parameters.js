/*!
 * mantisboard.parameters.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/REAME.md
 */

//  mantisboard = {
//     "projectName" : "mantisbt",
//     "filterName" : "My Monitored Issues",
//     "issueLimit" : "500",
//     "status" : {
//       "newName" : "new",
//       "feedbackName" : "feedback",
//       "acknowledgedName" : "acknowledged",
//       "confirmedName" : "confirmed",
//       "assignedName" : "assigned",
//       "resolvedName" : "resolved",
//       "closedName" : "closed",
//     },
//     "keyTISSEO" : "",
//     "chartColors" : [[76,95,51],[183,81,133],[164,207,91],[223,184,98],[47,66,124],[151,50,101],[128,170,56],[184,145,61],[109,126,177],[201,114,158],[184,219,124],[231,199,131]]
// }


JSONtiles = [
{
  "type" : "FilterName",
  "headerText" : "MANTIS FILTER",
  "mainText" : "",
  "row" : "1",
  "col" : "1",
  "sizex" : "3",
  "sizey" : "1"
},
{
  "type" : "Weather",
  "headerText" : "METEO",
  "mainText" : "weatherToulouse",
  "row" : "1",
  "col" : "6",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "Weather",
  "headerText" : "METEO",
  "mainText" : "weatherLePecq",
  "row" : "1",
  "col" : "7",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "Chart",
  "headerText" : "ISSUES PROGRESS (TOTAL/RESOLVED)",
  "mainText" : "",
  "displayFunction" : "displayMantisCategoriesBar",
  "chartColors" : [[255,160,160],[204,238,221]],
  "row" : "3",
  "col" : "1",
  "sizex" : "3",
  "sizey" : "2"
},
{
  "type" : "Chart",
  "headerText" : "TOTAL ISSUES / CATEGORY",
  "mainText" : "",
  "displayFunction" : "displayMantisCategories", 
  "row" : "1",
  "col" : "4",
  "sizex" : "2",
  "sizey" : "2"
},
{
  "type" : "Chart",
  "headerText" : "RESOLVED ISSUES / CATEGORY",
  "mainText" : "",
  "displayFunction" : "displayMantisCategoriesResolved", 
  "row" : "2",
  "col" : "6",
  "sizex" : "2",
  "sizey" : "2"
},
{
  "type" : "Chart",
  "headerText" : "COMPOSANT SANDIE",
  "mainText" : "",
  "displayFunction" : "displayMantisComposantSANDIE", 
  "row" : "2",
  "col" : "1",
  "sizex" : "3",
  "sizey" : "1"
},
{
  "type" : "P",
  "headerText" : "FA list",
  "mainText" : "blabla<br/>fdfd",
  "row" : "7",
  "col" : "1",
  "sizex" : "4",
  "sizey" : "1"
},
{
  "type" : "Date",
  "headerText" : "",
  "mainText" : "",
  "row" : "3",
  "col" : "4",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "Tisseo",
  "headerText" : "NEXT BUS",
  "mainText" : "3245432", // bus stop id
  "row" : "4",
  "col" : "4",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "H1",
  "headerText" : "SPRINT",
  "mainText" : "R02S02",
  "row" : "4",
  "col" : "5",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "Countdown",
  "headerText" : "SPRINT END",
  "mainText" : "2013/07/17/18/0/0",
  "row" : "3",
  "col" : "5",
  "sizex" : "1",
  "sizey" : "1"
},
{
  "type" : "Chart",
  "headerText" : "TOTAL ISSUES / STATUS",
  "mainText" : "",
  "displayFunction" : "displayMantisStatus", 
  "row" : "4",
  "col" : "6",
  "sizex" : "2",
  "sizey" : "2"
},
];



MantisCustomFields={
  "Complexité" : {
    "" : 62,
    "0.5" : 2,
    "1" : 3,
    "2" : 3,
    "3" : 6,
    "5" : 3,
    "8" : 2,
  },
  "Composant_SANDIE" : {
    "Commun" : 6,
    "DPR" : 9,
    "GSI" : 13,
    "HUGO" : 4,
    "MAGIC" : 7,
    "MANET" : 6,
    "OSC" : 13,
    "WSProd" : 23,
  },
  "Priorité" : {
    "" : 10,
    "0" : 3,
    "1" : 14,
    "2" : 11,
    "3" : 14,
    "4" : 14,
    "5" : 7,
    "6" : 6,
    "7" : 1,
    "-1" : 1,
  },
  "RAF" : {
    "" : 8,
    "0" : 26,
    "0.2" : 1,
    "0.5" : 6,
    "0.25" : 1,
    "1" : 7,
    "2" : 13,
    "3" : 8,
    "4" : 1,
    "5" : 6,
    "7" : 1,
    "10" : 2,
    "12" : 1,
  },
  "Sprint_SANDIE-MCO" : {
    "R02S02" : 81,
  },
  "Temps passé" : {
    "" : 54,
    "0" : 5,
    "0.2" : 1,
    "0.5" : 4,
    "0.25" : 2,
    "1" : 2,
    "1.5" : 4,
    "2" : 3,
    "3" : 2,
    "3.5" : 2,
    "0.75" : 1,
    "6" : 1,
  }
};


MantisCustomFieldsResolved={
  "Complexité" : {
  "" : 62,
  "0.5" : 2,
  "1" : 3,
  "2" : 3,
  "3" : 6,
  "5" : 3,
  "8" : 2,
  },
  "Composant_SANDIE" : {
  "Commun" : 2,
  "DPR" : 3,
  "GSI" : 5,
  "HUGO" : 2,
  "MAGIC" : 4,
  "MANET" : 5,
  "OSC" : 10,
  "WSProd" : 17
  },
  "Priorité" : {
  "" : 10,
  "0" : 3,
  "1" : 14,
  "2" : 11,
  "3" : 14,
  "4" : 14,
  "5" : 7,
  "6" : 6,
  "7" : 1,
  "-1" : 1
  },
  "RAF" : {
  "" : 8,
  "0" : 26,
  "0.2" : 1,
  "0.5" : 6,
  "0.25" : 1,
  "1" : 7,
  "2" : 13,
  "3" : 8,
  "4" : 1,
  "5" : 6,
  "7" : 1,
  "10" : 2,
  "12" : 1
  },
  "Sprint_SANDIE-MCO" : {
  "R02S02" : 81
  },
  "Temps passé" : {
  "" : 54,
  "0" : 5,
  "0.2" : 1,
  "0.5" : 4,
  "0.25" : 2,
  "1" : 2,
  "1.5" : 4,
  "2" : 3,
  "3" : 2,
  "3.5" : 2,
  "0.75" : 1,
  "6" : 1
  }
};

MantisJSON={};

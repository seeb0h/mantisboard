/*!
 * mantisboard.tiles.functions.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/README.md
 */


;

function displayMantisCategories(chartCanvas){
   var dataset={};
  // Count each Categories type
  $.each(MantisJSON, function(i, item) {
    if(typeof dataset[item.category] == "undefined")
      dataset[item.category]=0;
    dataset[item.category]++;
  });

  plotPieFromStruct(chartCanvas, dataset);
} 



function displayMantisCategoriesResolved(chartCanvas){
  // Set mantisboard.status.resolvedID according to mantisboard.status.resolvedName and status of the mantis
  var statusResolvedID=getMantisStatusID(mantisboard.status.resolvedName);

  var dataset={};
  // Count each Categories type for resolved issues
  $.each(MantisJSON, function(i, item) {
    if(item.status==statusResolvedID) {
      if(typeof dataset[item.category] == "undefined")
        dataset[item.category]=0;
      dataset[item.category]++;
    }
  });

  // plot results
  plotPieFromStruct(chartCanvas, dataset);
} 

function displayMantisCategoriesBar(chartCanvas, chartColors){
  // Set mantisboard.status.resolvedID according to mantisboard.status.resolvedName and status of the mantis
  var statusResolvedID=getMantisStatusID(mantisboard.status.resolvedName);
  
  var dataset=[];
  // Count each Categories type
  dataset[0]={};
  dataset[1]={};
  $.each(MantisJSON, function(i, item) {
    if(typeof dataset[0][item.category] == "undefined")
      dataset[0][item.category]=0;
    dataset[0][item.category]++;
    if(item.status==statusResolvedID) {
      if(typeof dataset[1][item.category] == "undefined")
        dataset[1][item.category]=0;
      dataset[1][item.category]++;
    }
  });

  // plot results
  plotBarFromListStruct(chartCanvas, dataset, chartColors);
}



function displayMantisStatus(chartCanvas){
  var dataset={};
  var statusName;
  // Count each Categories type
  $.each(MantisJSON, function(i, item) {
    statusName=getMantisStatusName(item.status)
    if(typeof dataset[statusName] == "undefined")
      dataset[statusName]=0;
    dataset[statusName]++;
  });

  // plot results
  plotPieFromStruct(chartCanvas, dataset);
}

function displayMantisComposantSANDIE(chartCanvas, chartColors){
  var dataset=[];
  // Count each Categories type for resolved issues
  dataset[0]={};
  dataset[1]={};
  for (var item in MantisCustomFields['Composant_SANDIE']) {
    dataset[0][item]=MantisCustomFields['Composant_SANDIE'][item];
  }
  for (var item in MantisCustomFieldsResolved['Composant_SANDIE']) {
    dataset[1][item]=MantisCustomFieldsResolved['Composant_SANDIE'][item];
  }

  // plot results
  plotBarFromListStruct(chartCanvas, dataset, chartColors);
}



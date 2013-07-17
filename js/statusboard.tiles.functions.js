/*!
 * mantisboard.tiles.functions.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the MIT license
 * https://github.com/seeb0h/mantisboard/blob/master/README.md
 */


//
// Set function called for each tiles
//
function setTilesFunctions () {
  $.each(JSONtiles, function(i, tile) {
    var element;

    element = $('#tileMain_'+i+'>canvas');


    if(tile.displayFunction!=undefined) {  
      // function for charts
      if(element[0]) {
        // console.log('#tileMain_'+i+'>canvas : ' + element[0]);
        // console.log('tile.displayFunction : ' + tile.displayFunction);

        if(tile.displayFunction=='displayMantisCategories') {
          element.bind('displayFunction', function(event, chartCanvas) {
            var dataset={};
            // Count each Categories type
            $.each(MantisJSON, function(i, item) {
              if(dataset[item.category]==undefined)
                dataset[item.category]=0;
              dataset[item.category]++;
            });

            // plot results
            plotPieFromStruct(chartCanvas, dataset);
          });
        }


        if(tile.displayFunction=='displayMantisCategoriesResolved') {
          element.bind('displayFunction', function(event, chartCanvas) {
            // Set mantisboard.params.status.resolvedID according to mantisboard.params.status.resolvedName and status of the mantis
            var statusResolvedID=getMantisStatusID(mantisboard.params.status.resolvedName);

            var dataset={};
            // Count each Categories type for resolved issues
            $.each(MantisJSON, function(i, item) {
              if(item.status==statusResolvedID) {
                if(dataset[item.category]==undefined)
                  dataset[item.category]=0;
                dataset[item.category]++;
              }
            });

            // plot results
            plotPieFromStruct(chartCanvas, dataset);
          });
        }
  
        if(tile.displayFunction=='displayMantisCategoriesBar') {
          element.bind('displayFunction', function(event, chartCanvas) {
            // Set mantisboard.params.status.resolvedID according to mantisboard.params.status.resolvedName and status of the mantis
            var statusResolvedID=getMantisStatusID(mantisboard.params.status.resolvedName);
            
            var dataset=[];
            // Count each Categories type
            dataset[0]={};
            dataset[1]={};
            $.each(MantisJSON, function(i, item) {
              if(dataset[0][item.category]==undefined)
                dataset[0][item.category]=0;
              dataset[0][item.category]++;
              if(item.status==statusResolvedID) {
                if(dataset[1][item.category]==undefined)
                  dataset[1][item.category]=0;
                dataset[1][item.category]++;
              }
            });

            // plot results
            plotBarFromListStruct(chartCanvas, dataset, tile.chartColors);
          });
        }


        if(tile.displayFunction=='displayMantisStatus') {
          element.bind('displayFunction', function(event, chartCanvas) {
            var dataset={};
            var statusName;
            // Count each Categories type
            $.each(MantisJSON, function(i, item) {
              statusName=getMantisStatusName(item.status)
              if(dataset[statusName]==undefined)
                dataset[statusName]=0;
              dataset[statusName]++;
            });

            // plot results
            plotPieFromStruct(chartCanvas, dataset);
          });
        }

        if(tile.displayFunction=='displayMantisComposantSANDIE') {
          element.bind('displayFunction', function(event, chartCanvas) {
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
            plotBarFromListStruct(chartCanvas, dataset);
          });
        }


      }
    }
    


  });
}


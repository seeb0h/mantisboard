/*!
 * mantisboard.utilities.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the MIT license
 * https://github.com/seeb0h/mantisboard/blob/master/LICENSE.md
 */

//
// Specific tiles
//
function displayLi(row,col,sizex,sizey,i) {return '<li data-row="'+row+'" data-col="'+col+'" data-sizex="'+sizex+'" data-sizey="'+sizey+'" class="gs_w" style="position: absolute;" id="tile_'+i+'">'};
function displayHeader(text,i) {return '<div class="tileHeader" id="tileHeader_'+i+'"><p>'+text+'</p></div>'};
function displayMainH1(text,i) {return '<div class="tileMain" id="tileMain_'+i+'"><h1><span>'+text+'</span></h1></div>'};
function displayMainP(text,i) {return '<div class="tileMain" id="tileMain_'+i+'"><p><span>'+text+'</span></p></div>'};
function displayMainWeather(weatherID,i) {return '<div class="tileMain" id="tileMain_'+i+'"><div class="weather ready" id='+weatherID+'></div></div>'};
function displayMainChart(text,i) {
  var gs_w_width=$('#tile_'+i).width()-20;
  var gs_w_height=$('#tile_'+i).height()-40;
  return '<div class="tileMain" id="tileMain_'+i+'"><canvas class="chart" width="'+gs_w_width+'" height="'+gs_w_height+'"></canvas></div>'
};

function displayHeaderDate(text,i) {
  var currentDate= new Date();
  var day = "0"+currentDate.getDate();
  var month = "0"+(currentDate.getMonth()+1);
  var year = "0"+currentDate.getFullYear();
  return '<div class="tileHeader" id="tileHeader_'+i+'"><p>'+day.substr(-2,2)+'/'+month.substr(-2,2)+'/'+year.substr(-2,2)+'</p></div>';
};

function displayMainDate(text,i) {
  var currentDate= new Date();
  var hours = "0"+currentDate.getHours();
  var minutes = "0"+currentDate.getMinutes();
  var secondes = "0"+currentDate.getSeconds();
  return '<div class="tileMain" id="tileMain_'+i+'"><h1><span>'+hours.substr(-2,2)+':'+minutes.substr(-2,2)+'</span></h1></div>';
};

function displayMainCountdown(text,i) {
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  console.log(currentDate.toUTCString());

  var tmp=text.split('/');
  console.log(tmp);

  var deadlineTime = new Date((tmp[0]),tmp[1]-1,tmp[2],tmp[3],tmp[4],tmp[5],0);
  console.log(deadlineTime.toUTCString());

  var diffTime = deadlineTime.getTime()-currentTime;
  var diffDay = Math.round((diffTime/(3600000*24)));
  var diffHours = Math.round(((diffTime-diffDay*3600000*24)/(3600000)));
  console.log(diffTime);
  console.log(diffDay);
  console.log(diffHours);

  html='<div class="tileMain" id="tileMain_'+i+'"><h1>';
  if(diffHours<0)
  {
    if(diffDay<0)
      html+='<span class="CountdownNOK">'+diffDay+'d '+(-1*diffHours)+'h</span>';
    else
      html+='<span class="CountdownNOK">-'+diffDay+'d '+(-1*diffHours)+'h</span>';
  }
  else
    html+='<span class="CountdownOK">'+diffDay+'d '+diffHours+'h</span>';

  html+='</h1></div>';

  return html;
};

function displayMainTisseo(text,i) {
  return '<div class="tileMain" id="tileMain_'+i+'"><div class="tisseo"><span class="round">111</span> 8min</span></div><div class="tisseo"><span class="round">111</span> 24min</div></div>';
};

//
// Set CSS wrt to tiles size. In order to center tiles contents
//
function setTilesCSS(tiles) {
  for (var i=0; i<tiles.length; i++) {
    var gs_w_width=$('#tile_'+i).width();
    var gs_w_height=$('#tile_'+i).height();

    $('#tileMain_'+i).width(gs_w_width-20);
    
    if($('#tileMain_'+i+'>h1')[0]) {
      $('#tileMain_'+i+'>h1').height(gs_w_height-40);
      $('#tileMain_'+i+'>h1').css("line-height",gs_w_height-40+"px");
      $('#tileMain_'+i+'>h1>span').width(gs_w_width-20);
    }
    if($('#tileMain_'+i+'>p')[0]) {
      $('#tileMain_'+i+'>p').height(gs_w_height-40);
      $('#tileMain_'+i+'>p').css("line-height",gs_w_height-40+"px");
      $('#tileMain_'+i+'>p>span').width(gs_w_width-20);
    }

    // if($('#tileMain_'+i+'>canvas')[0]) {
    //   console.log('width '+$('#tileMain_'+i+'>canvas').attr('id')+':'+$('#tileMain_'+i+'>canvas').width());
    //   console.log('height '+$('#tileMain_'+i+'>canvas').attr('id')+':'+$('#tileMain_'+i+'>canvas').height());
    // }
  
    // set random color for fun
    var colorText="#";
    var colorHeader="#";
    var colorMain="#";
    // for (var j=0; j<3; j++) {
    //   if(Math.floor(Math.random()*2)) {
    //     colorText+="0";
    //     colorHeader+="4";
    //     colorMain+="3";
    //   } else {
    //     colorText+="3";
    //     colorHeader+="b";
    //     colorMain+="a";
    //  }
    // }
    // if(colorText=="#000")
     {
      colorText="#bbb";
      colorHeader="#444";
      colorMain="#333";      
    }
    $('#tileMain_'+i).css("color",colorText);
    $('#tileHeader_'+i).css("color",colorText);
    $('#tileHeader_'+i).css("background",colorHeader);
    $('#tileMain_'+i).css("background",colorMain);
    $('#tile_'+i).css("background",colorMain);

  }
}

//
// Parse JSON conf var and create empty tiles wrt to this conf
//
function initTiles () {
  var tiles=[];
  $.each(JSONtiles, function(i, tile) {
    tiles.push(displayLi(tile.row,tile.col,tile.sizex,tile.sizey,i)+'</li>');
  });

  $("#grid>ul").append(tiles.join(''));

}


//
// Parse JSON conf var and create tiles wrt to this conf
//
function displayTiles () {
  // Step 1 : display of tile in order to get width/height of tiles before to add content
  initTiles(JSONtiles);

  // Step 2 : create the tiles
  var tiles=[];
  var tileMainFunction;
  $.each(JSONtiles, function(i, tile) {
    if(tile.type=='H1') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainH1;
    }
    if(tile.type=='P') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainP;
    }
    if(tile.type=='Weather') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainWeather;
    }
    if(tile.type=='Chart') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainChart;
    }
    if(tile.type=='Date') {
      displayHeaderFunction=displayHeaderDate;
      tileMainFunction=displayMainDate;
    }
    if(tile.type=='Countdown') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainCountdown;
    }
    if(tile.type=='Tisseo') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainTisseo;
    }

    tiles.push(displayLi(tile.row,tile.col,tile.sizex,tile.sizey,i)+displayHeaderFunction(tile.headerText,i)+tileMainFunction(tile.mainText,i)+'</li>');
  });

  // Step 3 : add the tiles to the DOM
  $("#grid>ul").html(tiles.join(''));

  // Step 4 : set the css for centering and colours purpose
  setTilesCSS(tiles);

  // Step 5 : set function used by tiles (mainly used for chart tiles)
  setTilesFunctions ();

  // Step 6 : set a trigger function on grid div in order to call it later to launch tiles functions.
  setTriggerTilesFunctions ();
}



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
            var dataset={};
            // Count each Categories type for resolved issues
            $.each(MantisJSON, function(i, item) {
              if(item.status==mantisboard.params.resolvedID) {
                if(dataset[item.category]==undefined)
                  dataset[item.category]=0;
                dataset[item.category]++;
              }
            });

            // plot results
            console.log(dataset);
            plotPieFromStruct(chartCanvas, dataset);
          });
        }
  
        if(tile.displayFunction=='displayMantisCategoriesBar') {
          element.bind('displayFunction', function(event, chartCanvas) {
            var dataset=[];
            // Count each Categories type
            dataset[0]={};
            dataset[1]={};
            $.each(MantisJSON, function(i, item) {
              if(dataset[0][item.category]==undefined)
                dataset[0][item.category]=0;
              dataset[0][item.category]++;
              if(item.status==mantisboard.params.resolvedID) {
                if(dataset[1][item.category]==undefined)
                  dataset[1][item.category]=0;
                dataset[1][item.category]++;
              }
            });

            // plot results
            plotBarFromListStruct(chartCanvas, dataset, tile.chartColors);
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


//
// Trigger tiles functions
//
function setTriggerTilesFunctions () {
  $('#grid').bind('triggerTilesFunctions', function(event) {
    $.each(JSONtiles, function(i, tile) {
      var element;

      element = $('#tileMain_'+i+'>canvas');

      if(tile.displayFunction!=undefined) {  
        // function for charts
        if(element[0]) {
          // console.log('#tileMain_'+i+'>canvas : ' + element[0]);
          // console.log('tile.displayFunction : ' + tile.displayFunction);

          element.trigger('displayFunction', [element]);
        }
      }
      
    });
  });

}





// http://stackoverflow.com/a/1042676
// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
function extend(from, to)
{
  if (from == null || typeof from != "object") return from;
  if (from.constructor != Object && from.constructor != Array) return from;
  if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
    from.constructor == String || from.constructor == Number || from.constructor == Boolean)
    return new from.constructor(from);

  to = to || new from.constructor();

  for (var name in from)
  {
    to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
  }

  return to;
}


//
// Create new data for pie chart from a struct
//
function setDataPieFromStruct (struct) {
  // Init data object for pie chart (colours attributes..)
  data = [
  {
    value: 0,
    color: "#4C5F97"
  },
  {
    value : 0,
    color : "#B75185"
  },
  {
    value : 0,
    color : "#A4CF5B"
  },
  {
    value : 0,
    color : "#DFB862"
  },
  {
    value : 0,
    color : "#2F427C"
  },
  {
    value : 0,
    color : "#973265"
  },
  {
    value : 0,
    color : "#80AA38"
  },
  {
    value : 0,
    color : "#B8913D"
  },
  {
    value : 0,
    color : "#6D7EB1"
  },
  {
    value : 0,
    color : "#C9729E"
  },
  {
    value : 0,
    color : "#B8DB7C"
  },
  {
    value : 0,
    color : "#E7C783"
  }
  ]

  // Parse struct object and set data labels and values wrt struct literal values.
  var i=0;
  for (var type in struct) {
    data[i].value = struct[type];
    data[i].label = type;
    i++;
  }

  return data;
}

//
// Plot a pie chart in a specified canvas
//
function plotPie(chartCanvas,data) {
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = chartCanvas.get(0).getContext("2d");

  options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    
    //Boolean - Whether we should animate the chart 
    animation : true,
    
    //Number - Amount of animation steps
    animationSteps : 100,
    
    //String - Animation easing effect
    animationEasing : "easeOutBounce",
    
    //Boolean - Whether we animate the rotation of the Pie
    animateRotate : true,

    //Boolean - Whether we animate scaling the Pie from the centre
    animateScale : false,
    
    //Function - Will fire on animation completion.
    onAnimationComplete : null
  }

  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx).Pie(data,options);

}

//
// High level function : plot new pie chart from a struct
//
function plotPieFromStruct(chartCanvas,struct) {
  var data = setDataPieFromStruct(struct);
  plotPie(chartCanvas, data);
}


//
// Create new data for radar chart from a struct
//
function setDataRadarFromStruct (struct, colours) {
  // Init data object for radar chart (colours attributes..)
  data = {
    labels : [],
    datasets : [],
    // Set labels shared by each dataset
    setLabels : function (struct) {
      // Parse struct object and set labels wrt struct literal values.
      for (var type in struct) {
        this.labels.push(type);
      }
    },
    // Add new dataset.
    // MANDATORY : labels must be set before
    push : function (struct, colours) {
      // Init new dataset
      dataset={
        fillColor : "rgba("+colours[0]+","+colours[1]+","+colours[2]+",0.5)",
        strokeColor : "rgba("+colours[0]+","+colours[1]+","+colours[2]+",1)",
        pointColor : "rgba("+colours[0]+","+colours[1]+","+colours[2]+",1)",
        pointStrokeColor : "#fff",
        data : []
      }

      // Init new data to 0
      for (var i=0; i<this.labels.length; i++) {
        dataset.data[i]=0;
      }

      // Parse struct object and set data values wrt struct literal values.
      for (var i=0; i<this.labels.length; i++) {
        var label=this.labels[i];
        for (var type in struct) {
          if(label==type)
            dataset.data[i]=struct[type];
        }
      }

      // Ad the dataset
      this.datasets.push(dataset);
    }
  }

  data.setLabels(struct);
  data.push(struct,colours);

  return data;
}

//
// Plot a radar chart in a specified canvas
//
function plotRadar(chartCanvas,data) {
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = chartCanvas.get(0).getContext("2d");

  options = {

    //Boolean - If we show the scale above the chart data     
    scaleOverlay : false,
    
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : false,
    
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : null,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : null,
    //Number - The centre starting value
    scaleStartValue : null,
    
    //Boolean - Whether to show lines for each scale point
    scaleShowLine : true,

    //String - Colour of the scale line 
    scaleLineColor : "rgba(0,0,0,.1)",
    
    //Number - Pixel width of the scale line  
    scaleLineWidth : 1,

    //Boolean - Whether to show labels on the scale 
    scaleShowLabels : false,
    
    //Interpolated JS string - can access value
    scaleLabel : "<%=value%>",
    
    //String - Scale label font declaration for the scale label
    scaleFontFamily : "'Arial'",
    
    //Number - Scale label font size in pixels  
    scaleFontSize : 12,
    
    //String - Scale label font weight style  
    scaleFontStyle : "normal",
    
    //String - Scale label font colour  
    scaleFontColor : "#ddd",
    
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop : true,
    
    //String - The colour of the label backdrop 
    scaleBackdropColor : "rgba(255,255,255,0.75)",
    
    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY : 2,
    
    //Number - The backdrop padding to the side of the label in pixels  
    scaleBackdropPaddingX : 2,
    
    //Boolean - Whether we show the angle lines out of the radar
    angleShowLineOut : true,
    
    //String - Colour of the angle line
    angleLineColor : "rgba(0,0,0,.1)",
    
    //Number - Pixel width of the angle line
    angleLineWidth : 1,     
    
    //String - Point label font declaration
    pointLabelFontFamily : "'Arial'",
    
    //String - Point label font weight
    pointLabelFontStyle : "normal",
    
    //Number - Point label font size in pixels  
    pointLabelFontSize : 12,
    
    //String - Point label font colour  
    pointLabelFontColor : "#666",
    
    //Boolean - Whether to show a dot for each point
    pointDot : true,
    
    //Number - Radius of each point dot in pixels
    pointDotRadius : 3,
    
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    
    //Boolean - Whether to animate the chart
    animation : true,

    //Number - Number of animation steps
    animationSteps : 60,
    
    //String - Animation easing effect
    animationEasing : "easeOutQuart",

    //Function - Fires when the animation is complete
    onAnimationComplete : null
    
  }

  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx).Radar(data,options);

}

//
// High level function : plot new radar chart from a struct
//
function plotRadarFromListStruct(chartCanvas,listStruct, listColours) {
  if(listColours==undefined)
    listColours=mantisboard.defaults.colors;

  var data = setDataRadarFromStruct(listStruct[0],listColours[0]);
  for (var i=1; i<listStruct.length; i++) {
    data.push(listStruct[i],listColours[i]);
  }
  plotRadar(chartCanvas, data);
}











//
// Create new data for bar chart from a struct
//
function setDataBarFromStruct (struct, colours) {
  // Init data object for bar chart (colours attributes..)
  data = {
    labels : [],
    datasets : [],
    // Set labels shared by each dataset
    setLabels : function (struct) {
      // Parse struct object and set labels wrt struct literal values.
      for (var type in struct) {
        this.labels.push(type);
      }
    },
    // Add new dataset.
    // MANDATORY : labels must be set before
    push : function (struct, colours) {
      // Init new dataset
      dataset={
        fillColor : "rgba("+colours[0]+","+colours[1]+","+colours[2]+",1)",
        strokeColor : "rgba(255,255,255,1)",
        data : []
      }

      // Init new data to 0
      for (var i=0; i<this.labels.length; i++) {
        dataset.data[i]=0;
      }

      // Parse struct object and set data values wrt struct literal values.
      for (var i=0; i<this.labels.length; i++) {
        var label=this.labels[i];
        for (var type in struct) {
          if(label==type)
            dataset.data[i]=struct[type];
        }
      }

      // Ad the dataset
      this.datasets.push(dataset);
    }
  }

  data.setLabels(struct);
  data.push(struct,colours);

  return data;
}

//
// Plot a bar chart in a specified canvas
//
function plotBar(chartCanvas,data) {
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = chartCanvas.get(0).getContext("2d");

  options = {
    //Boolean - If we show the scale above the chart data     
    scaleOverlay : false,
    
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : false,
    
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : null,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : null,
    //Number - The scale starting value
    scaleStartValue : null,

    //String - Colour of the scale line 
    scaleLineColor : "rgba(0,0,0,.1)",
    
    //Number - Pixel width of the scale line  
    scaleLineWidth : 1,

    //Boolean - Whether to show labels on the scale 
    scaleShowLabels : true,
    
    //Interpolated JS string - can access value
    scaleLabel : "<%=value%>",
    
    //String - Scale label font declaration for the scale label
    scaleFontFamily : "'Arial'",
    
    //Number - Scale label font size in pixels  
    scaleFontSize : 12,
    
    //String - Scale label font weight style  
    scaleFontStyle : "normal",
    
    //String - Scale label font colour  
    scaleFontColor : "#ddd",  
    
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    
    //Number - Width of the grid lines
    scaleGridLineWidth : 1, 

    //Boolean - If there is a stroke on each bar  
    barShowStroke : true,
    
    //Number - Pixel width of the bar stroke  
    barStrokeWidth : 3,
    
    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,
    
    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,
    
    //Boolean - Whether to animate the chart
    animation : true,

    //Number - Number of animation steps
    animationSteps : 60,
    
    //String - Animation easing effect
    animationEasing : "easeOutQuart",

    //Function - Fires when the animation is complete
    onAnimationComplete : null
      
  }

  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx).Bar(data,options);

}

//
// High level function : plot new bar chart from a struct
//
function plotBarFromListStruct(chartCanvas,listStruct, listColours) {
  if(listColours==undefined)
    listColours=mantisboard.defaults.colors;

  var data = setDataBarFromStruct(listStruct[0],listColours[0]);
    console.log('listStruct.length '+listStruct.length);
    console.log('listStruct[0] '+listStruct[0]);
  for (var i=1; i<listStruct.length; i++) {
    console.log('listStruct[i] '+listStruct[i]);
    data.push(listStruct[i],listColours[i]);
  }
  plotBar(chartCanvas, data);
}




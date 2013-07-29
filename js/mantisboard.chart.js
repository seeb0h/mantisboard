/*!
 * mantisboard.chart.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/REAME.md
 */



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
  },
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
  if(typeof listColours === 'undefined')
    listColours=mantisboard.chartColors;

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
function plotBarFromListStruct(chartCanvas, listStruct, listColours) {  
  if(typeof listColours === 'undefined')
    listColours=mantisboard.chartColors;

  var data = setDataBarFromStruct(listStruct[0],listColours[0]);
  for (var i=1; i<listStruct.length; i++) {
    data.push(listStruct[i],listColours[i]);
  }
  console.log(data);
  plotBar(chartCanvas, data);
}




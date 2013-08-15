/*!
 * mantisboard.tiles.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/README.md
 */

//
// Specific tiles
//

function toggleTileSettings(i) {
  // Display setting
  $('#tileSettings_'+i).toggle();
  $('#tileMain_'+i).toggle();

  // Fill with params in use
  var key="tile_"+i;
  console.log('toggleTileSettings i'+i);
  console.log('toggleTileSettings tilesSettings["tile_"+i]'+tilesSettings[key]);
  console.log('toggleTileSettings tilesSettings["tile_"+i]["type"]'+tilesSettings[key]["type"]);
  $('#tileSettings_'+i+'_input_headerText').val(tilesSettings[key]["headerText"]);
  $('#tileSettings_'+i+'_input_tileParameter').val(tilesSettings[key]["tileParameter"]);

  $('#tileSettings_'+i+'_select_type').val( tilesSettings[key]["type"] ).prop('selected',true);
  $('#tileSettings_'+i+'_select_displayFunction').val( tilesSettings[key]["displayFunction"] ).prop('selected',true);
}

//
// Check settings form entries
//
function checkTileValidation(i) {

  return true;
}

//
// Write settings config
//
function writeTileConfig(i) {
  var key="tile_"+i;

  // Set settings
  tilesSettings[key]["headerText"] = $('#tileSettings_'+i+'_input_headerText').val();
  tilesSettings[key]["tileParameter"] = $('#tileSettings_'+i+'_input_tileParameter').val();
  tilesSettings[key]["type"] = $('#tileSettings_'+i+'_select_type').val();
  tilesSettings[key]["displayFunction"] = $('#tileSettings_'+i+'_select_displayFunction').val();

  // Write on disk and reload parent windows
  console.log(tilesSettings[key]);
  writeJSON("tilesSettings", tilesSettings);

  // Hide Settings
  toggleTileSettings(i);

  // Update tile html
  displayTile(key, tilesSettings[key], i);

  // Update tile css
  setTileCSS(i);

  // Add tile function
  setTileFunction (key, tilesSettings[key], i);

  // Trigger every tiles function
  $('#grid').trigger('triggerTilesFunctions', []);
}

function displaySettings(key, i) {
  console.log('displaySettings key/i'+key+'/'+i);

  html='<div class="tileSettings" id="tileSettings_'+i+'">';
  html+='<form class="formTileConfig" id="formTileConfig" action="javascript:writeTileConfig('+i+');" onsubmit="return checkTileValidation('+i+');">';

  html+='<label>Type <select id="tileSettings_'+i+'_select_type">';
  html+='<option value="FilterName">FilterName</option>';
  html+='<option value="Weather">Weather</option>';
  html+='<option value="Chart">Chart</option>';
  html+='<option value="H1">H1</option>';
  html+='<option value="P">P</option>';
  html+='<option value="Tisseo">Tisseo</option>';
  html+='<option value="Countdown">Countdown</option>';
  html+='</select></label>';

  html+='<label>Header Text <input type="text" name="headerText" id="tileSettings_'+i+'_input_headerText" /></label>';
  html+='<label>Tile function parameters <input type="text" name="tileParameter" id="tileSettings_'+i+'_input_tileParameter" /></label>';


  html+='<label>Chart function <select id="tileSettings_'+i+'_select_displayFunction">';

  $.each(chartActions, function(funcName, funcCode) {
    console.log('funcName '+funcName);
    html+='<option value="'+funcName+'">'+funcName+'</option>';
  });
  html+='</select></label>';

  html+='<input class="formButton" name="commit" value="Validate" type="submit" />';
  html+='<input class="formButton" name="commit" value="Cancel" type="button" onclick="toggleTileSettings('+i+');return false;" />';
  html+='</form>';
  html+='</div>';

  return html;
};



function displayHeader(text,i) {return '<div class="tileHeader" id="tileHeader_'+i+'"><p>'+text+'<a href="#" onClick="toggleTileSettings('+i+');return false;" class="settings_tile"><i class="icon-cog"></i></a></p></div>'};
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
  console.log(text);

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

function displayMainFilterName(text,i) {
  return '<div class="tileMain" id="tileMain_'+i+'"><h1><span>'+mantisboard.projectName+'/<br/>'+mantisboard.filterName+'</span></h1></div>'
};


function displayMainTisseo(text,i) {
  return '<div class="tileMain" id="tileMain_'+i+'"><div class="tisseo"><span class="round">111</span> 8min</span></div><div class="tisseo"><span class="round">111</span> 24min</div></div>';
};

//
// Set CSS wrt to a tile size. In order to center tiles contents
//
function setTileCSS(i) {
  var gs_w_width=$('#tile_'+i).width();
  var gs_w_height=$('#tile_'+i).height();

  $('#tileSettings_'+i).width(gs_w_width-20);

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

//
// Set CSS wrt to tiles size. In order to center tiles contents
//
function setTilesCSS() {
  var i=0;
  $.each(tilesSettings, function(key, value) {
    i++;
    // update CSS of this tile
    setTileCSS(i);
  });
}

//
// Parse JSON conf var and create empty tiles wrt to this conf
//
function initTiles () {
  var tiles=[];
  $.each(tilesSettings, function(key, tile) {
    gridster.add_widget('<li class="gs_w" style="position: absolute;" id="'+key+'"></li>', tile.sizex, tile.sizey, tile.col, tile.row);
  });

  $("#grid>ul").append(tiles.join(''));

}


function getTileDisplayFunctions(tile) {
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
  if(tile.type=='FilterName') {
    displayHeaderFunction=displayHeader;
    tileMainFunction=displayMainFilterName;
  }

  return [displayHeaderFunction, tileMainFunction];
}

//
// Display a tile html
//
function displayTile(key, tile, i) {
  // Get tile display functions according to tile settings
  displayFunctions = getTileDisplayFunctions(tile);

  // Update tile html
  $("#"+key).html(displayFunctions[0](tile.headerText,i)+displaySettings(key, i)+displayFunctions[1](tile.tileParameter,i));
}

//
// Parse JSON conf var and create tiles wrt to this conf
//
function displayTiles (doCallNextFunction) {
  // Step 1 : display of tile in order to get width/height of tiles before to add content
  initTiles();

  // Step 2 : create the tiles
  var tiles=[];
  var tileMainFunction;
  var i=0;
  $.each(tilesSettings, function(key, tile) {
    i++;
    // Display a tile html
    displayTile(key, tile, i);
  });

  // Step 3 : set the css for centering and colours purpose
  setTilesCSS();

  // Step 4 : set function used by tiles (mainly used for chart tiles)
  setTilesFunctions ();

  // Step 5 : set a trigger function on grid div in order to call it later to launch tiles functions.
  setTriggerTilesFunctions ();

  // Next callback function
  if(doCallNextFunction==true)
    callNextFunction();
}


//
// Set function called for a tile 
//
function setTileFunction (key, tile, i) {
  var element;
  element = $('#tileMain_'+i+'>canvas');

  if( typeof tile.displayFunction != "undefined" ) {  
    // function for charts
    if(element[0]) {
      // Add a dynamic call to the function defined in each tile.displayFunction 
      element.bind('displayFunction', {chartCanvas : element, chartColors : tile.chartColors}, function(event) { 
        window["chartActions"][tile.displayFunction](event.data.chartCanvas, event.data.chartColors);
      });


    }
  }
  
}


//
// Set function called for each tiles
//
function setTilesFunctions () {
  var i=0;
  $.each(tilesSettings, function(key, tile) {
    i++;

    // set function for this tile
    setTileFunction (key, tile, i);  
  });
}



//
// Trigger tiles functions for each tile
//
function setTriggerTilesFunctions () {
  $('#grid').bind('triggerTilesFunctions', function(event) {
    var i=0;
    $.each(tilesSettings, function(key, tile) {
      i++;
      var element;

      element = $('#tileMain_'+i+'>canvas');

      if( typeof tile.displayFunction != "undefined" ) {  
        // function for charts
        if(element[0]) {
          element.trigger('displayFunction', [element]);
        }
      }
      
    });
  });

}




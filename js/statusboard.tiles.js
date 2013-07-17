/*!
 * statusboard.tiles.js
 * http://statusboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the MIT license
 * https://github.com/seeb0h/statusboard/blob/master/README.md
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

function displayMainFilterName(text,i) {
  return '<div class="tileMain" id="tileMain_'+i+'"><h1><span>'+statusboard.params.projectName+'/<br/>'+statusboard.params.filterName+'</span></h1></div>'
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
    if(tile.type=='FilterName') {
      displayHeaderFunction=displayHeader;
      tileMainFunction=displayMainFilterName;
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




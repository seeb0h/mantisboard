/*!
 * mantisboard.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/LICENSE.md
 */

// iframe custom selector
$.extend($.expr[':'], {
    contents: function(elem, i, attr){
      return $(elem).contents().find( attr[3] );
    }
});  
 
//
// Call these function before init !!!!
//
function initLoadingAnimation() {
  // Loading animation
  $(document).ready(function() {  
    
    //Get the A tag
    var id = $('#loading');

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth,'height':maskHeight});

    //transition effect   
    $('#mask').fadeTo("slow",0.5);  

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();
              
    //Set the popup window to center
    $(id).css('top',  winH/2-$(id).height()/2);
    $(id).css('left', winW/2-$(id).width()/2);

    //transition effect
    $(id).fadeIn(2000); 
    
    
    //if close button is clicked
    $('.window .close').click(function (e) {
      //Cancel the link behavior
      e.preventDefault();
      
      $('#mask').hide();
      $('#loading').hide();
    });   
    

    $(window).resize(function () {
     
      var box = $('#boxes .window');
   
          //Get the screen height and width
          var maskHeight = $(document).height();
          var maskWidth = $(window).width();
        
          //Set height and width to mask to fill up the whole screen
          $('#mask').css({'width':maskWidth,'height':maskHeight});
                 
          //Get the window height and width
          var winH = $(window).height();
          var winW = $(window).width();

          //Set the popup window to center
          box.css('top',  winH/2 - box.height()/2);
          box.css('left', winW/2 - box.width()/2);
     
    });
    
  });

}

//
// Call these function once init done !!!!
//
function endInit() {
  // Trigger Mantis stat display !
  $('#grid').trigger('triggerTilesFunctions', []);

  // Hide loading dialog !
  $('#mask').hide();
  $('#loading').hide();
}




function writeJSONParameters(variableName) {
  writeJSON(variableName, window[variableName]);
}

function writeJSON(variableName, variable, location2Reload) {
	  console.log('location2Reload '+location2Reload);
  console.log("writeJSON");
  // Writing
  $.ajax({
    global: false,
    type: "POST",
    cache: false,
    dataType: "json",
    data: ({
      action: 'write',
      file: 'js/parameters.'+variableName,
      json: variable
    }),
    url: 'read_write_json.php',
    complete: function(data){
	  console.log('location2Reload '+location2Reload);
      if( typeof location2Reload != "undefined" )
        // Reload given window
        location2Reload.reload(true);
    }
  });

  return false;
}


function readJSONParameters(variableName) {
  console.log("readJSON");
  // Reading
  $.ajax({
    global: false,
    type: "POST",
    cache: false,
    dataType: "json",
    data: ({
        action: 'read',
        file: 'js/parameters.'+variableName,
    }),
    url: 'read_write_json.php',
    success: function(data){
      window[variableName] = jQuery.parseJSON(data);

      displayTiles();

      initMantisStats();
	  
	  //initSettingsForm();
    }
  });

  return false;
}

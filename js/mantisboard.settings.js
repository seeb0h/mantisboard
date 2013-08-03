/*!
 * mantisboard.settings.js
 * http://mantisboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the WTFPL license
 * https://github.com/seeb0h/mantisboard/blob/master/LICENSE.md
 */

//
// Init settings form
//
function initSettingsForm(mantisboardParent) {
  // Fill with params in use
  for (var item in mantisboardParent) {
    $("input[type='text'][name="+item+"]").val(mantisboardParent[item]);
  }
  for (var item in mantisboardParent.status) {
    $("input[type='text'][name=status_"+item+"]").val(mantisboardParent.status[item]);
  }

  // Hide validation messages
  $("#formConfigWarning").hide();
  $("#msgConfigSuccess").hide();
}

 
//
// Check settings form entries
//
function checkValidation(mantisboardParent) {
  needCheck=false;

  //empty previous msgs
  $("#msgConfigWarning>ul").html('');

  // check input
  for (var item in mantisboardParent) {
    if($("input[type='text'][name="+item+"]").val()=="") {
      $("#msgConfigWarning>ul").append('<li>'+item+"</li>");
      $("#formConfigWarning").show();

      needCheck=true;
    }
  }

  if (!needCheck) {
    $("#msgConfigSuccess").text("Parameters saved !").show().fadeOut(2000);
    return true;
  }
  return false;
}

//
// Write settings config
//
function writeConfig(mantisboardParent) {
  var mantisboardSettings={};
  
  // Get settings. If defined, set it to mantisboardSettings which will be write on disk.
  for (var item in mantisboardParent) {
    var inputValue = $("input[type='text'][name="+item+"]").val();
    if( typeof inputValue != "undefined" ) {
      mantisboardSettings[item]=inputValue;
	}
  }
  
  // Get status settings. If defined, set it to mantisboardSettings which will be write on disk.
  mantisboardSettings.status={};
  for (var item in mantisboardParent.status) {
    var inputValue = $("input[type='text'][name=status_"+item+"]").val();
    if( typeof inputValue != "undefined" ) {
      mantisboardSettings.status[item]=inputValue;
	}
  }

  // Write on disk and reload parent windows
  console.log(mantisboardSettings);
  writeJSON("mantisboard", mantisboardSettings, window.parent.location);
}
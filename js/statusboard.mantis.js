/*!
 * statusboard.mantis.js
 * http://statusboard.boschonline.eu/
 *
 * Copyright 2013 Sébastien BOSCH
 * Released under the MIT license
 * https://github.com/seeb0h/statusboard/blob/master/REAME.md
 */

//
// Call through getJSON callback() every needed Mantis function
//
function initMantisStats() {
  getMantisEnumStatus();
}

//
// Store Mantis enum status
//
function getMantisEnumStatus() {
  //Example usage (using jQuery):
  var url = statusboard.params.url_mc_mc_enum_status;

  // Store mantis JSON and trigger display when finished
  $.getJSON(url) 
    .fail(function(data) {
      alert('Could not connect to : '+url);
    })
    .done(function(data) {
      statusboard.params.enumStatus=data;
      console.log('statusboard.params.enumStatus : '+statusboard.params.enumStatus);

      // Next Mantis function
      getMantisProjectID();
    });
}

//
// Get project ID associated with project name
//
function getMantisProjectID() {
  //Example usage (using jQuery):
  var url = statusboard.params.url_mc_project_get_id_from_name+"&project_name="+statusboard.params.projectName;

  // Store mantis JSON and trigger display when finished
  $.getJSON(url) 
    .fail(function(data) {
      alert('Could not connect to : '+url);
    })
    .done(function(data) {
      statusboard.params.projectID=data;

      console.log('statusboard.params.projectName : '+statusboard.params.projectName);
      console.log('statusboard.params.projectID : '+statusboard.params.projectID);

      // Next Mantis function
      getMantisFilterID(statusboard.params.projectID);
    });
}


//
// Get filter ID associated with filter name
//
function getMantisFilterID(projectID) {
  //Example usage (using jQuery):
  var url = statusboard.params.url_mc_filter_get+"&project_id="+projectID;

  // Store mantis JSON and trigger display when finished
  $.getJSON(url) 
    .fail(function(data) {
      alert('Could not connect to : '+url);
    })
    .done(function(data) {
      $.each(data, function(i, item) {
        console.log('item.name : '+item.name);
        if(statusboard.params.filterName==item.name) {
          statusboard.params.filterID=item.id;

          console.log('statusboard.params.filterName : '+statusboard.params.filterName);
          console.log('statusboard.params.filterID : '+statusboard.params.filterID);

          // Next Mantis function
          getMantisStats(statusboard.params.projectID, statusboard.params.filterID)
        }
          
      });
    });
}

//
// Get Mantis stats on selected filter
//
function getMantisStats(projectID, filterID) {
  //Example usage (using jQuery):
  var url = statusboard.params.url_mc_filter_get_issue_headers+"&project_id="+projectID+"&filter_id="+filterID+"&page_number=1&per_page=500";

  // Store mantis JSON and trigger display when finished
  $.getJSON(url) 
    .fail(function(data) {
      alert('Could not connect to : '+url);
    })
    .done(function(data) {
      MantisJSON=data;


      // Next Mantis function
      numIssues = data.length;
      $.each(data, function(i, item) {
        isLastIssue=((numIssues-1-i)==0);
        isResolved=(item.status==statusboard.params.status.resolvedID);
        if(isLastIssue) {
          //createDialog('Confirmation', 'Running this script will cause quite massive SOAP requests. Do you really want to continue ?');
          if(dogetIssueCustomFields)
            getIssueCustomFields(item.id,isResolved,isLastIssue);        
        }
      });

      // Trigger Mantis stat display !
      $('#grid').trigger('triggerTilesFunctions', []);
    });
}

    
//
// Get Mantis custom fields stats on selected issue
//
function getIssueCustomFields(issueID, isResolved, isLastIssue) {
  //Example usage (using jQuery):
  var url = statusboard.params.url_mc_issue_get+"&issue_id="+issueID;
  
  $.getJSON(url) 
    .fail(function(data) {
      alert('Could not connect to : '+url);
    })
    .done(function(data) {
      for (var i=0; i<data.custom_fields.length; i++) {
        if(MantisCustomFields[data.custom_fields[i].field.name]==undefined)
          MantisCustomFields[data.custom_fields[i].field.name] = {};
        if(isResolved) {
          if(MantisCustomFieldsResolved[data.custom_fields[i].field.name]==undefined)
            MantisCustomFieldsResolved[data.custom_fields[i].field.name] = {};
        }
      }
      for (var i=0; i<data.custom_fields.length; i++) {
        if(MantisCustomFields[data.custom_fields[i].field.name][data.custom_fields[i].value]==undefined)
          MantisCustomFields[data.custom_fields[i].field.name][data.custom_fields[i].value]=0;
        MantisCustomFields[data.custom_fields[i].field.name][data.custom_fields[i].value]++;
      if(isResolved) {
          if(MantisCustomFieldsResolved[data.custom_fields[i].field.name][data.custom_fields[i].value]==undefined)
            MantisCustomFieldsResolved[data.custom_fields[i].field.name][data.custom_fields[i].value]=0;
          MantisCustomFieldsResolved[data.custom_fields[i].field.name][data.custom_fields[i].value]++;
        }
  
      }
  
      if(isLastIssue) {
        console.log(MantisCustomFields);
        // Trigger Mantis stat display !
        $('#grid').trigger('triggerTilesFunctions', []);
      }
    });
}






//
// Set status ID associated with status name
//
function getMantisStatusID(statusName) {
  var statusID;
  $.each(statusboard.params.enumStatus, function(i, item) {
    if(statusName==item.name) {
      statusID = item.id;
      return false;
    }
  });
  return statusID;
}

//
// Set status name associated with status ID
//
function getMantisStatusName(statusID) {
  var statusName;
  $.each(statusboard.params.enumStatus, function(i, item) {
    if(statusID==item.id) {
      statusName = item.name;
      return false;
    }  
  });
  return statusName;
}





//
// DEPRECATED : display N first FA in a tile
//
function displayMantisFirstFA(filterID, numFA, tileElement) {
  //Example usage (using jQuery):
  var url = "./mantisconnect_json.php?name=mc_filter_get_issue_headers&project_id=203&filter_id="+filterID+"&page_number=1&per_page="+numFA;
  var ListFA='<ul class="ListFA">';

  $.getJSON(url, function(data) {
    $.each(data, function(i, item) {
       //console.log(item.id + ': ' + item.summary);
       ListFA+='<li>' + item.id + ': ' + item.summary + '</li>'
     });
    ListFA+='</ul>'

    tileElement.html(ListFA);
  });

}



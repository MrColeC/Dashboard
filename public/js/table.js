// Populates the core table
$(function(){
  buildTable();
});

// Called at full page load
var buildTable = function() {
  // Pull data via ajax, update DOM, apply sort handles
  $.ajax({
    type: "get",
    url: "/do/get",
    dataType: "json",
    contentType: "application/json",
    success: function(data){
      var rowCount = 0;
      $.each(data, function(index, object) {
        // Loop over all objects
        tableWorker(object);
        rowCount++;
      });

      // Only do this if there is data to sort/display
      if (rowCount > 0) {
        // Enable the table to be sorted
        $("#mainTable").tablesorter({
          sortList: [[4,0],[0,0]],
          textExtraction: function(node) {
            if (node.className.indexOf('linkItem') > -1 ) {
              // console.log("Link item with value of " + node.getAttribute("link-value"));
              // Return link data
              return node.getAttribute("link-value");
            } else if (node.className.indexOf('discussItem') > -1 ) {
              // console.log("Discuss item with value of " + node.getAttribute("discuss-value"));
              // Return true/flase of flag
              return node.getAttribute("discuss-value");
            }
            else {
              // Return regular HTML to perform alphabetic sort
              return node.innerHTML;
            }
          }
        });

        // Update sort & bind new content
        $("#mainTable").trigger("update");

        // Update charts
        make_charts();
      }
    },
    failure: function(errMsg) {
      console.log(errMsg);
    }
  });
}

// Called only from "data add" event listener
// Gets arround tablesorter.js update bug which prevents jquery .empty from clearing previous contents of that database
var addToTable = function(object) {
  // Data to add (to the table) is passed via function call
  tableWorker(object);

  // Update the sort to include the new data
  $("#mainTable").trigger("update");

  // Update charts
  make_charts();
}

// Append to table function
var tableWorker = function(object) {
  var newRow = "<tr>";
  newRow += "<td><button class='btn btn-xs btn-default removeProject hide' value='" + object._id + "'><span style='color: #888; margin-top: 3px' class='glyphicon glyphicon-remove' aria-hidden='true'></span></button><span class='project-area canEdit' pType='area' pID='" + object._id + "'>" + object.area + "</span></td>";
  newRow += "<td class='canEdit' pType='name' pID='" + object._id + "'>" + object.name + "</td>";
  newRow += "<td class='project-leader canEdit' pType='leader' pID='" + object._id + "'>" + object.leader + "</td>";
  newRow += "<td class='canEdit' pType='members' pID='" + object._id + "'>" + object.members + "</td>";
  newRow += "<td class='project-targetDate canEdit' pType='date' pID='" + object._id + "'>" + object.date + "</td>";
  newRow += "<td class='canEdit' pType='goals' pID='" + object._id + "'>" + object.goals + "</td>";
  newRow += "<td class='canEdit' pType='status' pID='" + object._id + "'>" + object.status + "</td>";
  newRow += "<td class='project-scheduale canEdit' pType='scheduale' pID='" + object._id + "'>" + object.scheduale + "</td>";
  if (object.link) {
    newRow += "<td><span style='margin-right: 1em;' class='canEdit glyphicon glyphicon-pencil linkItem' aria-hidden='true' pType='link' pID='" + object._id + "' link-value='" + object.link + "'></span> <a href='" + object.link + "' target='_blank'> <span class='glyphicon glyphicon-duplicate' aria-hidden='true'></span></a></td>";
  } else {
    newRow += "<td><span style='margin-right: 1em;' class='canEdit glyphicon glyphicon-pencil linkItem' aria-hidden='true' pType='link' pID='" + object._id + "' link-value='" + object.link + "'></span></td>";
  }
  if (object.discuss) {
    if (object.discuss == "true") {
        newRow += "<td style='text-align: center;' class='canEdit discussItem' pType='discuss' pID='" + object._id + "' discuss-value='true'><span class=' glyphicon glyphicon-glyphicon glyphicon-flag' aria-hidden='true' ></span></td>";
    } else {
      newRow += "<td style='text-align: center;' class='canEdit discussItem' pType='discuss' pID='" + object._id + "' discuss-value='false'><span class='noFlag glyphicon glyphicon-glyphicon glyphicon-flag' aria-hidden='true'></span></td>";
    }
  } else {
    newRow += "<td style='text-align: center;' class='canEdit discussItem' pType='discuss' pID='" + object._id + "' discuss-value='false'><span class='noFlag glyphicon glyphicon-glyphicon glyphicon-flag' aria-hidden='true'></span></td>";
  }
  newRow += "</tr>";

  // Append the new row
  $("#mainTable > tbody:last-child").append(newRow);
}

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
      $.each(data, function(index, object) {
        // Loop over all objects
        tableWorker(object);
      });

      // Now enable the table to be sorted
      $("#mainTable").tablesorter({sortList: [[4,0],[0,0]]});
      $("#mainTable").trigger("update");

      // Update charts
      pieChart_area();
      pieChart_date();
      pieChart_leader();
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
  pieChart_area();
  pieChart_date();
  pieChart_leader();
}

// Append to table function
var tableWorker = function(object) {
  var newRow = "<tr>";
  newRow += "<td><button class='btn btn-xs btn-default removeProject' value='" + object._id + "'><span style='color: #888; margin-top: 3px' class='glyphicon glyphicon-remove' aria-hidden='true'></span></button><span class='project-area canEdit' pID='" + object._id + "'>" + object.area + "</span></td>";
  newRow += "<td class='canEdit' pID='" + object._id + "'>" + object.name + "</td>";
  newRow += "<td class='project-leader canEdit' pID='" + object._id + "'>" + object.leader + "</td>";
  newRow += "<td class='canEdit' pID='" + object._id + "'>" + object.members + "</td>";
  newRow += "<td class='project-targetDate canEdit' pID='" + object._id + "'>" + object.date + "</td>";
  newRow += "<td class='canEdit' pID='" + object._id + "'>" + object.goals + "</td>";
  newRow += "<td class='canEdit' pID='" + object._id + "'>" + object.software + "</td>";
  newRow += "<td class='canEdit' pID='" + object._id + "'>" + object.effort + "</td>";
  newRow += "</tr>";

  // Append the new row
  $("#mainTable > tbody:last-child").append(newRow);
}

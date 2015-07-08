// Populates the core table
$(function(){
  refreshTable();
});

// Called at load and via other functions/event listeners
var refreshTable = function() {
  // Pull data via ajax, update DOM, apply sort handles
  $.ajax({
    type: "get",
    url: "/do/get",
    dataType: "json",
    contentType: "application/json",
    success: function(data){
      // Zero out curernt content
      $("#mainTable > tbody").empty();
      console.log("Table cleared");

      $.each(data, function(index, object) {
        // Loop over all objects
        // console.log("Row: " + JSON.stringify(object));
        var newRow = "<tr>";
        newRow += "<td><span style='margin-right: 1em; margin-left: 0; color: #888;' class='glyphicon glyphicon-remove' aria-hidden='true' value='" + object.id + "'></span><span class='project-area'>" + object.area + "</span></td>";
        newRow += "<td>" + object.name + "</td>";
        newRow += "<td class='project-leader'>" + object.leader + "</td>";
        newRow += "<td>" + object.members + "</td>";
        newRow += "<td class='project-targetDate'>" + object.date + "</td>";
        newRow += "<td>" + object.goals + "</td>";
        newRow += "<td>" + object.software + "</td>";
        newRow += "<td>" + object.effort + "</td>";
        newRow += "</tr>";

        // Append the new row
        $("#mainTable > tbody:last-child").append(newRow);
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

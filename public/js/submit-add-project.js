$(function(){
  // Click event listener for modal form submit button
  $("#submit-add-project").click(function() {
    // Create project JSON object
    var project = {};
    project.area = $('input[name="add-area"]').val();
    project.name = $('input[name="add-name"]').val();
    project.leader = $('input[name="add-leader"]').val();
    project.date = $('input[name="add-date"]').val();
    project.members = $('input[name="add-members"]').val();
    project.deliverables = $('input[name="add-deliverabes"]').val();
    project.software = $('input[name="add-software"]').val();
    project.effort = $('input[name="add-effort"]').val();
    var json = JSON.stringify(project);
    console.log("Sending: " + json);
    $.ajax({
      type: "post",
      url: "/do_add",
      dataType: "json",
      data: json,
      contentType: "application/json",
      success: function(data){
        alert("Success: " + JSON.stringify(data));
        console.log("Sent: " + json);
      },
      failure: function(errMsg) {
        alert("Failure: " + errMsg);
        console.log("Failed to send: " + json);
      }
    });
  });
});

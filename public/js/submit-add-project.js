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
    console.log("Sending: " + JSON.stringify(project));
    // POST the object
    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: data,
    //   success: success,
    //   dataType: dataType
    // });
    $.ajax({
      type: "post",
      url: "/do_add",
      dataType: "json",
      data: project,
      contentType: "application/json",
      success: function(data){
        alert("Success: " + data);
        console.log("Sent: " + JSON.stringify(project));
      },
      failure: function(errMsg) {
        alert("Failure: " + errMsg);
      }
    });
  });
});

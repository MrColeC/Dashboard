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
    project.goals = $('input[name="add-goals"]').val();
    project.software = $('input[name="add-software"]').val();
    project.effort = $('input[name="add-effort"]').val();
    var json = JSON.stringify(project);
    console.log("Sending: " + json);
    $.ajax({
      type: "post",
      url: "/do/add",
      dataType: "json",
      data: json,
      contentType: "application/json",
      success: function(data){
        $("#statusDisplay").html("<label class='label label-success'>Project Added</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        addToTable(data);
        $("#modal-add-project").find("input[type=text]").val("");
      },
      failure: function(errMsg) {
        $("#statusDisplay").html("<label class='label label-danger'>Failed to add Project</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        console.log(errMsg);
      }
    });
  });

  // Project removal click event listener
  $(document).on('click', '.removeProject', function() {
    console.log("Remove clicked -> " + $(this).val());
    var prep = {};
    prep._id = 'ObjectID("' + $(this).val() + '")';
    var json = JSON.stringify(prep);
    $.ajax({
      type: "delete",
      url: "/do/del",
      dataType: "json",
      data: json,
      contentType: "application/json",
      success: function(data){
        $("#statusDisplay").html("<label class='label label-success'>Project Removed</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
      },
      failure: function(errMsg) {
        $("#statusDisplay").html("<label class='label label-danger'>Failed to remove Project</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        console.log(errMsg);
      }
    });
  });
});

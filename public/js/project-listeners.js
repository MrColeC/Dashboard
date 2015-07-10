$(function(){
  // Click event listener for modal form submit button
  $("#submit-add-project").click(function() {
    // Create project JSON object
    var project = {};
    project.area = $('input[name="add-area"]').val();
    if (!project.area) {
      $('input[name="add-area"]').parent().addClass('has-error');
      event.preventDefault();
      return false;
    } else {
      $('input[name="add-area"]').parent().removeClass('has-error');
    }
    project.name = $('input[name="add-name"]').val();
    if (!project.name) {
      $('input[name="add-name"]').parent().addClass('has-error');
      event.preventDefault();
      return false;
    } else {
      $('input[name="add-name"]').parent().removeClass('has-error');
    }
    project.leader = $('input[name="add-leader"]').val();
    if (!project.leader) {
      $('input[name="add-leader"]').parent().addClass('has-error');
      event.preventDefault();
      return false;
    } else {
      $('input[name="add-leader"]').parent().removeClass('has-error');
    }
    project.date = $('input[name="add-date"]').val();
    project.members = $('input[name="add-members"]').val();
    project.goals = $('input[name="add-goals"]').val();
    project.software = $('input[name="add-software"]').val();
    project.effort = $('input[name="add-effort"]').val();
    var json = JSON.stringify(project);
    // console.log("Sending: " + json);
    $.ajax({
      type: "post",
      url: "/do/add",
      dataType: "json",
      data: json,
      contentType: "application/json",
      success: function(data){
        console.log("Receieved back from add request: " + JSON.stringify(data));
        $("#statusDisplay").html("<label class='label label-success'>Project Added</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        addToTable(data[0]);
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
    console.log("Processing request to remove object with ID -> " + $(this).val());
    var prep = {};
    prep.id = $(this).val();
    var json = JSON.stringify(prep);
    // console.log("Sending :" + json);
    $(this).parent().parent().fadeOut();
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

  // Project removal click event listener
  $(document).on('click', '.canEdit', function() {
    console.log("Update request on object -> [" + $(this).html() + "] and ID -> [" + $(this).attr('pID') + "]");
  });
});

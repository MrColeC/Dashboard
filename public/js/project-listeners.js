$(function(){
  // When the page is first loaded, run these functions only once
  setDateOptions();

  // Click event listener for add modal form submit button
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
    project.date = $('select[name="add-date"]').val();
    project.members = $('input[name="add-members"]').val();
    project.goals = $('input[name="add-goals"]').val();
    project.status = $('select[name="add-status"]').val();
    project.scheduale = $('select[name="add-scheduale"]').val();
    var json = JSON.stringify(project);
    console.log("Sending: " + json);
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
        make_charts();
      },
      failure: function(errMsg) {
        $("#statusDisplay").html("<label class='label label-danger'>Failed to add Project</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        console.log(errMsg);
      }
    });
  });

  // Have enter keys fire click event - add project
  $('.addProject').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      $("#submit-add-project").click();
      return false;
    }
  });

  // Have enter keys fire click event - edit project
  $('#edit-data').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      $("#submit-edit-project").click();
      return false;
    }
  });

  // Global escape key listener - close all modals
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      $("#modal-add-project").modal('hide');
      $("#modal-edit-project").modal('hide');
    }
  });

  // Project removal click event listener
  $(document).on('click', '.removeProject', function() {
    console.log("Processing request to remove object with ID -> " + $(this).val());
    var prep = {};
    prep.id = $(this).val();
    var json = JSON.stringify(prep);
    // console.log("Sending :" + json);
    $(this).parent().parent().remove();
    $.ajax({
      type: "delete",
      url: "/do/del",
      dataType: "json",
      data: json,
      contentType: "application/json",
      success: function(data){
        make_charts();
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

  // Used to store the target of what was originally click on to launch the edit window
  var liveEditTarget = "";

  // Project EDIT click event listener
  $(document).on('click', '.canEdit', function() {
    // Save target
    liveEditTarget = $(this);

    // Extract
    var display = toCamelCase($(this).attr('pType'));
    if (display == "Goals") {
      display = "Deliverable";
    } else if (display == "Date") {
      display = "Due Date";
    }
    var tValue = $(this).attr('pType');
    var tID = $(this).attr('pID');
    var current = $(this).html();
    console.log("Update request for [" + display + "] which currently has [" + current + "] and an object ID of [" + tID + "]");

    // Hide all edit inputs
    $('#edit-data').addClass('hide');
    $('#edit-status').addClass('hide');
    $('#edit-scheduale').addClass('hide');
    $('#edit-date').addClass('hide');

    // Update edit modal to reflect current status and carry required data to submit the edit
    $("#editTarget").html(display);
    $("#editTarget").attr('target-value', tValue);
    $("#editTarget").attr('target-id', tID);

    // Show the correct edit field & update to default select the current option
    if (display == "Status") {
      $('#edit-status').removeClass('hide');
      // console.log("Editing status data");
      $("#edit-status").val(current);
    } else if (display == "Scheduale") {
      $('#edit-scheduale').removeClass('hide');
      // console.log("Editing scheduale data");
      $("#edit-scheduale").val(current);
    } else if (display == "Due Date") {
      $('#edit-date').removeClass('hide');
      // console.log("Editing due date data");
      $("#edit-date").val(current);
    } else {
      $('#edit-data').removeClass('hide');
      // console.log("Editing basic data");
      $("#edit-data").attr("placeholder", current);
      $("#edit-data").val(current);
    }

    // Show the modal
    $('#modal-edit-project').modal('show');
  });

  // When the modal is show - focus the first element
  $('#modal-edit-project').on('shown.bs.modal', function () {
    $('#edit-data').focus();
    var moveCursor = $('#edit-data');
    var end = moveCursor.val().length * 2;
    moveCursor[0].setSelectionRange(end,end);
  });
  $('#modal-add-project').on('shown.bs.modal', function () {
    $('#add-area').focus();
  });

  // Function pulled from stackoverflow to camel case a word
  // http://stackoverflow.com/questions/5086390/jquery-camelcase
  function toCamelCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  }

  // Click event listener for update modal form submit button
  $("#submit-edit-project").click(function() {
    // Pull data from the model
    var target = $("#editTarget").attr('target-value');
    var value = $("#edit-data").val();
    if (target == "status") {
      value = $("#edit-status").val();
    } else if (target == "scheduale") {
      value = $("#edit-scheduale").val();
    } else if (target == "date") {
      value = $("#edit-date").val();
    }
    var id = $("#editTarget").attr('target-id');
    // console.log("Passed: target[" + target + "] value[" + value + "] from ID[" + id + "]");

    // Create project JSON object
    // Warning - this update statement is not safe
    // Users can modify the DOM element to point at arbitrary ID's and for arbitrary values
    // However, since all users can edit and see all items (no RBAC) this is a moot point
    var update = {};
    if (target == "area") {
      update.area = value;
    } else if (target == "name") {
      update.name = value;
    } else if (target == "leader") {
      update.leader = value;
    } else if (target == "members") {
      update.members = value;
    } else if (target == "date") {
      update.date = value;
    } else if (target == "goals") {
      update.goals = value;
    } else if (target == "status") {
      update.status = value;
    } else if (target == "scheduale") {
      update.scheduale = value;
    } else {
      console.log("   Unknown update type");
    }
    update.id = id;
    var json = JSON.stringify(update);
    console.log("Update JSON being sent: " + json);
    $.ajax({
      type: "post",
      url: "/do/update",
      dataType: "html",
      data: json,
      contentType: "application/json",
      success: function(data){
        $("#statusDisplay").html("<label class='label label-success'>Project Updated</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);

        // Update the display to show the new value now
        // console.log ("Updating item to show: [" + value + "]");
        $(liveEditTarget).html(value);
        // Clear out the edit text area to help prevent carry forward
        $("#modal-edit-project").find("input[type=text]").val("");
        make_charts();
      },
      failure: function(errMsg) {
        $("#statusDisplay").html("<label class='label label-danger'>Failed to update Project</label>");
        $("#statusDisplay").removeClass("hide");
        $("#statusDisplay").fadeOut(5000);
        console.log(errMsg);
      }
    });
  });

  $("#enableDelete").click(function() {
    // This is computed before the default event handler can active the button, so invert logic
    if ($("#enableDelete").hasClass('active')) {
      // console.log("Hiding delete buttons");
      $('.removeProject').addClass('hide');
    } else {
      // console.log("Showing delete buttons");
      $('.removeProject').removeClass('hide');
    }
  });
});

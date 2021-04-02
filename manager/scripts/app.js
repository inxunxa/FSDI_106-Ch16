var isItImportant = false;
var isDetailsVisible = true;
var serverUrl =  "http://fsdi.azurewebsites.net/api";

function toggleDetailsVisibility() {  
  if(isDetailsVisible) {
    $("#capture").hide();
    isDetailsVisible = false;
  }
  else {
    $("#capture").show();
    isDetailsVisible = true;
  }
}

function toggleImportant() {
  console.log("Icon clicked");

  if (!isItImportant) {
    $("#iImportant").removeClass("far").addClass("fas");
    isItImportant = true;
  } else {
    isItImportant = false;
    $("#iImportant").removeClass("fas").addClass("far");
  }
}

function saveTask() {
  console.log("Save clicked");

  let title = $("#txtTitle").val();
  var date = $("#txtDate").val();
  var status = $("#selStatus").val();
  var location = $("#txtLocation").val();
  var color = $("#txtColor").val();
  var desc = $("#txtDesc").val();

  var myTask = new Task(0, title, isItImportant, date, status, location, color, desc);


  // save to server
  $.ajax({
    url: serverUrl + '/tasks',
    type: "POST",
    data: JSON.stringify(myTask),
    contentType: "application/json",
    success: function(res) {
      console.log("Server says: ", res);

      // display task
      displayTask(res);

    },
    error: function(errorDet) {
      console.log("Error", errorDet);
    }
  });

  clearForm();

}

function clearForm() {

  // TODO 1: Clear screen
  // to clear an input, set its val to '',   xxxxx.val('');
}

function displayTask(task) {
  // TODO 2: - set the background color of the task to the color select by the user.

  // create the syntax
  var syntax = `<div class='task' style="background-color:red">
        <i class="far fa-star task-star task-section-sm"></i>
        <div class='task-desc'>
        <label>${task.id}</label>
            <h5>${task.title}</h5>
            <label>${task.description}</label>
        </div>
        <label class='task-section'>${task.dueDate}</label>
        <label class='task-section'>${task.location}</label>

        <div class='task-section-sm'>
            <i class="fas fa-trash" onclick="deleteTask(${task.id})"></i>
        </div>

    </div>`;

  // append the syntax to existing html
  $("#tasks-list").append(syntax);
}

function retrieveData() {

   $.ajax({
    url: serverUrl + "/tasks",
    type:"GET",
    success: function(res){
      console.log("retrieving", res);

      for(let i =0; i < res.length; i++) {
        let task = res[i];
        if(task.user === "Sergio"){
          displayTask(task);
        }
      }
    },
    error: function(errorDet) {
      console.log("Error retrieving", errorDet);
    }
   });

}




function deleteTask(id) {
  console.log("Should delete a task", id);

  // TODO 3 - Delete task (optional)

  // create an ajax
  // url: serverUrl + '/tasks/' + id

  // on success funciton -> remove it from the screen
}


function testRequest() {
  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function(res) {
      console.log("Yeei it worked!!", res);
    },
    error: function(errorDetails) {
      console.log("Oucch we have an error :(", errorDetails);
    }
  });
}

function init() {
  console.log("Task Manager");

  $('#txtColor').spectrum({
    type: "component"
  });

  retrieveData();

  // events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#btnDetails").click(toggleDetailsVisibility);
}

window.onload = init;
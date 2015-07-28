// Date functions
var validDates = [];
function getYear() {
  var date = new Date();
  return date.getFullYear();
}

function getQuarter() {
  var date = new Date();
  var m = date.getMonth();
  if (( m >= 0) && (m <= 2)) {
    return 1;
  } else if (( m >= 3) && (m <= 5)) {
    return 2;
  } else if (( m >= 6) && (m <= 8)) {
    return 3;
  } else {
    return 4;
  }
}

// USed to limit the verbosity of the console logging
var limit_date_data_display = 0;

// Mode: pass 'total' to get total number of days in the quater; days remaining is returned
function getTimeRemaining(mode) {
  var date = new Date();
  var m = date.getMonth();
  var d = date.getDate();
  var y = date.getFullYear();

  // Javascript month objets go from 0 to 11
  // Make the quarter start in January, April, July & October
  // Make the quarter end 3 months later
  var qs = 0;
  var qe = 2
  if (( m >= 3) && (m <= 5)) {
    qs = 3;
    qe = 5;
  } else if (( m >= 6) && (m <= 8)) {
    qs = 6;
    qe = 8;
  } else if (m >= 9){
    qs = 9;
    qe = 11;
  }

  // After we calulate what range we are in, we need to add one to the month
  // So it can accurately depict the month we are in
  m++;

  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var start = new Date(y,qs,1);
  var current = new Date(y,m,d);
  // March & December have 31 days
  var month_ends_on = 31;
  // Jume & September have 30
  if ((qe == 2) || (qe == 8)) {
    month_ends_on = 30;
  }
  var end = new Date(y,qe,month_ends_on);


  // Check if variable exists
  if (mode) {
    // Return total number of days in the quarter
    if (mode == 'total') {
      var days = Math.round(Math.abs((end.getTime() - start.getTime())/(oneDay)));
      if (limit_date_data_display < 2) {
        console.log("It is " + y + "/" + m + "/" + d + " and the quarter started in " + (qs+1) + "/1 and will end on " + (qe+1) + "/" + month_ends_on);
        console.log("There are a total of " + days + " days in this quarter.");
        limit_date_data_display++;
      }
      return days;
    }
  }

  // Return the number of days until the end of the quarter
  var days = Math.round(Math.abs((end.getTime() - current.getTime())/(oneDay)));
  if (limit_date_data_display < 2) {
    console.log(days + " days remain in this quarter.");
    limit_date_data_display++;
  }
  return days;
}

function getDueDateOptions() {
  var year = getYear();
  var currentQ = getQuarter();
  var quarters = [];
  var howMuch = 12;
  var at = 1;
  while (at <= howMuch) {
    if (currentQ > 4) {
      currentQ = 1;
      year++;
    }
    quarters.push(year + " Q" + currentQ);
    currentQ++;
    at++;
  }
  return quarters;
}

function setDateOptions() {
  validDates = getDueDateOptions();
  validDates.forEach(function(item) {
    $('.populate-with-dates').append("<option>" + item + "</option>");
    // console.log("Added date option: " + item);
  });
}
